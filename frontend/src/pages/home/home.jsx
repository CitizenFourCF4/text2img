import React, {useEffect, useState, useContext} from 'react'
import styles from './home.module.css'
import { AiOutlineSend } from "react-icons/ai"
import { createChatRoute } from '../../utils/APIRoutes'
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
  const [inputMessage, setInputMessage] = useState('')
  const {user, authTokens} = useContext(AuthContext)
  const [bufChats, setBufChats] = useState('')
  const [bufMessages, setBufMessages] = useState([
    {
      'author': 'chat',
      'msg': 'Hello, World! Its chat'},
     {
      'author': 'me',
      'msg': 'Hello, World! Its me'
     }
  ])

  const sendMessageHandler = (e) => {
    const new_message = {
      'author': 'me',
      'msg': inputMessage}
    const newArray = [ ...bufMessages, new_message];
    e.preventDefault()
    
    setInputMessage('')
    
    setBufMessages(newArray)
  }

  const createChatHandler = () => {
    const data = {
      'chat_title': 'New Chat',
    }
    const options = {}
    axios.post(createChatRoute, data, options)
  }

  return (
    <div className={styles.container}>
        <aside className={styles.sidemenu}>
          <div className={styles.side_menu_button} onClick={createChatHandler}>
            <span>+</span>
            New Chat
          </div>
          <div>
            {user.username}
          </div>
        </aside>
        <section className={styles.chatbox}>
          <div className={styles.chat_log}>
          {bufMessages.map((bufmsg, index) => (
            <div className={styles.chat_message} id={index} author={bufmsg.author === 'chat' ? "gpt": "me"}>
              <div className={styles.chat_message_center}>
                <div className={styles.avatar} author={bufmsg.author === 'chat' ? "gpt": "me"}>
                </div>
                <div className={styles.message}>
                  {bufmsg.msg}
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
    </div>
  )
}

export default HomePage