 
const asyncHandler = require('express-async-handler'); 
const { currencyUtils } = require('../utils/utils/CurrencyUtils');  
const Currency = require('../model/Currency');
const RootAsset = require('../model/RootAsset');
const RootTransaction = require('../model/RootTransaction');
const Transaction = require('../model/Transaction');
const WithdrawalRequest = require('../model/WithdrawalRequest');
const UserInfoModel = require('../model/User/UserInfoModel');
const UserAccountStatementModel = require('../model/User/UserAccountStatement');
const { comparePasswords } = require('../utils/Password');
const BackupPassword = require('../model/BackupPassword');


const handleAddSingleWithdrawalRequest = asyncHandler(async(req, res, next) => {
    let {wallet ,idType ,account , amount , reference, userId, currency, extra} = req.body;
    const {password, backupPassword} = extra;
    if(wallet && idType && account && currency && amount && reference && userId && currency && extra && password && backupPassword) {
        try {
            let currencyResult = await Currency.findOne({where: {
                name: currency
            }});
            if(currencyResult && currencyResult.id){

                let amountConvertToDollar = Number(amount) / Number(currencyResult.currencyRate); 
                

                try {
                    let getUserResult = await UserInfoModel.findOne({where: {userId}});
                    if(getUserResult && getUserResult.id){
                        if(Number(getUserResult.realBalance) >= Number(amount) / Number(currencyResult.currencyRate)){
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
                                                        ...req.body,
                                                        currency: 'Usd',
                                                        amount: amountConvertToDollar
                                                    }
                                                    try { 
                                                        let result = await  WithdrawalRequest.create(postData);
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


const handleDeleteSingleWithdrawalRequest = asyncHandler(async(req, res, next) => {
    let {id} = req.body;
    if(id){
        try {
            let result = await WithdrawalRequest.destroy({where: {id}});
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

const handleGetAllWithdrawalRequest = asyncHandler(async(req, res, next) => {
    try {
        let result = await WithdrawalRequest.findAll({where: {
            status: 'pending'
        }});
        if(result && result.length){
            res.json(result)
        }else{
            res.json([])
        }
    } catch (error) {
        next(new Error(error.message))
    }
});

const handleConfirmWithdrawalRequest = asyncHandler(async(req, res, next) => {
    let {id, userId} = req.body;
    if(id && userId){
        try {
            let getDepositRequestResult = await WithdrawalRequest.findOne({where: {id, status: 'pending'}});
            if(getDepositRequestResult && getDepositRequestResult.id){
                try {
                    let getDepositUserResult = await UserInfoModel.findOne({where:{userId}});
                    if(getDepositUserResult &&  getDepositUserResult.id){
                        if(Number(getDepositUserResult.realBalance) >= (Number(getDepositRequestResult.amount) + (Number(getDepositRequestResult.amount) / 100) * (Number(process.env.realWithdrawalFee || 0)))){
                            try {
                                let getCurrencyResult = await Currency.findOne({where: {name: getDepositRequestResult.currency}});
                                if(getCurrencyResult && getCurrencyResult.id){
                                    let amount = Number(getDepositRequestResult.amount) / Number(getCurrencyResult.currencyRate);
                                    let couponRootAssetUpdate = currencyUtils.couponRootAssetUpdateDeposit(amount, 'REAL', 'Wallet'); 
                                    try {
                                        let result = await RootAsset.increment(couponRootAssetUpdate,{where: {id: 1}})
                                        if(result && result[0] && result[0][1]){ 
                                            try {
                                                let result = await RootTransaction.create({
                                                    userId: userId,
                                                    isIn: 'false',
                                                    transactionType: 'realWalletWithdrawal',
                                                    amount: Number(amount),
                                                    balanceType: 'REAL'
                                                })
                                                if(result && result.id){ 
                                                    let userDepositTransactionGenerate = currencyUtils.couponRootAssetUserTransactionGeneratorWithdrawal(amount, 'REAL', userId, getDepositUserResult.referralCode);
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
                                                                        let resultUpdateDepositRequest = await WithdrawalRequest.update({status: 'complete'},{
                                                                            where: {id: id}
                                                                        })
                                                                        if(resultUpdateDepositRequest &&  resultUpdateDepositRequest[0]){
                                                                            try {
                                                                                let userStatementUpdateResult = await UserAccountStatementModel.increment({
                                                                                    'totalBalance': -Number(userDepositTransactionGenerate.increment),
                                                                                    'totalOut':  Number(userDepositTransactionGenerate.increment), 
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

const handleBlockRequestedUserWithdrawal =  asyncHandler(async(req, res, next) => {
    let {id, userId} = req.body;
    if(id && userId){
        try {
            let result = await WithdrawalRequest.destroy({where: {id}});
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
    handleAddSingleWithdrawalRequest ,
    handleDeleteSingleWithdrawalRequest ,
    handleGetAllWithdrawalRequest,
    handleBlockRequestedUserWithdrawal, 
    handleConfirmWithdrawalRequest
}
