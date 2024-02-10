import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import AxiosService from '../common/AxiosService';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import  img  from '../assets/image1707279892386-.jpg'


export const Dashboard = () => {
  const navigate = useNavigate()
  const { userData } = useContext(UserContext)
  const { setUserData } = useContext(UserContext)
  const[ imgActive,setImgActive]=useState(false)
  const[ id,setId]=useState('')
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await AxiosService.get('/');
      setUserData(response.data.allUserData);
      console.log(userData)
    } catch (error) {
      toast.error(error.response.data.error)
      navigate('/sign-in')
    }
  };
  console.log(userData);

  const handleEdit = async (id) => {
    navigate(`/user/edit/${id}`)
    
  }
  const handleDelete = async (id, name) => {
    try {
      console.log(id);
      const updatedUserData = userData.filter((item) => item._id !== id)
      setUserData(updatedUserData)
      await AxiosService.delete(`/delete/${id}`)
      alert(`Are Yor sure delete a ${name} data`)
      setTimeout(() => {
        toast.error(`${name} data successfully deleted`)
      }, 500)

    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  console.log(userData)
  console.log(id)
  const updatedUserData=userData.filter((item)=>(item._id == id))
  console.log(updatedUserData);
  return (
    <>
    <div className='relative w-auto h-96'>
      <div className={imgActive ? 'absolute z-10 inset-1/4 w-1/2 h-full border-2 object-cover':'hidden'}>
        {updatedUserData.map((user)=>{
          
          return(<>
          <img src={`../../${user.image}`} alt={user.image} className='w-full h-full '/>
          </>)
        })}
        <button className='text-xl font-medium py-2 px-2 bg-white text-black ' onClick={()=>setImgActive(false)}>Exit</button>
      </div>
      <div className={imgActive?'container mx-auto px-8 py-6 opacity-20' :'container mx-auto px-8 py-6'}>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Password</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Operators</th>

              </tr>
            </thead>
            <tbody>
              {userData.map((user) => 
              (
                <tr key={user._id} className="bg-gray-100">
                  <td className="border p-2">{user._id}</td>
                  <td className="border p-2">{user.fullName}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.password}</td>
                  <td className="border p-2">
                    <div onClick={()=>{
                      setImgActive(true) 
                      setId(user._id)}}>
                    <img src={`../../${user.image}`} alt={`User ${user.image}`} className="w-12 h-12" />
                    </div>
                  </td>
                  <td ><div className='flex items-center gap-2'>
                    <button className='bg-green-400 py-0.5 px-1 rounded-sm' onClick={() => handleEdit(user._id)}>Edit</button>
                    <button className='bg-red-400 py-0.5 px-1 rounded-sm' onClick={() => handleDelete(user._id, user.fullName)}>Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
    </>
  );
}
