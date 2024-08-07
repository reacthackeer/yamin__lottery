 
const asyncHandler = require('express-async-handler'); 
const { currencyUtils } = require('../utils/utils/CurrencyUtils'); 
const DepositRequest = require('../model/DepositRequest');
const Currency = require('../model/Currency');
const RootAsset = require('../model/RootAsset');
const RootTransaction = require('../model/RootTransaction');
const Transaction = require('../model/Transaction');
const UserInfoModel = require('../model/User/UserInfoModel');
const UserAccountStatementModel = require('../model/User/UserAccountStatement');

const handleAddSingleDepositRequest = asyncHandler(async(req, res, next) => {
    let {wallet ,idType ,account ,currency ,amount , referrance, userId} = req.body;

    if(wallet && idType && account && currency && amount && referrance && userId) {
        try {
            let result = await  DepositRequest.create(req.body);
            if(result && result.id > 0){
                res.json(result);
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) { 
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid post requested!'))
    }
    
});


const handleDeleteSingleDepositRequest = asyncHandler(async(req, res, next) => {
    let {id} = req.body;
    if(id){
        try {
            let result = await DepositRequest.destroy({where: {id}});
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

const handleGetAllDepositRequest = asyncHandler(async(req, res, next) => {
    try {
        let result = await DepositRequest.findAll({where: {
            status: 'pending'
        }});
        if(result && result.length > 0){
            res.json(result)
        }else{
            res.json([])
        }
    } catch (error) {
        next(new Error(error.message))
    }
});


const handleConfirmDepositRequest = asyncHandler(async(req, res, next) => {
    let {id, userId} = req.body;
    if(id && userId){
        try {
            let getDepositRequestResult = await DepositRequest.findOne({where: {id, status: 'pending'}});
            if(getDepositRequestResult && getDepositRequestResult.id > 0){
                try {
                    // todo work here
                    let getDepositUserResult = await UserInfoModel.findOne({where:{userId}});
                    if(getDepositUserResult &&  getDepositUserResult.id > 0){
                        try {
                            let getCurrencyResult = await Currency.findOne({where: {name: getDepositRequestResult.currency}});
                            if(getCurrencyResult && getCurrencyResult.id > 0){
                                let amount = Number(getDepositRequestResult.amount) / Number(getCurrencyResult.currencyRate);
                                let couponRootAssetUpdate = currencyUtils.couponRootAssetUpdate(amount, 'REAL', 'Wallet'); 
                                try {
                                    let result = await RootAsset.increment(couponRootAssetUpdate,{where: {id: 1}}) 
                                    if(result && result[0] && result[0][1]){ 
                                        try {
                                            let result = await RootTransaction.create({
                                                userId: userId,
                                                isIn: 'true',
                                                transactionType: 'realWalletDeposit',
                                                amount: Number(amount),
                                                balanceType: 'REAL'
                                            })
                                            if(result && result.id){ 
                                                let userDepositTransactionGenerate = currencyUtils.couponRootAssetUserTransactionGenerator(amount, 'REAL', userId, getDepositUserResult.referralCode);
                                                try {
                                                    let result = await Transaction.bulkCreate(userDepositTransactionGenerate.array);
                                                    if(result && result?.length > 0){
                                                        try {
                                                            let result = await UserInfoModel.increment({
                                                                [`realBalance`]: userDepositTransactionGenerate.increment
                                                            },{
                                                                where: {userId: userId}
                                                            })  
                                                            if(result && result[0] && result[0][1] > 0){
                                                                try {
                                                                    let resultUpdateDepositRequest = await DepositRequest.update({status: 'complete'},{
                                                                        where: {id: id}
                                                                    })
                                                                    if(resultUpdateDepositRequest &&  resultUpdateDepositRequest[0]){
                                                                        try {
                                                                            let userStatementUpdateResult = await UserAccountStatementModel.increment({
                                                                                'totalBalance': userDepositTransactionGenerate.increment,
                                                                                'totalDeposit':  userDepositTransactionGenerate.increment,
                                                                                'totalIn':  userDepositTransactionGenerate.increment
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


const handleBlockRequestedUser =  asyncHandler(async(req, res, next) => {
    let {id, userId} = req.body;
    if(id && userId){
        try {
            let result = await DepositRequest.destroy({where: {id}});
            if(result && result > 0){   
                try {
                    let result = await UserInfoModel.update({block: 'true'}, {where: {userId}});
                    if(result && result[0] > 0){
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
    handleAddSingleDepositRequest,
    handleDeleteSingleDepositRequest,
    handleGetAllDepositRequest,
    handleBlockRequestedUser,
    handleConfirmDepositRequest
}