import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { NavDropdown } from 'react-bootstrap';
import './navbar.scss';





export class Navbar extends React.Component {

  onLoggedOUt() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', '_self');
      this.setState({
          user: null,
          token: null,
      });
  }

  render() {
      //const { users } = this.props;

      //if (!user) return null;

      return(
    
    <Navbar>

    </Navbar>
    
      );
  }
}

