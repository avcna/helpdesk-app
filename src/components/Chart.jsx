import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr, avg, resolved, received, rejected }) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: arr,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointBorderColor: "#fff",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tickets Per Month This Year",
      },
    },
  };
  return (
    <div className="grid w-full grid-cols-3 bg-white border-2 border-gray-100 dark:bg-slate-600">
      <div className="col-span-2 px-6 py-4 border-r dark:bg-white">
        <Line data={data} options={options} />
      </div>
      <div className="grid grid-flow-row">
        <div className="flex items-center justify-center border-b">
          <div className="h-fit">
            <p className="text-center">Resolved</p>
            <p className="text-center text-[28px] font-semibold">{resolved}</p>
          </div>
        </div>
        <div className="flex items-center justify-center border-b">
          <div className="h-fit">
            <p>Received</p>
            <p className="text-center text-[28px] font-semibold">{received}</p>
          </div>
        </div>
        <div className="flex items-center justify-center border-b">
          <div className="h-fit">
            <p>Rejected</p>
            <p className="text-center text-[28px] font-semibold">{rejected}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-fit">
            <p>Average monthly tickets</p>
            <p className="text-center text-[28px] font-semibold">{avg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
