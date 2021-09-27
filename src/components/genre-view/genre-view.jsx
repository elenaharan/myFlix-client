import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';


export class GenreView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {  
      const { movie, onBackClick } = this.props;
      

    return (
    
    <div className="genre-view">

      <Row className="value">{movie.Genre.Name}</Row>

      <Row className="value">{movie.Genre.Description}</Row>

      <Row>
        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
      </Row>

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

export default GenreView;