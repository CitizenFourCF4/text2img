import React, {useEffect, useState} from 'react'
import styles from './home.module.css'
import { AiOutlineSend } from "react-icons/ai"
import { createChatRoute } from '../../utils/APIRoutes'

const HomePage = () => {
  const [inputMessage, setInputMessage] = useState('')

  const sendMessageHandler = (e) => {
    e.preventDefault()
    console.log(inputMessage)
    setInputMessage('')
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
        </aside>
        <section className={styles.chatbox}>
          <div className={styles.chat_log}>
            <div className={styles.chat_message}>
              <div className={styles.chat_message_center}>
                <div className={styles.avatar}>

                </div>
                <div className={styles.message}>
                  Hello, World!
                </div>
                
              </div>
            </div>

            <div className={styles.chat_message} chat='chat'>
              <div className={styles.chat_message_center}>
                <div className={styles.avatar} chat='chat'>

                </div>
                <div className={styles.message} >
                  Hello, World!
                </div>
                
              </div>
            </div>


          </div>

          <form method='POST' onSubmit={sendMessageHandler}>
            <div className={styles.chat_input_holder}>
              <div className={styles.chat_input_wrapper}>
                <input className={styles.chat_input_textarea} onChange={e => setInputMessage(e.target.value)} value={inputMessage}/>
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