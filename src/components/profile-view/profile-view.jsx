import React from 'react';
import {Row, Col, Container, Button, Card} from 'react-bootstrap';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
          Username: null,
          Password: null,
          Email: null,
          Birthdate: null,
          FavoriteMovies: [],

        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
            this.getUser(accessToken);
        }
    

    //GET user
    getUser(token) {

        let url = "https://movietemple.herokuapp.com/users/profile/" + localStorage.getItem('user');
        
        axios.get(url, {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        });
    }

    render() {
        const { movies, user } = this.props;
        //const favoritesList = movies.filter(m => {
          //  return this.state.FavoriteMovies.includes(m._id);
          //});
       
      return(
        <Container className="profile-wrapper m-4">
        <Row>
          <Col>
            <h2>Username: {`${this.props.user}`}</h2>
            <p>Email: {`${this.state.Email}`}</p>
            <p>Birthdate: {`${this.state.Birthdate}`}</p>
            <h5 className="mt-5">Your Favorites</h5>
          </Col>
        </Row>
        </Container>
      )

    }
}

