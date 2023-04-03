// Returns coordinate points of device
async function getCoordinates() {
  return new Promise((resolve, reject) => {
    // Checks if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
        });
      });
    } else {
      reject("geolocation doesn't work");
    }
  });
}

// Uses reverse geocoding to lookup an address based on coordinates
export default async function getAddress(coordinates) {
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
    formatted_address: data.results[0].formatted_address || "...",
  });
}