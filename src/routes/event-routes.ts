import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getSingleEvent,
  joinEvent,
} from "../controllers/event-controllers";

const router = Router();

router.get("/", getAllEvents);

router.get("/:eventId", getSingleEvent);

router.post("/", createEvent);

router.post("/join/:eventId", joinEvent)

export default router;
