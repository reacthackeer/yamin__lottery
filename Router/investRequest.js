const { handleAddSingleInvestSystemRequest, handleConfirmInvestRequest, handleDeleteSingleInvestRequest, handleBlockRequestedUserInvestSystem, handleGetAllInvestSystemRequest, handleFinishInvestRequest } = require('../Controller/InvestSystemController');
const { authenticateToken, authenticateTokenAdmin } = require('../utils/jsonwebtoken');

const investRequestRouter = require('express').Router();

investRequestRouter.post('/create', authenticateToken, handleAddSingleInvestSystemRequest);
investRequestRouter.post('/confirm', authenticateTokenAdmin, handleConfirmInvestRequest);
investRequestRouter.post('/finish', authenticateTokenAdmin, handleFinishInvestRequest);
investRequestRouter.delete('/delete', authenticateTokenAdmin, handleDeleteSingleInvestRequest);
investRequestRouter.delete('/block', authenticateTokenAdmin, handleBlockRequestedUserInvestSystem);
investRequestRouter.get('/get-all', authenticateTokenAdmin, handleGetAllInvestSystemRequest);

module.exports = {
    investRequestRouter
}