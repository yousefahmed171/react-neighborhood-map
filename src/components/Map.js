import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


/*

  google-maps-react

  https://www.npmjs.com/package/google-maps-react

*/

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  componentDidMount() {
    console.log(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  windowHasClosed = (props) => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: {}
    })
  }


  render() {
    return (
      <div style={{width: '100%', height: 'calc(100vh - 60px)', position: 'relative'}}>
      <Map id="map" google={this.props.google} zoom={14} >

        <Marker onClick={this.onMarkerClick} name={'Current location'} />

        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.windowHasClosed}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y')
})(MapContainer)
