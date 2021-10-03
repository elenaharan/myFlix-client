import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import './update-view.scss';

export class UpdateView extends React.Component {
    constructor() {
        super();
        this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthdate: "",
      PasswordError: "",
      EmailError: "",
      BirthdateError: "",
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
      }

    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get('https://movietemple.herokuapp.com/users/', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthdate: response.data.Birthdate,
                });
            });
      }

    /*Handle Update*/

    /*handleUpdate(e) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let validated = this.formValidation();
    if (validated) {
      axios.put( "https://movieupdate.herokuapp.com/users/update/:Username",
          { 
              Password: this.state.Password,
              Email: this.state.Email,
              Birthdate: this.state.Birthdate
          },
          { headers: { Authorization: `Bearer ${token}` } } 
        )
          .then((response) => {
              const data = response.data;
              console.log(data);
              alert(user + " has been updated.");
              console.log(response);
          })
          .catch(function (error) {
              alert(error.response.data);
          });
        }}


    /*Form Validation*/
    /*formValidation() {
        let EmailError = {};
        let PasswordError = {};
        let BirthdateError = {};
        let isValid = true;
        if (this.state.Password.trim().length < 5 || this.state.Password === '') {
          PasswordError.passwordMissing = "You must enter a password at least 4 characters long.";
          isValid = false;
        }
        if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
          EmailError.emailNotEmail = "Enter email in correct format";
          isValid = false;
        }*/
        /*if (this.state.Birthdate === '' || !this.state.Birthdate ) {
          BirthdateError.BirthdateEmpty = "Please enter your date of birth.";
          isValid = false;
        }*/
        /*this.setState({
          PasswordError: PasswordError,
          EmailError: EmailError,
          BirthdateError: BirthdateError,
        })
        return isValid;
      };

    render() {
        const {user} = this.props;
        const {PasswordError, EmailError, BirthdateError} = this.state;
    
    return (
      
      <Form className="register-view justify-content-md-center">
        <Row className="update-header justify-content-center"><h4>Profile Update</h4></Row>
        
        {/*<Row>
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
    </Row>*/

       /* <Row>
        <Form.Group controlid="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
        </Row>

        <Row>
        <Form.Group controlid="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>
        </Row>

        <Row>
        <Form.Group controlid="formBirthdate">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control type="date" onChange={(e) => setBirthdate(e.target.value)} />

        </Form.Group>
        </Row>
        
        <Row>
        <Button variant="primary" type="submit" onClick={() => this.handleUpdate()}> Update </Button>
        </Row>

        
      </Form>   
    );
}
}

UpdateView.propTypes = {
    update: propTypes.shape({
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired,
        Email: propTypes.string.isRequired,
        Birthdate: propTypes.string.isRequired
    }),
    
};










handleUpdate(e, newName,newUsername, newPassword, newEmail, newBirthdate) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      validated: true,
    });
    return;
  }
  e.preventDefault();

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');

  axios.put(`https://myflixbypartearroyo.herokuapp.com/users/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      Name: newName ? newName : this.state.Name,
      Username: newUsername ? newUsername : this.state.Username,
      Password: newPassword ? newPassword : this.state.Password,
      Email: newEmail ? newEmail : this.state.Email,
      Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
    },
  })
    .then((response) => {
      alert('Saved Changes');
      this.setState({
        Name: response.data.Name,
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthdate: response.data.Birthdate,
      });
      localStorage.setItem('user', this.state.Username);
      window.open(`/users/${username}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
}
setName(input) {
  this.Name = input;
}

setUsername(input) {
  this.Username = input;
}

setPassword(input) {
  this.Password = input;
}

setEmail(input) {
  this.Email = input;
}

setBirthdate(input) {
  this.Birthdate = input;
}


  } */}
