import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import AxiosService from '../common/AxiosService';
import { BsPersonVcardFill } from "react-icons/bs";

export const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    // image:''
  })
  const handleChange = (e) => {

    console.log(e);
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
    console.log(formData);
  }
  // const handleFileChange =(e)=>{
  //   setFormData({...formData,image:e.target.files[0]})
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    try {
      const formDatatoSend = new FormData()
      formDatatoSend.append('fullName', formData.fullName)
      formDatatoSend.append('phone', formData.phone)
      formDatatoSend.append('email', formData.email)
      formDatatoSend.append('password', formData.password)
      // formDatatoSend.append('image',formData.image)
      const userData = await AxiosService.post('/signUp', formDatatoSend)
      if (userData) {
        toast.success('SignUp successfull')
        navigate('/sign-in')
        console.log('Response:', userData);
        await sessionStorage.setItem(userData.data.token)
      }
      else {
        toast.success(userData.response.data.error)
      }
    }

    catch (error) {
      toast.error(error.response.data.error)
      if (error.response.data.error == 'User Already Exist') {
        setTimeout(() => {
          navigate('/sign-in')
        }, 1500)
      }
      console.log('Error:', error);
    }
  }

  return (

    <div className='relativ' >
      <div className="bg-cover bg-center py-32  z-10 absolute"
       style={{ backgroundImage: "url('../../signup1.avif')", 
       height: "52rem", filter: "blur(1px)", WebkitFilter: "blur(1px)" }} />

      < div className="container mx-auto w-2/5 mt-10" >
        <form action="" className="w-4/6  h-1/2 bg-[url('../../signup1.avif')] shadow-lg relative overflow-hidden py-6  rounded-md flex flex-col gap-8">
          <BsPersonVcardFill size={80} className='flex items-center jutify-center w-full'/>
          <h1 className='text-4xl text-center mb-2 font-semibold -mt-2'>SignUp</h1>
          <div className="flex items-center justify-center w-full h-12 " >
            <input type="text" name="fullName" placeholder='Your Name' required
              className=" py-2 px-2 focus:text-white  focus:outline-none rounded-md  focus:bg-black w-3/5 h-12"
              value={formData.fullName}
              onChange={handleChange} />
          </div>
          <div className="flex items-center justify-center w-full h-12 gap-4">
            <input type="text" name="email" placeholder='Your Email' required
              className="w-3/5 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-12"
              value={formData.email}
              onChange={handleChange} />
          </div>
          <div className="flex items-center justify-center w-full h-12 gap-4">
            <input type="text" name="phone" placeholder='Mobile Number' required
              className="w-3/5 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-12"
              value={formData.phone}
              onChange={handleChange} />
          </div>
          <div className="flex items-center justify-center w-full h-12 gap-4">
            <input type="password" name="password" placeholder='password' required
              className="w-3/5 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-12"
              value={formData.password}
              onChange={handleChange} />
          </div>
          {/* <div className="flex items-center w-full  gap-4">
          <label htmlFor="image" className="text-lg font-medium w-1/3">Choose an image</label>
          <input type="file" name="image"  
          className="flex-1 py-2 px-2 focus:text-white  focus:outline-none rounded-md  focus:bg-black h-16"
          onChange={handleFileChange} />
        </div> */}
          <div className="flex items-center w-full h-12 gap-8 justify-center ">
            <button className=' bg-white text-red-500 rounded py-1 px-2 hover:bg-black hover:text-red-500 hover:border-none'
              onClick={handleSubmit}>Submit</button>
            <button className=' bg-white text-red-500 rounded py-1 px-3 hover:bg-black hover:text-red-500 hover:border-none'>Reset</button>
          </div>
          <div className='flex justify-center text-black underline'>
            <Link to={`/sign-in`}>signIn</Link>
          </div>
        </form>
      </div >
    </div>



  );
};
