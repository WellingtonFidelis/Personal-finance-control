const express = require('express');
const transactionRouter = express.Router();

transactionRouter.get('/', async (request, response) => {
  const { query } = request;

  try {
    if (!query.period) {
      throw new Error(
        `É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm.`
      );
    }

    const { period } = query;

    if (period.length !== 7) {
      throw new Error(
        `Periodo inválido o parâmetro "period" deve estar no formato yyyy-mm.`
      );
    }

    response.send({
      length: 2,
      transactions: ['transaction1', 'transaction2'],
    });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.post('/', async (request, response) => {
  const { body } = request;

  try {
    if (JSON.stringify(body) === '{}') {
      throw new Error(`Conteúdo inexistente`);
    }

    // Mongo DB

    response.send({
      status: 'Ok',
    });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.put('/:id', async (request, response) => {
  const { body, params } = request;

  try {
    // if (!params.id) {
    //   throw new Error(`É necessário informar o Id da transação.`);
    // }

    if (JSON.stringify(body) === '{}') {
      throw new Error(`Conteúdo inexistente`);
    }

    // Mongo DB

    response.send({
      status: 'Ok',
    });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

module.exports = transactionRouter;
