const bookmarksRepo = require("../repositories/bookmarks.repository");
const baseResponse = require("../utils/baseResponse.util");

// Tambah bookmark (POST /api/bookmarks)
exports.addBookmark = async (req, res) => {
  const userId = req.user?.id; // dari middleware auth
  const { eventId } = req.body;

  if (!userId || !eventId) {
    return baseResponse(res, false, 400, "userId and eventId required", null);
  }

  try {
    // Cek apakah sudah ada
    const exists = await bookmarksRepo.isBookmarked(userId, eventId);
    if (exists) {
      return baseResponse(res, false, 409, "Already bookmarked", null);
    }
    const bookmark = await bookmarksRepo.addBookmark(userId, eventId);
    return baseResponse(res, true, 201, "Bookmarked", bookmark);
  } catch (error) {
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

// Hapus bookmark (DELETE /api/bookmarks/:eventId)
exports.removeBookmark = async (req, res) => {
  const userId = req.user?.id;
  const { eventId } = req.params;

  if (!userId || !eventId) {
    return baseResponse(res, false, 400, "userId and eventId required", null);
  }

  try {
    await bookmarksRepo.removeBookmark(userId, eventId);
    return baseResponse(res, true, 200, "Bookmark removed", null);
  } catch (error) {
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

// Ambil semua bookmark milik user (GET /api/bookmarks)
exports.getBookmarksByUser = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return baseResponse(res, false, 400, "userId required", null);
  }

  try {
    const bookmarks = await bookmarksRepo.getBookmarksByUser(userId);
    return baseResponse(res, true, 200, "Bookmarks fetched", bookmarks);
  } catch (error) {
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

// Cek status bookmark (GET /api/bookmarks/status?eventId=...)
exports.isBookmarked = async (req, res) => {
  const userId = req.user?.id;
  const { eventId } = req.query;

  if (!userId || !eventId) {
    return baseResponse(res, false, 400, "userId and eventId required", null);
  }

  try {
    const bookmarked = await bookmarksRepo.isBookmarked(userId, eventId);
    return baseResponse(res, true, 200, "Bookmark status fetched", {
      bookmarked,
    });
  } catch (error) {
    return baseResponse(res, false, 500, "Server Error", null);
  }
};
