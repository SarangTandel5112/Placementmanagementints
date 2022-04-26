import mongoose, { Types } from 'mongoose';

interface Otp extends mongoose.Document {
    number:Number,
    otp:Number
}

export default Otp;