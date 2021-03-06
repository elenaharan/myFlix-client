import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { connect } from 'react-redux';
import { setUser, updateUser } from '../../actions/actions';
import { default as MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      FavoriteMovies: [],
    };
  }

  //GET user
  componentDidMount() {
    let user = localStorage.getItem("user");
    let url = `https://movietemple.herokuapp.com/users/profile/${user}`;
    const token = localStorage.getItem("token");

    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`https://movietemple.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Account has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    
    const { user, username, movies } = this.props;
    console.log("movies", movies);
    console.log("log user", user);

    return (
      <Container>
        <Card className="card" xs={8} md={4}>
          <Card.Body className="card-body">
            <Card.Title>Profile Information </Card.Title>
            <Card.Text>Username: {`${user.Username}`} </Card.Text>
            <Card.Text>Password: {`${user.Password}`}</Card.Text>
            <Card.Text>Email: {`${user.Email}`}</Card.Text>
            {user.Birthday && <Card.Text>Birthdate: {`${user.Birthday}`}</Card.Text>}
            <Link to={`/users/update/${user.Username}`}>
              <Button className="button-update" variant="link">
                Update Profile
              </Button>
            </Link>

            <Link to={`/users/${user}`}>
              <Button
                className="button-deregister"
                user={username}
                variant="link"
                onClick={() => {
                  this.handleDelete();
                }}
              >
                Deregister
              </Button>
            </Link>
          </Card.Body>
        </Card>
        <Row className="justify-content-center">
          <h3>Favourite Films</h3>
        </Row>
        <Row className="favourite-movies">
       {movies.map((movie) => {
          if (this.state.FavoriteMovies.includes(movie._id)) {
            return <MovieCard key={movie._id} movie={movie} />;
          }
        })}
        </Row>
      </Container>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, {setUser, updateUser})(ProfileView);