import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Company from "../Models/Company";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Registerinterface from "../Interfaces/Registerinterface";
import RequestInterface from "../Interfaces/RequestInterface";
import Job from "../Models/Job";
import Student from "../Models/Student";
import path from "path";

class CompanyRegister {
    public companyregister = async (req: any, res: Response) => {
        try {
            if (req?.files === null) {
                res.status(400).json({ msg: 'No file Uploaded' })
            }
            const file = req.files.file;
            const fileName = Date.now() + file.name;
            const hashpassword = await bcrypt.hash(req.body.password, 10)
            const user = new Company({
                name: req.body.name,
                email: {
                    emailId: req.body.email
                },
                number: req.body.phno,
                ceo: req.body.ceo,
                hr: req.body.hr,
                address: req.body.address,
                password: hashpassword,
                jobsposted: [],
                imagepath: fileName
            })

            file.mv(path.join(__dirname, `/../../../Frontend/public/Photos/Files/clogo/${fileName}`))
            try {
                const a = await jwt.sign({ id: user._id, type: "Company" }, process.env.SECRET_KEY as string)
                try {
                    let mailTransporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.EMAIL_PASS
                        }
                    });
                    let mailDetails: any = {
                        from: process.env.EMAIL,
                        to: user.email.emailId,
                        subject: 'Verification of your account',
                        html: `<h1 style="text-align: center;">Verify Your Account</h1> http://localhost:5000/verify/${a}           
                    <h3 style="text-align: center;">Thank You</h3>`
                    };
                    mailTransporter.sendMail(mailDetails, function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('Email sent successfully');
                        }
                    });
                } catch (error) {
                    res.status(500).send("Some Internal Error Occur While Sending mail")
                    console.log("error while sending mail", error);
                }
            }
            catch (error) {
                console.log("error in token");
            }
            user.save();
            res.status(200).send("Registration Successfully Done....PLease Verify Your Email")

        } catch (error) {
            res.status(500).send("Some Internal Error Occur While Sending mail")
        }
    }

    public getalljob = async (req: RequestInterface, res: Response) => {
        try {
            const data = await Job.find({ companyid: req.user.id })
            if (data) {
                res.json({ status: "ok", jobs: data });
            }
            else {
                res.json({ msg: "Job not found" });
            }
        } catch (error) {
            res.status(500).send("Some Internal Error Occur While Sending mail")
        }
    }

    public getjobdetailsforcomp = async (req: RequestInterface, res: Response) => {
        try {
            const jobfound = await Job.findOne({ _id: req.body.id })
            if (jobfound) {
                res.json({ onedata: jobfound })
            }
            else {
                res.status(400).json({ msg: "User not found" })
            }
        } catch (error) {
            res.status(500).json("Some Internal Error Occur")
        }
    }

    public getappliedstudent = async (req: RequestInterface, res: Response) => {
        try {
            let senddata = [];
            const jobfound = await Job.findOne({ _id: req.body.id })
            if (jobfound) {
                for (let i = 0; i < jobfound.candidates.length; i++) {
                    const std = await Student.find({ _id: jobfound.candidates[i].studentid })
                    let object = {
                        stddetails: std[0],
                        placementstatus: jobfound.candidates[i].status
                    }
                    senddata.push(object)
                }
                res.json({ stddata: senddata })
            }
            else {
                res.status(400).json({ msg: "Job not found" })
            }
        } catch (error) {
            res.status(500).json("Some Internal Error Occur")
        }
    }

    public setplacementstatus = async (req: RequestInterface, res: Response) => {
        try {
            let jobfound = await Job.findById(req.body.jobid);
            if (jobfound) {
                console.log(jobfound);
                console.log(req.body.studentid);

                for (let i = 0; i < jobfound.candidates.length; i++) {
                    console.log(jobfound.candidates[i].studentid);

                    if (jobfound.candidates[i].studentid == req.body.studentid) {
                        jobfound.candidates[i].status = true;
                    }
                }
                jobfound.save();
                let stdfound = await Student.findById(req.body.studentid);
                if (stdfound) {
                    for (let i = 0; i < stdfound.myapply.length; i++) {
                        if (stdfound.myapply[i].jobid == req.body.jobid) {
                            stdfound.myapply[i].status = true;
                        }
                    }
                    stdfound.save()
                    res.json({ msg: true })
                }
                else {
                    res.status(200).json({ msg: "Student not found" })
                }
            }
            else {
                res.status(200).json({ msg: "job not found" })
            }
        } catch (error) {
            res.status(500).json({ msg: "Internal error occurs" })
        }
    }

}

export default CompanyRegister;