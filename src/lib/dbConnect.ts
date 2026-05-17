
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}


async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected Database");
        return
    }
    console.log(process.env.MONGODB_URI)

    try{
       const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

       connection.isConnected = db.connections[0].readyState
       console.log("db connected Successfully");
       
    }catch(error){
        console.log("faild to connect", error)
        process.exit(1)
    }
    
}
dbConnect()
export default dbConnect