import React from 'react';
import PropTypes from 'prop-types';

import "./movie-card.scss";

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        //Adding onClick attribute to React element MovieCard
        //And passing function as props
        return
        <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>;
    }
}

MovieCard.PropTypes = {
    //the props object must include a movie object (shape({...}))
    movie: PropTypes.shape({
        //may contain a Title
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,        
    }).isRequired,
    //must contain onMovieClick and it must be a function
    onMovieClick: PropTypes.func.isRequired
};