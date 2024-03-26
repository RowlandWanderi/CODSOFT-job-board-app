import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2'

export const UserContext = createContext()

export default function UserProvider({children}){

    const navigate = useNavigate()

    const [onChange, setOnchange] = useState(false)
    const [authToken, setAuthToken] = useState(()=> sessionStorage.getItem("authToken")? sessionStorage.getItem("authToken"): null )
    const [currentUser, setCurrentUser] = useState(null)

    const [loggedIn, setLoggedIn] = useState(false)
    const [userType, setUserType] = useState('')

    //register user
    function registerUser(first_name,last_name,email,phone,password,role){
        fetch('/register',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name:first_name,
                email:email,
                last_name:last_name,
                phone:phone,
                password:password,
                role:role,
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: data.success,
                    showConfirmButton: false,
                    timer: 1500
                })

                navigate('login')
            }
            else{
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `Registration failed! ${data.error} !`,
                    showConfirmButton: true
                })
            }
        })
        .catch(error => {
            console.error("Error during registration:", error);
            
            Swal.fire({
                position: "top",
                icon: "error",
                title: "An error occurred during registration",
                showConfirmButton: true
            });
        });
    }

    //login user
    function login(email,password){
        fetch('/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email, password
            })
        })
        .then(res => res.json())
        .then(data =>{
            if(data.access_token){
                sessionStorage.setItem("authToken", data.access_token)
                setAuthToken(data.access_token)
                setLoggedIn(true)

                navigate('/')
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login success",
                    showConfirmButton: false,
                    timer: 1500
                })
                setOnchange(!onchange)
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: data.error,
                    showConfirmButton: false,
                    timer: 1500
                    });
            }
        })
    }
    //reset password
    function resetPassword(first_name,last_name,email,password){
        fetch('/reset_password',{
            method:"POST",
            headers:{
                "Content-type":"Application/json"
            },
            body: JSON.stringify({
                first_name:first_name,
                last_name:last_name,
                email:email,
                password:password,
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.success,
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/login')
            }
            else{
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed",
                    text: data.error || "Unknown error",
                })
            }
        })
        .catch(error =>{
            console.error("Error: ", error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Failed",
                text: "An unexpected error occurred."
            })
        })
    }
    //logout user
    function logout(){
        fetch('/logout',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken && authToken}`
            }
        })
        .then(res=> res.json())
        .then(data =>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.success,
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/')
            setLoggedIn(false)
        })
    }

    //get logged in user
    useEffect(()=>{
        if(authToken){
            fetch('/authenticated_user',{
                method:"GET",
                headers:{
                    Accept: "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(res => res.json())
            .then(data =>{
                if(data.error){
                    setCurrentUser(null)
                    setLoggedIn(false)
                }else{
                    setCurrentUser(data)
                    setUserType(data.role)
                }
            })
            .catch(error => {
                console.error("Error fetching authenticated user:", error)
            })
        }
    },[authToken, onChange])
    console.log(currentUser)

    //update current user details
    function  updateProfile(newFirstName,newLastName,newEmail,newPhone,newProfileImageUrl){
        fetch('/user',{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                first_name : newFirstName,
                last_name: newLastName,
                phone: newPhone,
                email:newEmail, 
                profile_image_url: newProfileImageUrl,
            })
        })
        .then(res => res.json())
        .then(data =>{
            if(data.error){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: data.error,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                setOnchange(!onchange)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.success,
                    showConfirmButton: false,
                    timer: 150
                }) 
            }
        })
    }

    //change password
    function changePassword(newPassword,currentPassword){
        fetch('/change_password', {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            },
            body:JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        })
        .then( res=> res.json())
        .then(data =>{
            if(data.error){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: data.error,
                    showConfirmButton: false,
                    timer: 150
                })
            }
            else{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.success,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    }

    //delete account
    function deleteAccount(){
        fetch('/user',{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            },
        })
        .then(res => res.json())
        .then(data =>{
            if(data.error){
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: data.error,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else{
                navigate('/')
                setLoggedIn(false)
                setCurrentUser(null)
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: data.success,
                    showConfirmButton: false,
                    timer: 150
                })
            }
        })
    }

    const contextData ={
        currentUser,
        registerUser,
        deleteAccount,
        login,
        logout,
        resetPassword,
        changePassword,
        updateProfile,
        loggedIn,setLoggedIn,
        userType,
    }

return(
    <UserContext.Provider value={contextData}>
    {children}
  </UserContext.Provider>
)
}