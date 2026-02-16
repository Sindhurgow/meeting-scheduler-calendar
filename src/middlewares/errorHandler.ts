import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('🔥 Error:', err.message);

    const status = err.message === 'This time slot already booked' ? 400 : 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        success: false,
        message: message
    });
};