const db = require("../database/pg.database");
const cloudinary = require('cloudinary').v2;

exports.createEvent = async (datetime, event, file) => {
  try {
    const img = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, uploadResult) => {
            if (error) 
                return reject(error);
                
            resolve({
                image_url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            });
        }).end(file.buffer);
    });

    const res = await db.query(
      `INSERT INTO events (
                title, 
                description, 
                image_url,
                image_pid,
                venue, 
                time_start, 
                time_end, 
                status, 
                category_id, 
                organizer_id
             ) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
             RETURNING *`,
      [
        event.title,
        event.description,
        img.image_url,
        img.public_id,
        event.venue,
        datetime.start_datetime,
        datetime.end_datetime,
        event.status,
        event.category_id,
        event.organizer_id,
      ]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.getAllEvents = async () => {
  try {
    const res = await db.query(`
            SELECT 
                events.*, 
                organizations.name AS organization
            FROM events
            JOIN organizations ON events.organizer_id = organizations.id
        `);

    if (!res?.rows) {
      return null;
    }

    return res.rows;
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.getEventById = async (id) => {
  try {
    const res = await db.query("SELECT * FROM events WHERE id = $1", [id]);

    if (!res?.rows[0]) {
      return null;
    }

    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.getEventsByOrganizer = async (organizer_id) => {
  try {
    const res = await db.query("SELECT * FROM events WHERE organizer_id = $1", [
      organizer_id,
    ]);

    if (!res?.rows) {
      return null;
    }

    return res.rows;
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.updateEvent = async (id, datetime, event, file, oldEvent) => {
  try {
    const result= await cloudinary.uploader.destroy(oldEvent.image_pid, {
        resource_type: "image"
    });

    console.log(result);
    
    const img = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, uploadResult) => {
            if (error) 
                return reject(error);
                
            resolve({
                image_url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            });
        }).end(file.buffer);
    });

    const res = await db.query(
      `UPDATE events 
             SET title = $1, 
                 description = $2,
                 image_url = $3,
                 image_pid = $4, 
                 venue = $5,  
                 time_start = $6, 
                 time_end = $7, 
                 status = $8, 
                 category_id = $9, 
                 organizer_id = $10
             WHERE id = $11
             RETURNING *`,
      [
        event.title,
        event.description,
        img.image_url,
        img.public_id,
        event.venue,
        datetime.start_datetime,
        datetime.end_datetime,
        event.status,
        event.category_id,
        event.organizer_id,
        id,
      ]
    );

    if (!res?.rows[0]) {
      return null;
    }

    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.deleteEvent = async (id) => {
  try {
    const res = await db.query("DELETE FROM events WHERE id = $1 RETURNING *", [
      id,
    ]);

    if (!res?.rows[0]) {
      return null;
    }

    await cloudinary.uploader.destroy(res.rows[0].image_pid, {
        resource_type: "image"
    });

    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};
