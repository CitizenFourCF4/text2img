import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import styles from './chatContainer.module.css'
import { getMessagesRoute,  addMessageRoute} from '../../utils/APIRoutes'
import AuthContext from '../../context/AuthContext'
import { AiOutlineSend } from "react-icons/ai"
import Dropdown from 'react-bootstrap/Dropdown';
import {ReactTyped} from "react-typed";

const ChatContainer = ({selectedChat, colorMode}) => {

  const [messages, setMessages] = useState([])
  const {user, authTokens, logoutUser} = useContext(AuthContext)
  const [inputMessage, setInputMessage] = useState('')
  const [modelMode, setModelMode] = useState('Translation')
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(()=> {
    if (authTokens) getMessagesFromChat()
    else navigate('/login')
  }, [selectedChat])


  const getMessagesFromChat = async() => {
    try{
      const response = await axios.get(`${getMessagesRoute}${selectedChat}/`, {}, {})
      setMessages(response.data)
    } 
    catch (error){
      console.log(error)
    }
  }

  const sendMessageHandler = async(e) => {    
    e.preventDefault()
    const data = { 'chat_id': selectedChat, 'message': inputMessage, 'author': user.username }
    const options = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(authTokens.access) }
    setInputMessage('')
    setMessages([...messages, {
      'message': inputMessage, 
      'author': user.username
    }])
    const responce = await axios.post(addMessageRoute, data, options)
    .then(function(){
      setInputMessage('')
      getMessagesFromChat()
    })
    .catch(function (error) {
      console.log(error)
    })
  }
    


  return (
    <section className={styles.chatbox} colorMode={colorMode}>
      <div className={styles.chat_messages_holder}>
      <Dropdown style={{width: '25%', textAlign:'left'}}>
      <Dropdown.Toggle colorMode={colorMode} id={styles.dropdown_toggle}>
        {modelMode}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setModelMode('Translation')}>Translation</Dropdown.Item>
        <Dropdown.Item onClick={() => setModelMode('Text 2 Img')}>Text 2 Img</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        <div className={styles.chat_messages_wrapper}>
          {messages && messages.map((msg, index) => (
            <div className={styles.message_wrapper} key={index} author={msg.author}>
              <div className={styles.avatar} author={msg.author} />
              <div className={styles.text_wrapper}>
                <div className={styles.author}>{msg.author === 'chat' ? msg.author : 'You'}</div>
                <div className={styles.message}>
                  {((index === messages.length-1) & msg.author === 'chat') ? <ReactTyped strings={[msg.message]} typeSpeed={50} showCursor={false}/> : <div>{msg.message}</div>}
                  
                </div>
              </div>  
            </div>
          ))}
        </div>
      </div>

          <form method='POST' onSubmit={sendMessageHandler}>
            <div className={styles.chat_input_holder}>
              <div className={styles.chat_input_wrapper} colorMode={colorMode}>
                <input placeholder='Type message...' className={styles.chat_input_textarea} onChange={e => setInputMessage(e.target.value)} value={inputMessage} colorMode={colorMode}/>
                <button className={styles.chat_input_button}>
                  <AiOutlineSend size={25}/>
                </button>
              </div>
            </div>
          </form>
          
        </section>
  )
}

export default ChatContainer