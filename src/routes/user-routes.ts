import { Router } from "express";
import { signup } from "../controllers/user-controllers";

const router = Router();

router.post('/signup', signup)

router.post('/login')

export default router;