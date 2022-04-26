import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

class connectDB {
    constructor() {
        mongoose.connect(process.env.DATABASE as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectionOptions).then(() => {
            console.log("Database Connected.....");
        }).catch((error)=>{
            console.log(error,"error in Database Connection");            
        })        
    }
}

export default connectDB;