import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import axios from 'axios'

class Home extends Component {

     handleSuccessfulAuth = data => {
          this.props.handleLogin(data)
          this.props.history.push('/dashboard')
     }

     render() {
          return (
               <div>
                    <button onClick={this.props.handleLogout}>Logout</button>
                    <h1>Home</h1>
                    <h1>Status: {this.props.loggedInStatus}</h1>
                    <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
               </div>
          );
     }
}

export default Home;