import express from 'express';
import {
  getGames,
  getGameById,
  createGame,
  updateGame,
} from '../controller/gameController';

const router = express.Router();

// Retrieve a list of played games
router.get('/games', getGames);

// Retrieve a single game by ID
router.get('/games/:id', getGameById);

// Create a new game
router.post('/games', createGame);

// Update current moves for a game by ID
router.put('/games/:id', updateGame);

export default router;
