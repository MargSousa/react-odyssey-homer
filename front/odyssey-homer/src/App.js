import React from 'react';
import { MuiThemeProvider, Grid, Paper } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider  >
        <Grid container alignItems="center" style={{ height: '100%' }}>
          <Grid item xs={12}>
            <Paper elevation={4} style={{ margin:  32 }} >
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                  <img src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png" alt="Homer" />
                </Grid>
                <Grid item xs={12} sm={6} alignContent="center">
                  <BrowserRouter>
                    <Switch>
                      <Route exact path="/" component={SignIn} />
                      <Route exact path="/signin" component={SignIn} />
                      <Route exact path="/signup" component={SignUp} />
                      <Route exact path="/profile" component={Profile} />
                    </Switch>
                  </BrowserRouter>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
