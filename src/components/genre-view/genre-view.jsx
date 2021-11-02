import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './genre-view.scss';
import {default as MovieCard} from '../movie-card/movie-card';



export class GenreView extends React.Component {
    
    render() {  
      const { genre, movies, movie, movieId } = this.props;
      const validMovies = movies.filter((movie) => movie._id !== movieId);
      const shouldRenderMovies = validMovies.length > 0;   

      console.log("movies", movies);
      
      

      return (    
    
        <div className="genre-view">

          <Row className="genre-name justify-content-center"><h3>{genre.Name}</h3></Row>

          <Row className="genre-description">{genre.Description}</Row>

          {shouldRenderMovies && (
          <Row className="other-movies justify-content-center"><h4>Other Movies in this Genre</h4></Row>
          )}
          {shouldRenderMovies && (
          <Row className="genre-card">
            {validMovies.map((movie) => {
              return <MovieCard key={movie._id} movie={movie} />;
            })}
          </Row>       
          )}       
        </div>
    );
  }
}

GenreView.propTypes = {
    genre: propTypes.shape({
        Name: propTypes.string.isRequired,
        Description: propTypes.string.isRequired
    }).isRequired
};