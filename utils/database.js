import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async() => {
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log('Connected to database')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'smartPrompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log('Connected to mongodb')
        
    } catch (error) {
        console.log(error);
    }
}