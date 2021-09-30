import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import "./director-view.scss";





export class DirectorView extends React.Component {

    render() {
        const {movie, onBackClick, director } = this.props;
        

        return (
            <div className="director-view">
                <Row className="director-name justify-content-center"><h3>{director.Name}</h3></Row>
                <Row className="director-bio justify-content-center">{director.Bio}</Row>
                <Row className="director-birth justify-content-center">Born in {director.Birth}</Row>
                <Row> <Button className="back-button justify-content-center" variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Row>
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

