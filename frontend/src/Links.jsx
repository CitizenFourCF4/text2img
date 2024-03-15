import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login'
import RegisterPage from './pages/register/register'
import ChatPage from './pages/chat/chat'
import AuthProvider from './context/AuthProvider'


const Links = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/chat/:id" element={<ChatPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </AuthProvider>
  )
}

export default Links