import React, { useState } from 'react';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./login-view.scss";

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        //This method prevents the default refresh of the page from handleSubmit() method
        e.preventDefault();
        console.log(username, password);
        //Allows user to be automatically logged in - regardless, of whether or not they have the correct credentials
        props.onLoggedIn(username);
    };

    return (
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username: </Form.Label>
              <Form.Control type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formPassword">
             <Form.Label>Password: </Form.Label>
               <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
          </Button>
        </Form>  
    );
}

LoginView.propTypes = {
    Login: propTypes.shape({
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired
    }),
    onLoggedIn: propTypes.func.isRequired
};