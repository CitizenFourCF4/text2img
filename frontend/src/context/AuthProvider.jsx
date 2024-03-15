import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'
import { tokenRoute, tokenRefreshRoute } from '../utils/APIRoutes'

const AuthProvider = ({children}) => {


    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')): null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
  
    let loginUser = async(e) => {
      e.preventDefault()
      console.log(e.target.username.value)
      let response = await fetch (tokenRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value 
        })
      })
      let data = await response.json()
      if (response.status === 200) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        navigate('/')
      }
      else{
        alert('Введенные Вами данные не корректны!')
      }
    }
  
    const logoutUser = () => {
      setAuthTokens(null)
      setUser(null)
      localStorage.removeItem('authTokens')
      navigate('/login')
    }
  
  
    const updateToken = async ()=> {
      let response = await fetch (tokenRefreshRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: authTokens.refresh
        })
      })
      let data = await response.json()
  
      if(response.status === 200) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
      } else{
          logoutUser()
      }
    } 
  
  
    const contextData = {
      user: user,
      authTokens: authTokens,
      loginUser: loginUser,
      logoutUser: logoutUser,
    }
  
  
  
    useEffect(()=>{
  
      const interval = setInterval(() => {
        if(authTokens){ 
          updateToken()
        }
      }, 100000)
      return () => clearInterval(interval)
      
    }, [authTokens, loading])
  
    return (
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    )
  
  }

export default AuthProvider