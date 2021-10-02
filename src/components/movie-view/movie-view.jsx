import React from "react";
import propTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./movie-view.scss";



export class MovieView extends React.Component {
  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://movietemple.herokuapp.com/users/:Username/movies/:MovieID` +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been added to your favorites!");
      })
  }

  handleRemove() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://movietemple.herokuapp.com/users/:Username/movies/:MovieID` +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been removed from your favorites!");
      })
  }
    
      

    render() {
        const { movie, onBackClick } = this.props;        

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
         
                <Row className="movie-director justify-content-center">Directed by &nbsp;</Row>
                <Row className="justify-content-center"> <Link to={`/directors/${movie.Director.Name}`}><Button variant="link">{movie.Director.Name}</Button></Link></Row>
                <Row>
                <Link to={`/movies/${movie.Title}`}>
            <Button block type="button" variant="success" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
          </Link>
                </Row>

                <Row>
                <Link to={`/movies/${movie.Title}`}>
            <Button block type="button" variant="danger" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
          </Link>
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
            Name: propTypes.string.isRequired
        }),
        Director: propTypes.shape({
            Name: propTypes.string.isRequired
        }),
    }).isRequired
};