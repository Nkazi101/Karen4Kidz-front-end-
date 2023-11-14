import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/pages/Signin';
import Home from './components/pages/Home';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PageWrapper from './components/reusables/PageWrapper';
import Availablejobs from './components/pages/Availablejobs';
import Signup from './components/pages/Signup';
import Createjobs from './components/pages/Createjobs';
import ChildrenManagerWrapper from './components/reusables/ChildrenManagerWrapper';
import JobExecution from './components/pages/JobExecution';
import UserJobs from './components/pages/UserJobs';
import { GoogleMap } from '@react-google-maps/api';

function App(){

const [user, setUser] = useState({ id: undefined, firstName: "", lastName:"", email: "", password: "", isAdmin: false, })

const [pickedJobId, setPickedJobId] = useState(null);

useEffect(() => {

  const id = localStorage.getItem("userId");

  if (id) {
    axios.get(`http://localhost:8080/findUserById/${id}`).then ((response) => {
      setUser(response.data)
      console.log("response", response.data)
    })

    .catch ((e) => {
      console.log(e);
    });

  }

}, []

)

return (

  <PageWrapper user={user} setUser={setUser} pickedJobId={pickedJobId}>
 <Routes>
  <Route path ="/" element = {<Home user={user} setUser={setUser}/>}/>
  <Route path ="/signin" element = {<SignIn user={user} setUser={setUser}/>}/>
  <Route path ="/signup" element = {<Signup user={user} setUser={setUser}/>}/>     
  <Route path ="/createjob" element = {<Createjobs user={user} setUser={setUser}/>}/>     
  <Route path ="/selectjob" element = {<Availablejobs user={user} setUser={setUser} setPickedJobId ={setPickedJobId}/>}/>     
  <Route path="/manage-children/:id" element={<ChildrenManagerWrapper user={user} setUser={setUser} />} />
  <Route path="/job/:pickedJobId" element={<JobExecution user={user} setUser={setUser}/>}/>
  <Route path="/userjobs" element={<UserJobs user={user} setUser={setUser}/>} />
  <Route path="/map/:jobId" element={<GoogleMap />} />

  </Routes>

  </PageWrapper>
);
}

export default App;
