import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import RequestInterface from "../Interfaces/RequestInterface";

class isAuth {
    public isLoggedin = async (req: RequestInterface, res: Response, next: NextFunction) => {
        try {
            if (!req.cookies.AuthToken) {
                res.status(400).send("Please Login !")
            }
            else {
                const token: JwtPayload = await (jwt.verify(req.cookies.AuthToken, process.env.SECRET_KEY as string) as JwtPayload)
                req.user = token;
                next();
            }
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

    public isStudent = async (req: RequestInterface, res: Response, next: NextFunction) => {
        try {
            if (req.user.user == "student") {
                next();
            }
            else {
                res.status(400).send("Not Valid User");
            }
        } catch (error) {
            res.status(500).send("Internal Error Occurs")
        }
    }

    public isCompany = async (req: RequestInterface, res: Response, next: NextFunction) => {
        try {
            if (req.user.user == "company") {
                next();
            }
            else {
                res.status(400).send("Not Valid User");
            }
        } catch (error) {
            res.status(500).send("Internal Error Occurs")
        }
    }

}

export default isAuth;