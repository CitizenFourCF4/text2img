import React from 'react'
import styles from './home.module.css'

const HomePage = () => {
  return (
    <div className={styles.container}>
        <aside className={styles.sidemenu}>
          <div className={styles.side_menu_button}>
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


          <div className={styles.chat_input_holder}>
            <input className={styles.chat_input_textarea}></input>
          </div>
        </section>
    </div>
  )
}

export default HomePage