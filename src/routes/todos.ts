import { Router } from "express";

import { createTodo, deleteTodo, getTodos, patchTodos } from "../controllers/todos";

const router = Router();

router.post('/', createTodo)

router.get('/', getTodos)

router.patch('/:id', patchTodos)

router.delete('/:id', deleteTodo)

export default router;