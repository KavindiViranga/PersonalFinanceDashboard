import React, { useState, useEffect } from "react";

const BudgetAlert = ({ transactions, budget, setBudget }) => {
    const [expenses, setExpenses] = useState(0);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const totalExpenses = transactions
            .filter((t) => t.amount < 0)
            .reduce((acc, t) => acc + Math.abs(t.amount), 0);
        setExpenses(totalExpenses);

        setAlert(totalExpenses > budget);
    }, [transactions, budget]);

    const handleBudgetChange = (e) => {
        setBudget(parseFloat(e.target.value) || 0);
    };

    return (
        <div className="budget-alert">
            <div>
                <label>Set Monthly Budget: </label>
                <input
                    type="number"
                    value={budget}
                    onChange={handleBudgetChange}
                />
            </div>
            {alert && (
                <p className="alert-text">
                    ⚠️ Warning! Your expenses (${expenses.toFixed(2)}) exceed your budget (${budget.toFixed(2)})!
                </p>
            )}
        </div>
    );
};

export default BudgetAlert;
