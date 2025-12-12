import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const initialIncomeCategories = ["Salary", "Bonus", "Investments", "Other Income"];
const initialExpenseCategories = ["Food", "Transport", "Entertainment", "Bills", "Others"];

const AddTransaction = ({ addTransaction, editTransaction, cancelEdit }) => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState(""); // start empty
    const [id, setId] = useState(null);

    const [incomeCategories, setIncomeCategories] = useState(initialIncomeCategories);
    const [expenseCategories, setExpenseCategories] = useState(initialExpenseCategories);

    useEffect(() => {
        if (editTransaction) {
            setText(editTransaction.text);
            setAmount(Math.abs(editTransaction.amount));
            setType(editTransaction.amount > 0 ? "income" : "expense");
            setDate(editTransaction.date);
            setCategory(editTransaction.category);
            setId(editTransaction.id);
        }
    }, [editTransaction]);

    useEffect(() => {
        // clear category when type changes
        setCategory("");
    }, [type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !date || !category) return; // category now mandatory

        // Add the new category if it doesn't exist
        if (type === "income" && !incomeCategories.includes(category)) {
            setIncomeCategories([...incomeCategories, category]);
        }
        if (type === "expense" && !expenseCategories.includes(category)) {
            setExpenseCategories([...expenseCategories, category]);
        }

        const newTransaction = {
            id: id || uuidv4(),
            text: text || "",
            amount: type === "income" ? parseFloat(amount) : -Math.abs(amount),
            date,
            category,
        };

        addTransaction(newTransaction);

        // reset form
        setText("");
        setAmount("");
        setType("income");
        setDate("");
        setCategory("");
        setId(null);
        if (cancelEdit) cancelEdit();
    };

    const currentCategories = type === "income" ? incomeCategories : expenseCategories;

    return (
        <form onSubmit={handleSubmit} className="add-transaction-form">
            <h3>{id ? "Edit Transaction" : "Add Transaction"}</h3>

            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <label>Category:</label>
            <input
                list="categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select or type a category"
            />
            <datalist id="categories">
                {currentCategories.map((c, idx) => (
                    <option key={idx} value={c} />
                ))}
            </datalist>

            <label>Description (optional):</label>
            <input
                type="text"
                placeholder="Description"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <label>Amount:</label>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <label>Date:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button type="submit">{id ? "Update" : "Add"}</button>
            {id && <button type="button" onClick={cancelEdit}>Cancel</button>}
        </form>
    );
};

export default AddTransaction;
