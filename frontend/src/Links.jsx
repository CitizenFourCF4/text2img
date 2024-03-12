import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home/home'

const Links = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />}/>
    </Routes>
  )
}

export default Links