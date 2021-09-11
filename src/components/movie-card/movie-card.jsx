import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        //Adding onClick attribute to React element MovieCard
        //And passing function as props
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
}



