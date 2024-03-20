import React, {useContext, useState, useRef} from "react";
import styles from './NotFound.module.css'

const NotFound = () => {

    return(
      <div className={styles.container}>
      <div className={styles.layout__box}>
        <div className={styles.layout__body}>
          <h2 className={styles.auth__tagline}>Oops, you're funny!</h2>
          <img 
            src="/src/assets/404page.gif" width="500" height="500" alt="">
          </img>
            <a href="/" className={styles.submitButton}> 
                Go Back To Home
            </a>
  
        </div>
      </div>
    </div>
    )
  }
  export default NotFound