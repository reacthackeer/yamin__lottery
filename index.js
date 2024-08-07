const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelize = require('./config/database');
const authRouter = require('./Router/User/authRouter'); 
const { currencyRouter } = require('./Router/currency');
const { walletRouter } = require('./Router/Wallet');
const { couponRouter } = require('./Router/Coupon');  
const { depositRequestRouter } = require('./Router/depositRequest');
const { dashboardRouter } = require('./Router/DashboardRouter');
const lotteryRouter = require('./Router/Lottery/LotteryRouter');
const { withdrawalRequestRouter } = require('./Router/withdrawalRequest');
const { investRequestRouter } = require('./Router/investRequest');
const { prizeRouter } = require('./Router/PrizeRouter');
// application configuration start
app.use(bodyParser.json());
app.use(fileUpload({limits: '100mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));

// application configuration end

// handle database sync
const handleSyncDatabase = async () => {
    try {
        await sequelize.sync({force: false});  
        console.log('Successfully database connected!')
    } catch (error) { 
        console.log(error.message);
    }
}
handleSyncDatabase();


let allAccessOrigin = [];

let allEnv = process.env;
for(var item in allEnv){ 
    if(item.indexOf('ACCESS__WEB__NUMBER__') !== -1){
        let domainValue = allEnv[item]; 
        allAccessOrigin.push(domainValue)
    }
}  
const allowedOrigins = [...allAccessOrigin];  
const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,REDIRECT', // Include the 'REDIRECT' method
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.static('public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/currency', currencyRouter);
app.use('/api/v1/wallet', walletRouter);
app.use('/api/v1/coupon', couponRouter);
app.use('/api/v1/prize', prizeRouter);
app.use('/api/v1/deposit-request', depositRequestRouter);
app.use('/api/v1/withdrawal-request', withdrawalRequestRouter);
app.use('/api/v1/invest-request', investRequestRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/lottery', lotteryRouter);

let port = process.env.PORT || 40000; 
app.listen(port, (err)=> {
    if(!err){
        console.log(`Server is running on port http://localhost:${port}`)
    }
});
// 980209
// Error handling middleware
app.use((err, req, res, next) => {

    // Set the status code for the response
    res.status(err.status || 500);
    
        // Send the error message as JSON
        res.json({
            error: {
            message: err.message
            }
        });
});