import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getSingleEvent,
} from "../controllers/event-controllers";

const router = Router();

router.get("/", getAllEvents);

router.get("/:eventId", getSingleEvent);

router.post("/", createEvent);

export default router;
