import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import JobBox from "../reusables/JobBox";



function Createjobs(){

    //define state for properties

    //useeffect to get the properties for the database/backend
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:8080/createjob")
          .then((response) => {
            setJobs(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }, []);
    
    
       const renderJobs = () => {
        return jobs.map((job) => {
            return (
                <div key = {job.id}>
                   <JobBox job = {job}/>
                </div>
            )
        })
       }
        return (
            <div>

                <h1> Create Jobs</h1>
                {renderJobs ()}
            </div>
        )

    
}

export default Createjobs;