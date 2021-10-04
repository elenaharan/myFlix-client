import React from 'react';
import {Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import './update-view.scss';

export class UpdateView extends React.Component {
  constructor() {
    super();

    this.state = {
    
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
        let username = localStorage.getItem('user');
  }


  //GET user
  getUser(token) {
      
    let url = `https://movietemple.herokuapp.com/users/profile/${user}`;
    
    axios.get(url, {headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
          this.setState({
              Username: user,
              Password: response.data.Password,
              Email: response.data.Email,
              //Birthdate: response.data.Birthdate,
              //FavoriteMovies: response.data.FavoriteMovies,
              
          }); 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

/* User Info Update */
handleUpdate(e, newUsername, newPassword, newEmail) {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  let validated = this.formValidation();
    if (validated) {
  axios.put( `https://movietemple.herokuapp.com/users/update/${user}`,
        {   
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            
        },
        { headers: { Authorization: `Bearer ${token}` } } 
      )
        .then((response) => {
            const data = response.data;
            console.log(data);
            alert("Your account information has been updated.");
            console.log(response);
            window.location.pathname = `/users/profile/${user}`;
        })
        .catch(function (error) {
            alert(error.response.data);
            console.log("Error upon update");
        });
      }
    }

      /*Form Validation*/
      formValidation() {
        
        let PasswordError = {};
        
        let isValid = true;
        if (this.state.Password.trim().length < 5 || this.state.Password === '') {
          PasswordError.passwordMissing = "You must enter a password at least 5 characters long.";
          isValid = false;
        }
        /*if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
          EmailError.emailNotEmail = "Your email doesn't look quite right.";
          isValid = false;
        }
        if (this.state.Birthday === '' || !this.state.Birthday ) {
          BirthdayError.BirthdayEmpty = "Please enter your date of birth.";
          isValid = false;
        }
        this.setState({
          PasswordError: PasswordError,
          EmailError: EmailError,
          BirthdayError: BirthdayError,
        })*/
        return isValid;
      };


    setField(e) {
        let { name, value } = e.target;
        this.setState({
          [name]: value
        })
      }

  render() {
    //const { user } = this.props;
     return (
       <Container>
         <Row className="form-title justify-content-center"><h4>Update your account information</h4></Row>
         <Form>
         <Form.Group controlid="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" placeholder="Username" onChange={(e) => this.setField(e)}></Form.Control>
        </Form.Group>

        <Form.Group controlid="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="text" placeholder="Password" onChange={(e) => this.setField(e)}></Form.Control>
        </Form.Group>

        <Form.Group controlid="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="text" placeholder="Email" onChange={(e) => this.setField(e)}></Form.Control>
        </Form.Group>

        <Form.Group controlid="formBirthdate">
          <Form.Label>Birthdate: </Form.Label>
          <Form.Control type="date" placeholder="Email"></Form.Control>
        </Form.Group>

        <Row>
        <Button variant="secondary" type="update" onClick={this.handleUpdate}> Update </Button>
        </Row>

         </Form>
       </Container>
     );
  }
}

UpdateView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    
  })
};