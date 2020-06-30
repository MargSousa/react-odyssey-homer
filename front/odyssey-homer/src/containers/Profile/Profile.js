import React from 'react';
import { connect } from  'react-redux';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      profile: {
        email:  "homer.simpson@wildcodeschool.fr",
        name:  "Homer",
        lastname:  "Simpson"
      }
    }
  }

  componentDidMount = () => {
    console.log("profile");
    fetch('/profile',
      {
        headers: {
         'Authorization': 'Bearer ' + this.props.token,
        }
      })
    .then(res => {
      if (res.ok)
        return res.json()
      else
        throw new Error(res.statusText)
    })
    .then(res => {this.setState({ profile: res })})
    .catch()
  }

  getSignOut = () => {
    console.log("sign out");
    //this.props.dispatch({ type: "" });
    this.props.history.push({pathname: '/signin'});
  }

  render() {
    const { email , name, lastname } = this.state.profile;

    return(
      <div className="Profile">
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Name" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={lastname} />
          </ListItem>
        </List>
        <div className="button-section">
          <Button variant="contained" color="primary" onClick={this.getSignOut}>Sign Out</Button>
        </div>
      </div>
    );
  }
}

function  mapStateToProps(state) {
  return {
    token: state.auth.token,
  }
};

export default connect(mapStateToProps)(Profile);