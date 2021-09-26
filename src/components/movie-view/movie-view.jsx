import React from "react";
import axios from "axios";
import propTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render () {
        const { movie, onBackClick, onMovieClick } = this.props;        

        return (
            <div className="movie-view">
                <Row xs={12} md={6} className="movie-poster">
                    <img src={movie.Imagepath} />
                </Row>

                <Row xs={12} md={6} className="movie-title">
                    <span className="label"> </span>
                    <h1 className="value">{movie.Title}</h1>
                </Row>

                <Row className="movie-description">
                    <span className="label"></span>
                    <span className="value">{movie.Description}</span>

                </Row>

                <Row className="movie-genre">
                    <span className="label"></span>
                    <span className="value">{movie.Genre.name}</span>
                </Row>

                <Row className="movie-director">
                    <span className="lable">Directed by </span>
                    <span className="value">{movie.Director.name}</span>
                </Row>

                <Link to={`/directors/${movie.Director.Name}`}><Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}><Button variant="link">Genre</Button>
                </Link>       



            </div>
           
        );
    }
}


MovieView.propTypes = {
    movieData: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Imagepath: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string}),
        Director: propTypes.shape({
            Name: propTypes.string
        })
    })
    //onMovieClick: propTypes.func.isRequired,
};