import React from 'react';
import './SignUp.css'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond"
    }
  }

  updateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    const titleJSON = JSON.stringify(this.state);

    return(
      <div className="SignUp">
        <h1>{titleJSON}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" onChange={this.updateFields}/>
          <input type="password" name="password" onChange={this.updateFields}/>
          <input type="password" name="passwordconf" onChange={this.updateFields}/>
          <input type="text" name="name" onChange={this.updateFields}/>
          <input type="text" name="lastname" onChange={this.updateFields}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default SignUp;