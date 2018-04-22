import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import classnames from 'classnames/bind';
import Profile from './containers/profile';
import Navbar from './containers/navbar';
import Styles from './App.css';

const cx = classnames.bind(Styles);

class App extends Component {
  render() {
    return (
      <div className={cx("App")}>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/:username/:detailItem" component={Profile} />
            <Route path="/:username" component={Profile} />
            <Redirect to="/rushikeshbharad" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
