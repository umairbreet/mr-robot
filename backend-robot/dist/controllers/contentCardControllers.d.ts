import type { Request, Response } from 'express';
export declare const createCard: (req: Request, res: Response) => Promise<void>;
export declare const fetchCards: (req: Request, res: Response) => Promise<void>;
