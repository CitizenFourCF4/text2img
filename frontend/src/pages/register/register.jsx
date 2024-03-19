import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './register.module.css'
import { registerRoute } from '../../utils/APIRoutes'
import {Form} from "react-bootstrap";


const RegisterPage = () => {
  const navigate = useNavigate()
  const [isValidated, setIsValidated] = useState(false);
  const [formData, setFormData] = useState({
      username: "",
      password: "",
      confimPassword: "",
      email: "",
  });
  const submitHandler = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.stopPropagation();
      }
      event.preventDefault();
      setIsValidated(true);
      axios.post(registerRoute, {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      })
      .then(function (response) {
        navigate('/login')
      })
      .catch(function (error) {
        console.log(error)
      })

  };
  const changeHandler = (event) => {
      const { name, value } = event.target;
      setFormData({
          ...formData,
          [name]: value,
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout__box}>
        <div className={styles.layout__body}>
          <h2 className={styles.auth__tagline}>Create your account</h2>
          <Form noValidate isValidated={isValidated}>
            <Form.Group controlId="username" style={{marginBottom:'1rem'}}>
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" name="username" value={formData.username} onChange={changeHandler} pattern="^[a-zA-Z0-9_]+$" 
                required isInvalid={isValidated && !/^[a-zA-Z0-9_]+$/.test(formData.username)}
              />
              <Form.Control.Feedback type="invalid">
                  Please enter a valid username (alphanumeric
                  characters only).
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password" style={{marginBottom:'1rem'}}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    minLength={6}
                    required
                    isInvalid={
                        isValidated && formData.password.length < 6
                    }
                />
                <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmPassword" style={{marginBottom:'1rem'}}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    name="confimPassword"
                    value={formData.confimPassword}
                    onChange={changeHandler}
                    minLength={6}
                    required
                    pattern={formData.password}
                    isInvalid={
                        isValidated &&
                        formData.confimPassword !== formData.password
                    }
                />
                <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  required
                  isInvalid={
                      isValidated &&
                      !/^\S+@\S+\.\S+$/.test(formData.email)
                  }
              />
              <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{height:'55px', marginTop:"60px"}}>
              <button type="submit" className={styles.submitButton} onClick={submitHandler}>
                Sign up
              </button>
            </div>
          </Form>
          <div className={styles.auth_action}>
            <p>Do you have an account?</p>
            <a href="/login" style={{textDecoration:'none', color:'#3535d3'}}>Log in</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

