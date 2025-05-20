require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool ({
    connectionString: "postgresql://neondb_owner:npg_W0t1qOGzgTAN@ep-super-lab-a18oexln-pooler.ap-southeast-1.aws.neon.tech/finpro?sslmode=require",
    ssl: {
        rejectUnauthorized: false,
    },
})

const connect = async () => {
    try {
        await pool.connect();
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Error connecting to the database", error);
    }
}

connect();

const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    }
    catch (error) {
        console.error("Error executing query", error);
    }
}

module.exports = {
    query,
};