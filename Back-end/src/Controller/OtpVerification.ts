import { Request, Response } from "express";
import RequestInterface from "../Interfaces/RequestInterface";
import { Schema, Types, model } from "mongoose";
import Otp from "../Models/Otp";
import otpGenerator from "otp-generator";
import twilio from "twilio";

const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_AUTH;

class OtpVerification {

    public otpverify = async (req: RequestInterface, res: Response) => {
        try {
            const otp: string = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            console.log(otp);
            const client = require('twilio')(process.env.TWILLIO_SID, process.env.TWILLIO_AUTH);
            const message = await client.messages
                .create({
                    from: '+14154814311',
                    body: `Please Verify Your Otp ${otp}`,
                    to: "+91" + req.body.number
                })
            const no: any = await Otp.findOne({ number: req.body.number })
            if (!no) {
                const newotp = new Otp({
                    number: req.body.number,
                    otp: otp
                })
                newotp.save();
            }
            else {
                no.otp = otp;
                no.save();
            }
            res.status(200).json({ msg: "Otp Send Successfully" });
        } catch (error) {
            res.status(400).json({ msg: "Error While Sending Otp" });
        }
    }

    public checkopt = async (req: RequestInterface, res: Response) => {
        try {
            const { phno, otp } = req.body;
            const no = await Otp.findOne({ number: phno })
            if (otp == no?.otp) {
                res.status(200).json({ status: true })
            }
            else {
                res.status(400).json({ msg: "incorrect otp" })
            }
        } catch (error) {
            res.status(200).json({ msg: "Error While Verifing Otp" })
        }
    }

}

export default OtpVerification;