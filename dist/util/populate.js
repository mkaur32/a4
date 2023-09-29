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
const mongoose_1 = __importDefault(require("mongoose"));
const game_1 = __importDefault(require("../model/game"));
const fs_1 = __importDefault(require("fs"));
const user_1 = __importDefault(require("../model/user"));
const populateGameData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to your MongoDB database
        yield mongoose_1.default.connect(process.env.MONGO_CONNECT_URL);
        // Read the JSON data from the file
        const rawData = fs_1.default.readFileSync("../gameData/game.json", "utf8");
        console.log(rawData);
        const gameData = JSON.parse(rawData);
        // Loop through the game data and save each record to the database
        for (const gameRecord of gameData) {
            const game = new game_1.default(gameRecord);
            yield game.save();
        }
        console.log("Game data has been successfully populated.");
    }
    catch (error) {
        console.error("Error populating game data:", error);
    }
    finally {
        // Close the database connection when done
        mongoose_1.default.connection.close();
    }
});
populateGameData();
const populateUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to your MongoDB database
        yield mongoose_1.default.connect(process.env.MONGO_CONNECT_URL);
        //Read the JSON data from the file
        const rawData = fs_1.default.readFileSync("../gameData/loginCredentials.json", "utf8");
        console.log(rawData);
        const userData = JSON.parse(rawData);
        // Loop through the user data and save each record to the database
        for (const userRecord of userData) {
            const users = new user_1.default(userRecord);
            yield users.save();
        }
        console.log("Users data has been successfully populated.");
    }
    catch (error) {
        console.error("Error populating user data:", error);
    }
    finally {
        // Close the database connection when done
        mongoose_1.default.connection.close();
    }
});
populateUserData();
