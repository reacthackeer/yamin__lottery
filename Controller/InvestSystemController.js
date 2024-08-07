 
const asyncHandler = require('express-async-handler'); 
const { currencyUtils } = require('../utils/utils/CurrencyUtils');  
const Currency = require('../model/Currency');
const RootAsset = require('../model/RootAsset');
const RootTransaction = require('../model/RootTransaction');
const Transaction = require('../model/Transaction'); 
const UserInfoModel = require('../model/User/UserInfoModel');
const UserAccountStatementModel = require('../model/User/UserAccountStatement');
const { comparePasswords } = require('../utils/Password');
const BackupPassword = require('../model/BackupPassword');
const InvestSystemModel = require('../model/Earning/InvestSystem');
const { uid } = require('uid');


const handleAddSingleInvestSystemRequest = asyncHandler(async(req, res, next) => {
    let {amount, duration, status, profit, userId, currency, password, backupPassword} = req.body;

    if(amount && duration && status && profit && userId && currency &&  password && backupPassword) {
        try {
            let currencyResult = await Currency.findOne({where: {
                name: currency
            }});
            if(currencyResult && currencyResult.id){
                try {
                    let getUserResult = await UserInfoModel.findOne({where: {userId}});
                    if(getUserResult && getUserResult.id){
                        if(Number(getUserResult.realBalance) >= Number(amount)){
                            try {
                                let comparePasswordResult = await comparePasswords(backupPassword, getUserResult.password);
                                if(comparePasswordResult.status__code === 204){
                                    try {
                                        let comparePasswordResult = await comparePasswords(password, getUserResult.password);
                                        if(comparePasswordResult.status__code === 200){
                                            try {
                                                let backupPasswordResult = await BackupPassword.findOne({where:{email: getUserResult.email}});
                                                if(backupPasswordResult && backupPasswordResult.id > 0){
                                                    delete req.body.extra;
                                                    let postData = { 
                                                        userId,
                                                        amount,
                                                        duration,
                                                        profit,
                                                        status
                                                    }
                                                    try { 
                                                        let result = await  InvestSystemModel.create(postData);
                                                        if(result && result.id){
                                                            res.json(result);
                                                        }else{
                                                            next(new Error('Internal server error!'))
                                                        }
                                                    } catch (error) {  
                                                        next(new Error(error.message))
                                                    }
                                                }else{
                                                    next(new Error('Backup password not founded!'))
                                                }
                                            } catch (error) {
                                                next(new Error(error.message))
                                            }
                                        }else{
                                            next(new Error('Incorrect old password provided!'));
                                        }
                                    } catch (error) {
                                        next(new Error('Incorrect password password provided!'));
                                    }
                                }else{
                                    next(new Error('Password and backup password must be different!'));
                                }
                            } catch (error) {
                                next(new Error('Please use different password!'));
                            }

                        }else{
                            next(new Error('Balance low!'))
                        }
                    }else{
                        next(new Error('Internal server error!'))
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('Currency not found!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid post requested!'))
    }
    
});

const handleDeleteSingleInvestRequest = asyncHandler(async(req, res, next) => {
    let {id} = req.body;
    if(id){
        try {
            let result = await InvestSystemModel.destroy({where: {id}});
            if(result && result > 0){    
                res.json(result);
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid delete requested!'))
    }
});

const handleGetAllInvestSystemRequest = asyncHandler(async(req, res, next) => {
    let query = req.query; 
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    let whereInfo = query;
        delete whereInfo.limit;
        delete whereInfo.page; 
    try {
        let allUserInfo = await InvestSystemModel.findAll({offset: skip, limit: limit});
            if(allUserInfo && allUserInfo.length){
                try {
                    let allUserCountInfo = await InvestSystemModel.count({});
                    res.json({users: allUserInfo, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('Data not founded!'))
            }
    } catch (error) {
        next(new Error(error.message))
    }
});

const handleConfirmInvestRequest = asyncHandler(async(req, res, next) => {
    let {id, userId} = req.body;
    if(id && userId){
        try {
            let getDepositRequestResult = await InvestSystemModel.findOne({where: {id, status: 'pending'}});
            if(getDepositRequestResult && getDepositRequestResult.id){
                try {
                    let getDepositUserResult = await UserInfoModel.findOne({where:{userId}});
                    if(getDepositUserResult &&  getDepositUserResult.id){
                        if(Number(getDepositUserResult.realBalance) >= Number(getDepositRequestResult.amount)){
                            try {
                                let getCurrencyResult = await Currency.findOne({where: {name: 'Usd'}});
                                if(getCurrencyResult && getCurrencyResult.id){
                                    let amount = Number(getDepositRequestResult.amount) / Number(getCurrencyResult.currencyRate);
                                    let couponRootAssetUpdate = currencyUtils.investRootAssetUpdateConfirm(amount, 'REAL', 'Wallet'); 
                                    try {
                                        let result = await RootAsset.increment(couponRootAssetUpdate,{where: {id: 1}})
                                        if(result && result[0] && result[0][1]){ 
                                            try {
                                                let result = await RootTransaction.create({
                                                    userId: userId,
                                                    isIn: 'false',
                                                    transactionType: 'investSystem',
                                                    amount: Number(amount),
                                                    balanceType: 'REAL'
                                                })
                                                if(result && result.id){ 
                                                    let userDepositTransactionGenerate = {
                                                        array: [
                                                            {
                                                                typeName: 'INVEST SYSTEM',
                                                                isIn: 'OUT',
                                                                amount: Number(amount),
                                                                txrId: uid(8),
                                                                userId: getDepositUserResult.dataValues.userId,
                                                                sourceId: getDepositUserResult.dataValues.referralCode,
                                                                balanceType: 'REAL'
                                                            }
                                                        ],
                                                        increment: Number(amount)
                                                    }
                                                    try {
                                                        let result = await Transaction.bulkCreate(userDepositTransactionGenerate.array);
                                                        if(result && result?.length){
                                                            try {
                                                                let result = await UserInfoModel.increment({
                                                                    [`realBalance`]: -Number(userDepositTransactionGenerate.increment)
                                                                },{
                                                                    where: {userId: userId}
                                                                })  
                                                                if(result && result[0] && result[0][1] > 0){
                                                                    try {
                                                                        let resultUpdateDepositRequest = await InvestSystemModel.update({status: 'complete'},{
                                                                            where: {id: id}
                                                                        })
                                                                        if(resultUpdateDepositRequest &&  resultUpdateDepositRequest[0]){
                                                                            try {
                                                                                let userStatementUpdateResult = await UserAccountStatementModel.increment({
                                                                                    'totalBalance': -Number(userDepositTransactionGenerate.increment),
                                                                                    'totalOut':  Number(userDepositTransactionGenerate.increment), 
                                                                                    'totalInvest':  Number(userDepositTransactionGenerate.increment), 
                                                                                    'totalInvestPending':  Number(userDepositTransactionGenerate.increment), 
                                                                                    'totalWithdrawal':  Number(userDepositTransactionGenerate.increment), 
                                                                                },{where: {userId}}) 
                                                                                if(userStatementUpdateResult && userStatementUpdateResult[0] && userStatementUpdateResult[0][1]){
                                                                                    try {
                                                                                        let result = await UserInfoModel.findOne({where: {userId: userId}});
                                                                                        if(result && result.id){
                                                                                            res.json(result);
                                                                                        }else{
                                                                                            next(new Error('Internal server error!'))
                                                                                        }
                                                                                    } catch (error) {
                                                                                        next(new Error(error.message))
                                                                                    }
                                                                                }else{
                                                                                    next(new Error('Internal server request!'))
                                                                                }
                                                                            } catch (error) { 
                                                                                next(new Error(error.message));
                                                                            } 
                                                                        }else{
                                                                            next(new Error('Internal server error!'))
                                                                        }
                                                                    } catch (error) {
                                                                        next(new Error(error.message))
                                                                    }
                                                                }else{
                                                                    next(new Error('Internal server error!'))
                                                                }
                                                            } catch (error) {
                                                                next(new Error(error.message))
                                                            }
                                                        }else{
                                                            next(new Error('Internal server error!'))
                                                        }
                                                    } catch (error) {
                                                        next(new Error(error.message))
                                                    }
                                                }else{
                                                    next(new Error('Internal server error!'))
                                                }
                                            } catch (error) {
                                                next(new Error(error.message))
                                            }
                                        }else{
                                            next(new Error('Internal server error!'))
                                        }
                                    } catch (error) { 
                                        next(new Error(error.message))
                                    }
                                }else{ 
                                    next(new Error('Internal server error!'));
                                }
                            } catch (error) {
                                next(new Error(error.message))
                            }
                        }else{
                            next(new Error('Balance Low'))
                        }
                    }else{
                        next(new Error('Internal server error!'));
                    }
                } catch (error) {
                    next(new Error('Internal server error!'));
                }
            }else{ 
                next(new Error('Internal server error'));
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});


const handleFinishInvestRequest = asyncHandler(async(req, res, next) => {
    let {id, userId} = req.body;
    if(id && userId){
        try {
            let getDepositRequestResult = await InvestSystemModel.findOne({where: {id, status: 'complete'}});
            if(getDepositRequestResult && getDepositRequestResult.id){
                try {
                    let getDepositUserResult = await UserInfoModel.findOne({where:{userId}});
                    if(getDepositUserResult &&  getDepositUserResult.id){
                        if(Number(Number(getDepositRequestResult.amount)+Number(getDepositRequestResult.profit))){
                            try {
                                let getCurrencyResult = await Currency.findOne({where: {name: 'Usd'}});
                                if(getCurrencyResult && getCurrencyResult.id){
                                    let amount = Number(Number(getDepositRequestResult.amount)+Number(getDepositRequestResult.profit)) / Number(getCurrencyResult.currencyRate);
                                    let couponRootAssetUpdate = currencyUtils.investRootAssetUpdateFinish(amount - Number(getDepositRequestResult.profit), Number(getDepositRequestResult.profit)); 
                                    try {
                                        let result = await RootAsset.increment(couponRootAssetUpdate,{where: {id: 1}})
                                        if(result && result[0] && result[0][1]){ 
                                            try {
                                                let result = await RootTransaction.create({
                                                    userId: userId,
                                                    isIn: 'true',
                                                    transactionType: 'investSystemProfit',
                                                    amount: Number(amount),
                                                    balanceType: 'REAL'
                                                })
                                                if(result && result.id){ 
                                                    let userDepositTransactionGenerate = {
                                                        array: [
                                                            {
                                                                typeName: 'INVEST SYSTEM PROFIT',
                                                                isIn: 'IN',
                                                                amount: Number(amount),
                                                                txrId: uid(8),
                                                                userId: getDepositUserResult.dataValues.userId,
                                                                sourceId: getDepositUserResult.dataValues.referralCode,
                                                                balanceType: 'REAL'
                                                            }
                                                        ],
                                                        increment: Number(amount)
                                                    }
                                                    try {
                                                        let result = await Transaction.bulkCreate(userDepositTransactionGenerate.array);
                                                        if(result && result?.length){
                                                            try {
                                                                let result = await UserInfoModel.increment({
                                                                    [`realBalance`]: Number(userDepositTransactionGenerate.increment)
                                                                },{
                                                                    where: {userId: userId}
                                                                })  
                                                                if(result && result[0] && result[0][1] > 0){
                                                                    try {
                                                                        let resultUpdateDepositRequest = await InvestSystemModel.update({status: 'finish'},{
                                                                            where: {id: id}
                                                                        })
                                                                        if(resultUpdateDepositRequest &&  resultUpdateDepositRequest[0]){
                                                                            try {
                                                                                let userStatementUpdateResult = await UserAccountStatementModel.increment({
                                                                                    'totalBalance': Number(userDepositTransactionGenerate.increment),
                                                                                    'totalIn':  Number(userDepositTransactionGenerate.increment),  
                                                                                    'totalInvestProfit':   Number(getDepositRequestResult.profit), 
                                                                                    'totalEarning':   Number(getDepositRequestResult.profit), 
                                                                                    'totalDeposit':  Number(userDepositTransactionGenerate.increment),  
                                                                                },{where: {userId}}) 
                                                                                if(userStatementUpdateResult && userStatementUpdateResult[0] && userStatementUpdateResult[0][1]){
                                                                                    try {
                                                                                        let result = await UserInfoModel.findOne({where: {userId: userId}});
                                                                                        if(result && result.id){
                                                                                            res.json(result);
                                                                                        }else{
                                                                                            next(new Error('Internal server error!'))
                                                                                        }
                                                                                    } catch (error) {
                                                                                        next(new Error(error.message))
                                                                                    }
                                                                                }else{
                                                                                    next(new Error('Internal server request!'))
                                                                                }
                                                                            } catch (error) { 
                                                                                next(new Error(error.message));
                                                                            } 
                                                                        }else{
                                                                            next(new Error('Internal server error!'))
                                                                        }
                                                                    } catch (error) {
                                                                        next(new Error(error.message))
                                                                    }
                                                                }else{
                                                                    next(new Error('Internal server error!'))
                                                                }
                                                            } catch (error) {
                                                                next(new Error(error.message))
                                                            }
                                                        }else{
                                                            next(new Error('Internal server error!'))
                                                        }
                                                    } catch (error) {
                                                        next(new Error(error.message))
                                                    }
                                                }else{
                                                    next(new Error('Internal server error!'))
                                                }
                                            } catch (error) {
                                                next(new Error(error.message))
                                            }
                                        }else{
                                            next(new Error('Internal server error!'))
                                        }
                                    } catch (error) { 
                                        next(new Error(error.message))
                                    }
                                }else{ 
                                    next(new Error('Internal server error!'));
                                }
                            } catch (error) {
                                next(new Error(error.message))
                            }
                        }else{
                            next(new Error('Balance Low'))
                        }
                    }else{
                        next(new Error('Internal server error!'));
                    }
                } catch (error) {
                    next(new Error('Internal server error!'));
                }
            }else{ 
                next(new Error('Internal server error'));
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});
const handleBlockRequestedUserInvestSystem =  asyncHandler(async(req, res, next) => {
    let {id, userId} = req.body;
    if(id && userId){
        try {
            let result = await InvestSystemModel.destroy({where: {id}});
            if(result && result > 0){   
                try {
                    let result = await UserInfoModel.update({block: 'true'}, {where: {userId}});
                    if(result && result[0]){
                        try {
                            let result = await UserInfoModel.findOne({where: {userId: userId}});
                            if(result && result.id){
                                res.json(result);
                            }else{
                                next(new Error('Internal server error!'))
                            }
                        } catch (error) {
                            next(new Error(error.message))
                        }
                    }else{
                        next(new Error('Internal server error!'))
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid delete requested!'))
    }
});

module.exports = { 
    handleAddSingleInvestSystemRequest,
    handleDeleteSingleInvestRequest,
    handleGetAllInvestSystemRequest,
    handleConfirmInvestRequest,
    handleBlockRequestedUserInvestSystem,
    handleFinishInvestRequest
}
