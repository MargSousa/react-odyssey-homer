import React from 'react';
import './SignUp.css';
// import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond",
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
    )
  }

  render() {
    const titleJSON = JSON.stringify(this.state);

    return(
      <div className="SignUp">
        <h3>{titleJSON}</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>Name</div>
            <input type="text" name="name" onChange={this.updateFields}/>
            <div>Lastname</div>
            <input type="text" name="lastname" onChange={this.updateFields}/><br/>
            <div>Email</div>
            <input type="email" name="email" onChange={this.updateFields}/>
            <div>Password</div>
            <input type="password" name="password" onChange={this.updateFields}/>
            <div>Password Confirmation</div>
            <input type="password" name="passwordconf"/><br/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;