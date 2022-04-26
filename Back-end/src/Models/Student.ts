import mongoose from "mongoose";
import { Schema, Types, model } from "mongoose";
import StudentInterface from "../Interfaces/StudentInterface"
import Job from "./Job";

const StudentSchema = new Schema<StudentInterface>({
    name: {
        type: String,
        required: true
    },
    email: {
        emailId: {
            type: String,
            unique: true,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        },
    },
    phno: {
        type: Number,
        required: true
    },
    collegename: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    myapply: [{
        jobid: {
            type: Schema.Types.ObjectId,
            ref: Job
        },
        status: {
            type: Boolean
        }
    }],
    resumename: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Student = model<StudentInterface>("Student", StudentSchema)

export default Student;