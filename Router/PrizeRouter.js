
const { handleAddPrize, handleDeleteSinglePrize, handleGetAllPrize, handleSubscribeEmail } = require('../Controller/prizeController');
const { authenticateTokenAdmin } = require('../utils/jsonwebtoken');

const prizeRouter = require('express').Router();

prizeRouter.post('/add', authenticateTokenAdmin, handleAddPrize); 
prizeRouter.post('/subscribe', handleSubscribeEmail); 
prizeRouter.delete('/delete', authenticateTokenAdmin, handleDeleteSinglePrize);
prizeRouter.get('/get-all', handleGetAllPrize);
module.exports = {
    prizeRouter
}