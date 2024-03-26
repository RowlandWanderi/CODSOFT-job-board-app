import React,{useContext,useState} from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function Register() {

  const {registerUser} = useContext(UserContext)

  const[first_name, setFirstName] = useState('')
  const[last_name, setLastName] = useState('')
  const[phone, setPhone] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[role, setRole] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault();
    if(password !== confirmPassword){
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Please enter matching passwords",
      })
    }else if(!validateEmail(email)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a valid email address',
      });
    }else{
      registerUser(first_name,last_name,email,phone,password,role)  
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setPassword('')
      setConfirmPassword('')
    }
  }

  function validatePhoneNumber(phone) {
    // Define a regular expression pattern for a simple phone number validation
    const phoneRegex = /^\d{10}$/;
 
    // Test the phone number against the regular expression
    return phoneRegex.test(phone);
 }

 function validateEmail(email) {
  // Use a regular expression to check if the email contains '@'
  return /\S+@\S+\.\S+/.test(email);
}


  return (
    <div className='container'>
      <div className='row d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
        <div className='col-md-6'>
          <form className='bg-secondary bg-opacity-25 p-4' style={{ borderRadius: '10px' }} onSubmit={handleSubmit}>
            <div>
              <h2 className='text-center'>Register</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">First name</label>
              <input required type="text" className="form-control"  onChange={(e)=> setFirstName(e.target.value)} value={first_name} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Last name</label>
              <input required type="text" className="form-control"  onChange={(e)=> setLastName(e.target.value)} value={last_name} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input required type="email" className="form-control"onChange={(e)=> setEmail(e.target.value)} value={email}  />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <input required type="text" className="form-control" onChange={(e)=> setPhone(e.target.value)} value={phone} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input required type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input required type="password" className="form-control" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}  />
            </div>
            <div className="mb-3">
              <label>Role:</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="userType"
                  value="Employer"
                  onChange={(e) => setRole(e.target.value)}
                />
                <label className="form-check-label">Employer</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="userType"
                  value="Candidate"
                  onChange={(e) => setRole(e.target.value)}
                />
                <label className="form-check-label">Candidate</label>
              </div>
            </div>
            <div className='mb-3'>
              <p>Already have an account? <Link to='/login'>Login here</Link></p>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}
