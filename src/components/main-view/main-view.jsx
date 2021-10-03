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
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';




//Importing React-router-dom components
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//Importing SCSS styling component
import "./main-view.scss";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null,  
        };
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
        })
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

    onRegister(register) {
        this.setState({
            register: register,
        });
    }
    
    render() {
        const { movies, user } = this.state; 
        console.log("render", user);       

        return (
          <Router>
          <Row> 
            <Container>
              <Navbar expand="lg" variant="light" bg="light">
              <Navbar.Brand href="/">MovieTemple</Navbar.Brand>
              <Navbar.Brand href="/users/profile/:Username">Profile</Navbar.Brand>
              <button onClick={() => { this.onLoggedOut() }}>Logout</button>

              </Navbar>
              </Container>
          </Row>



          
          <Row className="main-view justify-content-md-center">
          {/*Endpoints*/}

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


            {/*Profile View*/}
            {/*Endpoint "/users/profile/:Username" */} 
              <Route path="/users/profile/:Username" render={() => {
                  return <Col>
                  <ProfileView user = {user} />
                  </Col>
                }
              } />



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



              {/*Endpoint "/directors/:name*/}
              <Route path="/directors/:name" render={({ match, history }) => {
                
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  if (movies.length === 0) return <div className = "main-view" />;
                  const directorMovies = movies.find((movie) => {
                    return movie.Director.Name === match.params.name;
                  })  
                  
                  return <Col md={8}>
                      <DirectorView movies={directorMovies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                    </Col>
              }
            } />




            {/*Endpoint "/genres/:name" */}
            <Route path="/genres/:name" render={({ match, history}) => {
                if(!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if(movies.length === 0) return <div className="main-view" />;
                const genreMovies = movies.find((movie) => {
                  return movie.Genre.Name === match.params.name;
                })
                return <Col md={8}>
                    <GenreView movies={genreMovies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
            }} />


            {/*Endpoint "users/update/:Username"} */}
            <Route path="/users/update/:Username" render={({history}) => {
              if(!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            
              return <Col>
                  <UpdateView user={user} movies={movies} onBackClick={() => history.goBack()}/>
                  </Col>
          }}
             />





            {/*Endpoint "/users/:username" */}
            <Route exact path="/users/:username" render={({ history }) => {
                if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
                if (movies.length === 0) return;
                return <ProfileView history={history} movies={movies} />
            }} />
            
          </Row>
        </Router>
      );
    }
};

export default MainView;