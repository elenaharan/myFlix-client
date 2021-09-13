import React from 'react';

//Importing components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [
                { _id: 1, Title: "Raya and the Last Dragon", Description: "Raya and the Last Dragon is a 2021 American computer-animated fantasy action-adventure film. The plot follows a warrior princess who searches for the fabled last dragon, hoping to restore the dragon gem that would banish the evil spirits known as the Druun from the land of Kumandra.", ImagePath: "https://www.imdb.com/title/tt5109280/mediaviewer/rm2414269697/?ref_=tt_ov_i", Genre: "Fantasy", Director: "Don Hall"},
                { _id: 2, Title: "The Intern", Description: "The plot follows a 70-year-old widower who becomes a senior intern at an online fashion website, where he forms an unlikely friendship with the company's workaholic CEO.", ImagePath: 'https://www.imdb.com/title/tt2361509/mediaviewer/rm2122968832/?ref_=tt_ov_i', Genre: "Comedy", Director: "Nancy Meyers"},
                { _id: 3, Title: "Abominable", Description: "The film follows a teenage girl named Yi, who encounters a young Yeti on the roof of her apartment building in Shanghai, names him Everest and embarks on an epic quest to reunite the magical creature with his family at the highest point on Earth along with her mischievous friends Jin and Peng, but the trio of friends will have to stay one-step ahead of Burnish, a wealthy man intent on capturing a Yeti, and zoologist Dr. Zara to help Everest get home.", ImagePath: "https://www.imdb.com/title/tt6324278/mediaviewer/rm264211201/?ref_=tt_ov_i", Genre: "Fantasy", Director: "Jill Culton"}

            ],
            selectedMovie: null //This tells the app no movie cards were clicked
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    
    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>
        
        return (
            <div className="main-view">
                {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie);}}/>
                : movies.map(movie => (
                <MovieCard key ={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                ))
                }
            </div>
        );
    }
}

export default MainView;



