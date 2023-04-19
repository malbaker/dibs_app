import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const ClaimedCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "posts"),
        where("claimed", "==", true),
        orderBy("timeadded", "desc"),
        limit(7),
      );
      const querySnapshot = await getDocs(q);
      setData(() => {
        let data = querySnapshot.docs.map((doc) => {
          let post = doc.data();
          post["id"] = doc.id;
          return post;
        });

        return data;
      });
    };

    fetchData();
  }, []);

  return (
    <div
      className="carousel carousel-center max-w-md p-4 bg-carousel rounded-box"
      style={{ height: "150px" }}
    >
      {data.map((post) => (
        <div key={post.id} className="carousel-item mx-1.5 my-1 w-1/2">
          <img src={post.image} className="rounded-box" alt="" />
        </div>
      ))}
    </div>
  );
};

export default ClaimedCarousel;
