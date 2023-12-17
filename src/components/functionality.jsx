import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import Dispenser from "./dispenser";
import React, { useEffect, useState } from "react";

const formatDate = (date) => {
  // Extract date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  // Extract time components
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format components as needed
  const formattedDate = `${day}/${month}/${year
    .toString()
    .slice(-2)} ${hours}:${minutes}`;

  // console.log(new Date());
  return formattedDate;
};

const Functionality = () => {
  const [dataFeched, setDataFeched] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "dispensers");
        const querySnapshot = await getDocs(collectionRef);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataFeched(data);
        // console.log(data);
        // console.log("fetching data");
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();

    // Refresh data every minute
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  // console.log("Fetched data:", dataFeched);

  // Check if dataFeched[0] and historic exist before accessing their properties
  const historic = dataFeched[0]?.historic;
  if (!historic || historic.length === 0) {
    // Return loading or empty state if historic is not available yet
    return <div>Loading...</div>;
  }

  const dataRender =
    historic?.map((h) => ({
      timestamp: formatDate(h?.timestamp?.toDate()),
      plate: h?.plate,
    })) || [];

  return (
    <div className="flex flex-col bg-[#cbd5e1] h-screen pt-20 inset-0 top-[120px]">
      {dataFeched.map((data, idx) => (
        <Dispenser
          key={idx}
          docId={data.id}
          defaultData={dataRender}
          // handleRefreshF={fetchData()}
          idx={dataFeched[0]?.name?.slice(-1)}
        />
      ))}
    </div>
  );
};

export default Functionality;
