import { Request, Response } from "express";
import Student from "../Models/Student";
import RequestInterface from "../Interfaces/RequestInterface";
import Job from "../Models/Job";
import { Schema, Types, model } from "mongoose";
import Company from "../Models/Company";

class TpoRequest {
    public studentrequest = async (req: RequestInterface, res: Response) => {
        try {
            const std = await Student.find({ status: "Pending" });
            if (std.length == 0) {
                res.status(200).send("No Request Found");
            }
            else {
                res.status(200).send({ user: std });
            }
        } catch (error) {
            res.status(400).send("Some Internal Error Occurs");
        }
    }

    public jobrequest = async (req: RequestInterface, res: Response) => {
        try {
            const job = await Job.find({ status: "waiting" });
            if (job.length == 0) {
                res.status(200).send("No Request Found");
            }
            else {
                res.status(200).send({ alljob: job });
            }
        }
        catch (error) {
            res.status(400).send("Some Internal Error Occurs");
        }
    }

    public stdaccept = async (req: RequestInterface, res: Response) => {
        try {
            let id: Schema.Types.ObjectId = req.body.val;
            let status: string = req.body.vid;

            const a = await Student.findOneAndUpdate({ _id: id }, { status: status });
            if (a) {
                const data = await Student.find({ status: "Pending" })
                res.json({ user: data });
            }
            else {
                res.status(400).send("User Not Found");
            }
        } catch (error) {
            console.log(error, "err");
            res.status(400).send("Student not found")
        }
    }

    public jobaccept = async (req: RequestInterface, res: Response) => {
        try {
            let id: Schema.Types.ObjectId = req.body.val;
            let status: string = req.body.vid;
            const a = await Job.findOneAndUpdate({ _id: id }, { status: status });
            if (a) {
                const data = await Job.find({ status: "Pending" })
                res.json({ alljob: data });
            }
            else {
                console.log("Job not found");
                res.status(400).send("Job Not Found");
            }
        } catch (error) {
            console.log(error, "err");
            res.status(400).send("Job not found")
        }
    }

    public getTpoData = async (req: RequestInterface, res: Response) => {
        try {
            let std = await Student.find({ status: "Accepted" });
            let slen: number = std.length;
            let cmp = await Company.find();
            let clen: number = cmp.length;
            if (std) {
                let students = std.map((std) => {
                    return {
                        name: std.name,
                        myapply: std.myapply,
                    };
                });
                let result = [];
                for (let i = 0; i < students.length; i++) {
                    let studentapply = students[i].myapply;
                    let studentname = students[i].name;
                    for (let j = 0; j < studentapply.length; j++) {
                        let object = {
                            name: studentname,
                            jobdetails: {
                                jobid: studentapply[j].jobid,
                                status: studentapply[j].status,
                            },
                        };
                        result.push(object);
                    }
                }
                result = result.filter((obj) => {
                    return obj.jobdetails.status === true;
                });
                let finalResult = [];
                for (let i = 0; i < result.length; i++) {
                    let jobid = result[i].jobdetails.jobid;
                    let job = await Job.findById(jobid);
                    if (job) {
                        let obj = {
                            studentName: result[i].name,
                            jobtitle: job.jobTitle,
                            ctc: job.ctcRange,
                            companyname: job.compname,
                        };
                        finalResult.push(obj);
                    }
                }
                res.json({ slen: slen, clen: clen, placedlen: finalResult.length });
            }
            else {
                res.status(400).json({ msg: "user not found" })
            }
        } catch (error) {
            res.status(500).json({ msg: "internal error occurs" })
        }
    }

    public getstudentstpo = async (req: RequestInterface, res: Response) => {
        try {
            let students = await Student.find({ status: "Accpted" });
            if (students) {
                let student = students.map((std) => {
                    return {
                        name: std.name,
                        email: std.email,
                        branch: std.branch,
                        cgpa: std.cgpa,
                        resumename: std.resumename,
                    };
                });
                res.send(students);
            }
            else {
                res.status(400).json({ msg: "user not found" });
            }
        } catch (error) {
            res.status(500).json({ msg: "internal error occurs" })
        }
    }

    public getcompaniestpo = async (req: RequestInterface, res: Response) => {
        try {
            let companies = await Company.find();
            if (companies) {
                let company = companies.map((std) => {
                    return {
                        name: std.name,
                        email: std.email,
                        number: std.number,
                        address: std.address,
                        ceo: std.ceo,
                        hr: std.hr,
                    };
                });
                res.send(company);
            }
        } catch (error) {
            res.status(500).json({ msg: "internal error occurs" })
        }
    }

    public getjobofferedtpo = async (req: RequestInterface, res: Response) => {
        try {
            let student = await Student.find({ status: "Accepted" });
            let students = student.map((std) => {
                return {
                    name: std.name,
                    myapply: std.myapply,
                };
            });
            let result = [];
            for (let i = 0; i < students.length; i++) {
                let studentapply = students[i].myapply;
                let studentname = students[i].name;
                for (let j = 0; j < studentapply.length; j++) {
                    let object = {
                        name: studentname,
                        jobdetails: {
                            jobid: studentapply[j].jobid,
                            status: studentapply[j].status,
                        },
                    };
                    result.push(object);
                }
            }
            result = result.filter((obj) => {
                return obj.jobdetails.status === true;
            });
            let finalResult = [];
            for (let i = 0; i < result.length; i++) {
                let jobid = result[i].jobdetails.jobid;
                let job = await Job.findById(jobid);
                if (job) {
                    let obj = {
                        studentName: result[i].name,
                        jobtitle: job.jobTitle,
                        ctc: job.ctcRange,
                        companyname: job.compname,
                    };
                    finalResult.push(obj);
                }
            }
            res.send(finalResult);
        } catch (error) {
            res.status(500).json({ msg: "internal error occurs" })
        }
    }




}

export default TpoRequest;