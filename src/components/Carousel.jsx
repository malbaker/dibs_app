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
import { HashLink } from "react-router-hash-link";

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
    <div className="carousel carousel-center p-4 bg-gray-300 rounded-box h-36 md:h-48">
      {data.map((post) => (
        <div
          key={post.id}
          className="carousel-item h-full w-2/5 mx-1.5 justify-center"
        >
          <HashLink to={`/view#${post.id}`}>
            <img
              src={post.image}
              className="rounded-box w-full h-full object-cover"
              alt={
                post.additionalNotes && post.additionalNotes !== ""
                  ? post.additionalNotes
                  : "This post has no additional notes."
              }
            />
          </HashLink>
        </div>
      ))}
    </div>
  );
};
Carousel.propTypes = {
  claimed: PropTypes.bool,
};
export default Carousel;
