import { check, validationResult } from 'express-validator';
import { Response, NextFunction } from "express";
import RequestInterface from "../Interfaces/RequestInterface";

class CompanyValidation {
        
    public validateUser = [
        check('name', "Name should have atlease 3 letters").isLength({ min: 3 }),
        check('password', "Password must have atleast 8 characters").isLength({ min: 3 }),
        // check('email.emailId', "Email id is not valid").isEmail(),
        check('phno','Phone number should be 10 digits').isLength({ min: 10, max:10 }),

        (req: RequestInterface, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array().map((error) => {
                        return {
                            value: error.value,
                            msg: error.msg
                        }
                    })
                });
            }
            else{
                next();
            }
        }
    ]
}

export default CompanyValidation;