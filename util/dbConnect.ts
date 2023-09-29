import mongoose from "mongoose";

// connect to the db
const dbConnect =async (url:string) => {
    // get url from env file
    return mongoose.connect(url);
   
}

export default dbConnect;