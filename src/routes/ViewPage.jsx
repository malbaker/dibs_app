import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Table from "../components/Table";

function ViewPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <div className="hero-content text-center sticky top-0 max-w-screen-sm">
      <div className="max-w-fit mx-auto pt-20">
        <h1 className="text-4xl font-semibold mb-8">View Items</h1>
        <div className="overflow-x-auto">
          <Table data={posts} />
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
