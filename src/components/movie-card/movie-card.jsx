import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./movie-card.scss";

export default class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        //Adding onClick attribute to React element MovieCard
        //And passing function as props
        return (
            <Card>
                <Card.Img variant="top" src={movie.Imagepath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
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
        ImagePath: propTypes.string.isRequired,        
    }).isRequired,
    //must contain onMovieClick and it must be a function
    onMovieClick: propTypes.func.isRequired
};