import mongoose, { Types } from 'mongoose';

interface StudentInterface extends mongoose.Document{
    name: String,
    email: {
        emailId: String,
        status: String,
    },
    phno: Number,
    collegename: String,
    branch: String,
    cgpa: Number,
    password: String,
    status: String,
    myapply: [{
        jobid: Types.ObjectId,
        status: Boolean
    }],
    resumename: String,
    createdAt: Date
}

export default StudentInterface;