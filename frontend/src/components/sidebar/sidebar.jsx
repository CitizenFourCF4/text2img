import React, {useState, useEffect, useContext} from 'react'
import styles from './sidebar.module.css'
import { useNavigate } from "react-router-dom"
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { getChatsRoute, createChatRoute } from '../../utils/APIRoutes'

const Sidebar = ({setSelectedChat}) => {

    const [currentSelected, setCurrentSelected] = useState(undefined)
    const [chats, setChats] = useState([])
    const navigate = useNavigate()
    const {user, authTokens, logoutUser} = useContext(AuthContext)


    useEffect(()=> {
        if (authTokens) getChats()
        else navigate('/login')
      }, [])


    const getChats = async() => {
        const data = { 'user_login': user.username, }
        const options = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(authTokens.access) }
        try{
          const response = await axios.post(getChatsRoute, data, options)
          setChats(response.data)
        } 
        catch (error){
          console.log(error)
        }
    }

    const changeCurrentChat = (chat_id) => {
        setSelectedChat(chat_id)
    }


    const createChatHandler = () => {
      const data = { 'chat_title': 'New Chat', 'user_login': user.username, }
      const options = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(authTokens.access) }
      axios.post(createChatRoute, data, options)
      .then(function (response) {
        getChats()
      })
      .catch(function (error) {
      })
    }


  return (
    <aside className={styles.sidemenu}>
        <div className={styles.side_menu_button} onClick={createChatHandler}>
            <span>+</span>
            New Chat
        </div>
        {chats && chats.map((chat, index) => (
            <div key={index} onClick={() => changeCurrentChat(chat.id)}>
                {chat.title}
            </div>
            ))}
        <div>
        {user.username}
        </div>
    </aside>
  )
}

export default Sidebar