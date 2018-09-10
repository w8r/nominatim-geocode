import * as nominatim from "../";
import L from 'leaflet';

window.nominatim = nominatim;

const map = L.map('map').setView([52.0780487,4.3043022], 14);
const tiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">' +
                 'OpenStreetMap</a> contributors, &copy; ' +
                 '<a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

function geocode(latlng) {
  nominatim.reverse({
    lat: latlng.lat,
    lon: latlng.lng
  }, (err, result) => {
    if (!err) {
      map.openPopup(
        '<pre>' + JSON.stringify(result.address, 0, 2) + '</pre>', latlng);
    }
  });
}

map.on('click', (e) => geocode(e.latlng));

L.DomEvent.on(document.querySelector('#search-form'), 'submit', function(e) {
  e.preventDefault();
  let query = this['query'].value;

  nominatim.geocode({
    q: query
  }, (err, results) => {
    document.querySelector('#result').innerHTML = '<pre>' +
      JSON.stringify(results, 0, 2) + '<pre>';
  })
});

geocode(map.getCenter());

