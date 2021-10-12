import React from "react";
import axios from "axios";

//Importing React-router-dom components
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import { setMovies, setFilter } from '../../actions/actions';

//Importing React Components
import { MoviesList} from '../movies-list/movies-list';
import { LoginView } from "../login-view/login-view";
//import { default as MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";
import jwtDecode from "jwt-decode";

//Importing React-Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";



//Importing SCSS styling component
import "./main-view.scss";



import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: jwtDecode(accessToken),
      });
      this.getMovies(accessToken);
    }
  }

  //When a user successfully logs in, this function updates `user` property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  //  Get user recent data from DB
  getUsers(token) {
    axios
      .post("https://movietemple.herokuapp.com/]", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          users: response.data,
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Get All Movies from DB
  getMovies(token) {
    axios
      .get("https://movietemple.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.props.setMovies(response.data);
        })
      .catch(function (error) {
        console.log(error);
      });
  }

  //When a movie is clicked, this function updates the state of the `selectedMovie` property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  onRegister(register) {
    this.setState({
      register: register,
    });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;
    

    return (
      <Router>
        <Row>
          <Container>
            <Navbar expand="lg" variant="light" bg="light">
              <Navbar.Brand href="/">MovieTemple</Navbar.Brand>
              <Navbar.Brand href={`/users/profile/${user}`}>
                Profile
              </Navbar.Brand>
              <button
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Logout
              </button>
            </Navbar>
          </Container>
        </Row>

        <Row className="main-view justify-content-md-center">
          {/*Endpoints*/}

          {/* Endpoint "/" */}
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies}/>; 
            }} />

          {/*Endpoint "/register" */}
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/*Profile View/ Get a Single User Info*/}
          {/*Endpoint "/users/profile/:Username" */}
          <Route
            path="/users/profile/:username"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ProfileView user={user} movies={movies}/>
                </Col>
              );
            }}
          />

          {/*Endpoint "/directors/:name*/}
          <Route
            path="/directors/:name/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              const directorMovies = movies.filter((movie) => {
                return movie.Director.Name === match.params.name;
              });
              
              return (
                <Col md={8}>
                  <DirectorView
                    movies={directorMovies}
                    movieId={match.params.movieId}
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* Endpoint "/movies/:movieId" */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/*Endpoint "/genres/:name" */}
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              const genreMovies = movies.filter((movie) => {
                return movie.Genre.Name === match.params.name;
              });
              return (
                <Col md={8}>
                  <GenreView
                    movies={genreMovies}
                    movieId = {match.params.movieId} 
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/*Update User Information */}
          <Route
            path="/users/update/:Username"
            render={({ history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );

              return (
                <Col>
                  <UpdateView
                    user={user}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/*Endpoint "/users/:username" */}
          <Route
            exact
            path="/users/:username"
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                );
              if (movies.length === 0) return;
              return <ProfileView history={history} movies={movies} />;
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies, setFilter }) (MainView);