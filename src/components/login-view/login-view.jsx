import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "./login-view.scss";
import { Row } from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        //This method prevents the default refresh of the page from handleSubmit() method
        e.preventDefault();
        //Send a request to the server for authentication
        axios.post('https://movietemple.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
    };

    return (
      <div className="login">  
        <Form>
          <Row>
          <Form.Group controlid="formUsername">
            <Form.Label>Username: </Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}/>
          </Form.Group>
          </Row>

          <Row>
          <Form.Group controlid="formPassword">
             <Form.Label>Password: </Form.Label>
               <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          </Row>

          <Row>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
            </Button>
          </Row>

          <Row>
          {'Haven\'t got an account?'}
        </Row>

          <Row>
            <Link to="/register">
              <Button variant="success link">Register</Button>
            </Link>
          </Row>
        </Form> 
      </div>  
    );
}

LoginView.propTypes = {
    Login: propTypes.shape({
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired
    }),
    onLoggedIn: propTypes.func.isRequired
};