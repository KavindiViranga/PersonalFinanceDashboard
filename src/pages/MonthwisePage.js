import React from "react";

const MonthwisePage = ({ transactions }) => {
    // Group transactions monthwise
    const grouped = transactions.reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString("default", { month: "long", year: "numeric" });

        if (!acc[month]) acc[month] = [];
        acc[month].push(t);
        return acc;
    }, {});

    return (
        <div style={{ padding: "20px" }}>
            <h2>Transactions - Monthwise</h2>

            {Object.keys(grouped).map((month) => (
                <div key={month} style={{ marginBottom: "30px" }}>
                    <h3>{month}</h3>
                    <table border="1" cellPadding="10" width="100%">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grouped[month].map((t, index) => (
                                <tr key={index}>
                                    <td>{t.date}</td>
                                    <td>{t.description}</td>
                                    <td>{t.type}</td>
                                    <td>{t.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default MonthwisePage;
