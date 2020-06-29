import React from 'react';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import { Link } from "react-router-dom";

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
          <Link to="/signin">
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Sign Out</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;