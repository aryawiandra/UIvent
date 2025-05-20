const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const bookmarksController = require("../controllers/bookmarks.controller");
const router = express.Router();

// POST /api/bookmarks
router.post("/", authenticate, bookmarksController.addBookmark);

// DELETE /api/bookmarks/:eventId
router.delete("/:eventId", authenticate, bookmarksController.removeBookmark);

// GET /api/bookmarks (ambil semua bookmark user yang sedang login)
router.get("/", authenticate, bookmarksController.getBookmarksByUser);

// GET /api/bookmarks/status?eventId=... (cek status bookmark untuk user yang sedang login)
router.get("/status", authenticate, bookmarksController.isBookmarked);

module.exports = router;
