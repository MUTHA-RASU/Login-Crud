import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UserDataProvider from './context/UserContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <UserDataProvider>
      <ToastContainer autoClose={500} />
        <App />
      </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
