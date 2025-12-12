import React from "react";

const Summary = ({ transactions }) => {
    const income = transactions
        .filter((t) => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = income + expense;

    return (
        <div className="summary">
            <div>
                <h3>Balance</h3>
                <p>${balance.toFixed(2)}</p>
            </div>
            <div>
                <h3>Income</h3>
                <p>${income.toFixed(2)}</p>
            </div>
            <div>
                <h3>Expenses</h3>
                <p>${Math.abs(expense).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Summary;
