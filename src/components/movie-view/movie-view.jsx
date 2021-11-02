import React from "react";
import propTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteMovies: [],
      Password: "",
    };
  }

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(
        `https://movietemple.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert(`${this.props.movie.Title} has been added to your favourites`);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((error) => console.log(error));
  }

  handleRemove = (movie) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(
        `https://movietemple.herokuapp.com/users/${user}/movies/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(movie.Title + " has been removed from your favorites!");
      })
      .catch((error) => console.log("error:", error));
  };

  render() {
    const { movie } = this.props;
    const user = localStorage.getItem("user");
    return (
      <div className="movie-view">
        <Row xs={12} md={6} className="movie-poster justify-content-center">
          <img src={movie.Imagepath} />
        </Row>

        <Row xs={12} md={6} className="movie-title justify-content-center">
          <span className="label"> </span>
          <h1 className="value">{movie.Title}</h1>
        </Row>

        <Row xs={12} md={6} className="movie-description">
          <span className="label"></span>
          <span className="value">{movie.Description}</span>
        </Row>

        <Row className="movie-genre justify-content-center">
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </Row>

        <Row className="movie-director justify-content-center">
          Directed by &nbsp;
        </Row>
        <Row className="justify-content-center">
          {" "}
          <Link to={`/directors/${movie.Director.Name}/${movie._id}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </Row>

        <Row>
          <Button
            block
            type="button"
            variant="success"
            onClick={() => this.handleAdd()}
          >
            Add to favorites
          </Button>
        </Row>
        <Row>
          <Button
            block
            type="button"
            variant="danger"
            onClick={() => this.handleRemove(movie)}
          >
            Remove from favorites
          </Button>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Imagepath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
  }),
};