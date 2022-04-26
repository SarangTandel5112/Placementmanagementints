import mongoose, { Types } from 'mongoose';

interface JobInterface extends mongoose.Document {
    jobTitle: String,
    jobDescription: String,
    numberOfOpening: Number,
    ctcRange: String,
    minimumCriteria: Number,
    branch: String,
    jobLocation: String,
    companyWebsite: String,
    status: String,
    deadline: String,
    candidates: [{
        studentid: Types.ObjectId,
        status: Boolean,
    }],
    timestatus: String,
    companyid: String,
    compname: String,
    compimg: String,
    jobDescriptionFile: String,
    createdAt: Date
}

export default JobInterface;