import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  getUserEvents,
  joinEvent,
  leaveEvent,
} from "../controllers/event-controllers";

const router = Router();

router.get("/", getAllEvents);

router.get("/:eventId", getSingleEvent);

router.post("/", createEvent);

router.post("/join/:eventId", joinEvent)

router.post("/leave/:eventId", leaveEvent)

router.get("/userEvents/:userId", getUserEvents)

router.delete("/:eventId", deleteEvent)

export default router;
