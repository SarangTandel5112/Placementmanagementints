import mongoose from "mongoose";
import { Schema, Types, model } from "mongoose";
import JobInterface from "../Interfaces/JobInterface";

const JobSchema = new Schema<JobInterface>({
    jobTitle: {
        type: String,
        require: true
    },
    jobDescription: {
        type: String,
        require: true
    },
    numberOfOpening: {
        type: Number,
        require: true
    },
    ctcRange: {
        type: String,
        require: true
    },
    minimumCriteria: {
        type: Number,
        require: true
    },
    branch: {
        type: String,
        require: true
    },
    jobLocation: {
        type: String,
        require: true
    },
    companyWebsite: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "waiting"
    },
    deadline: {
        type: String,
        require: true
    },
    candidates: [{
        studentid: {
            type: Schema.Types.ObjectId,
            ref: "Student"
        },
        status: {
            type: Boolean
        },
    }],
    timestatus: {
        type: String,
        require: true,
        default: "active"
    },
    companyid: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    compname: {
        type: String,
        require: true
    },
    compimg: {
        type: String,
        require: true
    },
    jobDescriptionFile: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    }
})

const Job = model("Job", JobSchema)
export default Job;