const bookmarksRepo = require("../repositories/bookmarks.repository");
const baseResponse = require("../utils/baseResponse.util");

// Pastikan userId didapat dari req.user (middleware auth) atau req.body (sementara)
exports.addBookmark = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user?.id || req.body.userId; // sesuaikan dengan implementasi auth kamu

  if (!userId || !eventId) {
    return baseResponse(res, false, 400, "userId and eventId required", null);
  }

  try {
    const bookmark = await bookmarksRepo.addBookmark(userId, eventId);
    return baseResponse(res, true, 201, "Bookmarked", bookmark);
  } catch (error) {
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

exports.removeBookmark = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user?.id || req.body.userId;

  if (!userId || !eventId) {
    return baseResponse(res, false, 400, "userId and eventId required", null);
  }

  try {
    const removed = await bookmarksRepo.removeBookmark(userId, eventId);
    return baseResponse(res, true, 200, "Bookmark removed", removed);
  } catch (error) {
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

exports.getBookmarksByUser = async (req, res) => {
  const userId = req.user?.id || req.query.userId;

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

exports.isBookmarked = async (req, res) => {
  const userId = req.user?.id || req.query.userId;
  const { eventId } = req.query;

  if (!userId || !eventId) {
    return baseResponse(res, false, 400, "userId and eventId required", null);
  }

  try {
    const bookmarked = await bookmarksRepo.isBookmarked(userId, eventId);
    return baseResponse(res, true, 200, "Bookmark status fetched", { bookmarked });
  } catch (error) {
    return baseResponse(res, false, 500, "Server Error", null);
  }
};