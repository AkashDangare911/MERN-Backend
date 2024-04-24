import mongoose from "mongoose";

// const url = 'mongodb://127.0.0.1:27017/try-try'

const connectToMongo = async () =>{
    // const res = await mongoose.connect('mongodb://127.0.0.1:27017/try-try-again')
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/myDatabase')
    
    if(res)
    { 
        console.log("Connected successfully"); 
    }
    else 
    {
        console.log("Unable to connect, sorry !");
    }
};

export default connectToMongo;