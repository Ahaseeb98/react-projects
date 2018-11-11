/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react';
// import './App.css';
import firebase from '../config/firebase'
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"
import Button from '@material-ui/core/Button';

const provider = new firebase.auth.FacebookAuthProvider();

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      coords: {}
    };

    this.login = this.login.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  componentDidMount() {
    this.setPosition();
  }

  login() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var user = result.user;
      
    }).catch(function(error) {
      
    });
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({coords: position.coords})
    });
  }

  updateCoords({latitude, longitude}) {
    this.setState({coords: {latitude, longitude}})
  }

  getDirections() {
    const DirectionsService = new google.maps.DirectionsService();
   
      DirectionsService.route({
        origin: new google.maps.LatLng(this.state.coords.latitude, this.state.coords.longitude),
        destination: new google.maps.LatLng(this.props.match.params.lat, this.props.match.params.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          alert("Sorry! Can't calculate directions!")
        }
      });
  }

  render() {
    const {coords, directions} = this.state;
    console.log(directions)
    // console.log()
    return(
      <div>
        {/* <button onClick={this.login}>Login with facebook shareef!</button> */}
        <MyMapComponent 
          isMarkerShown 
          coords={coords}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCf2_8BOV2ZW-KLRc3CSjnEcEJ8-sww0PM&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `450px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          directions={directions}
          />

          {/* <button onClick={this.getDirections}><h1>Get Directions</h1></button> */}
          <Button onClick= {this.getDirections} color="primary" variant="contained"> getDirections </Button>
          <Button  color="primary" variant="contained" onClick={() => this.props.history.goBack()}> Go Back </Button>
      </div>
   )
 }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
  {console.log(props.coords.latitude)}
  {console.log(props.destination)}
  <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }} />
  <Marker position={{ lat: 24.8861479, lng: 67.0595196 }} />

  {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
))

export default App; 