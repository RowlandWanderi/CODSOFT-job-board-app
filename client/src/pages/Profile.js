import React,{useState} from 'react'
import UpdateProfile from '../components/UpdateProfile'
import ChangePassword from '../components/ChangePassword';
import ViewProfile from '../components/ViewProfile';
import { Link } from 'react-router-dom';

export default function Profile() {


  const [activeTab, setActiveTab] = useState('viewProfile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h2>Profile</h2>
      <div className='d-flex justify-content-center gap-2'>
        <button className='btn' onClick={() => handleTabChange('viewProfile')}>
          View Profile
        </button>
        <button className='btn' onClick={() => handleTabChange('changePassword')}>
          Change Password
        </button>
        <button className='btn' onClick={() => handleTabChange('updateDetails')}>
          Update Details
        </button>
        <Link to={'/my_applications'}>
            <button className='btn'>
                My Job Applications
            </button>
        </Link>
      </div>
      <div>
        {activeTab === 'viewProfile' && <ViewProfile />}
        {activeTab === 'changePassword' && <ChangePassword />}
        {activeTab === 'updateDetails' && <UpdateProfile />}
      </div>
    </div>
  )
}
