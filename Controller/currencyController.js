
const asyncHandler = require('express-async-handler');  
const Currency = require('../model/Currency');
const Transaction = require('../model/Transaction');
const { Op } = require('sequelize');
const UserInfoModel = require('../model/User/UserInfoModel');
const { comparePasswords } = require('../utils/Password');
const BackupPassword = require('../model/BackupPassword');
const UserAccountStatementModel = require('../model/User/UserAccountStatement');

const handleAddSingleCurrency = asyncHandler(async(req, res, next)=>{
    let {name, dollar, currencyRate} = req.body;
    if(name && dollar && currencyRate){
        try { 
            let result = await  Currency.create({name, dollar, currencyRate});
            if(result && result?.id > 0){
                res.json(result)
            }else{
                next('Internal server error!')
            }
        } catch (error) {
            next(new Error('Currency already existed!'))
        }
    }else{
        next(new Error('Invalid post request!'))
    }
});
const handleDeleteSingleCurrency = asyncHandler(async(req, res, next)=>{
    let {id} = req.body;
    if(id){
        try { 
            let result = await  Currency.destroy({where: {id}})
            if(result && result > 0){
                res.json(result)
            }else{
                next('Internal server error!')
            }
        } catch (error) {
            next(new Error('Currency not founded!'))
        }
    }else{
        next(new Error('Invalid post request!'))
    }
});
const handleGetAllCurrency = asyncHandler(async(req, res, next) => {
    try {
        let result = await Currency.findAll({});
        if(result && result?.length > 0){
            res.json(result);
        }else{
            next(new Error('Internal server error!'))
        }
    } catch (error) {
        next(error.message)
    }
});
const handleGetAllReferralIncome = asyncHandler(async(req, res, next)=>{
        let {userId} = req.params;
        if(userId){
        try {
            let realResult = await Transaction.sum('amount',{   
                    where: {
                            userId, 
                            used: 'false', 
                            balanceType: 'REAL', 
                            isIn: 'IN', 
                            typeName: { [Op.like]: '%COMMISSION' } 
                        }
            });
            try {
                let demoResult = await Transaction.sum('amount',{where: {userId, used: 'false', balanceType: 'DEMO', isIn: 'IN', typeName: { [Op.like]: '%COMMISSION' } }});
                try {
                    let offlineResult = await Transaction.sum('amount',{where: {userId, used: 'false', balanceType: 'OFFLINE', isIn: 'IN', typeName: { [Op.like]: '%COMMISSION' } }});
                    let realBalance = 0;
                    let demoBalance = 0;
                    let offlineBalance = 0;
                    if(realResult){ 
                        realBalance = Number(realResult);
                    };
                    if(offlineResult){ 
                        offlineBalance = Number(offlineResult);
                    };
                    if(demoResult){ 
                        demoBalance = Number(demoResult);
                    };
                    res.json({realBalance, demoBalance, offlineBalance})
                } catch (error) {
                    next(new Error(error.message))
                }
            } catch (error) {
                next(new Error(error.message))
            }
        } catch (error) {
            next(new Error(error.message))
        }
        }
});
const handleToggleCurrency = asyncHandler(async(req, res, next)=>{
    let {currencyName} = req.params; 
    if(currencyName){ 
        try {
            let result = await Currency.findAll({}); 
            if(result && result?.length > 0){
                let allCurrencyArray = [];
                result.forEach((info)=>{
                    allCurrencyArray.push(info.dataValues.name.toLowerCase());
                })
                let currentCurrencyIndex = allCurrencyArray.indexOf(currencyName.toLowerCase());
                let toggleCurrency = result[currentCurrencyIndex + 1] ? result[currentCurrencyIndex + 1] : result[0]; 
                res.json(toggleCurrency);
            }else{
                next(new Error('Only one currency available!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
}) 
const handleReferralBalanceTransfer = asyncHandler(async(req ,res, next)=>{
    let {userId, balanceType, password, backupPassword} = req.body;
    if( userId && balanceType && password  && backupPassword){
        try {
            let getSingleUserResult = await UserInfoModel.findOne({where: {userId}});
            if(getSingleUserResult && getSingleUserResult.id){
                try {
                    let comparePasswordResult = await comparePasswords(backupPassword, getSingleUserResult.password);
                    if(comparePasswordResult.status__code === 204){
                        try {
                            let comparePasswordResult = await comparePasswords(password, getSingleUserResult.password);
                            if(comparePasswordResult.status__code === 200){
                                try {
                                    let backupPasswordResult = await BackupPassword.findOne({where:{email: getSingleUserResult.email}});
                                    if(backupPasswordResult && backupPasswordResult.id > 0){
                                        try {
                                            let comparePasswordResult = await comparePasswords(backupPassword, backupPasswordResult.password);
                                            if(comparePasswordResult.status__code === 200){ 
                                                try { 
                                                    let balanceResult = await Transaction.sum('amount',{where: {userId, used: 'false', balanceType: balanceType, isIn: 'IN', typeName: { [Op.like]: '%COMMISSION'}}});  
                                                    if(balanceResult > 0){
                                                        try {
                                                            let transactionUpdateResult = await Transaction.update({
                                                                used: 'true'
                                                            },{
                                                                where: {userId, used: 'false', balanceType: balanceType, isIn: 'IN', typeName: {[Op.like]: '%COMMISSION'}}
                                                            })
                                                            if(transactionUpdateResult && transactionUpdateResult[0]){
                                                                try {
                                                                    let userUpdateResult = await UserInfoModel.increment({
                                                                        [`realBalance`]:  balanceResult
                                                                    },{
                                                                        where: {userId}
                                                                    });
                                                                    if(userUpdateResult && userUpdateResult[0] && userUpdateResult[0][1] > 0){
                                                                        // res.json({id: 1, userId})
                                                                        try {
                                                                            let userStatementUpdateResult = await UserAccountStatementModel.increment({
                                                                                'totalBalance': balanceResult, 
                                                                                'totalIn':  balanceResult,
                                                                                'totalEarning': balanceResult,


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
                                                        next(new Error('You have not any '+balanceType+' balance'));
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
                next(new Error('Internal server  error!'))
            }
        } catch (error) { 
            next(new Error('Wallet already existed!'))
        }
    }else{
        next(new Error(`Invalid server request!`));
    }
});

module.exports = {
    handleAddSingleCurrency,
    handleDeleteSingleCurrency,
    handleGetAllCurrency,
    handleGetAllReferralIncome,
    handleToggleCurrency,
    handleReferralBalanceTransfer
}