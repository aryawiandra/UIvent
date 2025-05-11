const db = require('../database/pg.database');

exports.registerUser = async (name, email, hash) => {
    try {
        const res = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hash]
        );
        return res.rows[0];
    }
    catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getUserByEmail = async (email) => {
    try {
        const res = await db.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );
        return res.rows[0];
    }
    catch (error) {
        console.error("Error executing query", error);
    }
};