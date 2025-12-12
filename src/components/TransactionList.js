import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const TransactionList = ({ transactions, deleteTransaction, startEdit }) => {
    return (
        <div>
            <h3>Transactions</h3>
            <ul className="transaction-list">
                {transactions.map((t) => (
                    <li key={t.id} className={t.amount > 0 ? "income" : "expense"}>
                        <div>
                            <strong>{t.text}</strong> (${t.amount.toFixed(2)})<br />
                            <small>{t.category} | {t.date}</small>
                        </div>
                        <div>
                            <button onClick={() => startEdit(t)}>
                                <FaEdit />
                            </button>
                            <button onClick={() => deleteTransaction(t.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
