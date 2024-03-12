import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Links from './Links'
import './bootstrap/bootstrap.min.css'
import './normal.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Links />
    </BrowserRouter>
  </React.StrictMode>
)