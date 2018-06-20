import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


/*

  google-maps-react

  https://www.npmjs.com/package/google-maps-react

*/

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: props.places
    }
  }

  componentDidMount() {

  }

  onMarkerClick(props, marker, e, venue) {
    // console.log(props, marker, e, venue);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      veune: venue
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        veune: null
      })
    }
  }

  windowHasClosed = (props) => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      veune: null,
      selectedPlace: {}
    })
  }


  render() {
    let self = this;
    let venue = {};
    if(this.state.activeMarker && this.state.activeMarker.id) {
      let id = this.state.activeMarker.id;
      venue = this.props.places[id];
    }

    return (
      <div style={{width: '100%', height: 'calc(100vh - 60px)', position: 'relative'}}>
      <Map id="map" google={this.props.google} zoom={9} initialCenter={{ lat: 39.07507511940357, lng: -77.1376322468508 }}>

        {
          self.props.places && Object.keys(self.props.places).map(function(key){
            let place = self.props.places[key];
            return (
              <Marker key={place.id} id={place.id} onClick={(p, m, e) => { self.onMarkerClick(p, m, e, place) }} name={ place.name }
                position={{ lat: place.location.lat, lng: place.location.lng }}/>
            )
          })
        }

        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.windowHasClosed}>
        <div>
          { venue && venue.name &&
            <div>
            <h4><strong>{ venue.name }</strong></h4>
            <p>
              { venue.location.address }<br/>
              { venue.location.crossStreet && venue.location.crossStreet }<br/>
              { venue.location.city }, { venue.location.state } { venue.location.postalCode && venue.location.postalCode }<br/>
              { venue.location.country }<br/>
            </p>
            <p>{ venue.hereNow.count } | { venue.hereNow.summary }</p>
            </div>
          }
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
