/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Filter from "./Filter";
import { getCoordinates } from "./Location";
import PropTypes from "prop-types";
import { FiMap, FaListUl } from "react-icons/all";

function ViewPage() {
  const [mapView, setMapView] = useState(false);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"), orderBy("timeadded", "desc"));
      const querySnapshot = await getDocs(q);

      setData(() => {
        let data = querySnapshot.docs.map((doc) => {
          let post = doc.data();
          post["id"] = doc.id;
          post["status"] = post.claimed ? "claimed" : "unclaimed";
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
      className="hero-content text-center sticky top-0 max-w-screen flex flex-col overflow-x-hidden"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="pt-20 items-center" style={{ width: "100%", height: "100%" }}>
        <div className="flex items-center justify-between px-4">
          <button
            onClick={onToggle}
            className="mr-auto -mt-12 rounded-full bg-buttons p-2 flex justify-center items-center w-12"
          >
            {mapView ? (
              <FaListUl className="text-white" />
            ) : (
              <FiMap className="text-white" />
            )}
          </button>
          <Filter
            filter={filter}
            setFilter={setFilter}
            data={data}
            setPosts={setPosts}
          />
        </div>

        {mapView ? <MapView /> : <ListView posts={posts} />}
      </div>
    </div>
  );
}

function ListView({ posts }) {
  return (
    <div className="-mt-4">
      <Cards data={posts} />
    </div>
  );
}

function MapView() {
  // Initialize and add the map
  let map;

  useEffect(() => {
    let map;
    async function initMap() {
      // Uses your geolocation to position map
      const coordinates = await getCoordinates();
      const position = coordinates
        ? { lat: coordinates.lat, lng: coordinates.lng }
        : { lat: 42.349925, lng: -71.10313 };

      // Request needed libraries.
      const { Map } = await google.maps.importLibrary("maps");

      // The map, centered at hardcoded location
      map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
      });

      // A marker positioned at your coordinates
      const marker = new google.maps.Marker({
        map: map,
        position: position,
      });
    }

    initMap().then(() => console.log(document.getElementById("map")));
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
ListView.propTypes = {
  posts: PropTypes.array,
};
export default ViewPage;
