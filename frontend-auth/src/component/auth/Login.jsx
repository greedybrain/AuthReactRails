import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
     constructor(props) {
          super(props)

          this.state = {
               email: '',
               password: '',
               loginErrors: ''
          }
     }

     handleChange = event => {
          this.setState({
               [event.target.name]: event.target.value
          })
     }

     handleSubmit = event => {
          const { email, password } = this.state
          axios.post("http://localhost:3001/sessions", {
               email,
               password
          }, 
          {    
               withCredentials: true
          }).then(
               response => {
                    if (response.data.logged_in) {
                         this.props.handleSuccessfulAuth(response.data)
                    }
               }
          ).catch(
               error => {
                    console.log(error)
               }
          )
          this.setState({
               email: '',
               password: ''
          })
          event.preventDefault()
     }

     render() {
          return (
               <div>
                    <form onSubmit={this.handleSubmit}>
                         <div className="email">
                              <input
                                   type="email"
                                   name="email"
                                   placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   required
                              />
                         </div>
                         <div className="password">
                              <input
                                   type="password"
                                   name="password"
                                   placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   required
                              />
                         </div>
                         <button type="submit">Login</button>
                    </form>
               </div>
          );
     }
}

export default Login;