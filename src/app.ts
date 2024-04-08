import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import todoRoutes from './routes/todos';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
