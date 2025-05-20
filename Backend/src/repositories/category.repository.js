const db = require('../database/pg.database');

exports.createCategory = async (category) => {
    try {
        const res = await db.query(
            `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
            [category.name]
        );
        return res.rows[0];
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.getAllCategories = async () => {
    try {
        const res = await db.query("SELECT * FROM categories");

        if (!res?.rows) {
            return null;
        }

        return res.rows;
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.getCategoryById = async (id) => {
    try {
        const res = await db.query(
            "SELECT * FROM categories WHERE id = $1", 
            [id]
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

exports.updateCategory = async (id, category) => {
    try {
        const res = await db.query(
            "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
            [category.name, id]
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

exports.deleteCategory = async (id) => {
    try {
        const res = await db.query(
            "DELETE FROM categories WHERE id = $1 RETURNING *", 
            [id]
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