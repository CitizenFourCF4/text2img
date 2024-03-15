import React, {useContext, useState, useRef} from "react";
import styles from './login.module.css'
import AuthContext from "../../context/AuthContext";




const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  const username = useRef(null)
  const password = useRef(null)
  


  return(
    <div className={styles.container}>
    <div className={styles.layout__box}>
      <div className={styles.layout__body}>
        <h2 className={styles.auth__tagline}>Вход в систему</h2>

        <form className={styles.form} onSubmit={loginUser}>
          <div className={styles.form__group}>
            <label htmlFor="username" className={styles.label}>Никнейм</label>
            <input className={styles.input_form} id="username" name="username" type="text" ref={username}/>
          </div>
          <div className={styles.form__group}>
            <label htmlFor="password" className={styles.label}>Пароль</label>
            <input className={styles.input_form} id="password" name="password" type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" ref={password}/>
          </div>
          <div style={{height:'55px', marginTop:"60px"}}>
            <button type="submit" className={styles.submitButton} >
              Войти
            </button>
          </div>
          
        </form>

        <div className={styles.auth_action}>
          <p>Еще не зарегистрированы?</p>
          <a href="/register" style={{textDecoration:'none', color:'#3535d3'}}>Зарегистрироваться</a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoginPage