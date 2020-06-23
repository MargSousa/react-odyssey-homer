import React from 'react';
import './SignUp.css';
import { Button, Snackbar, TextField, Alert } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond",
      flash: "",
      openSnackbar: false
    }
  }

  updateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const { flash, openSnackbar, ...user } = this.state;
    event.preventDefault();
    console.log(user);
    
    fetch('/auth/signup',
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
    ).then(
      this.setState({ openSnackbar: true })
    )
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    const titleJSON = JSON.stringify(this.state);
    const { flash, openSnackbar } = this.state;
    console.log("snack", openSnackbar);
    return(
      <div className="SignUp">
        <h3>Sign up!</h3>
        <div className="form-section">
          <form onSubmit={this.handleSubmit}>
            <div>Email</div>
            <TextField type="email" name="email" onChange={this.updateFields} fullWidth required/>
            <div>Password</div>
            <TextField type="password" name="password" onChange={this.updateFields} required/>
            <div>Password Confirmation</div>
            <TextField type="password" name="passwordconf" required/>
            <div>Name</div>
            <TextField type="text" name="name" onChange={this.updateFields} required/>
            <div>Lastname</div>
            <TextField type="text" name="lastname" onChange={this.updateFields} required/>
            <div className="button-section">
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={openSnackbar}
              onClose={this.handleCloseSnackbar}
              message={flash}
            >
            </Snackbar>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;