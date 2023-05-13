import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Register from './Register';

function LoginModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    axios
      .post(`${baseUrl}/api/v1/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        alert('Login success');
        handleClose();
      })
      .catch((error) => {
        alert('Login failed');
      });
  };

  const baseUrl = 'https://api-bootcamp.do.dibimbing.id';

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" required />
            </Form.Group>
            <div>
                Don't have an account?{' '}
                Register
              </div>
            <Modal.Footer>
              <Button variant="warning" style={{ marginTop: "15px" }} type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;

