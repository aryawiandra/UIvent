const db = require("../database/pg.database");

exports.createEvent = async (datetime, event) => {
  try {
    const res = await db.query(
      `INSERT INTO events (
                title, 
                description, 
                venue, 
                time_start, 
                time_end, 
                status, 
                category_id, 
                organizer_id
             ) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
      [
        event.title,
        event.description,
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

exports.updateEvent = async (id, { start_datetime, end_datetime }, body) => {
  const {
    title,
    description,
    venue,
    status,
    category_id,
    organizer_id,
    image_url,
  } = body;

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
       image_url = $9
     WHERE id = $10
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
      image_url,
      id,
    ]
  );
  return rows[0];
};

exports.deleteEvent = async (id) => {
  try {
    const res = await db.query("DELETE FROM events WHERE id = $1 RETURNING *", [
      id,
    ]);

    if (!res?.rows[0]) {
      return null;
    }

    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};
