import { Request, Response } from 'express';
import Game from '../model/game'; 

// Retrieve a list of played games
export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a single game by ID
export const getGameById = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new game
export const createGame = async (req: Request, res: Response) => {
  try {
    // Extract game data from the request body
    const { playerName, gameState, matchDuration, winningPlayer, boardSize } = req.body;

    // Create a new game record
    const newGame = new Game({ playerName, gameState, matchDuration, winningPlayer, boardSize });

    // Save the new game to the database
    await newGame.save();

    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update current moves for a game by ID
export const updateGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const updatedGame = req.body; // Include data to update in the request body

    const game = await Game.findByIdAndUpdate(gameId, updatedGame, { new: true });

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
