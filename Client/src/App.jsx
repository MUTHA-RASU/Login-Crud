import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { SignUp } from './components/SignUP';
import { SignIn } from './components/SignIn'
import { Image } from './components/image';
import { Edit } from './components/Edit';
import ProtectedRoute from './common/ProtectedRoute';

function App() {

  return(<>

   <Routes>
    <Route path='/dashboard' exact element={ <ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path='/sign-up' exact element={<SignUp />}/>
    <Route path='/sign-in' exact element={<SignIn />}/>
    <Route path='/user/edit/:id' exact element={<ProtectedRoute><Edit/></ProtectedRoute>}/>
    <Route path='/user/image' exact element={<ProtectedRoute><Image/></ProtectedRoute>}/>
    <Route path='*' exact element= {<Navigate to='/sign-up'/>}/>
   </Routes>
  </>)
}

export default App;
