import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [birthdateError, setBirthdateError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let setisValid = formValidation();
        if (setisValid) {
          axios.post('https://movietemple.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
          })
          .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); //'_self' is necessary for the page to open in the current tab 
          })
          .catch(e => {
            console.log('error upon user registration')
          });
        };
    }

    const formValidation = () => {
      let usernameError = {};
      let passwordError = {};
      let emailError = {};
      let birthdateError = {};
      let isValid = true;

      if (username === '') {
        usernameError.usernameEmpty = "Please enter your username.";
        isValid = false;
      }

      if (username.trim().length < 5) {
        usernameError.usernameShort = "Username needs to be at least 5 characters long.";
        isValid = false;
      }

      if (!username.isAlphanumeric) {
        usernameError.usernameNonAlphanumeric = "Username must not contain non-alphanumeric characters";
        isValid = false;
      }

      if (password.trim().length < 5) {
        passwordError.passwordShort = "Password needs to be at least 5 characters long.";
        isValid = false;
      }

      if (!(email && email.includes(".") && email.includes("@"))) {
        emailError.emailNotEmail = "Please enter correct email address.";
        isValid = false;
      }
      setUsernameError(usernameError);
      setPasswordError(passwordError);
      setEmailError(emailError);
      setBirthdateError(birthdateError);
      return isValid;
    };

    return (
      <Form className="register-view justify-content-md-center">
        
        <Row>
        <Form.Group controlid="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        {Object.keys(usernameError).map((key) => {
          return (
            <div key={key}>
              {usernameError[key]}
            </div>
          );
        })}
        </Form.Group>
        </Row>

        <Row>
        <Form.Group controlid="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {Object.keys(passwordError).map((key) => {
            return (
              <div key={key}>
                {passwordError[key]}
              </div>
            );
          })}
        </Form.Group>
        </Row>

        <Row>
        <Form.Group Controlid="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {Object.keys(emailError).map((key) => {
            return (
              <div key={key}>
                {emailError[key]}
              </div>
            );
          })}
        </Form.Group>
        </Row>

        <Row>
        <Form.Group controlid="formBirthdate">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control type="date" onChange={(e) => setBirthdate(e.target.value)} />
          {Object.keys(birthdateError).map((key) => {
            return (
              <div key={key}>
                {birthdateError[key]}
              </div>
            );
          })}
        </Form.Group>
        </Row>
        
        <Row>
        <Button variant="primary" type="register" onClick={handleSubmit}> Register </Button>
        </Row>

        <Row>
          {'Already a user?'}
        </Row>
        
        <Row>
        <Link to="/">
          <Button variant="secondary" type="button">Login</Button>
        </Link>
        </Row>
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