import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login'
import RegisterPage from './pages/register/register'
import AuthProvider from './context/AuthProvider'
import NotFound from './pages/NotFound/NotFound'


const Links = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path='/*' element={<NotFound />}/>
      </Routes>
    </AuthProvider>
  )
}

export default Links