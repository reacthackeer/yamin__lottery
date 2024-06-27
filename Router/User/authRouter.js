const { handleRegisterUser, handleLoginUser, handleValidateToken, handleChangePassword, handleGetSingleAddress, handleUpdateAddress, handleAddAdmin, handleGetallAdmin, handleDeleteAdmin, handleConfirmAdmin, handleGetAllUser, handleCancelSingleUser, handleBlockSingleUser, handleAddSingleBackupPassword, handleUserBalanceTransfer, handleGetSingleInfo } = require('../../Controller/User/UserController');
const { authenticateToken, authenticateTokenAdmin } = require('../../utils/jsonwebtoken');

const authRouter = require('express').Router();

authRouter.post('/register', handleRegisterUser);
authRouter.post('/login', handleLoginUser);
authRouter.post('/validate/:tokenId', authenticateToken, handleValidateToken);
authRouter.post('/update/password', authenticateToken, handleChangePassword);
authRouter.post('/update/address', authenticateToken, handleUpdateAddress);
authRouter.post('/add/admin', authenticateToken, handleAddAdmin);
authRouter.get('/get-all/user', authenticateTokenAdmin, handleGetAllUser);
authRouter.put('/cancel/user/:itemId', authenticateTokenAdmin, handleCancelSingleUser);
authRouter.put('/block/user/:itemId', authenticateTokenAdmin, handleBlockSingleUser);
authRouter.get('/get/admin/:adminType', authenticateTokenAdmin, handleGetallAdmin);
authRouter.delete('/delete/admin/:itemId', authenticateTokenAdmin, handleDeleteAdmin);
authRouter.put('/confirm/admin/:itemId', authenticateTokenAdmin, handleConfirmAdmin);
authRouter.get('/address/:userId', authenticateToken, handleGetSingleAddress);
authRouter.get('/info/:userId', authenticateToken, handleGetSingleInfo);
authRouter.post('/add', authenticateToken, handleAddSingleBackupPassword);
authRouter.put('/balance-transfer', authenticateToken, handleUserBalanceTransfer);

module.exports = authRouter;