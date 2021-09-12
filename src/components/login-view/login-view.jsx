import React, { useState } from 'react';
import PropTypes from 'prop-types';

import "./login-view.scss";

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        //This method prevents the default refresh of the page from handleSubmit() method
        e.preventDefault();
        console.log(username, password);
        //Allows user to be automatically logged in - regardless, of whether or not they have the correct credentials
        props.onLoggedIn(username);
    };

    return (
        <form>
          <label className="username">
            Username: 
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="password">
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className="loginButton" type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

LoginView.PropTypes = {
    Login: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};