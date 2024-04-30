import React, { useState } from "react";
//import TransactionsList from "./TransactionsList";

//making a small change so that the form is handled separately which will allow us to handle rendering the UI and the logic for rendering the UI separately

// Defining the TransactionForm component that the user will see
const TransactionForm = ({ date, description, category, amount, handleChange, handleSubmit }) => (
  <div className="ui segment">
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="inline fields">
        <input type="date" name="date" value={date} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={description} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={category} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" step="0.01" value={amount} onChange={handleChange} />
      </div>
      <button className="ui button" type="submit">
        Add Transaction
      </button>
    </form>
  </div>
);

// Passing in add transaction as a prop
function AddTransactionForm({ addTransaction }) {

  // Defining state variables and their setter functions
  const [inputs, setInputs] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  // Destructuring state variables for convenience
  // NB they have to be after the array destructuring that we've done above or else the inputs won't be accessible to the code
  const { date, description, category, amount } = inputs; 

  function handleChange(event) {

    const { name, value } = event.target; // Destructuring name and value from event.target so that it handles all of them at once

    // Updating the state with all the values in the form
    setInputs(prevState => ({
        ...prevState,
        [name]: value // Dynamically setting the property name using the 'name' attribute of the input field
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date,
          description,
          category,
          amount
        })
      });
      const data = await response.json();
      addTransaction(data); // Updating the local state with the new transaction
      setInputs({
        date: "",
        description: "",
        category: "",
        amount: ""
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  }

  // Rendering TransactionForm component passing in necessary props
  return (
    <div>
      <TransactionForm 
        date={date} 
        description={description} 
        category={category} 
        amount={amount} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}

export default AddTransactionForm;
