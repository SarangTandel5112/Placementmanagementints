import mongoose, { Types } from 'mongoose';

interface TpoInterface extends mongoose.Document {
    email: String,
    password: String
}

export default TpoInterface;