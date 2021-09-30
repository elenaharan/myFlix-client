import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './genre-view.scss';



export class GenreView extends React.Component {
    
    render() {  
      const { movies, movie, genre, onBackClick } = this.props;
      //const otherMovies = movies.filter(m => movie.Genre.Name === genre.Name);
      
      

      return (    
    
        <div className="genre-view">

          <Row className="genre-name justify-content-center"><h3>{genre.Name}</h3></Row>

          <Row className="genre-description">{genre.Description}</Row>

          <Button className="back-button" variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
      
          {/*<Row className="other-movies">
              {otherMovies.map((m, i) => <Link to={`/movies/${movie.Title}`} key={i}>{movie.Title}</Link>)}
      </Row>*/}
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