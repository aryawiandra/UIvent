const db = require('../database/pg.database');

exports.addParticipant = async (participant) => {
    try {
        const res = await db.query(
            `INSERT INTO participants (event_id, user_id, rating) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [
                participant.event_id, 
                participant.user_id, 
                participant.rating ?? null
            ]
        );

        if (!res?.rows[0]) {
            return null;
        }

        return res.rows[0];
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.getParticipantsByEvent = async (event_id) => {
    try {
        const res = await db.query(
            "SELECT * FROM participants WHERE event_id = $1", 
            [event_id]
        )

        if (!res?.rows) {
            return null;
        }

        return res.rows;
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.updateRating = async (id, rating) => {
    try {
        const res = await db.query(
            "UPDATE participants SET rating = $1 WHERE id = $2 RETURNING *",
            [rating, id]
        );

        if (!res?.rows[0]) {
            return null;
        }

        return res.rows[0];
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.deleteParticipant = async (participant) => {
    try {
        const res = await db.query(
            `DELETE FROM participants 
             WHERE user_id = $1 AND event_id = $2 
             RETURNING *`,
            [participant.userId, participant.eventId]
        );

        if (!res?.rows[0]) {
            return null;
        }

        return res.rows[0];
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}