import { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(uuid(), text);

    TODOS.push(newTodo);

    res.status(201).json({
        message: 'Created the todo.',
        createdTodo: newTodo,
    });
};
