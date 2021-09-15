import React from "react";
import ReactDOM from "react-dom";
import { LoginView } from "./components/login-view/login-view";
import MainView from "./components/main-view/main-view";
import { RegistrationView } from "./components/registration-view/registration-view";

//Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
    render() {
        return (
          <MainView />
        );
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

