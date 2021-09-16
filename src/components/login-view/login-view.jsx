import React, { useState } from 'react';
import propTypes from 'prop-types';

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
          <label>
            Username: 
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

LoginView.propTypes = {
    Login: propTypes.shape({
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired
    }),
    onLoggedIn: propTypes.func.isRequired
};