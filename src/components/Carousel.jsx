import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Carousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"), orderBy("timeadded", "desc"), limit(7));
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
        <div key={post.id} className="carousel-item" style={{ margin: "0 5px" }}>
          <img src={post.image} className="rounded-box" alt="" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
