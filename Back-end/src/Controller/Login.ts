import { Request, Response } from "express";
import Student from "../Models/Student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Company from "../Models/Company";
import RequestInterface from "../Interfaces/RequestInterface";
import Tpo from "../Models/Tpo";

class Login {
    public login = async (req: Request, res: Response) => {
        try {
            const { email, password, type } = req.body;
            if (type == "student") {
                const result: any = await Student.findOne({ "email.emailId": email })
                if (result != null) {
                    const isMatch = await bcrypt.compare(password, result.password)
                    if (result.email.status == "pending") {
                        res.json({ err: "Please Verify Your Email!!" });
                    }
                    else if (isMatch && result.email.emailId === email) {
                        const a = {
                            name: result.name,
                            email: result.email,
                            id: result._id,
                            user: "student"
                        }
                        const token = jwt.sign(a, process.env.SECRET_KEY as string);
                        res.status(200).cookie("AuthToken", token).set("AuthToken", token).json({ err: type, user: result })
                    }
                    else if (isMatch == false) {
                        res.json({ err: "incorrect password!!" });
                    }
                }
                else {
                    res.json({ err: "incorrect username!!" });
                }
            }
            else if (type == "company") {
                const { email, password, type } = req.body;
                const result: any = await Company.findOne({ "email.emailId": email })
                if (result != null) {
                    const isMatch = await bcrypt.compare(password, result.password)
                    if (result.email.status == "pending") {
                        res.status(400).send("Please Verify Your Email");
                    }
                    else if (isMatch && result.email.emailId === email) {
                        const a = {
                            name: result.name,
                            email: result.email,
                            id: result._id,
                            user: "company"
                        }
                        const token = jwt.sign(a, process.env.SECRET_KEY as string);
                        res.cookie("AuthToken", token).set("AuthToken", token).json({ err: type, user: result })
                    }
                    else if (isMatch == false) {
                        res.json({ err: "incorrect password!!" });
                    }
                }
                else {
                    res.json({ err: "incorrect username!!" });
                }
            }
            else if (type == "tpo") {
                let userfounds = await Tpo.findOne({ email: req.body.email })
                if (userfounds) {
                    if (userfounds.password == req.body.password) {
                        const a = {
                            name: "tpo",
                            email: userfounds.email,
                            id: userfounds._id,
                            user: "tpo"
                        }
                        const token = jwt.sign(a, process.env.SECRET_KEY as string);
                        res.cookie("AuthToken", token).set("AuthToken", token).send({ err: req.body.type, user: userfounds });
                    }
                    else {
                        res.send({ err: "incorrect password!!", user: userfounds });
                    }
                }
                else {
                    res.send({ err: "incorrect username!!", user: userfounds })
                }
            }
        } catch (error) {
            console.log(error, "Error in login");
            res.status(500).send("Some Internal Error Occurs");
        }
    }

    public isloggedin = (req: RequestInterface, res: Response) => {
        try {
            let a = req.cookies.AuthToken;
            if (a) {
                res.json({ loggedin: true, user: req.user.user });
            }
            else {
                res.json({ loggedin: false });
            }
        } catch (error) {
            res.status(500).json({ msg: "Internal error occurs" })
        }
    }

    public logout = (req: RequestInterface, res: Response) => {
        try {
            res.clearCookie("AuthToken");
            res.status(200).send("Successfully logout")
        } catch (error) {
            res.status(400).send("Cookies not found")
        }
    }
}

export default Login;