import React, {useState, useContext, useEffect} from 'react'
import styles from './home.module.css'
import Sidebar from '../../components/sidebar/sidebar'
import Welcome from '../../components/welcome/welcome'
import ChatContainer from '../../components/chatContainer/chatContainer'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";


const HomePage = () => {

  const [isAuthorized, SetIsAuthorized] = useState(false)
  const [selectedChat, setSelectedChat] = useState(undefined)
  const [colorMode, setColorMode] = useState('dark')
  const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if (authTokens)SetIsAuthorized(true)
    else navigate('/login')
  }, []);

  return (
    <div  >
      { isAuthorized && ( 
        <div className={styles.container} colorMode={colorMode}>
          <Sidebar setSelectedChat={setSelectedChat} colorMode={colorMode} setColorMode={setColorMode}/>
          {selectedChat 
            ?(
              <ChatContainer selectedChat={selectedChat} colorMode={colorMode}/>
            )
            :(
              <Welcome colorMode={colorMode}/>
            )}      
        </div>)}
    </div>
  )
}

export default HomePage