import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AxiosService from '../common/AxiosService';
import { UserContext } from '../context/UserContext';


export const SignIn = () => {
  const navigate = useNavigate()
  const {userData} = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {

    console.log(e);
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
    console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    try {
      const formDatatoSend = new FormData()
      formDatatoSend.append('email', formData.email)
      formDatatoSend.append('password', formData.password)
      const userData = await AxiosService.post('/signIn', formDatatoSend)
      console.log('Response:', userData);
      sessionStorage.setItem('token',userData.data.token)
      toast.success(userData.data.message);
      // toast.success('Token validation successful');
      setTimeout(() => {navigate('/dashboard'); }, 500);
    } catch (error) {
      toast.error(error.response.data.error)
      console.log('Error:', error);
    }
  }

  return (
    <div className="container mx-auto w-2/5">
      <form action="" className="w-full mt-6 h-1/2 bg-red-200 shadow-lg relative overflow-hidden py-6 px-8 rounded-md flex flex-col gap-6">
        <h1 className='text-4xl text-center mb-2'>SignIn</h1>

        <div className="flex items-center w-full h-12 gap-4">
          <label htmlFor="email" className="text-xl font-medium w-1/3">Email</label>
          <input type="text" name="email" placeholder='sdeisee@gmail.com'
            className="flex-1 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-8"
            onChange={handleChange}
            value={formData.email} />
        </div>
        {/* <div className="flex items-center w-full h-12 gap-4">
          <label htmlFor="phone" className="text-xl font-medium w-1/3 w-full">Phone</label>
          <input type="text" name="phone" placeholder='9087654321' 
          className="flex-1 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-8" 
          onChange={handleChange}/>
        </div> */}
        <div className="flex items-center w-full h-12 gap-4">
          <label htmlFor="password" className="text-xl font-medium w-1/3">Password</label>
          <input type="password" name="password" placeholder='ewe32!2$'
            className="flex-1 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-8"
            value={formData.password}
            onChange={handleChange} />
        </div>
        <div className="flex items-center w-full h-12 gap-8 justify-center">
          <button className=' bg-white text-red-500 rounded py-1 px-2 hover:bg-black hover:text-red-500 hover:border-none'
            onClick={handleSubmit}>Submit</button>
          <button className=' bg-white text-red-500 rounded py-1 px-3 hover:bg-black hover:text-red-500 hover:border-none'>Reset</button>
        </div>
        <div className='flex gap-8 justify-center text-black underline'>
          <Link>forget password</Link>
          <Link to={`/sign-up`} >signUp</Link>
        </div>
      </form>
    </div>
  );
};