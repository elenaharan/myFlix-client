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
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    //GET user
    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get("https://movietemple.herokuapp.com/users/profile/:Username", {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthdate: response.data.Birthdate,
                Favorites: response.data.Favorites,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
       
      return(
          console.log("Welcome!")
      )

    }
}

