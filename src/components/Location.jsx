const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${import.meta.env.VITE_FIREBASE_APIKEY}`

export default async function getCoordinates() {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

  const data = await response.json()

  console.log(data.location)
  return data.location
}
