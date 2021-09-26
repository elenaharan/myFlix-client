import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';


import "./movie-card.scss";

export default class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        //Adding onClick attribute to React element MovieCard
        //And passing function as props
        return (
            <Card className="card" style= {{width: '18rem'}} xs={8} md={4}>
                <Card.Img className="card-image" variant="top" src={movie.Imagepath} />
                <Card.Body className="card-body">
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className="button" variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}
            
      

MovieCard.propTypes = {
    //the props object must include a movie object (shape({...}))
    movie: propTypes.shape({
        //may contain a Title
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Imagepath: propTypes.string.isRequired,        
    }).isRequired,
    //must contain onMovieClick and it must be a function
    onMovieClick: propTypes.func.isRequired
};