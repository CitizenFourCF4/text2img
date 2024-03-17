import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import React, {useState, useContext} from 'react';
import { getChatsRoute, upgradeChatRoute } from '../../utils/APIRoutes'
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const NewChatTitleModal = (props) => {

  const [inputTitle, setInputTitle] = useState('')
  const {user, authTokens, logoutUser} = useContext(AuthContext)

  const titleUpdateHandler = () => {
    const data = { 'new_title': inputTitle, 'chat_id': props.currentSelected }
    const options = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(authTokens.access) }
    axios.put(upgradeChatRoute, data, options)
    .then(function (response) {
      props.onHide()
      props.getChats()
    })
    .catch(function (error) {
    })
  }

  return(
    <Modal {...props} backdrop="static" data-bs-theme="dark" centered>
      <Modal.Header closeButton data-bs-theme={"dark"}>
        <Modal.Title>Введите новое название чата</Modal.Title>
      </Modal.Header>
      <Modal.Body data-bs-theme="dark">
        <Form data-bs-theme="dark">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" data-bs-theme="dark">
            <Form.Label data-bs-theme="dark">New Title</Form.Label>
            <Form.Control
              onChange={e => setInputTitle(e.target.value)}
              type="email"
              placeholder="Type here..."
              autoFocus
              data-bs-theme="dark"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={titleUpdateHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewChatTitleModal