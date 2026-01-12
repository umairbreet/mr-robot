import type { Request, Response } from 'express';
import { addContentCard, getAllContentCards } from '../models/contentCardModel.ts';

export const createCard = async (req: Request, res: Response) => {
    try {
        const card = await addContentCard(req.body);
        res.status(201).json(card);
    } catch (error) {
        console.error('Error creating card:', error instanceof Error ? error.stack || error.message : error);
        // Include more error details in response for debugging (can be removed later)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const details = (error as any)?.detail || (error as any)?.code || null;
        res.status(500).json({ message: 'Failed to create content card', error: errorMessage, details });
    }
};

export const fetchCards = async (req: Request, res: Response) => {
    try {
        const cards = await getAllContentCards();
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Failed to fetch content cards', error: errorMessage });
    }
};
