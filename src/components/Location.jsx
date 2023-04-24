// Returns coordinate points of device
export async function getCoordinates() {
  return new Promise((resolve, reject) => {
    // Checks if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: parseFloat(position.coords.latitude.toFixed(3)),
            lng: parseFloat(position.coords.longitude.toFixed(3)),
          });
        },
        (error) => {
          console.log(error);
          reject(error);
        },
      );
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

// Uses geocoding to take formatted address and convert it to coordinates
export async function geocodeAddress(address, callback) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      callback(location.lat(), location.lng());
    } else {
      console.error(
        `Geocode was not successful for the following reason: ${status}`,
      );
    }
  });
}

export async function getDistance(userlat, userlng, postlat, postlng) {
  const { spherical } = await google.maps.importLibrary("geometry");
  const p1 = new google.maps.LatLng(userlat, userlng);
  const p2 = new google.maps.LatLng(postlat, postlng);
  //console.log("user location: ", p1.toString(), "post location: ", p2.toString());
  const distance = spherical.computeDistanceBetween(p1, p2);
  return distance;
}
