import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, searchTerm }) {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Filter transactions based on the search term and update state
  useEffect(() => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [transactions, searchTerm]);

  const handleDelete = async (id) => {
    try {
      // Send delete request to backend API
      await fetch(`http://localhost:8001/transactions/${id}`, {
        method: "DELETE",
      });
      // Remove the deleted item from the transactions list
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setFilteredTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Actions</h3>
            </th>
          </tr>
          {filteredTransactions.map((transaction, index) => (
            <Transaction
              key={index}
              id={transaction.id}
              date={transaction.date}
              description={transaction.description}
              category={transaction.category}
              amount={Number(transaction.amount)} //converting the string into a number
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {/* Render a message if no results are found */}
      {filteredTransactions.length === 0 && <p>No transactions found.</p>}
    </div>
  );
}

export default TransactionsList;
