const express = require("express");
const router = express.Router();
const bookmarksController = require("../controllers/bookmarks.controller");

// POST /api/bookmarks
router.post("/", bookmarksController.addBookmark);

// DELETE /api/bookmarks/:eventId
router.delete("/:eventId", bookmarksController.removeBookmark);

// GET /api/bookmarks?userId=...
router.get("/", bookmarksController.getBookmarksByUser);

// GET /api/bookmarks/status?userId=...&eventId=...
router.get("/status", bookmarksController.isBookmarked);

module.exports = router;