import React from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieDetails from './components/movie-details';
// import { Router, Switch, Route, Link } from "react-router-dom";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";
import './App.css';
import Home from "./pages/home";
import Movies from './components/movies';
class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
        {/* <Route exact path="/">
          <LoginPage />
        </Route> */}

        <Route path="/"  exact={true} component={Home} />
        <SecureRoute path="/movies"  exact={true} component={Movies} />
        {/* <SecureRoute path='/movies?category=:name' exact={true} component={GroupList}/> */}
        <SecureRoute path="/movie-catalog" component={Movies} />
        <Route path='/movies?category=:name' exact={true} component={Movies}/>
            <Route path='/movies/:id' component={MovieDetails}/>
        <Route path="/implicit/callback" component={ImplicitCallback} />
        </Switch>
        </Router>
      </>
    );
  }
}

export default App;
