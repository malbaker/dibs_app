import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Filter from "./Filter";
import { getCoordinates } from "./Location";
import PropTypes from "prop-types";
import { FiMap, FaListUl } from "react-icons/all";

function ViewPage() {
  const queryParams = new URLSearchParams(location.search);
  const [mapView, setMapView] = useState(queryParams.has("mapView") ? queryParams.get("mapView") == "true" : false);
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
    <div className="hero-content text-center sticky top-0 max-w-screen flex flex-col overflow-x-hidden w-full h-full">
      <div className="pt-20 items-center w-full h-full">
        <div className="flex items-center justify-between px-4 md:px-24 lg:px-32">
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

        {mapView ? <MapView posts={posts} /> : <ListView posts={posts} />}
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

function MapView({ posts }) {
  useEffect(() => {
    const icons = {
      furniture: "\uefed",
      "home decor": "\ue21e",
      clothing: "\uf19e",
      "tech items": "\ue1b1",
      other: "\ue5d3",
    };
    // Initialize and add the map
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
        label: {
          text: "\ue7ff",
          fontFamily: "Material Symbols Outlined",
          color: "#ffffff",
          fontSize: "18px",
        },
      });

      // Gets rid of default map markers
      map.setOptions({
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
      });

      // Puts a marker on the map for each item
      for (const post of posts) {
        new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(
            post.coords.latitude,
            post.coords.longitude,
          ),
          label: {
            text: icons[post.category],
            fontFamily: "Material Symbols Outlined",
            color: "#ffffff",
            fontSize: "18px",
          },
        });
      }
    }

    initMap();
  }, [posts]);

  return <div id="map" className="w-full h-full"></div>;
}
ListView.propTypes = {
  posts: PropTypes.array,
};

MapView.propTypes = {
  posts: PropTypes.array,
};
export default ViewPage;
