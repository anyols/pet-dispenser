import { Line, LineChart, XAxis, YAxis } from "recharts";
import React, { useState } from "react";
import { nextDay } from "date-fns";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { parse, format } from "date-fns";

function formatDate() {
  const now = new Date();

  const year = now.getFullYear() % 100; // Get last two digits of the year
  const month = now.getMonth() + 1; // Months are zero-indexed
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Optionally, you can pad single-digit values with leading zeros
  const formattedDate = `${day}/${month}/${year} ${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}`;

  return formattedDate;
}

const Dispenser = ({ defaultData, docId, idx }) => {
  const [data, setData] = useState(defaultData);

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, "dispensers");
      const querySnapshot = await getDocs(collectionRef);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const historic = data[0]?.historic;
      if (!historic || historic.length === 0) {
        // Return loading or empty state if historic is not available yet
        return <div>Loading...</div>;
      }

      const dataRender =
        historic?.map((h) => ({
          timestamp: formatDate(h?.timestamp?.toDate()),
          plate: h?.plate,
        })) || [];

      setData(dataRender);
      // console.log(data);
      // console.log("fetching data");
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  const handleRefill = async () => {
    try {
      const dispenserDocRef = doc(db, "dispensers", docId);

      // Update the 'historic' field with the new data
      await updateDoc(dispenserDocRef, {
        storage: 1000,
      });

      // Update the local state to trigger a re-render with the new data
      // setData((prevData) => [...prevData, dataNext]);
    } catch (error) {
      console.error("Error adding refill data to Firestore:", error);
    }
  };

  return (
    <div className="w-full w-full p-10 flex justify-around items-center">
      <span className="text-4xl text-bold text-black">DISPENSER {idx}</span>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="plate" stroke="black" />
        <XAxis dataKey="timestamp" fontSize={10} />
        <YAxis fontSize={10} />
      </LineChart>
      <div className="flex flex-col gap-20">
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 h-20 w-40"
          type="button"
          onClick={fetchData}
        >
          Refresh
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 h-20 w-40"
          type="button"
          onClick={handleRefill}
        >
          Refill
        </button>
      </div>
    </div>
  );
};

export default Dispenser;
