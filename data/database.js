import mongoose from "mongoose";

export const DatabaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "userData"
    }).then(() => {
        console.log('Database connection successful');
    }).catch((error) => {
        console.log(`Error while database connectivity:${error}`);
    })
}