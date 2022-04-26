import express, { Request, Response } from "express";
import StudentValidation from "../Validations/StudentRegister";
import StudentRegister from "../Controller/StudentRegister";
import Login from "../Controller/Login"
import CompanyRegister from "../Controller/CompanyRegister";
import CompanyValidation from "../Validations/CompanyRegister";
import VerifyEmail from "../Controller/VerifyEmail"
import AddJob from "../Controller/AddJob";
import isAuth from "../Middlewares/isAuth";
import TpoRequest from "../Controller/TpoRequest";
import StudentController from "../Controller/StudentController";
import OtpVerification from "../Controller/OtpVerification";

const studentValidation = new StudentValidation()
const companyValidation = new CompanyValidation()
const StdRegisterController = new StudentRegister();
const stdlogin = new Login();
const CmpRegister = new CompanyRegister();
const emailverify = new VerifyEmail();
const addjob = new AddJob();
const isauth = new isAuth();
const tporeq = new TpoRequest();
const StdController = new StudentController();
const otpverification = new OtpVerification();

class Routes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.register();
        this.login();
        this.job();
        this.logout();
        this.tpo();
        this.student();
        this.otp();
        this.company();
    }

    private register() {
        this.router.route("/registerstudent").post(studentValidation.validateUser, StdRegisterController.Register);
        this.router.route("/registerCompany").post(companyValidation.validateUser, CmpRegister.companyregister);
        this.router.route("/verify/:id").get(emailverify.verifyemail)
        this.router.route("/checkemail").post(emailverify.checkemail)
    }

    private login() {
        this.router.route("/login").post(stdlogin.login)
        this.router.route("/isloggedin").post(isauth.isLoggedin, stdlogin.isloggedin);
    }

    private job() {
        this.router.route("/requestToAddJob",).post(isauth.isLoggedin, isauth.isCompany, addjob.addjobrequest)
    }

    private tpo() {
        this.router.route("/studentrequesttpo").post(tporeq.studentrequest);
        this.router.route("/jobrequesttpo").post(tporeq.jobrequest);
        this.router.route("/setstudentstatus").post(tporeq.stdaccept);
        this.router.route("/setjobstatus").post(tporeq.jobaccept);
        this.router.route("/tpodata").post(tporeq.getTpoData);
        this.router.route("/getstudentstpo").post(tporeq.getstudentstpo);
        this.router.route("/getcompaniestpo").post(tporeq.getcompaniestpo);
        this.router.route("/getjobofferedtpo").post(tporeq.getjobofferedtpo);
    }

    private student() {
        this.router.route("/getAvailableJobForStudent").post(isauth.isLoggedin, isauth.isStudent, StdController.getjob)
        this.router.route("/getfulldetails").post(isauth.isLoggedin, isauth.isStudent, StdController.getfulldetails)
        this.router.route("/applyforcompany").post(isauth.isLoggedin, isauth.isStudent, StdController.applynow)
        this.router.route("/studentmyapplies").post(isauth.isLoggedin, isauth.isStudent, StdController.getmyjob)
        this.router.route("/settimestatus").post(isauth.isLoggedin, isauth.isStudent, StdController.settimestatus)
    }

    private company() {
        this.router.route("/GetAllJobsOfCompany").post(isauth.isLoggedin, isauth.isCompany, CmpRegister.getalljob);
        this.router.route("/getjobdetailsforcomp").post(isauth.isLoggedin, isauth.isCompany, CmpRegister.getjobdetailsforcomp);
        this.router.route("/getappliedstudentdetails").post(isauth.isLoggedin, isauth.isCompany, CmpRegister.getappliedstudent);
        this.router.route("/setplacementstatus").post(isauth.isLoggedin, isauth.isCompany, CmpRegister.setplacementstatus);
    }

    private otp() {
        this.router.route("/otpverify").post(otpverification.otpverify);
        this.router.route("/checkotp").post(otpverification.checkopt);
    }

    private logout() {
        this.router.route("/logout").post(stdlogin.logout);
    }

}

export default Routes;