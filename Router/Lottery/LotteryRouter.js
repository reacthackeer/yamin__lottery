const { handleGetAllSystemLottery, handleAddSingleSystemLottery, handleDeleteSingleSystemLottery, handleUpdateSingleSystemLottery, handleBuyMultipleLottery, handleGetSingleUserLottery, handleGetSingleUserLotteryBuyHistory, handleGetSingleUserTransactionHistory, handleGetSingleUserEarningHistory, handleGetSingleUserDepositHistory, handleGetSingleUserTransferHistory, handleGetSingleUserWithdrawalHistory, handleGetAllAllLotteryByPhone } = require('../../Controller/Lottery/LotteryController');
const { authenticateTokenAdmin, authenticateToken } = require('../../utils/jsonwebtoken');

const lotteryRouter = require('express').Router();

lotteryRouter.post('/system/add', authenticateTokenAdmin, handleAddSingleSystemLottery);
lotteryRouter.post('/buy', authenticateToken, handleBuyMultipleLottery);
lotteryRouter.get('/get-all/:userId', authenticateToken, handleGetSingleUserLottery);
lotteryRouter.get('/buy-history/get-all/:userId', authenticateToken, handleGetSingleUserLotteryBuyHistory);
lotteryRouter.get('/transaction-history/get-all/:userId', authenticateToken, handleGetSingleUserTransactionHistory);
lotteryRouter.get('/earning-history/get-all/:userId', authenticateToken, handleGetSingleUserEarningHistory);
lotteryRouter.get('/deposit-history/get-all/:userId', authenticateToken, handleGetSingleUserDepositHistory);
lotteryRouter.get('/transfer-history/get-all/:userId', authenticateToken, handleGetSingleUserTransferHistory);
lotteryRouter.get('/withdrawal-history/get-all/:userId', authenticateToken, handleGetSingleUserWithdrawalHistory);
lotteryRouter.post('/lottery-history/get-all/:phoneNumber', authenticateToken, handleGetAllAllLotteryByPhone);
lotteryRouter.get('/system/get-all', authenticateTokenAdmin, handleGetAllSystemLottery);
lotteryRouter.delete('/system/single/:itemId', authenticateTokenAdmin, handleDeleteSingleSystemLottery);
lotteryRouter.put('/system/single/:itemId', authenticateTokenAdmin, handleUpdateSingleSystemLottery);

module.exports = lotteryRouter;