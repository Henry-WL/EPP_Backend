import { Request, Response, NextFunction, RequestHandler } from "express";

import { Todo } from "../models/todo";

const TODOs: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOs.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOs });
};

export const patchTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const { id } = req.params;

  const foundIndex = TODOs.findIndex((obj) => obj.id === id);

  TODOs[foundIndex].text = text;

  res.status(200).json({ todo: TODOs[foundIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const foundIndex = TODOs.findIndex((obj) => obj.id === id);

  if (foundIndex < 0) {
    throw new Error("Could not find todo!");
  }
  TODOs.splice(foundIndex, 1);
  res.json({ todos: TODOs });
};
