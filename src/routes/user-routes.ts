import { Router } from "express";
import { getUser, login, patchUser, signup } from "../controllers/user-controllers";

const router = Router();

router.post('/signup', signup)

router.post('/login', login)

router.get('/:userId', getUser)

router.patch('/:userId', patchUser)

export default router;