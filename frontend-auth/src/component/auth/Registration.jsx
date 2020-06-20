import React, { Component } from 'react';
import axios from 'axios'

class Registration extends Component {
     constructor(props) {
          super(props)

          this.state = {
               email: '',
               password: '',
               password_confirmation: '',
               registrationErrors: ''
          }
     }

     handleChange = event => {
          this.setState({
               [event.target.name]: event.target.value
          })
     }

     handleSubmit = event => {
          const { email, password, password_confirmation } = this.state
          axios.post("http://localhost:3001/registrations", {
               email,
               password,
               password_confirmation
          }, 
          {    
               withCredentials: true
          }).then(
               response => {
                    if (response.data.status === 'created') {
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
               password: '',
               password_confirmation: '',
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
                         <div className="password_confirmation">
                              <input
                                   type="password"
                                   name="password_confirmation"
                                   placeholder="Confirm Password"
                                   value={this.state.password_confirmation}
                                   onChange={this.handleChange}
                                   required
                              />
                         </div>
                         <button type="submit">Signup</button>
                    </form>
               </div>
          );
     }
}

export default Registration;