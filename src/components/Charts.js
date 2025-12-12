import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Charts = ({ transactions }) => {
    const income = transactions
        .filter((t) => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const pieData = {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                data: [income, expense],
                backgroundColor: ["#4caf50", "#f44336"],
                hoverOffset: 4,
            },
        ],
    };

    const barData = {
        labels: transactions.map((t) => t.text),
        datasets: [
            {
                label: "Amount",
                data: transactions.map((t) => t.amount),
                backgroundColor: transactions.map((t) =>
                    t.amount > 0 ? "#4caf50" : "#f44336"
                ),
            },
        ],
    };

    return (
        <div className="charts">
            <h3>Spending Overview</h3>
            <div className="chart-container" style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                {/* Pie chart with fixed size */}
                <div style={{ width: "300px", height: "300px" }}>
                    <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                </div>

                {/* Bar chart with fixed size */}
                <div style={{ width: "400px", height: "300px" }}>
                    <Bar data={barData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
