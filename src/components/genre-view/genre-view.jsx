import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';



export class GenreView extends React.Component {
    
    render() {  
      const { movies, movie, onBackClick } = this.props;
      //const genre=movies.find(m => m.Genre.Name === match.params.name).Genre;
      
      
s
      return (    
    
        <div className="genre-view">

          <Row className="genre-name">{movie.Genre.Name}</Row>

          <Row className="genre-description">{movie.Genre.Description}</Row>

          <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
      

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

