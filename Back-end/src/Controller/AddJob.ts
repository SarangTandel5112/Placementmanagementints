import Job from "../Models/Job";
import Company from "../Models/Company";
import { Request, Response } from "express";
import RequestInterface from "../Interfaces/RequestInterface";
import JobInterface from "../Interfaces/JobInterface";
import CompanyInterface from "../Interfaces/CompanyInterface";
import path from "path";

class AddJob {
    public addjobrequest = async (req: any, res: Response) => {
        try {
            let fileName;
            if (req.files === null) {
                fileName = null;
            }
            const comp: CompanyInterface | null = await Company.findOne({ _id: req.user.id });
            if (comp) {
                const file = req.files.file;
                fileName = Date.now() + file.name;
                const newjob = new Job({
                    jobTitle: req.body.title,
                    jobDescription: req.body.description,
                    numberOfOpening: req.body.numberOfOpening,
                    ctcRange: req.body.ctcRange,
                    minimumCriteria: req.body.minimumCriteria,
                    jobLocation: req.body.jobLocation,
                    branch: req.body.branch,
                    companyWebsite: req.body.companyWebsite,
                    deadline: req.body.deadline,
                    jobDescriptionFile: fileName,
                    companyid: req.user.id,
                    compname: comp?.name,
                    compimg: comp?.imagepath,
                })
                file.mv(path.join(__dirname, `/../../../Frontend/public/Photos/Files/jobdescription/${fileName}`))
                newjob.save();
                comp.jobsposted.push(newjob._id);
                comp.save();
                res.status(200).send("Job Added Successfully")
            }
            else {
                res.status(400).json({ msg: "User not found" })
            }
        } catch (error) {
            res.send(400).send("Error while adding the job")
        }
    }
}

export default AddJob;