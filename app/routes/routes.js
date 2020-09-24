const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

transactionRouter.get('/', async (request, response) => {
  const { query } = request;

  try {
    if (!query.period) {
      throw new Error(
        `É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm.`
      );
    }

    const { period } = query;
    console.log(period);
    console.log(period[0]);

    if (period[0].length !== 7) {
      throw new Error(
        `Periodo inválido o parâmetro "period" deve estar no formato yyyy-mm.`
      );
    }

    const filteredTransactions = await service.getTransactionsFrom(period[0]);

    response.send({
      length: filteredTransactions.length,
      transactions: filteredTransactions,
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

transactionRouter.put('/', async (request, response) => {
  try {
    throw new Error(`Periodo inexistente ou não informado.`);
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

transactionRouter.delete('/:id', async (request, response) => {
  const { params } = request;

  try {
    // Mongo DB

    response.send({
      status: 'Ok',
    });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.delete('/', async (request, response) => {
  try {
    throw new Error(`Periodo inexistente ou não informado.`);
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});
module.exports = transactionRouter;
