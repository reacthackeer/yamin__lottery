
const { handleAddSingleCurrency, handleGetAllCurrency, handleDeleteSingleCurrency, handleGetAllReferralIncome, handleToggleCurrency, handleReferralBalanceTransfer } = require('../Controller/currencyController');
const { authenticateToken, authenticateTokenAdmin } = require('../utils/jsonwebtoken'); 

const currencyRouter = require('express').Router();

currencyRouter.post('/create', authenticateTokenAdmin, handleAddSingleCurrency);
currencyRouter.post('/referral-balance-transfer', authenticateToken, handleReferralBalanceTransfer);
currencyRouter.post('/toggle/:currencyName', authenticateToken, handleToggleCurrency);
currencyRouter.delete('/delete', authenticateTokenAdmin, handleDeleteSingleCurrency);
currencyRouter.get('/get-all', authenticateToken, handleGetAllCurrency);
currencyRouter.get('/get-all-referral-income/:userId', authenticateToken, handleGetAllReferralIncome);

module.exports = {
    currencyRouter
}