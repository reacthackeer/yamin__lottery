const { handleGetLoggerDashboardInfo } = require('../Controller/dashboardController');
const { authenticateToken } = require('../utils/jsonwebtoken');


const dashboardRouter = require('express').Router();

dashboardRouter.get('/get-single/:userId', authenticateToken, handleGetLoggerDashboardInfo);

module.exports = {
    dashboardRouter
}