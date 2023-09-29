"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameController_1 = require("../controller/gameController");
const router = express_1.default.Router();
// Retrieve a list of played games
router.get('/games', gameController_1.getGames);
// Retrieve a single game by ID
router.get('/games/:id', gameController_1.getGameById);
// Create a new game
router.post('/games', gameController_1.createGame);
// Update current moves for a game by ID
router.put('/games/:id', gameController_1.updateGame);
exports.default = router;
