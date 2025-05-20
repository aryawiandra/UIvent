const db = require('../database/pg.database');

exports.getAllEventsStatistics = async () => {
    try {
        const res = await db.query(
            `SELECT 
                e.id AS event_id,
                e.title AS event_name,
                e.time_start AS event_start_time,
                e.time_end AS event_end_time,
                o.name AS organizer_name,
                p_stats.participant_count,
                p_stats.average_rating
             FROM 
                events e
             LEFT JOIN 
                organizations o ON o.id = e.organizer_id
             LEFT JOIN (
                SELECT 
                    event_id,
                    COUNT(id) AS participant_count,
                    AVG(rating) AS average_rating
                FROM 
                    participants
                GROUP BY 
                    event_id
             ) p_stats ON e.id = p_stats.event_id
             ORDER BY 
                e.title ASC`
        );

        if (!res?.rows) {
            return null;
        }

        return res.rows;
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.getGeneralStatistics = async () => {
    try {
        const res = await db.query(
            `SELECT
                (SELECT COUNT(*) FROM organizations) AS organization_count,
                (SELECT COUNT(*) FROM events) AS total_events,
                (SELECT COUNT(*) FROM participants) AS total_participants`
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

exports.getEventStatisticsByOrganizer = async (organizerId) => {
    try {
        const res = await db.query(
            `SELECT 
                e.id AS event_id,
                e.title AS event_name,
                e.time_start AS event_start_time,
                e.time_end AS event_end_time,
                p_stats.participant_count,
                p_stats.average_rating
             FROM 
                events e
             LEFT JOIN (
                SELECT 
                    event_id,
                    COUNT(id) AS participant_count,
                    AVG(rating) AS average_rating
                FROM 
                    participants
                GROUP BY 
                    event_id
             ) p_stats ON e.id = p_stats.event_id
             WHERE 
                e.organizer_id = $1
             ORDER BY 
                e.title ASC`,
            [organizerId]
        );

        if (!res?.rows) {
            return null;
        }

        return res.rows;
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.getGeneralStatisticsByOrganizer = async (organizerId) => {
    try {
        const res = await db.query(
            `SELECT 
                e.organizer_id,
                COUNT(DISTINCT e.id) AS total_events,
                COUNT(p.id) AS total_participants,
                COUNT(DISTINCT CASE WHEN e.time_start > NOW() THEN e.id END) AS incoming_events
             FROM 
                events e
             LEFT JOIN 
                participants p ON e.id = p.event_id
             WHERE 
                e.organizer_id = $1
             GROUP BY 
                e.organizer_id`,
            [organizerId]
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

