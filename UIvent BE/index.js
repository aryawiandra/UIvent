const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const corsOptions = {
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', require("./src/routes/user.route"));
// app.use('/api/events', require("./src/routes/event.route"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});