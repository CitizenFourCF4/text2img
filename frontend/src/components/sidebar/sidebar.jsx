import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { getChatsRoute, createChatRoute } from '../../utils/APIRoutes'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from './sidebar.module.css'

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
        setCurrentSelected(chat_id)
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
        <div className={styles.chat_list}>
          <ul className={styles.sidebar_ul}>
            {chats && chats.map((chat, index) => (
              <li className={styles.sidebar_li} key={index} onClick={() => changeCurrentChat(chat.id)} active={currentSelected ===chat.id ? 'active' : ''}>
                <div className={styles.title}>
                  {chat.title}
                </div>
                  
              </li>
              ))} 
          </ul>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.avatar}>{user.username[0]}</div>
          <span className={styles.userInfo_username}>{user.username}</span>  
        </div>
    </aside>
  )
}

export default Sidebar