import React from 'react'
import MapGL, { StaticMap } from 'react-map-gl';
import DeckGL, { FlyToInterpolator } from 'deck.gl'

import { csv } from 'd3'

import Layers from './Layers'

var startViewState = {
  longitude: -2.490144,
  latitude: 54.318746,
  zoom: 5.5,
  maxZoom: 16,
  bearing: 0,
  pitch: 0,
}

export const mapBoxKey = 'pk.eyJ1Ijoia3llaHVlbGluIiwiYSI6ImNqbmxybHhxdjAxbDgza3F4eGtiOTBmemsifQ.8TiCT0l7XHcqIZy29ZrhJA'


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      hexData: null,
      style: 'mapbox://styles/mapbox/dark-v9',
      viewState: { ...startViewState }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();

    csv('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv')
      .then(response => {
        const data = response.map(d => [Number(d.lng), Number(d.lat)]);
        this.setState({ hexData: data })
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }


  _onviewStateChange(viewState) {
    console.log(viewState.bearing)

    this.setState({
      viewState: { ...this.state.viewState, ...viewState }
    });
  }

  camFlyHandler = () => {
    const randPitch = Math.random() * 60
    const zoom = (Math.random() * 6) + 4
    const bearing = (Math.random() * 360) - 180
    this.setState({
      viewState: {
        ...this.state.viewState,
        transitionDuration: 1000,
        transitionEasing: t => t,
        transitionInterpolator: new FlyToInterpolator(),
        bearing: bearing,
        pitch: randPitch,
        zoom: zoom,
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.camFlyHandler} >Random Camera Motion test</button>
        <MapGL

          mapStyle={this.state.style}
          mapboxApiAccessToken={mapBoxKey}
          onViewportChange={viewport => this._onviewStateChange(viewport)}
          {...this.state.viewState}
          width={this.state.windowWidth}
          height={this.state.windowHeight}
        >
          <DeckGL
            layers={Layers(this.state.hexData)}
            viewState={this.state.viewState} />
        </MapGL>
      </div>
    )
  }
}

export default Map