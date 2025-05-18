const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173", "https://uivent-production.up.railway.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", require("./src/routes/user.route"));
app.use("/api/events", require("./src/routes/event.route"));
app.use("/api/categories", require("./src/routes/category.route"));
app.use("/api/orgs", require("./src/routes/orgs.route"));
app.use("/api/participants", require("./src/routes/participant.route"));
app.use("/api/tracking", require("./src/routes/tracking.route"));
app.use("/api/statistics", require("./src/routes/statistic.route"));
app.use("/api/users", require("./src/routes/user.route"));
app.use("/api/bookmarks", require("./src/routes/bookmarks.route"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
