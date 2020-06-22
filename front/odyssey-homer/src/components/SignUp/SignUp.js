import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  updateEmailField = (event) => {
    let email = event.target.value;
    this.setState({ email })
  }

  render() {
    return(
      <div>
        <h1>{this.state.email}</h1>
        <input type="email" name="email" onChange={this.updateEmailField}/>
      </div>
    );
  }
}

export default SignUp;