const db = require('../database/pg.database');

exports.createOrganization = async (organization) => {
    try {
        const res = await db.query(
            "INSERT INTO organizations (name) VALUES ($1) RETURNING *",
            [organization.name]
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

exports.getAllOrganizations = async () => {
    try {
        const res = await db.query("SELECT * FROM organizations");

        if (!res?.rows) {
            return null;
        }

        return res.rows;
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

exports.updateOrganization = async (id, organization) => {
    try {
        const res = await db.query(
            "UPDATE organizations SET name = $1 WHERE id = $2 RETURNING *",
            [organization.name, id]
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

exports.deleteOrganization = async (id) => {
    try {
        const res = await db.query(
            "DELETE FROM organizations WHERE id = $1 RETURNING *",
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