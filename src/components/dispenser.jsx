import { Line, LineChart, XAxis, YAxis } from "recharts";
import React, { useState } from "react";
import { nextDay } from "date-fns";

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

const Dispenser = ({ defaultData, idx }) => {
  const [data, setData] = useState(defaultData);

  const handleRefill = () => {
    const dataNext = {
      timestamp: formatDate(),
      value: 200,
    };

    setData((prevData) => [...prevData, dataNext]);
  };

  console.log("defaultdata", defaultData[0].plate);

  return (
    <div className="w-full w-full p-10 flex justify-around items-center">
      <span className="text-4xl text-bold text-black">DISPENSER {idx}</span>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="value" stroke="black" />
        <XAxis dataKey="timestamp" fontSize={10} />
        <YAxis fontSize={10} />
      </LineChart>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 h-20 w-40"
        type="button"
        onClick={handleRefill}
      >
        Refill
      </button>
    </div>
  );
};

export default Dispenser;
