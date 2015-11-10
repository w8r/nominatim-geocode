# nominatim-geocode

Wrapper for Nominatim geocoding service. Uses JSONP

[Nominatim docs](http://wiki.openstreetmap.org/wiki/Nominatim).

## [Demo](https://w8r.github.io/nominatim-geocode/example/)

## Usage

```javascript
import nominatim from 'nominatim-geocode';

nominatim.reverse({ lat: 55, lng: 33 }, (err, result) => {
  if(!err) console.log(result);
  // {
  //  address: {...},
  //  display_name: "22, Golestan, Iran"
  //  lat: "36.9631102"
  //  lon: "54.9534786"
  //  osm_id: "196174062"
  //  ...
  // }
});

nominatim.geocode({
  q: 'Unter den Linden, Berlin'
}, (err, results) {
  if (!err) {
    console.log(results.map((location) => {
      return location.display_name;
    });
    // [
    //  "Unter den Linden, Scheunenviertel, Митте, Berlin, 10117, Germany",
    //  "Унтер-ден-Линден, Scheunenviertel, Митте, Berlin, 10117, Germany",
    //  "Under the linden trees, Митте, Berlin, 10117, Germany",
    //  "Under the linden trees, Митте, Berlin, 10117, Germany",
    //  "Under the linden trees, Митте, Berlin, 10117, Germany",
    //  "Under the linden trees, Митте, Berlin, 10117, Germany",
    //  "Унтер-ден-Линден, Митте, Berlin, 10117, Germany",
    //  "Унтер-ден-Линден, Митте, Berlin, 10117, Germany"
    //]
  }
});
```

## License

MIT
