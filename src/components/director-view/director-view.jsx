import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import "./director-view.scss";
import {default as MovieCard} from '../movie-card/movie-card';




export class DirectorView extends React.Component {

    render() {
        const {movies, onBackClick, director } = this.props;
        console.log("movies", movies)

        return (
            <div className="director-view">
                <Row className="director-name justify-content-center"><h3>{director.Name}</h3></Row>
                <Row className="director-bio justify-content-center">{director.Bio}</Row>
                <Row className="director-birth justify-content-center">Born in {director.Birth}</Row>
                <Row> <Button className="back-button justify-content-center" variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Row>
                <MovieCard movie={movie} />
            </div>
        );
    }
}

DirectorView.propTypes = {
    director: propTypes.shape({
        Name: propTypes.string.isRequired,
        Bio: propTypes.string.isRequired,
        Birth: propTypes.string.isRequired
    }).isRequired
};

