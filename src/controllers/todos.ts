import { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

type todoModel = {
    id: string;
};

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(uuid(), text);

    TODOS.push(newTodo);

    res.status(201).json({
        message: 'Created the todo.',
        createdTodo: newTodo,
    });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({
        todos: TODOS,
    });
};

export const updateTodo: RequestHandler<todoModel> = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as { text: string }).text;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find this todo!');
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

    res.status(200).json({
        message: 'Updated!',
        updatedTodo: TODOS[todoIndex],
    });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find this todo!');
    }

    TODOS.splice(todoIndex, 1);

    res.status(200).json({
        message: 'TODO deleted!',
    });
};
