import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class googleMap extends Component {
  constructor() {
    super()
    this.state = {
      coords: null,
      x: '',
      ok: null
    };

    this.updateCoords = this.updateCoords.bind(this);
    // this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.setPosition();
  }

  updateCoords({ latitude, longitude }) {
    this.setState({
      coords: { latitude, longitude },
    })
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
      console.log(position.coords)
      console.log(this.state.coords)
    });
  }
  x() {
    // console.log('ok')
    let obj = {
      lat: this.state.coords.latitude,
      lng: this.state.coords.longitude
    }
    this.props.submit(obj)
    // console.log('ok')
  }
  render() {
    const { coords} = this.state;
    console.log('x', coords)
    return (
      <div className="App map">
        {coords && <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `80%` }} />}
          containerElement={<div style={{ height: `75vh` }} />}
          mapElement={<div style={{ height: `70%` }} />}
          coords={coords}
          updateCoords={this.updateCoords}
        />}
        <br />
        <button variant="contained" onClick={() => this.x()} style={{ backgroundColor: 'orange' }}>Submit</button>

      </div>
    )
  }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={19}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown &&
      <Marker
        position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        draggable={true}
        onDragEnd={position => {
        props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
        }}
      />}
  </GoogleMap>
))

export default googleMap;