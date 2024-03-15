import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import styles from './chatContainer.module.css'
import { getMessagesRoute,  addMessageRoute} from '../../utils/APIRoutes'
import AuthContext from '../../context/AuthContext'
import { AiOutlineSend } from "react-icons/ai"

const ChatContainer = ({selectedChat}) => {

  const [messages, setMessages] = useState([])
  const {user, authTokens, logoutUser} = useContext(AuthContext)
  const [inputMessage, setInputMessage] = useState('')


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
    <section className={styles.chatbox}>
      <div className={styles.chat_log}>
      {messages && messages.map((msg, index) => (
        <div className={styles.chat_message} key={index} author={msg.author}>
          <div className={styles.chat_message_center}>
            <div className={styles.avatar} author={msg.author}>
            </div>
            <div className={styles.message}>
              {msg.message}
            </div>
          </div>
        </div>
            ))}
      </div>

          <form method='POST' onSubmit={sendMessageHandler}>
            <div className={styles.chat_input_holder}>
              <div className={styles.chat_input_wrapper}>
                <input cols="1" className={styles.chat_input_textarea} onChange={e => setInputMessage(e.target.value)} value={inputMessage}/>
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