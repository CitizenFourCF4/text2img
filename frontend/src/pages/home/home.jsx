import React, {useState} from 'react'
import styles from './home.module.css'
import Sidebar from '../../components/sidebar/sidebar'
import Welcome from '../../components/welcome/welcome'
import ChatContainer from '../../components/chatContainer/chatContainer'


const HomePage = () => {
  
  const [selectedChat, setSelectedChat] = useState(undefined)
  return (
    <div className={styles.container}>
        <Sidebar setSelectedChat={setSelectedChat}/>
          {selectedChat 
            ?(
              <ChatContainer selectedChat={selectedChat}/>
             )
            :(
              <Welcome/>
             )
          }      
    </div>
  )
}

export default HomePage