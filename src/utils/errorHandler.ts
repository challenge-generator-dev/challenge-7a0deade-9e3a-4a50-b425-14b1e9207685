import { Request, Response, NextFunction } from 'express';

export interface ApiError {
    statusCode: number;
    message: string;
    timestamp: string;
    path?: string;
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(`[ERROR] ${err.name}: ${err.message}`);
    console.error(`[ERROR] Stack: ${err.stack}`);

    if (res.headersSent) {
        return next(err);
    }

    const apiError = buildApiError(err, req);
    res.status(apiError.statusCode).json(apiError);
}

function buildApiError(err: Error, req: Request): ApiError {
    const baseError: ApiError = {
        statusCode: 500,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: req.path
    };

    if (err instanceof ValidationError) {
        return {
            ...baseError,
            statusCode: 400,
            message: err.message
        };
    }

    if (err instanceof NotFoundError) {
        return {
            ...baseError,
            statusCode: 404,
            message: err.message
        };
    }

    if (err instanceof UnauthorizedError) {
        return {
            ...baseError,
            statusCode: 401,
            message: err.message
        };
    }

    if (err instanceof ForbiddenError) {
        return {
            ...baseError,
            statusCode: 403,
            message: err.message
        };
    }

    if (err instanceof ConflictError) {
        return {
            ...baseError,
            statusCode: 409,
            message: err.message
        };
    }

    if (err.name === 'SequelizeValidationError' || err.name === 'ValidationError') {
        return {
            ...baseError,
            statusCode: 400,
            message: extractValidationMessage(err)
        };
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return {
            ...baseError,
            statusCode: 401,
            message: 'Invalid or expired token'
        };
    }

    return baseError;
}

function extractValidationMessage(err: Error): string {
    const validationError = err as { errors?: Array<{ message: string }> };
    if (validationError.errors && Array.isArray(validationError.errors)) {
        return validationError.errors.map(e => e.message).join(', ');
    }
    return err.message;
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenError';
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

export function notFoundHandler(req: Request, res: Response): void {
    res.status(404).json({
        statusCode: 404,
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString(),
        path: req.path
    });
}