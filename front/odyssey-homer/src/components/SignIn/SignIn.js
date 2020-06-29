import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      flash: ""
    }
  }

  updateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const { flash, ...user } = this.state;
    event.preventDefault();
    console.log(user);
    
    fetch('/auth/signin',
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(
      res => this.setState({flash: res.flash}),
      err => this.setState({flash: err.flash}),
    )
  }

  render() {
    
    return(
      <div className="SignUp">
        <div className="signup-section">
          <Link to="/signup">
            <Button variant="contained" color="secondary" size="small">Sign Up</Button>
          </Link>
        </div>
        <h3>Sign in!</h3>
        <div className="form-section">
          <form onSubmit={this.handleSubmit}>
            <div>Email</div>
            <TextField type="email" name="email" onChange={this.updateFields} fullWidth required/>
            <div>Password</div>
            <TextField type="password" name="password" onChange={this.updateFields} required/>
            <div className="button-section">
              <Link to="/profile">
                <Button variant="contained" color="primary">Sign In</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;