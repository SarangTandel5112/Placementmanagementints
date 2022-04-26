import mongoose, { Types } from 'mongoose';

interface CompanyInterface extends mongoose.Document {
    name: String,
    email: {
        emailId: String,
        status: String,
    },
    number: Number,
    ceo: String,
    hr: String,
    jobsposted: [Types.ObjectId],
    address: String,
    password: String,
    imagepath: String,
    createdAt: Date
}

export default CompanyInterface;