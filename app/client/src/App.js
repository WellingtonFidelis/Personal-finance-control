import React from 'react';
import axios from 'axios';
import { Container, Form, Row, Col } from 'react-bootstrap';

import './index.css';

const api = axios.create({ baseURL: 'api' });

export default function App() {
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      // const axiosObject = await api.get('/transaction?period=2019-07');
      const { data } = await api.get('/transaction?period=2019-01');
      console.log(data.transactions);

      setTransactions(data.transactions);
    };

    fetchTransactions();
  }, []);
  // array of dependecies not full will be once executed.
  /* trocar o bootstrap por html basic e usar styled Components */
  return (
    <div className="container">
      <section id="section-main-title">
        <div className="row">
          <div className="col col-xs-12">
            <h1 className="center">Final Challenge - Bootcamp Full Stack</h1>
          </div>
        </div>
      </section>
      <section id="section-financial">
        <div className="row">
          <div className="col"></div>
          <div className="col col-md-3 col-xs-12">
            <h3>Financial Control</h3>
          </div>
          <div className="col"></div>
        </div>
        <form>
          <div className="row">
            <div className="col"></div>
              <div className="col col-md-4 col-xs-12">
              <div className="form-group">
                <select className="form-control">
                  {transactions.map((transaction) => {
                    return (
                      <option className="option-text" key={transaction._id}>
                        {transaction.yearMonth}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </form>
      </section>
      <section>
        <div className="row">
          <div className="col">
            {transactions.map((transaction) => {
              return <p key={transaction._id}>{transaction.description}</p>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
