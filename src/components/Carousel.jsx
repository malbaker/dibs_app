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
import PropTypes from "prop-types";

const Carousel = ({ claimed }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "posts"),
        where("claimed", "==", claimed),
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
  }, [claimed]);

  return (
    <div className="carousel carousel-center max-w-md p-4 bg-carousel rounded-box h-40 md:h-48">
      {data.map((post) => (
        <div key={post.id} className="carousel-item my-1 mx-1.5 w-3/5 md:w-2/3">
          <img
            src={post.image}
            className="rounded-box"
            alt={
              post.additionalNotes && post.additionalNotes !== ""
                ? post.additionalNotes
                : "This post has no additional notes."
            }
          />
        </div>
      ))}
    </div>
  );
};
Carousel.propTypes = {
  claimed: PropTypes.bool,
};
export default Carousel;
