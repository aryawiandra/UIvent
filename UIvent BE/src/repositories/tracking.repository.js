const db = require('../database/pg.database');

exports.getStatusByEvent = async (eventId) => {
    try {
        const res = await db.query(
            "SELECT title, status FROM events WHERE id = $1",
            [eventId]
        );

        if (!res?.rows[0]) {
            return null;
        }

        return res.rows;
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}