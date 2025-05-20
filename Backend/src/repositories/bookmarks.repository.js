const db = require('../database/pg.database');

exports.addBookmark = async (userId, eventId) => {
  try {
    const res = await db.query(
      `INSERT INTO bookmarks (user_id, event_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`,
      [userId, eventId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error adding bookmark", error);
    throw error;
  }
};

exports.removeBookmark = async (userId, eventId) => {
  try {
    const res = await db.query(
      `DELETE FROM bookmarks WHERE user_id = $1 AND event_id = $2 RETURNING *`,
      [userId, eventId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error removing bookmark", error);
    throw error;
  }
};

exports.getBookmarksByUser = async (userId) => {
  try {
    const res = await db.query(
      `SELECT events.*, organizations.name AS organization
       FROM bookmarks
       JOIN events ON bookmarks.event_id = events.id
       JOIN organizations ON events.organizer_id = organizations.id
       WHERE bookmarks.user_id = $1
       ORDER BY bookmarks.created_at DESC`,
      [userId]
    );
    return res.rows;
  } catch (error) {
    console.error("Error fetching bookmarks", error);
    throw error;
  }
};

exports.isBookmarked = async (userId, eventId) => {
  try {
    const res = await db.query(
      `SELECT 1 FROM bookmarks WHERE user_id = $1 AND event_id = $2`,
      [userId, eventId]
    );
    return !!res.rows.length;
  } catch (error) {
    console.error("Error checking bookmark", error);
    throw error;
  }
};