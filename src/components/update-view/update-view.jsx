import React from 'react';
import {Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/actions';

import { Link } from 'react-router-dom';

import './update-view.scss';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export class UpdateView extends React.Component {
  constructor() {
    super();

    this.state = {
      
      Username: '',
      Password: '',
      Email: '',
      Birthdate: '',
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    this.getUser(token, username);
  }

  getUser(token, username) {
    let url = `https://movietemple.herokuapp.com/users/profile/${user}`;
    axios.get(url, {headers: {Authorization: `Bearer ${token}`},
  })
  .then((response) => {
    console.log("response", response);
    this.setState({
      Username: response.data.Username,
      Password: response.data.Password,
      Email: response.data.Email,
      Birthdate: response.data.Birthday,
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
  const updatedUser = {
   Username: this.state.Username,
   Password: this.state.Password,
   Email: this.state.Email,
   Birthdate: this.state.Birthdate,
  }
  console.log("get user", updatedUser);
  console.log("event", event);

  axios.put(`https://movietemple.herokuapp.com/users/update/${updatedUser.Username}`, updatedUser, { headers: { Authorization: `Bearer ${token}` }})
 .then(response => this.setState({
   Username: updatedUser.Username,
   Password: updatedUser.Password,
   Email: updatedUser.Email,
   Birthday: updatedUser.Birthdate,
 }))
 .then(response => {
   return alert("Account has been updated");
 })
 .catch(error => {
   console.error('There was an error!', error);
 });
}


  handleChangeUsername = event => {
    this.setState({Username: event.target.value})
  };

  handleChangePassword = event => {
    this.setState({Password: event.target.value})
  };

  handleChangeEmail = event => {
    this.setState({Email: event.target.value})
  };

  handleChangeBirthdate = event => {
    this.setState({Birthdate: event.target.value})
  };

  

  render() {
    
    const { Username, Password, Email, Birthdate } = this.state;

     return (
       <Container>
         <Row className="form-title justify-content-center"><h4>Update your account information</h4></Row>
         <Form>
         <Form.Group controlid="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" placeholder="Username" value={Username} onChange={(event) => this.handleChangeUsername(event)} ></Form.Control>
        </Form.Group>

        <Form.Group controlid="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" placeholder="Password" defaultValue={Password} onChange={(event) => this.handleChangePassword(event)}></Form.Control>
        </Form.Group>

        <Form.Group controlid="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="text" placeholder="Email" defaultValue={Email} onChange={(event) => this.handleChangeEmail(event)}></Form.Control>
        </Form.Group>

        <Form.Group controlid="formBirthdate">
          <Form.Label>Birthdate: </Form.Label>
          <Form.Control type="date" placeholder="Birthdate" defaultValue={Birthdate} onChange={(event) => this.handleChangeBirthdate(event)}></Form.Control>
        </Form.Group>

        <Row>
        <Button variant="secondary" type="submit" onClick={(event) => this.handleUpdate(event)}> Update </Button>
        </Row>

         </Form>
       </Container>
     );
  }}

 let mapStateToProps = state => {
   return {
     user: state.user,
     movies: state.movies
   }
 }

 export default connect(mapStateToProps, { updateUser })(UpdateView);