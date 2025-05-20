const db = require("../database/pg.database");
const cloudinary = require('cloudinary').v2;

exports.createEvent = async (datetime, event, file) => {
  try {
    let img = {};
    
    if (file) {
      img = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, uploadResult) => {
          if (error) 
            return reject(error);
              
          resolve({
            image_url: uploadResult.secure_url,
            public_id: uploadResult.public_id
          });
        }).end(file.buffer);
      });
    }

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
        img.image_url || event.image_url || null,
        img.public_id || null,
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
  const { rows } = await db.query(`
    SELECT 
      events.*, 
      organizations.name AS organization_name
    FROM events
    LEFT JOIN organizations ON events.organizer_id = organizations.id
    ORDER BY events.created_at DESC
  `);
  return rows;
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
    let img = {};
    
    // Support both parameter formats
    const start_datetime = datetime.start_datetime || datetime;
    const end_datetime = datetime.end_datetime || event.end_datetime;
    
    // Extract event data
    const {
      title,
      description,
      venue,
      status,
      category_id,
      organizer_id,
      image_url,
    } = event;
    
    // Handle image if provided
    if (file && oldEvent?.image_pid) {
      // Delete old image if exists
      await cloudinary.uploader.destroy(oldEvent.image_pid, {
        resource_type: "image"
      });
      
      // Upload new image
      img = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, uploadResult) => {
          if (error) 
            return reject(error);
              
          resolve({
            image_url: uploadResult.secure_url,
            public_id: uploadResult.public_id
          });
        }).end(file.buffer);
      });
    }

    // Update the event
    const { rows } = await db.query(
      `UPDATE events SET
         title = $1,
         description = $2,
         venue = $3,
         time_start = $4,
         time_end = $5,
         status = $6,
         category_id = $7,
         organizer_id = $8,
         image_url = $9,
         image_pid = $10
       WHERE id = $11
       RETURNING *`,
      [
        title,
        description,
        venue,
        start_datetime,
        end_datetime,
        status,
        category_id,
        organizer_id,
        img.image_url || image_url,
        img.public_id || (oldEvent ? oldEvent.image_pid : null),
        id,
      ]
    );
    return rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
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

    if (res.rows[0].image_pid) {
      await cloudinary.uploader.destroy(res.rows[0].image_pid, {
        resource_type: "image"
      });
    }

    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};