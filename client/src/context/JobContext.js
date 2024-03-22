import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2'

export const JobContext = createContext()

export default function JobProvider({children}) {

  const  navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');

  const [jobs, setJobs]= useState([])
  const [selectedJob, setSelectedJob] = useState([])
  const [selectedJobApplications, setSelectedJobApplications] = useState([])
  const[myJobs, setMyJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(true);
  const[onChange, setOnChange ] = useState(false)

  //fetch jobs

  useEffect(() =>{
    fetch('/jobs')
    .then(res => res.json())
    .then(data => {
      setJobs(data)
    })
    .catch((error)=>{
      console.log(`Error fetching jobs data: ${error}`)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[onChange,searchTerm])

  //fetch a single job
  const getJob= (id)=> {
    fetch(`/jobs/${id}`)
    .then(res=> res.json())
    .then((data) => {setSelectedJob(data)})
  }





//fetch jobs posted by user
  useEffect(() => {
    if(authToken){
      fetchMyJobs()
    }
  },[onChange,authToken])

  function fetchMyJobs(){
    setLoading(true)
      fetch('/my_jobs',{
        method:"GET",
        headers:{
          Authorization: `Bearer ${authToken && authToken}`,
        }
      })
      .then(res => res.json())
      .then(data =>{
        setMyJobs(data)
      })
      .catch((error)=>{
        console.log(`Error fetching jobs data: ${error}`)
      })
      .finally(()=>{
        setLoading(false)
      })
  }





//search for a job
  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const searchJobs = () => {
    if (!searchTerm) {
      // Handle the case where searchTerm is empty
      return;
    }

    fetch(`/jobs/${searchTerm}`)
      .then((res) => {
        if (!res.ok) {
          setSearchError('No data found');
          throw new Error('Search request failed');
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setSearchError('');
      })
      .catch((error) => {
        console.error('Error searching jobs:', error);
        setJobs([]);
      });
  };


  //post a new job
  function addJob(title,category,description,company,location,requirements,salary,deadline,){
    fetch('/my_jobs',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title, category, description, company, location, requirements, salary, deadline
      })
    })
    .then(response=> response.json())
    .then(data =>{
      if(data.job){
        setJobs([...jobs,data.job]);
      }
    })
    .catch((error) =>{
      console.error('Error creating review:', error)
    })
  }


  //update job details
  function updateJob(jobId,title, category, description, location, company, requirements, salary){
    fetch(`/my_jobs/${jobId}`,{
      method: "PUT",
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken && authToken}`,
      },
      body:JSON.stringify({
        title, category, description, location, company, requirements, salary
      })
    })
    .then(res => res.json())
    .then(() =>{
      //update the jobs array
      setOnChange(!onChange); // Trigger a change to update jobs
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Job updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      
    })
    .catch((error)=>{
      console.error('Error updating job:', error)
    })
  }



  //delete a job
  function deleteJob(jobId){
    fetch(`/my_jobs/${jobId}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken && authToken}`
      }
    })
    .then(()=>{
      //update the jobs array
      setOnChange(!onChange); // Trigger a change to update listings
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Job deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => console.error('Error deleting job:', error));
  }




  //view job applications for a job
  function  viewApplications(jobId){
    fetch(`/my_jobs/${jobId}`)
    .then(res => res.json())
    .then(data =>{
      selectedJobApplications(data)
    })
  }

  const contextData ={
    viewApplications,
    deleteJob,
    updateJob,
    addJob,
    searchJobs,
    updateSearchTerm,
    getJob,
    selectedJob,
    myJobs,
    searchTerm,searchError,
    loading,
    jobs
  }


  
  return (
    <JobContext.Provider value = {contextData}>
      {children}
    </JobContext.Provider>
  )
}
