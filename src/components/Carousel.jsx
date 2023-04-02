import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Carousel = () => {
  const [recentImages, setRecentImages] = useState([]);

  const fetchRecentImages = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"), limit(7));
    const querySnapshot = await getDocs(q);

    const images = querySnapshot.docs.map((doc) => doc.data().image);
    setRecentImages(images);
  };

  useEffect(() => {
    fetchRecentImages();
  }, []);

  return (
    <div
      className="carousel carousel-center max-w-md p-4 bg-carousel rounded-box"
      style={{ height: "150px" }}
    >
      {recentImages.map((image, index) => (
        <div key={index} className="carousel-item" style={{ margin: "0 5px" }}>
          <img src={image} className="rounded-box" alt="" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
