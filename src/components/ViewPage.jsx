import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Filter from "./Filter";
import { getCoordinates } from "./Location";
import PropTypes from "prop-types";
import { FiMap, FaListUl } from "react-icons/all";

function ViewPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const [mapView, setMapView] = useState(
    queryParams.has("mapView") ? queryParams.get("mapView") === "true" : false,
  );
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    status:
      queryParams.has("status") & (queryParams.get("status") == "claimed")
        ? ["claimed"]
        : [],
  });

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
      furniture: {
        codePoint: "\uefed",
        name: "Furniture",
        svg: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/chair/default/48px.svg",
      },
      "home decor": {
        codePoint: "\ue21e",
        name: "Home Decor",
        svg: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/floor_lamp/default/48px.svg",
      },
      clothing: {
        codePoint: "\uf19e",
        name: "Clothing",
        svg: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/checkroom/default/48px.svg",
      },
      "tech items": {
        codePoint: "\ue1b1",
        name: "Tech",
        svg: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/devices/default/48px.svg",
      },
      other: {
        codePoint: "\ue5d3",
        name: "Other",
        svg: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/pending/default/48px.svg",
      },
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
            text: icons[post.category].codePoint,
            fontFamily: "Material Symbols Outlined",
            color: "#ffffff",
            fontSize: "18px",
          },
        });
      }

      const legend = document.getElementById("legend");
      // Adds each icon and and a label for it to the legend
      for (const key in icons) {
        const type = icons[key];
        const name = type.name;
        const svg = type.svg;
        const div = document.createElement("div");

        div.innerHTML = '<img src="' + svg + '"> ' + name;
        legend.appendChild(div);
      }
      // Adds legend to map
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    }

    initMap();
  }, [posts]);

  return (
    <div className="w-full h-full">
      <div id="map" className="w-full h-full"></div>
      <div id="legend">
        <h3>Legend</h3>
      </div>
    </div>
  );
}
ListView.propTypes = {
  posts: PropTypes.array,
};

MapView.propTypes = {
  posts: PropTypes.array,
};
export default ViewPage;
