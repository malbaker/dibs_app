import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Filter from "./Filter";

function ViewPage() {
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

  return (
    <div className="hero-content text-center sticky top-0 max-w-screen-md flex flex-col overflow-x-hidden">
      <div className="max-w-fit mx-auto pt-20 justify-center">
        <h1 className="text-4xl text-dm-blue font-semibold mb-8">View Items</h1>
        <Filter
          filter={filter}
          setFilter={setFilter}
          data={data}
          setPosts={setPosts}
        />

        <div className="overflow-x-auto">
          <Cards data={posts} />
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
