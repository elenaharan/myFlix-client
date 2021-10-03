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
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
    }
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
              Birthdate: response.data.Birthdate,
              FavoriteMovies: response.data.FavoriteMovies,
              
          }); 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

/* Handle form update */
handleUpdate() {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  axios.put( `https://movietemple.herokuapp.com/users/update/${user}`,
        {   
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday
        },
        { headers: { Authorization: `Bearer ${token}` } } 
      )
        .then((response) => {
            const data = response.data;
            console.log(data);
            alert("Your account information has been updated.");
            console.log(response);
            window.location.pathname = `{/users/${user}`;
        })
        .catch(function (error) {
            alert(error.response.data);
            console.log("Error upon update");
        });
      }

  render() {
    const { user } = this.props;
     return (
       <Container>
       <Form>
         <Row className="form-title justify-content-center"><h4>Please enter your account information</h4></Row>
       </Form>
       </Container>
     );
  }
}