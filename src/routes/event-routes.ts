import { Router } from "express";
import { createEvent, getAllEvents } from "../controllers/event-controllers";

const router = Router();

router.get('/', getAllEvents)

router.post('/', createEvent)

export default router;