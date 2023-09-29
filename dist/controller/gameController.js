"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGame = exports.createGame = exports.getGameById = exports.getGames = void 0;
const game_1 = __importDefault(require("../model/game"));
// Retrieve a list of played games
const getGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield game_1.default.find();
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getGames = getGames;
// Retrieve a single game by ID
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.id;
        const game = yield game_1.default.findById(gameId);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json(game);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getGameById = getGameById;
// Create a new game
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract game data from the request body
        const { playerName, gameState, matchDuration, winningPlayer, boardSize } = req.body;
        // Create a new game record
        const newGame = new game_1.default({ playerName, gameState, matchDuration, winningPlayer, boardSize });
        // Save the new game to the database
        yield newGame.save();
        res.status(201).json(newGame);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createGame = createGame;
// Update current moves for a game by ID
const updateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.id;
        const updatedGame = req.body; // Include data to update in the request body
        const game = yield game_1.default.findByIdAndUpdate(gameId, updatedGame, { new: true });
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json(game);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateGame = updateGame;
