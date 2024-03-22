import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';

import BrowseJobs from './pages/BrowseJobs'
import EditJob from './pages/EditJob'
import Home from './pages/Home'
import JobApplicants from './pages/JobApplicants'
import Login from './pages/Login'
import MyApplications from './pages/MyApplications'
import MyJobs from './pages/MyJobs'
import PostJob from './pages/PostJob'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SingleJob from './pages/SingleJob'

import UserProvider from './context/UserContext'
import JobProvider from './context/JobContext'
import JobApplicationProvider from './context/JobApplicationContext'


function App() {
  return (
    <BrowserRouter>
        <UserProvider>
          <JobProvider>
            <JobApplicationProvider>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path='profile' element={<Profile />}/>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/browse_jobs" element={<BrowseJobs />} />
                  <Route path="/edit_job/:id" element={<EditJob />} />
                  <Route path="/job_applicants/:id" element={<JobApplicants />} />
                  <Route path="/my_applications" element={<MyApplications />} />
                  <Route path="/my_jobs" element={<MyJobs />} />
                  <Route path="/post_job" element={<PostJob />} />
                  <Route path="/single_job/:id" element={<SingleJob />} />
                </Route>
              </Routes>
            </JobApplicationProvider>
          </JobProvider>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;
