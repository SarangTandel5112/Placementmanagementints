import mongoose from "mongoose";
import { Schema, Types, model } from "mongoose";
import CompanyInterface from "../Interfaces/CompanyInterface";
import Job from "./Job";

const CompanySchema = new Schema<CompanyInterface>({
    name: {
        type: String,
        required: true
    },
    email: {
        emailId: {
            type: String,
            require: true,
            unique: true
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    number: {
        type: Number,
        required: true
    },
    ceo: {
        type: String,
        required: true
    },
    hr: {
        type: String,
        required: true
    },
    jobsposted: {
        type: [Schema.Types.ObjectId],
        ref: Job
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imagepath: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Company = model<CompanyInterface>("Company", CompanySchema)
export default Company;