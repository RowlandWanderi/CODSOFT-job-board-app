import React,{useState, useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom';


export default function Login() {

  const {login} = useContext(UserContext)

  const[email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    login(email, password)
  }



  return (
    <div className='container'>
      <div className='row d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
        <div className='col-md-6'>
          <form className='bg-secondary bg-opacity-25 p-4' style={{borderRadius: '15px'}} onSubmit={handleSubmit}>
            <div>
              <h2 className='text-center'>Login</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" name='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
            </div>
            <div className='mb-3 '>
              <p>Don't have an account? <Link to='/register'>Register here</Link></p>
            </div>
            <div className='mb-3 text-cen'>
              <p><Link to='/reset_password'>Forgot Password?</Link></p>
            </div>
            <div className=''>
            <button type="submit" className="btn btn-primary px-5">Login</button>

            </div>
            
            
          </form>
        </div>
      </div>
    </div>
  )
}
