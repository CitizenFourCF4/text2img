import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login'
import RegisterPage from './pages/register/register'

const Links = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
    </Routes>
  )
}

export default Links