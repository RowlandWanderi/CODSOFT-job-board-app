import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function ViewProfile() {
  const {currentUser, deleteAccount} = useContext(UserContext)
  const[loading, setloading] = useState(false)

  function handleDelete(){
    deleteAccount()
  
  }

  // Function to add a zero in front of the phone number
  function formatPhoneNumber(phone) {
    // Convert phone to a string
    const phoneString = String(phone);
    // Check if the first character is not '0', prepend '0' to the phone number
    return phoneString.charAt(0) !== '0' ? '0' + phoneString : phoneString;
  }


  return (
    <div className="d-flex justify-content-center mt-5" style={{ minHeight: '65vh' }}>
      <div className="text-center">
        <h3>My Profile</h3>

        {loading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        ) : currentUser ? (
          <>
            <div className="mb-3">
              <button type="button" className={`btn ${currentUser.role === 'Employer' ? 'btn-primary' : 'btn-secondary'}`}>
                {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
              </button>
            </div>

            <div className="row d-flex justify-content-center align-items-center">

              {/*image*/}
              <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <img
                  src={currentUser && currentUser.profile_image_url || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'}
                  alt="Avatar"
                  className="img-fluid my-4"
                  style={{ width: '90px' }}
                />
              </div>

              {/*details*/}
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label text-start">Full Name:</label>
                  <input 
                    type="text"
                    className="form-control mb-3"
                    id="firstName"
                    value={currentUser.first_name}
                    disabled
                  />
                  <input 
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={currentUser.last_name}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-start">Email:</label>
                  <input type="email" className="form-control" id="email" value={currentUser.email} disabled />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label text-start">Phone:</label>
                  <input type="number" className="form-control" id="phone" value={formatPhoneNumber(currentUser.phone)} disabled />
                </div>
              </div>
            </div>
            

            <div className="mb-3 text-center">
              <label htmlFor="phone" className="form-label ">
              <div class="alert alert-danger" role="alert">
                CAUTION deleting the account is irreversible !
               </div>
              </label>
              <input type="submit" onClick={() => handleDelete()} className="form-control bg-danger text-center text-bark fs-6 fw-semibold" id="phone" value="Delete Account"  />
            </div>
          </>
        ) : (
          <div class="alert alert-warning" role="alert">
            Could Not get your profile
          </div>
        )}
      </div>
    </div>
  )
}
