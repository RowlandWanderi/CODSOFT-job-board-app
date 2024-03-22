import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2'

export const JobApplicationContext = createContext()

export default function JobApplicationProvider({children}) {

  const[applications, setApplications] = useState([])
  const authToken = sessionStorage.getItem('authToken');
  const  navigate = useNavigate();
  const [onChange, setOnChange] = useState(false)


  //fetch job applications
  useEffect(()=>{
    fetch('/my_applications',{
      method:"GET",
      headers:{
        Authorization: `Bearer ${authToken && authToken}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      setApplications(data)
    })
    .catch((error) => console.error('Error fetching applications:', error));
  },[onChange])


  //make a job application

  function addApplication(resume,jobId){
    fetch('/my_applications',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken && authToken}`,
      },
      body: JSON.stringify({
        resume,jobId
      })
    })
    .then(res => res.json())
    .then(data =>{
      if(data.success){
        //update the applications array
        setOnChange(!onChange)
        Swal.fire({
          position: "top-end",
            icon: "success",
            title: data.success,
            showConfirmButton: false,
            timer: 1500
        })
        navigate('/my_applications')
      }
      else if(data.error){
        Swal.fire({
          icon: "error",
          title: 'error',
          text: data.error,
          timer: 1500,
        })
      }
    })
  }


  //delete an application
  function deleteJob(jobId){
    fetch(`/my_applications/${jobId}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        Authorization : `Bearer ${authToken && authToken}`,
      }
    })
    .then(res => res.json())
    .then((data)=>{
      if (data.success){
        setOnChange(!onChange)
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: "Application deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        })
      }
      else{
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Failed',
          text: data.error || 'Unknown error',
        })
      }
    })
    .catch((error)=>{
      console.error('Error deleting reservation:', error)
    })
  }

  const contextData = {
    deleteJob,
    addApplication,
    applications,
  }

  return (
    <JobApplicationContext.Provider value={contextData}>
      {children}
      </JobApplicationContext.Provider>
  )
}
