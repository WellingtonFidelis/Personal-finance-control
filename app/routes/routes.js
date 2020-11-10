const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

transactionRouter.get('/periods', async (request, response) => {
  try {
    const allPeriods = await service.getAllPeriods();

    response.send({
      status: 'OK',
      length: allPeriods.length,
      transactions: allPeriods,
    });
  } catch (message) {
    response.status(400).send({
      status: 'FAIL',
      error: message,
    });
  }
});

transactionRouter.get('/', async (request, response) => {
  const { query } = request;

  try {
    if (!query.period) {
      throw new Error(
        `É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm.`
      );
    }

    const { period } = query;
    // se colocar period[0] o test do json no Boomerango pega, se tirar o json é retornado no front-end
    if (period.length !== 7) {
      throw new Error(
        `Periodo inválido o parâmetro "period" deve estar no formato yyyy-mm.`
      );
    }

    const filteredTransactions = await service.getTransactionsFrom(period);

    response.send({
      length: filteredTransactions.length,
      transactions: filteredTransactions,
    });
  } catch ({ message }) {
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
    const { description, value, category, year, month, day, type } = body;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;

    const postTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };

    const newTransaction = await service.postTransaction(postTransaction);

    response.send({
      status: 'Ok',
      transaction: newTransaction,
    });
  } catch ({ message }) {
    response.status(400).send({ error: message });
  }
});

transactionRouter.put('/', async (request, response) => {
  try {
    throw new Error(`Periodo inexistente ou não informado.`);
  } catch ({ message }) {
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
    const { description, value, category, year, month, day, type } = body;
    const { id } = params;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;

    const updateTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };

    const updatedTransaction = await service.updateTransaction(
      id,
      updateTransaction
    );

    response.send({
      status: 'Ok',
      transaction: updatedTransaction,
    });
  } catch ({ message }) {
    response.status(400).send({ error: message });
  }
});

transactionRouter.delete('/:id', async (request, response) => {
  const { params } = request;

  try {
    const { id } = params;

    const didDelete = await service.deleteTransaction(id);

    if (didDelete) {
      response.send({
        status: 'Ok',
        message: `Transação de número: ${id}, deletada com sucesso.0`,
      });
    }
    throw new Error('Não foi possível excluir');
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
