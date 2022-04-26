import mongoose from "mongoose";
import { Schema, Types, model } from "mongoose";
import Tpo from "../Interfaces/TpoInterface";

const TpoSchema = new Schema<Tpo>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const Tpo = model<Tpo>("Tpo", TpoSchema)

export default Tpo;