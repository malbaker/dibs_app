// Returns coordinate points of device
async function getCoordinates() {
  const uri = `https://www.googleapis.com/geolocation/v1/geolocate?key=${
    import.meta.env.VITE_FIREBASE_APIKEY
  }`;
  let response = await fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.location;
}

// Uses reverse geocoding to lookup an address based on coordinates
export default async function getLocation(coordinates) {
  coordinates = coordinates || (await getCoordinates());

  const uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
    coordinates.lat
  },${coordinates.lng}&key=${import.meta.env.VITE_FIREBASE_APIKEY}`;
  let response = await fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();

  return Object.assign({}, coordinates, {
    formated_address: data.results[0].formatted_address,
  });
}
