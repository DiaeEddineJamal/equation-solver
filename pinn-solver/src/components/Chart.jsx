import React, { useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/Chart.css";

function Chart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous chart instance
    }

    const ctx = chartRef.current.getContext("2d");
    const labels = data.x || data.t; // Use x for ODE or t for PDE
    const datasets = data.y
      ? [
          {
            label: "ODE Solution",
            data: data.y,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
          },
        ]
      : data.u.map((row, index) => ({
          label: `Time: ${data.t[index]}`,
          data: row,
          borderColor: `rgba(${(index + 1) * 50}, 100, 150, 1)`,
          backgroundColor: `rgba(${(index + 1) * 50}, 100, 150, 0.2)`,
          fill: false,
        }));

    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: data.y ? "x (ODE)" : "x (PDE)",
            },
          },
          y: {
            title: {
              display: true,
              text: "y or u",
            },
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={chartRef} className="chart-container" />;
}

export default Chart;
