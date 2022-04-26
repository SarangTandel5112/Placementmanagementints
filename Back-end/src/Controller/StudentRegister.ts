import { Request, Response } from "express";
import Student from "../Models/Student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";

class StudentRegister {
    public Register = async (req: any, res: Response) => {
        try {
            if (req.files === null) {
                res.status(400).json({ msg: 'No file Uploaded' })
            }
            const hashpassword = await bcrypt.hash(req.body.password, 10)
            const file = req.files.file;
            const fileName = Date.now() + file.name;
            const user = new Student({
                name: req.body.name,
                email: {
                    emailId: req.body.email
                },
                phno: req.body.phno,
                collegename: req.body.collegename,
                branch: req.body.branch,
                cgpa: req.body.cgpa,
                password: hashpassword,
                jobsposted: [],
                resumename: fileName,
                status: "Pending"
            });
            file.mv(path.join(__dirname, `/../../../Frontend/public/Photos/Files/sresume/${fileName}`))
            user.save();
            try {
                const a = await jwt.sign({ id: user._id, type: "Student" }, process.env.SECRET_KEY as string)
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
                    console.log("error while sending mail", error);
                }
            }
            catch (error) {
                console.log("error in token");
            }
            res.status(200).send("Registration Done")
        } catch (error) {
            console.log("error");
        }
    }
}

export default StudentRegister;