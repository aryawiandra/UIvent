import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const EventsOverTimeChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartView, setChartView] = useState("monthly");

  const data = {
    monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      data: [12, 19, 15, 27, 34, 28, 42],
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      data: [5, 12, 8, 15, 20, 18],
    },
  };

  useEffect(() => {
    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data[chartView].labels,
        datasets: [
          {
            label: "Events Created",
            data: data[chartView].data,
            backgroundColor: "rgba(234, 179, 8, 0.1)",
            borderColor: "rgba(234, 179, 8, 1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartView]);
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Events Created Over Time
        </h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-xs rounded-full ${
              chartView === "monthly"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setChartView("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-full ${
              chartView === "weekly"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setChartView("weekly")}
          >
            Weekly
          </button>
        </div>
      </div>
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default EventsOverTimeChart;