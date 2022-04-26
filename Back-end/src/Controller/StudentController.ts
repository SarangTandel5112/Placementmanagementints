import { Request, Response } from "express";
import RequestInterface from "../Interfaces/RequestInterface";
import { Schema, Types, model } from "mongoose";
import Job from "../Models/Job"
import Student from "../Models/Student";

class StudentController {

    public getjob = async (req: RequestInterface, res: Response) => {
        try {
            let student = await Student.findById(req.user.id);
            if (student) {
                let stubranch = student.branch;
                let stucgpa = student.cgpa;
                let jobfound = await Job.find({ status: "Accepted", timestatus: "active", branch: stubranch })
                jobfound = jobfound.filter((job) => { return stucgpa > job.minimumCriteria })
                console.log(jobfound);
                res.json({ alljob: jobfound, oneuser: student.myapply })
            }
            else {
                res.status(400).json({ msg: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ msg: "Internal error occurs" })
        }
    }

    public getfulldetails = async (req: RequestInterface, res: Response) => {
        try {
            const userfound = await Job.findOne({ _id: req.body.id })
            const stdfound = await Student.findOne({ _id: req.user.id })
            if (stdfound) {
                let data = (stdfound.myapply).map(a => a.jobid)
                res.json({ "oneuser": userfound, "userdetails": data })
            }
        } catch (error) {
            res.status(500).json({ msg: "Internal error Occurs" })
        }
    }

    public applynow = async (req: RequestInterface, res: Response) => {
        try {
            let userfound = await Student.findOne({ _id: req.user.id })
            if (userfound) {
                userfound.myapply.push({ jobid: req.body.id, status: false })
                userfound.save();
            }
            let jobfound = await Job.findOne({ _id: req.body.id })
            if (jobfound) {
                jobfound.candidates.push({ studentid: req.user.id, status: false })
                jobfound.save();
            }
            res.status(200).json({ msg: "You successfully apply for Job" })
        } catch (error) {
            res.status(500).json({ msg: "Internal Error Occurs" })
        }
    }

    public getmyjob = async (req: RequestInterface, res: Response) => {
        try {
            let userfound = await Student.findOne({ _id: req.user.id })
            let senddata = [];
            if (userfound) {
                for (let i = 0; i < userfound.myapply.length; i++) {
                    let jobfound = await Job.find({ _id: userfound.myapply[i].jobid })
                    senddata.push(jobfound[0])
                }
            }
            else {
                res.status(400).json({ msg: "User not found" });
            }
            res.json({ applydata: senddata })
        } catch (error) {
            res.status(500).json({ msg: "Internal Error Occurs" })
        }
    }

    public settimestatus = async (req: RequestInterface, res: Response) => {
        try {
            const timeuser = await Job.findOne({ _id: req.body.jid })
            if (timeuser) {
                timeuser.timestatus = "timeout";
                timeuser.save();
                res.status(200).json({ msg: "Status changed" })
            }
            else {
                res.status(400).json({ msg: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Internal Error Occurs" })
        }
    }

}

export default StudentController;