"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.patchTodos = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOs = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOs.push(newTodo);
    res.status(201).json({ message: "Created the todo.", createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOs });
};
exports.getTodos = getTodos;
const patchTodos = (req, res, next) => {
    const text = req.body.text;
    const { id } = req.params;
    const foundIndex = TODOs.findIndex((obj) => obj.id === id);
    TODOs[foundIndex].text = text;
    res.status(200).json({ todo: TODOs[foundIndex] });
};
exports.patchTodos = patchTodos;
const deleteTodo = (req, res, next) => {
    const { id } = req.params;
    const foundIndex = TODOs.findIndex((obj) => obj.id === id);
    if (foundIndex < 0) {
        throw new Error("Could not find todo!");
    }
    TODOs.splice(foundIndex, 1);
    res.json({ todos: TODOs });
};
exports.deleteTodo = deleteTodo;
