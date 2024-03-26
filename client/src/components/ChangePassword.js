import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';



export default function ChangePassword() {

  const {changePassword} = useContext(UserContext)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    if(newPassword !== confirmPassword){
      Swal.fire({
        icon:"error",
        title:"error",
        text:"Passwords don't match!",
        timer: 1500
      })
    }else{
      changePassword(newPassword,currentPassword)
      setConfirmPassword("")
      setCurrentPassword("")
      setNewPassword("")
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div>
        <h3 className="text-center">Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current Password:</label>
            <input type="password" className="form-control" name="currentPassword" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password:</label>
            <input type="password" className="form-control" name="newPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input type="password" className="form-control" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  )
}
