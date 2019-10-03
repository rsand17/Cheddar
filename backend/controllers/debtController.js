import bodyParser from 'body-parser';

import {parseError, buildResponse} from '../utilities/controllerFunctions';
import {getAllDebts, createDebt, editDebt, deleteDebt} from '../models/debtDAO';

export default (app) => {
  app.get('/Cheddar/Debts/test', async (req, res) => {
    let data;
    try {
      console.log('it worked');
      data = 'Debts - Hello there';
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // create debt
  app.post('/Cheddar/Debts/:uid', async (req, res) => {
    let debt = {
      category: req.body.category,
      nickname: req.body.nickname,
      initial: req.body.initial,
      currBalance: req.body.currBalance,
      interestRate: req.body.interestRate
    };

    let data;
    try {
      data = await createDebt(req.params.uid, debt);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // edit debt
  app.put('/Cheddar/Debts/:uid/:debtID', async (req, res) => {
    let changes = {
      nickname: req.body.nickname,
      initial: req.body.initial,
      currBalance: req.body.currBalance,
      interestRate: req.body.interestRate
    };

    let data;
    try {
      data = await editDebt(req.params.uid, req.params.debtID, changes);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // delete debt
  app.delete('/Cheddar/Debts/Debt/:uid/:debtID', async (req, res) => {
    let data;
    try {
      data = await deleteDebt(req.params.uid, req.params.debtID);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // get all debt
  app.get('/Cheddar/Debts/:uid', async (req, res) => {
    let data;
    try {
      data = await getAllDebts(req.params.uid);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });
};