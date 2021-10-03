import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import propTypes from 'prop-types';
import axios from 'axios';
import './profile-view.scss';


export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
          Username: '',
          Password: '',
          Email: '',
          Birthdate: '',
          FavoriteMovies: [],
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        let username = localStorage.getItem('user');  
      }
    

   //GET user
    getUser(token) {
      
      let url = `https://movietemple.herokuapp.com/users/profile/${username}`;
      
      axios.get(url, {headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                FavoriteMovies: response.data.FavoriteMovies,
                
            }); 
        })
        .catch(function (error) {
          console.log(error);
        });
    }



    /*Remove from Favourites*/

    /*handleRemove(movie) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      axios.delete(`http://movietemple.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        console.log(response);
        alert("Movie was removed from your favourites!");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      })
    }*/


    /*Deregister a user*/
  /*handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://movietemple.herokuapp.com/users/${username}`, { headers: { Authorization: `Bearer ${token}`}}
  )
  .then(() => {
    alert("Account has been deleted");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.pathname = "/";
  })
  .catch(function (error) {
    console.log(error);
  });
}*/

  render() {
    console.log("this.props", this.props);
    const { user } = this.props;
     //const favoritesList = movies.filter(m => {
          //  return this.state.FavoriteMovies.includes(m._id);
          //});
       
      return (
      <Container>

        <Card className="card" xs={8} md={4}>
                <Card.Body className="card-body">
                    <Card.Title>Profile Information </Card.Title>
                    <Card.Text>Username: {user} </Card.Text>
                    <Card.Text>Password: </Card.Text>
                    <Card.Text>Email: </Card.Text>
                    <Card.Text>Birthdate: </Card.Text>     
                </Card.Body>
            </Card>

         
        {/*<Row>
          <Col>
            <p>Username: {`${this.props.user}`}</p>
            <p>Email: {`${this.state.Email}`}</p>
            <p>Birthdate: {`${this.state.Birthdate}`}</p>
          </Col>
        </Row>*/}

        </Container>


        /*<Row className="update-profile justify-content-center">
              <Link to={`/users/update/${user}`}><Button size="md" variant="warning">Edit Account</Button></Link>  
        </Row>
        <Row>
          <h5 className="mt-5">Your Favourite Films</h5>
        </Row>*/
        /*<Row> <MovieCard  /> </Row>*/

       
        
)        
      

    }
}