import mongoose from "mongoose";
import { Schema, Types, model } from "mongoose";
import Otp from "../Interfaces/Otp";

const OtpSchema = new Schema<Otp>({
    number: {
        type: Number,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    }
})

const Otp = model<Otp>("Otp", OtpSchema)

export default Otp;