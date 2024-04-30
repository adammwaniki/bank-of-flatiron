import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";


function AccountContainer() {
  const [transactions, setTransactions] = useState([]);

  // We will use useEffect to fetch data from the API because it allows react to not block rendering but instead re-render whenever the data is available.
  // We want it to fire once and only once, so including an empty dependency array would guarantee that it fires on mount
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  //function to handle adding a new transaction
  function addTransaction(transaction) {
    setTransactions(prevTransactions => [...prevTransactions, transaction]);
  }

  // Function to handle search
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  
  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList transactions={transactions} searchTerm={searchTerm} />
    </div>
  );
}

export default AccountContainer;