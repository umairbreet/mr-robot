import { Router } from 'express';
import { createCard, fetchCards } from '../controllers/contentCardControllers.ts';

const router = Router();

router.get('/cards', fetchCards); // Fetch all cards
router.post('/cards', createCard); // Create a new card

export default router;
