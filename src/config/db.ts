 import mongoose from "mongoose";

 export const connectMongoDB  = async () => {
    try{
        await mongoose.connect("mongodb+srv://navindumalith0:mimw8231@cluster0.qokyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB connected");
    }catch (error){
        console.log("Error connecting to MongoDB",error);
    }
};