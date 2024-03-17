import React, {useState} from 'react'
import styles from './home.module.css'
import Sidebar from '../../components/sidebar/sidebar'
import Welcome from '../../components/welcome/welcome'
import ChatContainer from '../../components/chatContainer/chatContainer'


const HomePage = () => {
  
  const [selectedChat, setSelectedChat] = useState(undefined)
  const [colorMode, setColorMode] = useState('dark')
  return (
    <div className={styles.container} colorMode={colorMode}>
        <Sidebar setSelectedChat={setSelectedChat} colorMode={colorMode} setColorMode={setColorMode}/>
          {selectedChat 
            ?(
              <ChatContainer selectedChat={selectedChat} colorMode={colorMode}/>
             )
            :(
              <Welcome colorMode={colorMode}/>
             )
          }      
    </div>
  )
}

export default HomePage