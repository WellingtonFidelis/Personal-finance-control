import React from 'react';
import axios from "axios";

const api = axios.create({ baseURL: 'api' });

export default function App() {

  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      // const axiosObject = await api.get('/transaction?period=2019-07');
      const { data } = await api.get('/transaction?period=2019-01');
      console.log(data.transactions);

      setTransactions(data.transactions);

    }

    fetchTransactions();
  }, []);
  // array of dependecis not full will be once executed.
  return (
    <div className="container">
      <h1 className="center">Final Challenge - Bootcamp Full Stack</h1>
      {
        transactions.map((transaction) => {
          return <p key={transaction._id}>{transaction.description}</p>;
        })
      }
    </div>
  );
}
