import React from "react";
import axios from "axios";
import propTypes from "prop-types";

import "./movie-view.scss";

export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render () {
        const { movie, onBackClick, onMovieClick } = this.props;        

        return (
            <div className="movie-view">
                <div className="movie-poster"><img src={movie.Imagepath} /></div>
                <div className="movie-title">
                    <span className="label"></span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label"></span>
                    <span className="value">{movie.Description}</span>
                </div>
                {/*<div className="movie-genre">
                    <span className="label"></span>
                    <span className="value">{movie.Genre}</span>
                </div>
                <div className="movie-director">
                    <span className="lable">Directed by </span>
                    <span className="value">{movie.Director}</span>
        </div>*/}
                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}


MovieView.propTypes = {
    movieData: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Imagepath: propTypes.string.isRequired,
        //Genre: propTypes.array.isRequired,
        //Director: propTypes.array.isRequired,
    }),
    //onMovieClick: propTypes.func.isRequired,
};