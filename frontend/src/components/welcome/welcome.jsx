import React, {useContext} from 'react'
import styles from './welcome.module.css'
import Developer from '../../assets/UI Developer.gif'
import AuthContext from '../../context/AuthContext'

const Welcome = () => {
  const {user} = useContext(AuthContext)
  return (
    <section className={styles.chatbox}>
      <div className={styles.welcome_container}>
        <img src={Developer} alt="" />
        <h3 style={{marginTop: '10%'}}>Please select or create the chat to Start messaging.</h3>
      </div>
    </section>
  )
}

export default Welcome