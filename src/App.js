import React, { Component } from 'react';
import './App.css';
import Login from './components/pages/login/login'
import GoogleMap from './components/pages/googleMap/googleMap'
import Profile from './components/profile/profile';
import ImageUpload from './components/firebase/imageUpload'
import Dashboard from './components/dashboard/dashboard'
import GetDirection from './components/getDirections/getDirection';
import Loc from './components/location/location'
// import firebase from './components/config/firebase'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super()    
    this.state = {
      coords: null,
      abc: "abcd"
    };
  }


  render() {
    
    return(
      <div>
          <Router>
            <div>
              <Route exact path="/" component={Login} />
              <Route path="/location/:location/:userId" component={Loc} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/images" component={ImageUpload} />
              <Route exact path="/dashboard:userId" component={Dashboard} />
              <Route exact path="/getDirections/:lat/:lng" component={GetDirection} />
            </div>
          </Router>
      </div>
   )
 }

}

export default App; 
