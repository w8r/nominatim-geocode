import jsonp from 'jsonp';
import qs    from 'query-string';

const prefix   = 'nominatim_callback_';
const BASE_URL = 'https://nominatim.openstreetmap.org/';

let cbCounter = 0;

const noop = () => {};

export function geocode (options = { q: '' }, callback = noop, context) {
  options.format = 'json';
  options.addressdetails = 1;

  const url = BASE_URL + 'search?' + qs.stringify(options);
  const name = options.callback || prefix + (cbCounter++);
  jsonp(url, { prefix, param: 'json_callback', name }, (...args) => {
    console.log(args)
    callback.apply(context, args);
  });
}

export function reverse (options = {}, callback = noop, context) {
  options.format = 'json';
  options.addressdetails = 1;

  const url  = BASE_URL + 'reverse?' + qs.stringify(options);
  const name = options.callback || prefix + (cbCounter++);
  jsonp(url, { prefix, param: 'json_callback', name }, (...args) => {
    callback.apply(context, args);
  });
}
