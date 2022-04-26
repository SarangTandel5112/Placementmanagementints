import axios from "axios";
import React, { useEffect, useState } from "react";
import Companynavbottom from "./Companynavbottom";
import Header from "./Header";

function Companydetails() {
  // eslint-disable-next-line 
  const [jobs, setjobs] = useState([]);
  
 
  const fetchJob = async () => {
    // eslint-disable-next-line 
    const response = await axios.post("/GetAllJobsOfCompany",{
      company_id:localStorage.getItem("company_id")
    });
   
    // setjobs(response.data.jobs);
    
  };


  useEffect(() => {
    fetchJob();
  }, []);


  return (
    <div>
       <Header  path="/companyDashboard"/>
       <Companynavbottom/>
      <h3 className="main-heading">All Jobs</h3>
      {jobs.length === 0 && <p className="main-heading">No job Posted</p>}
      {jobs.map((job) => (
        <div className="dbox" key={job._id}>
          <div className="sbox">
            <b>JobTitle:</b>
            {job.jobTitle}
          </div>
          <div className="sbox">
            <b>JobDescription:</b> {job.jobDescription}
          </div>
          <div className="sbox">
            <b>Number Of Opening :</b> {job.numberOfOpening}
          </div>
          <div className="sbox">
            <b>Ctc Range :</b> {job.ctcRange}
          </div>
          <div className="sbox">
            <b>Job Location :</b>
            {job.jobLocation}
          </div>
          <div className="sbox">
            <b>Status :</b>
            {job.status}
          </div>
          {
            job.candidates.length > 0 && 
            <div>
              <h6>List of Candidates who applied</h6>
              {job.candidates.map(student => <p>{student}</p>)}
            </div>
          }
       
        </div>
      ))}
    </div>
  );
}
export default Companydetails;
