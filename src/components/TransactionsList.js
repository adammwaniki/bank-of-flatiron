import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, searchTerm }) {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(""); // "category" or "description"

  // Filtering and sorting transactions based on the search term and sort criteria
  useEffect(() => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [transactions, searchTerm]);

  useEffect(() => {
    // Sort transactions based on the sort criteria
    if (sortCriteria === "category") {
      setSortedTransactions([...filteredTransactions].sort((a, b) => a.category.localeCompare(b.category)));
    } else if (sortCriteria === "description") {
      setSortedTransactions([...filteredTransactions].sort((a, b) => a.description.localeCompare(b.description)));
    } else {
      // If no sorting criteria is selected, use filtered transactions as sorted transactions
      setSortedTransactions(filteredTransactions);
    }
  }, [filteredTransactions, sortCriteria]);

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
      // Updating the transactions list to remove the bug where it doesn't update the UI immediately after clicking the delete button
      setSortedTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Function to handle sorting by category
  const handleSortByCategory = () => {
    setSortCriteria("category");
  };

  // Function to handle sorting by description
  const handleSortByDescription = () => {
    setSortCriteria("description");
  };

  return (
    <div>
      <button onClick={handleSortByCategory}>Sort by Category</button>
      <button onClick={handleSortByDescription}>Sort by Description</button>
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
          {sortedTransactions.map((transaction, index) => (
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
      {/* Rendering a message if no results are found */}
      {sortedTransactions.length === 0 && <p>No transactions found.</p>}
    </div>
  );
}

export default TransactionsList;
