const eventRepository = require("../repositories/event.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createEvent = async (req, res) => {
  const requiredFields = [
    "title",
    "description",
    "venue",
    "start_date",
    "start_time",
    "end_date",
    "end_time",
    "status",
    "category_id",
    "organizer_id",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return baseResponse(
      res,
      false,
      400,
      "Please enter the required fields",
      null
    );
  }

  if (
    req.body.organizer_id !== req.user.organization &&
    req.user.role !== "admin"
  ) {
    return baseResponse(
      res,
      false,
      403,
      "You are not authorized to create an event for this organization",
      null
    );
  }

  const { start_date, start_time, end_date, end_time } = req.body;

  const start_datetime = `${start_date}T${start_time}:00Z`;
  const end_datetime = `${end_date}T${end_time}:00Z`;

  try {
    const event = await eventRepository.createEvent(
      { start_datetime, end_datetime },
      req.body,
      req.file
    );
    return baseResponse(res, true, 201, "Event created successfully", event);
  } catch (error) {
    console.error("Server error", error);
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventRepository.getAllEvents();

    if (!events) {
      return baseResponse(res, false, 500, "Failed to retrieve events", null);
    }

    // Tetap kirim 200 meskipun kosong
    return baseResponse(
      res,
      true,
      200,
      "Events retrieved successfully",
      events
    );
  } catch (error) {
    console.error("Server error", error);
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await eventRepository.getEventById(req.params.id);

    if (!event) {
      return baseResponse(res, false, 404, "Event not found", null);
    }

    return baseResponse(res, true, 201, "Event found", event);
  } catch (error) {
    console.error("Server error", error);
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

exports.getEventsByOrganizer = async (req, res) => {
  try {
    const events = await eventRepository.getEventsByOrganizer(
      req.params.organizationId
    );

    if (!events?.length) {
      return baseResponse(res, false, 404, "No events found", null);
    }

    return baseResponse(
      res,
      true,
      200,
      "Events retrieved successfully",
      events
    );
  } catch (error) {
    console.error("Server error", error);
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

exports.updateEvent = async (req, res) => {
  const requiredFields = [
    "title",
    "description",
    "venue",
    "start_date",
    "start_time",
    "end_date",
    "end_time",
    "status",
    "category_id",
    "organizer_id",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return baseResponse(
      res,
      false,
      400,
      "Please enter the required fields",
      null
    );
  }

  const oldEvent = await eventRepository.getEventById(req.params.id);

  if (!oldEvent) {
    return baseResponse(res, false, 404, "Event not found", null);
  }

  if (
    oldEvent.organizer_id !== req.user.organization &&
    req.user.role !== "admin"
  ) {
    return baseResponse(
      res,
      false,
      403,
      "You are not authorized to update an event for this organization",
      null
    );
  }

  const { start_date, start_time, end_date, end_time } = req.body;

  const start_datetime = `${start_date}T${start_time}:00Z`;
  const end_datetime = `${end_date}T${end_time}:00Z`;

  try {
    const event = await eventRepository.updateEvent(
      req.params.id,
      { start_datetime, end_datetime },
      req.body,
      req.file,
      oldEvent
    );
    return baseResponse(res, true, 200, "Event updated successfully", event);
  } catch (error) {
    console.error("Server error", error);
    return baseResponse(res, false, 500, "Server Error", null);
  }
};

exports.deleteEvent = async (req, res) => {
  let event = await eventRepository.getEventById(req.params.id);

  if (!event) {
    return baseResponse(res, false, 404, "Event not found", null);
  }

  if (
    event.organizer_id !== req.user.organization &&
    req.user.role !== "admin"
  ) {
    return baseResponse(
      res,
      false,
      403,
      "You are not authorized to delete an event for this organization",
      null
    );
  }

  try {
    event = await eventRepository.deleteEvent(req.params.id);
    return baseResponse(res, true, 200, "Event deleted successfully", event);
  } catch (error) {
    console.error("Server error", error);
    return baseResponse(res, false, 500, "Server Error", null);
  }
};