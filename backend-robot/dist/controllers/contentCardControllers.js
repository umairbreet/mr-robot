import { addContentCard, getAllContentCards } from '../models/contentCardModel.js';
export const createCard = async (req, res) => {
    try {
        const card = await addContentCard(req.body);
        res.status(201).json(card);
    }
    catch (error) {
        console.error('Error creating card:', error instanceof Error ? error.stack || error.message : error);
        // Include more error details in response for debugging (can be removed later)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const details = error?.detail || error?.code || null;
        res.status(500).json({ message: 'Failed to create content card', error: errorMessage, details });
    }
};
export const fetchCards = async (req, res) => {
    try {
        const cards = await getAllContentCards();
        res.status(200).json(cards);
    }
    catch (error) {
        console.error('Error fetching cards:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Failed to fetch content cards', error: errorMessage });
    }
};
//# sourceMappingURL=contentCardControllers.js.map