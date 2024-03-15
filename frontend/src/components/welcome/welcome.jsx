import React, {useContext} from 'react'
import styles from './welcome.module.css'
import Robot from '../../assets/robot.gif'
import AuthContext from '../../context/AuthContext'

const Welcome = () => {
  const {user} = useContext(AuthContext)
  return (
    <section className={styles.chatbox}>
      <div className={styles.welcome_container}>
        <img src={Robot} alt="" />
        <h1>
          Welcome, <span>{user.username}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </div>
    </section>
  )
}

export default Welcome