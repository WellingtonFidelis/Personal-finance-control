import React from 'react';
import axios from "axios";
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

    }

    fetchTransactions();
  }, []);
  // array of dependecis not full will be once executed.
  return (
    <Container>
      <section style={{ backgroundColor: "yellow" }}>
        <Row>
          <Col xs={12}>
            <h1 className="center">Final Challenge - Bootcamp Full Stack</h1>
          </Col>
        </Row>
      </section>
      <section style={{ backgroundColor: "green" }}>
        <Row>
          <Col></Col>
          <Col md={3} xs={12}>
            <h3>Financial Control</h3>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Form>
            <Row>
              <Col className="fs-">
                <Form.Group>
                  <Form.Control as='select'>
                    <option>OI</option>
                  </Form.Control>
                </Form.Group>

              </Col>
            </Row>
          </Form>

        </Row>
      </section>
      <section>
        <Row>
          <Col>
            {
              transactions.map((transaction) => {
                return <p key={transaction._id}>{transaction.description}</p>;
              })
            }
          </Col>
        </Row>
      </section>

    </Container >
  );
}
