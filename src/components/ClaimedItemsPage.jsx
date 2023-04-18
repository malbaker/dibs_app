import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Cards from "./Cards";

function ClaimedItemsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"), where("claimed", "==", true));
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
    <div style={{ marginTop: "50px" }}>
      <Cards data={data} />
    </div>
  );
}

export default ClaimedItemsPage;
