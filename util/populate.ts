import mongoose from "mongoose";
import Game from "../model/game";
import fs from "fs";
import User from "../model/user";


const populateGameData = async () => {
    try {
      // Connect to your MongoDB database
      await mongoose.connect(process.env.MONGO_CONNECT_URL as string);
  
       // Read the JSON data from the file
    const rawData = fs.readFileSync("../gameData/game.json", "utf8");
    console.log(rawData)
    const gameData = JSON.parse(rawData);

      // Loop through the game data and save each record to the database

      for (const gameRecord of gameData) {
        const game = new Game(gameRecord);
        await game.save();
      }
  
      console.log("Game data has been successfully populated.");
    } catch (error) {
      console.error("Error populating game data:", error);
    } finally {
      // Close the database connection when done
      mongoose.connection.close();
    }
  };
  
  
  populateGameData();
 const populateUserData = async () => {
    try {
      // Connect to your MongoDB database
      await mongoose.connect(process.env.MONGO_CONNECT_URL as string);
  
        //Read the JSON data from the file
    const rawData = fs.readFileSync("../gameData/loginCredentials.json", "utf8");
    console.log(rawData)
    const userData = JSON.parse(rawData);

      // Loop through the user data and save each record to the database

      for (const userRecord of userData ) {
        const users = new User(userRecord);
        await users.save();
      }
  
      console.log("Users data has been successfully populated.");
    } catch (error) {
      console.error("Error populating user data:", error);
    } finally {
      // Close the database connection when done
      mongoose.connection.close();
    }
  };
  populateUserData();