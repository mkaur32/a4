import mongoose, { Document, Schema } from "mongoose";

// Schema definition for a game document
export interface GameRecord extends Document {
  playerName: string;
  matchDuration: number;
  gameState: string;
  winningPlayer: string;
  boardSize: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the mongoose schema for the game document
const gameSchema = new Schema<GameRecord>(
  {
    playerName: { type: String, required: true },
    gameState: { type: String, required: true },
    matchDuration: { type: Number },
    winningPlayer: { type: String },
    boardSize: { type: Number },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields of type Date.
  }
);

// Create and export the Game model
export default mongoose.model<GameRecord>('Game', gameSchema);
