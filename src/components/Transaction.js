import React from "react";
import PropTypes from "prop-types";

const Transaction = ({ id, date, description, category, amount, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Send delete request to backend API
      await fetch(`http://localhost:8001/transactions/${id}`, {
        method: "DELETE",
      });
      // Invoke the onDelete callback to notify the parent component of the deletion
      onDelete(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

// PropTypes for type-checking props
// I'll need to make more notes on this since its supposed to be best practice to always include them
Transaction.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  amount: PropTypes.number,
  onDelete: PropTypes.func,
};

export default Transaction;
