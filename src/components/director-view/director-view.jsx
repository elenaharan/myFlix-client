import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';





export class DirectorView extends React.Component {

    render() {
        const {movie, onBackClick } = this.props;

        return (
            <Card className="director-view">
                <Row className="director-name">{movie.Director.Name}</Row>
                <Row className="director-bio">{movie.Director.Bio}</Row>
                <Row className="director-birth">{movie.Director.Birth}</Row>
                <Row> <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Row>
            </Card>
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
