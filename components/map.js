/// app.js
import { LineLayer } from '@deck.gl/layers';
import DeckGL, { GeoJsonLayer, TileLayer, BitmapLayer } from 'deck.gl';
import { useState } from 'react';
import { StaticMap } from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGl6em51dHMiLCJhIjoiY2wwYW82dTZpMDBvdDNlb3Z6MmZrbHd0MiJ9.0c1tDWBNi3zJa9V6qQl1pg';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson';

export default function MapComponent(props) {
  
  const layer = new TileLayer({
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',

    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: props => {
      const {
        bbox: { west, south, east, north }
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
  });

  const Glayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: COUNTRIES,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getLineColor: d => colorToRGBArray(d.properties.color),
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30

  });


  return (
    <div style={{width:'50vw'}}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={props.layerList}


      >


      </DeckGL>
    </div>

  );
}


