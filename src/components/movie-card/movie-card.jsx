import React from 'react';
import propTypes from 'prop-types';

import "./movie-card.scss";

export default class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        //Adding onClick attribute to React element MovieCard
        //And passing function as props
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
}
            
      

MovieCard.propTypes = {
    //the props object must include a movie object (shape({...}))
    movie: propTypes.shape({
        //may contain a Title
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        //ImagePath: propTypes.string.isRequired,        
    }).isRequired,
    //must contain onMovieClick and it must be a function
    onMovieClick: propTypes.func.isRequired
};