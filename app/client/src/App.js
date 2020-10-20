import React from 'react';
import axios from 'axios';
import { Container, Form, Row, Col } from 'react-bootstrap';

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
    <Container>
      <section style={{ backgroundColor: 'yellow' }}>
        <Row>
          <Col xs={12}>
            <h1 className="center">Final Challenge - Bootcamp Full Stack</h1>
          </Col>
        </Row>
      </section>
      <section style={{ backgroundColor: 'green' }}>
        <Row>
          <Col></Col>
          <Col md={3} xs={12}>
            <h3>Financial Control</h3>
          </Col>
          <Col></Col>
        </Row>
        <Form>
          <Row>
            <Col></Col>
            <Col xs={12} md={4}>
              <Form.Group>
                <Form.Control as="select">
                  {transactions.map((transaction) => {
                    return (
                      <option key={transaction._id}>
                        {transaction.yearMonth}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </section>
      <section>
        <Row>
          <Col>
            {transactions.map((transaction) => {
              return <p key={transaction._id}>{transaction.description}</p>;
            })}
          </Col>
        </Row>
      </section>
    </Container>
  );
}
