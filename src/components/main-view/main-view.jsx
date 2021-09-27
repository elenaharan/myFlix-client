import React from 'react';
import axios from 'axios';

//Importing React Components
import { LoginView } from '../login-view/login-view';
import { default as MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

//Importing React-Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

//Importing React-router-dom components
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//Importing SCSS styling component
import "./main-view.scss";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null, //This tells the app no movie cards were clicked
            user: null,
            register:null,
        }
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        }
    }

    //When a user successfully logs in, this function updates `user` property in state to that particular user
      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    //  Get user recent data from DB
      getUsers(token) {
        axios.post('https://movietemple.herokuapp.com/users', {
        headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }



    //Get All Movies from DB
    getMovies(token) {
        axios.get('https://movietemple.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            //Assign the result to the state
            this.setState({
                movies: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

  


//When a movie is clicked, this function updates the state of the `selectedMovie` property to that movie
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    onRegistration(register) {
        this.setState({
            register: register,
        });
    }
    
    render() {
        const { movies, selectedMovie, register, user } = this.state;        

        return (
          <Router>
        
          <Row className="main-view justify-content-md-center">
            {/* Endpoint "/" */}
            <Route exact path="/" render={() => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
                ))
              }} />


            {/*Endpoint "/register" */}
              <Route path="/register" render={() => {
                  if (user) return <Redirect to="/" />
                  return <Col>
                  <RegistrationView />
                  </Col>
              }} />


            {/*Endpoint "/profile" */} 
              <Route path="/profile" render={() => {
                  if(!user) return <Col>
                    <ProfileView />
                  </Col>
              }} />



              {/* Endpoint "/movies/:movieId" */}
              <Route path="/movies/:movieId" render={({ match, history }) => { 
                  if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                    </Col>
              }} />

              {/*Endpoint "/director/:name*/}
              <Route path="/director/:name" render={({ match, history }) => {
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  if (movies.length === 0) return <div className = "main-view" />;
                  return <Col md={8}>
                      <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
                    </Col>
              }
            } />

            {/*Endpoint "/genre/:name" */}
            <Route path="/genre/:name" render={({ match, history}) => {
                if(!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if(movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                    <GenreView Genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
            }} />

            {/*Endpoint "/users/:username" */}
            <Route exact path="/users/:username" render={({ history }) => {
                if(!user) return <Col> 
                <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
                </Col>
                if(movies.length === 0) return <div className="main-view" />
            }} />

          </Row>
        </Router>
      );
    }
};

