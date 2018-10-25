import React, { Component } from "react";
import "./App.css";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Event from "./Event/Event";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { Switch, Route } from "react-router-dom";
import axios from "axios"
import Logout from "./Logout/Logout"

// const env = 'https://playgroundz-heroku.herokuapp.com';
const env = "http://localhost:4004"

class App extends Component {
  state = {
    email: "",
    password: "",
    isLoggedIn: false,
    signUpError: null,
    loginError: null
  }
  componentDidMount() {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
  }
  // loggin out function
  handleLogOut = () => {
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false
    })
    localStorage.clear()
  }
  // handle input for form
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // handle signup

  handleSignUp = (e) => {
    e.preventDefault()
    axios.post(`${env}/users/signup`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.token = response.data.token
        this.setState({ isLoggedIn: true })
      })
      .catch(err => this.setState({
        signUpError: err.response.data.message
      }))
  }

  // handle log in

  handleLogIn = (e) => {
    e.preventDefault()
    axios.post(`${env}/users/login`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.token = response.data.token
        this.setState({
          isLoggedIn: true
        })
      })
      .catch(err => this.setState({
        loginError: err.response.data.message
      }))
  }
  render() {
    console.log(this.state)
    return (
      <div className="appBackground">
        <Header />
        <main>
          <Switch>
            <Route path="/event" render={() => <Event event={this.state.event} />} />
            {/* Sign-up Page */}
            <Route path="/signup" render={() => <Signup isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleSignUp={this.handleSignUp} signUpError={this.state.signUpError} />} />
            {/* Login Page */}
            <Route path="/logout" render={() => <Logout isLoggedIn={this.state.isLoggedIn} handleLogOut={this.state.handleLogOut} />} />
            <Route path="/login" render={() => <Login isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleLogIn={this.handleLogIn} loginError={this.state.loginError} />} />
            {/* Home Page / main landingpage */}
            <Route path="/" render={() => <Home event={this.state.event} />} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
