import React from 'react';
import {Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import './update-view.scss';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export class UpdateView extends React.Component {
  constructor() {
    super();

    this.state = {
      
      username: '',
      Password: '',
      Email: '',
      Birthdate: '',
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
  }

  getUser(token) {
    let url = `https://movietemple.herokuapp.com/users/update/${user}`;
    axios.get(url, {headers: {Authorization: `Bearer ${token}`},
  })
  .then((response) => {
    this.setState({
      Username: user,
      Password: response.data.Password,
      Email: response.data.Email,
      Birthdate: response.data.Birthdate,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}


  /*Update User Info*/
handleUpdate(event) {
  event.preventDefault();
  let token = window.localStorage.getItem('token');
  let user = localStorage.getItem('user');

  axios.put(`https://movietemple.herokuapp.com/users/update/${user}`, { headers: { Authorization: `Bearer ${token}` },
})
 .then(response => this.setState({
   Username: username,
   Password: password,
   Email: email,
   Birthdate: birthdate,
 }))
 .then(response => {
   return alert("Account has been updated");
 })
 .catch(error => {
   console.error('There was an error!', error);
 });
}


  handleChangeUsername = event => {
    this.setState({username: event.target.value})
  };

  handleChangePassword = event => {
    this.setState({password: event.target.value})
  };

  handleChangeEmail = event => {
    this.setState({email: event.target.value})
  };

  handleChangeBirthdate = event => {
    this.setState({birthdate: event.target.value})
  };

  

  render() {
    
    const { user } = this.props;
    

     return (
       <Container>
         <Row className="form-title justify-content-center"><h4>Update your account information</h4></Row>
         <Form>
         <Form.Group controlid="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" placeholder="Username" onChange={(event) => this.handleChangeUsername(event)} ></Form.Control>
        </Form.Group>

        <Form.Group controlid="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="text" placeholder="Password" onChange={(event) => this.handleChangePassword(event)}></Form.Control>
        </Form.Group>

        <Form.Group controlid="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="text" placeholder="Email" onChange={(event) => this.handleChangeEmail(event)}></Form.Control>
        </Form.Group>

        <Form.Group controlid="formBirthdate">
          <Form.Label>Birthdate: </Form.Label>
          <Form.Control type="date" placeholder="Birthdate" onChange={(event) => this.handleChangeBirthdate(event)}></Form.Control>
        </Form.Group>

        <Row>
        <Button variant="secondary" type="update" username = {user} onClick={(event) => this.handleUpdate()}> Update </Button>
        </Row>

         </Form>
       </Container>
     );
  }}

  UpdateView.propTypes = {
    user: PropTypes.shape({
      Username: PropTypes.string,
      Email: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Birthdate: PropTypes.string,
    })
  };