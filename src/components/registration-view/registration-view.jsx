import React, { useState } from 'react';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./registration-view.scss";

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegistration(username);
    };

    return (
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group ControlId="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBirthdate">
          <Form.Label>Birthdate: </Form.Label>
          <Form.Control type="date" onChange={(e) => setBirthdate(e.target.value)} />
          </Form.Group>
        <Button variant="primary" type="register" onClick={handleSubmit}> Register </Button>
      </Form>   
    );
}

RegistrationView.propTypes = {
    register: propTypes.shape({
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired,
        Email: propTypes.string.isRequired,
        Birthdate: propTypes.string.isRequired
    }),
    onRegistration: propTypes.func.isRequired,
};