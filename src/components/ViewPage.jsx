/* eslint-disable */
import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Filter from "./Filter";
import { getCoordinates } from "./Location";

function ViewPage() {
  const [mapView, setMapView] = useState(false);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"), where("claimed", "==", false));
      const querySnapshot = await getDocs(q);

      setData(() => {
        let data = querySnapshot.docs.map((doc) => {
          let post = doc.data();
          post["id"] = doc.id;
          return post;
        });

        setPosts(data);
        return data;
      });
    };

    fetchData();
  }, []);

  function onToggle() {
    setMapView(!mapView);
  }
  return (
    <div
      className="hero-content text-center sticky top-0 max-w-screen-md flex flex-col overflow-x-hidden"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="pt-20 justify-center"
        style={{ width: "100%", height: "100%" }}
      >
        <input
          className="flex flex-col my-4 mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary"
          type="checkbox"
          role="switch"
          checked={mapView}
          onChange={onToggle}
          style={{ left: "0%" }}
          id="flexSwitchCheckDefault01"
        />

        <Filter
          filter={filter}
          setFilter={setFilter}
          data={data}
          setPosts={setPosts}
        />

        {mapView ? <MapView /> : <ListView posts={posts} />}
      </div>
    </div>
  );
}

function ListView({ posts }) {
  return (
    <div className="overflow-x-auto -mt-6">
      <Cards data={posts} />
    </div>
  );
}

function MapView() {
  // Initialize and add the map
  let map;

  async function initMap() {
    // Uses your geolocation to position map
    const coordinates =  await getCoordinates()
    const position = coordinates ? {lat: coordinates.lat, lng: coordinates.lng} : {lat: 42.349925, lng: -71.103130}
    
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");

    // The map, centered at hardcoded location
    map = new Map(document.getElementById("map"), {
      zoom: 17,
      center: position,
    });

    // A marker positioned at your coordinates
    const marker = new google.maps.Marker({
      map: map,
      position: position,
    });
  }

  useEffect(() => {
    initMap().then(() => console.log(document.getElementById("map")));
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default ViewPage;
