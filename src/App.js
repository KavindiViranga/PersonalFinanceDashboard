import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import Charts from "./components/Charts";
import BudgetAlert from "./components/BudgetAlert";

import MonthwisePage from "./pages/MonthwisePage";  

import "./styles.css";

function App() {
    const [transactions, setTransactions] = useState(
        JSON.parse(localStorage.getItem("transactions")) || []
    );
    const [budget, setBudget] = useState(
        JSON.parse(localStorage.getItem("budget")) || 1000
    );
    const [editTransaction, setEditTransaction] = useState(null);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem("budget", JSON.stringify(budget));
    }, [budget]);

    const addTransaction = (transaction) => {
        if (editTransaction) {
            setTransactions(
                transactions.map((t) =>
                    t.id === transaction.id ? transaction : t
                )
            );
            setEditTransaction(null);
        } else {
            setTransactions([...transactions, transaction]);
        }
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const startEdit = (transaction) => {
        setEditTransaction(transaction);
    };

    const cancelEdit = () => {
        setEditTransaction(null);
    };

    return (
        <Router>
            <div className="container">
                {/* Navigation Bar */}
                <nav style={{ marginBottom: "20px" }}>
                    <Link to="/" style={{ marginRight: "15px" }}>Dashboard</Link>
                    <Link to="/monthwise">History</Link>
                </nav>

                <Routes>
                    {/* MAIN DASHBOARD PAGE */}
                    <Route
                        path="/"
                        element={
                            <>
                                <h1>Personal Finance Dashboard</h1>
                                <BudgetAlert transactions={transactions} budget={budget} setBudget={setBudget} />
                                <Summary transactions={transactions} />
                                <AddTransaction
                                    addTransaction={addTransaction}
                                    editTransaction={editTransaction}
                                    cancelEdit={cancelEdit}
                                />
                                <TransactionList
                                    transactions={transactions}
                                    deleteTransaction={deleteTransaction}
                                    startEdit={startEdit}
                                />
                                <Charts transactions={transactions} />
                            </>
                        }
                    />

                    {/* MONTHWISE TRANSACTION PAGE */}
                    <Route
                        path="/monthwise"
                        element={<MonthwisePage transactions={transactions} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
