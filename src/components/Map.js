import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


/*

  google-maps-react

  https://www.npmjs.com/package/google-maps-react

*/

export class GoogleMapClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: props.places,
      focus: {},
      venue: {}
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps: ', nextProps);
    if(nextProps.lastClickedPlace && nextProps.lastClickedPlace.id) {
      console.log('changing focus', nextProps.lastClickedPlace);
      this.setState({
        focus: {
          lat: nextProps.lastClickedPlace.location.lat,
          lng: nextProps.lastClickedPlace.location.lng
        }, 
        showingInfoWindow: true,
        focusPlace: nextProps.lastClickedPlace
      }, () => {
        console.log(this);
      });
    }
  }

  onMarkerClick(props, marker, e, venue) {
    // console.log(props, marker, e, venue);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      focus: {
        lat: marker.position.lat(),
        lng: marker.position.lng()
      },
      showingInfoWindow: true,
      focusPlace: this.props.places[marker.id]
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        veune: null
      })
    }
  }

  windowHasClosed(props) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      veune: null,
      selectedPlace: {}
    })
  }


  render() {
    let { focusPlace } = this.state;
    // console.log(this);
    // console.log(focusPlace);

    return (
      <div style={{width: '100%', height: 'calc(100vh - 60px)', position: 'relative'}}>
      <Map id="map" google={this.props.google} zoom={9} initialCenter={{ lat: 39.07507511940357, lng: -77.1376322468508 }}>

        {
          this.props.places && Object.keys(this.props.places).map((key) => {
            let place = this.props.places[key];
            return (
              <Marker key={place.id} id={place.id} onClick={(p, m, e) => { this.onMarkerClick(p, m, e, place) }} name={ place.name }
                position={{ lat: place.location.lat, lng: place.location.lng }}/>
            )
          })
        }

        <InfoWindow position={ this.state.focus } visible={this.state.showingInfoWindow} onClose={() => { this.windowHasClosed }}>
        <div>
          { focusPlace && focusPlace.id &&
            <div>
            <h4><strong>{ focusPlace.name }</strong></h4>
            <p>
              { focusPlace.location.address }<br/>
              { focusPlace.location.crossStreet && focusPlace.location.crossStreet }<br/>
              { focusPlace.location.city }, { focusPlace.location.state } { focusPlace.location.postalCode && focusPlace.location.postalCode }<br/>
              { focusPlace.location.country }<br/>
            </p>
            <p>{ focusPlace.hereNow.count } | { focusPlace.hereNow.summary }</p>
            </div>
          }
        </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

let GoogleMap = GoogleApiWrapper({
  apiKey: ('AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y')
})(GoogleMapClass)

export default GoogleMap
