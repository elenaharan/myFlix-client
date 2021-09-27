import React from "react";
import propTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { DirectorView  } from "../director-view/director-view";




export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {};
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
                <Row className="value justify-content-center"> <Link to={`/directors/${movie.Director.Name}`}><Button variant="link">{movie.Director.Name}</Button></Link></Row>
              



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
            Description: propTypes.string.isRequired
        }),
        Director: propTypes.shape({
            Name: propTypes.string.isRequired,
            Bio: propTypes.string.isRequired,
            Birth: propTypes.string.isRequired
        }),
    }).isRequired
};