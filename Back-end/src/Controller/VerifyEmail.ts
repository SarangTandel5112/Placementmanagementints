import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import RequestInterface from "../Interfaces/RequestInterface";
import Company from "../Models/Company";
import Student from "../Models/Student";

class VerifyEmail {
    public verifyemail = async (req: Request, res: Response) => {
        try {
            interface Jwtverify {
                id: String;
                type: String;
            }
            const uid: string = req.params.id;
            const token: Jwtverify = (await jwt.verify(uid, process.env.SECRET_KEY as string)) as Jwtverify;
            const { id, type } = token;
            if (type == "Company") {
                const comp: any = await Company.findOne({ _id: id });
                if (comp.email.status == "verified") {
                    res.status(200).send("You Are verified please Login");
                }
                else {
                    comp.email.status = "verified";
                    comp.save();
                    res.status(200).send("Email Verified Successfully....")
                }
            }
            else if (type == "Student") {
                const std: any = await Student.findOne({ _id: id });
                if (std.email.status == "verified") {
                    res.status(200).send("You Are verified please Login");
                }
                else {
                    std.email.status = "verified";
                    std.save();
                    res.status(200).send("Email Verified Successfully....")
                }
            }
        } catch (error) {
            res.send(500).send("Some Internal Error Occurs");
            console.log(error, "error in email verification");
        }
    }

    public checkemail = async (req: RequestInterface, res: Response) => {
        try {
            const result = req.body.email;
            const isCompany = await Company.findOne({ "email.emailId": result })
            const isStudent = await Student.findOne({ "email.emailId": result })

            if (isCompany || isStudent) {
                console.log("mailID already exist!");
                res.send({ data: false });
            }
            else {
                console.log("continue");
                res.status(200).json({ data: true });
            }
        } catch (error) {
            res.status(500).json({ msg: "Some internal error occurs" })
        }
    }
}

export default VerifyEmail;