import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { getChatsRoute, upgradeChatRoute } from '../../utils/APIRoutes'
import styles from './sidebar.module.css'
import { BsPencil,BsXLg } from "react-icons/bs";
import NewChatTitleModal from '../modals/newChatTitle'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdLogout, MdBrightnessMedium } from "react-icons/md";


const Sidebar = ({setSelectedChat, colorMode, setColorMode}) => {

    const [currentSelected, setCurrentSelected] = useState(undefined)
    const [chats, setChats] = useState([])
    const navigate = useNavigate()
    const {user, authTokens, logoutUser} = useContext(AuthContext)
    const [showSettings, setShowSettings] = useState(false)

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => {
      console.log(123)
      setShowModal(true);
    }


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
      axios.post(upgradeChatRoute, data, options)
      .then(function (response) {
        getChats()
      })
      .catch(function (error) {
      })
    }


    const chatDeleteHandler = (chat_id) => {
      const data = {'chat_id': chat_id }
      axios.delete(upgradeChatRoute, { data: data })
      .then(function (response) {
        getChats()
          /* TODO: FIX BUG*/
        if(chats.length === 1){ /* На самом деле chats.length === 0 */
          setSelectedChat(undefined)
        }
      })
      .catch(function (error) {
      })
    }

  return (
    <aside className={styles.sidemenu} colorMode={colorMode}>
        <div className={styles.side_menu_button} onClick={createChatHandler} colorMode={colorMode}>
            <span>+</span>
            New Chat
        </div>
        <div className={styles.chat_list}>
          <ul className={styles.sidebar_ul}>
            {chats && chats.map((chat, index) => (
              <li data-bs-theme="dark" colorMode={colorMode} className={styles.sidebar_li} key={index} onClick={() => changeCurrentChat(chat.id)} active={currentSelected ===chat.id ? 'active' : ''}>
                <div className={styles.title}>
                  {chat.title}
                </div>
                {currentSelected ===chat.id && 
                <div>
                  <BsPencil onClick={handleModalShow} style={{'marginRight': '20px'}}/>     
                  <BsXLg onClick={() => chatDeleteHandler(chat.id)}/>
                </div>  }       
              </li>
              ))} 
          </ul>
        </div>
        {showSettings && 
        <Card id={styles.card} colorMode={colorMode}>
          <ListGroup className="list-group-flush" style={{textAlign: 'left'}}>
            <ListGroup.Item colorMode={colorMode} id={styles.listItem} onClick={colorMode==='dark' ? () => {setColorMode('light'); setShowSettings(false)} : () => {setColorMode('dark'); setShowSettings(false)}}><MdBrightnessMedium/> Change color theme</ListGroup.Item>
            <ListGroup.Item colorMode={colorMode} id={styles.listItem} onClick={logoutUser}><MdLogout /> Log out</ListGroup.Item>
          </ListGroup>
        </Card>}

        <div className={styles.userInfo} onClick={() => setShowSettings(!showSettings)} colorMode={colorMode}>
          <div className={styles.avatar}>{user.username[0]}</div>
          <span className={styles.userInfo_username}>{user.username}</span>  
        </div>
        <NewChatTitleModal show={showModal} onHide={handleModalClose} currentSelected={currentSelected} getChats={getChats}/>
    </aside>
    
  )
}

export default Sidebar