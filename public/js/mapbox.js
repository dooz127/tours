/* eslint-disable */
export const displayMap = (locations) => {

  mapboxgl.accessToken = 'pk.eyJ1IjoiZG9vejEyNyIsImEiOiJja29seXNqbWcyMW1lMm5wd3Jhc2J4MGYxIn0.2H6i1zGYeQuhSYAsCcCVTw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dooz127/ckom1nreg1t0g18qu0greskrb',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 10
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((location) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    }).setLngLat(location.coordinates).addTo(map);

    // add popup
    new mapboxgl.Popup({ offset: 30 }).setLngLat(location.coordinates).setHTML(`<p>Day ${location.day}: ${location.description}`).addTo(map);

    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
}
