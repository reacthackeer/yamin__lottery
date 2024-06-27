const asyncHandler = require('express-async-handler');
const SystemLotteryModel = require('../../model/Settings/Lottery');
const Transaction = require('../../model/Transaction')
const UserInfoModel = require('../../model/User/UserInfoModel');
const UserAccountStatementModel = require('../../model/User/UserAccountStatement');
const RootAsset = require('../../model/RootAsset');
const LotteryModel = require('../../model/Earning/LotteryModel');
const { uid } = require('uid');
const e = require('express');

const handleAddSingleSystemLottery = asyncHandler(async(req, res, next)=> {
    let postInfo = req.body;
    let {name, price, lotteryId, status} = postInfo;
    if(postInfo && name && price && lotteryId && status){
        try {
            let getPreviousResult = await SystemLotteryModel.findAll({where: {status: 'pending'}});
                if(getPreviousResult && getPreviousResult.length){
                    next(new Error('One lottery existed!'))
                }else{
                    try {
                        let createResult = await SystemLotteryModel.create(postInfo);
                        res.json(createResult);
                    } catch (error) {
                        next(new Error(error.message))
                    }
                }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid post request!'))
    }
});

const handleGetAllSystemLottery = asyncHandler(async(req, res, next)=> {
    try {
        let allLotteryResult = await SystemLotteryModel.findAll({});
        res.json(allLotteryResult);
    } catch (error) {
        next(new Error(error.message))
    }
});

const handleDeleteSingleSystemLottery = asyncHandler(async(req, res, next)=>{
    let {itemId} = req.params; 
    if(itemId){
        try { 
            let result = await  SystemLotteryModel.destroy({where: {id: itemId}})
            if(result && result > 0){
                res.json(result)
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) { 
            next(new Error('Currency not founded!'))
        }
    }else{
        next(new Error('Invalid post request!'))
    }
});

const handleUpdateSingleSystemLottery = asyncHandler(async(req, res, next)=>{
    let {itemId} = req.params; 
    if(itemId){
        try {
            let allLotteryResult = await SystemLotteryModel.findOne({where: {id: itemId}});
            if(allLotteryResult && allLotteryResult.dataValues && allLotteryResult.dataValues.id){
                try { 
                    let result = await  SystemLotteryModel.update({status: allLotteryResult.dataValues.status === 'pending' ? 'draw': 'pending'},{where: {id: itemId}})
                    if(result && result[0]){
                        res.json(result)
                    }else{
                        next(new Error('Internal server error!'))
                    }
                } catch (error) { 
                    next(new Error('Currency not founded!'))
                }
            }else{
                next(new Error('Invalid server request!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid post request!'))
    }
});

const handleBuyMultipleLottery = asyncHandler(async(req, res, next) => {
    let {userId, quantity, lotteryArray} = req.body;
    if(userId && quantity && lotteryArray && lotteryArray.length){
        try {
            let getSystemLottery = await SystemLotteryModel.findOne({where:{status: 'pending'}});
            if(getSystemLottery && getSystemLottery.dataValues && getSystemLottery.dataValues.id){
                getSystemLottery = getSystemLottery.dataValues;
                try {
                    let getSellerInfo = await UserInfoModel.findOne({where: {userId}})
                        if(getSellerInfo && getSellerInfo.dataValues && getSellerInfo.dataValues.id){
                            getSellerInfo = getSellerInfo.dataValues;
                            let newLotteryArray = [];
                            lotteryArray.forEach((info)=>{
                                info.systemLotteryId = getSystemLottery.lotteryId; 
                                newLotteryArray.push(info);
                            }) 
                        try {
                            let lotteryCreateResult = await LotteryModel.bulkCreate(newLotteryArray);
                            if(lotteryCreateResult && lotteryCreateResult.length){
                                if((Number(getSystemLottery.price) * quantity) <= Number(getSellerInfo.realBalance)){
                                    let totalMinus = Number(getSystemLottery.price) * quantity;
                                    let totalCommission = (totalMinus / 100) * 33.34;
                                    let totalSystemMoney = (totalMinus / 100) * 66.66;
                                    let totalAffiliateCommission = totalCommission / 2;
                                    let totalAppCommission = totalCommission / 2; 
                                    try {
                                        let incrementSellerInfo = await UserInfoModel.increment({
                                            realBalance: - totalMinus
                                        },{where: {userId}}); 
                                        if(incrementSellerInfo && incrementSellerInfo[0] && incrementSellerInfo[0][1]){
                                            try {
                                                let incrementSellerDash = await UserAccountStatementModel.increment({
                                                    'totalOut': totalMinus,
                                                    'totalLottery': quantity,
                                                    'totalBalance': - totalMinus 
                                                },{where: {userId}}); 
                                                if(incrementSellerDash && incrementSellerDash[0] && incrementSellerDash[0][1]){
                                                    try {
                                                        let incrementRootAsset = await RootAsset.increment({
                                                            'realTotalCommission': totalCommission,
                                                            'realTotalAppCommission': totalAppCommission,
                                                            'realTotalPartnerCommission': totalAffiliateCommission,
                                                            'totalLotterySale': quantity
                                                        },{where: {id: 1}});
                                                        if(incrementRootAsset && incrementRootAsset[0] && incrementRootAsset[0][1]){
                                                            try {
                                                                let systemLotteryUpdateResult = await SystemLotteryModel.increment({
                                                                    'totalSell': quantity,
                                                                    'totalCollection': totalMinus,
                                                                    'appCommission': totalAppCommission,
                                                                    'userCommission': totalAffiliateCommission,
                                                                    'amount': totalSystemMoney
                                                                },{where: {lotteryId: getSystemLottery.lotteryId}});
                                                                if(systemLotteryUpdateResult && systemLotteryUpdateResult[0] && systemLotteryUpdateResult[0][1]){
                                                                    if(Number(getSellerInfo.role) < 9){
                                                                        let transactionModelUser = [
                                                                            {
                                                                                isIn: 'IN',
                                                                                txrId: uid(8),
                                                                                typeName: 'LOTTERY SALE COMMISSION',
                                                                                userId: getSellerInfo.referralCode,
                                                                                sourceId: getSellerInfo.userId,
                                                                                balanceType: 'REAL',
                                                                                used: 'false',
                                                                                amount: totalCommission / 3,
                                                                            },
                                                                            {
                                                                                isIn: 'IN',
                                                                                txrId: uid(8),
                                                                                typeName: 'LOTTERY SALE COMMISSION',
                                                                                userId: getSellerInfo.userId,
                                                                                sourceId: getSellerInfo.referralCode,
                                                                                balanceType: 'REAL',
                                                                                used: 'false',
                                                                                amount: totalCommission / 3,
                                                                            },
                                                                            {
                                                                                isIn: 'IN',
                                                                                txrId: uid(8),
                                                                                typeName: 'LOTTERY SALE COMMISSION',
                                                                                userId: 'SSSSSSSSSSSSSSS',
                                                                                sourceId: getSellerInfo.userId,
                                                                                balanceType: 'REAL',
                                                                                used: 'false',
                                                                                amount: totalCommission / 3,
                                                                            },
                                                                            {
                                                                                isIn: 'OUT',
                                                                                txrId: uid(8),
                                                                                typeName: 'LOTTERY BUY',
                                                                                userId: getSellerInfo.userId,
                                                                                sourceId: getSellerInfo.userId,
                                                                                balanceType: 'REAL',
                                                                                used: 'false',
                                                                                amount: totalMinus,
                                                                            },
                                                                        ] 
                                                                        try {
                                                                            let transactionCreateResult = await Transaction.bulkCreate(transactionModelUser);
                                                                            if(transactionCreateResult && transactionCreateResult.length){ 
                                                                                res.json({id: 2})
                                                                            }else{
                                                                                next(new Error('Internal server error!'))
                                                                            }
                                                                        } catch (error) {
                                                                            next(new Error(error.message))
                                                                        }
                                                                    }else{
                                                                        let transactionModelUser = [
                                                                        {
                                                                            isIn: 'IN',
                                                                            txrId: uid(8),
                                                                            typeName: 'LOTTERY SALE COMMISSION',
                                                                            userId: getSellerInfo.referralCode,
                                                                            sourceId: getSellerInfo.userId,
                                                                            balanceType: 'REAL',
                                                                            used: 'false',
                                                                            amount: totalAffiliateCommission,
                                                                        },
                                                                        {
                                                                            isIn: 'OUT',
                                                                            txrId: uid(8),
                                                                            typeName: 'LOTTERY BUY',
                                                                            userId: getSellerInfo.userId,
                                                                            sourceId: getSellerInfo.userId,
                                                                            balanceType: 'REAL',
                                                                            used: 'false',
                                                                            amount: totalMinus,
                                                                        },
                                                                        {
                                                                            isIn: 'IN',
                                                                            txrId: uid(8),
                                                                            typeName: 'LOTTERY SALE COMMISSION',
                                                                            userId: 'SSSSSSSSSSSSSSS',
                                                                            sourceId: getSellerInfo.userId,
                                                                            balanceType: 'REAL',
                                                                            used: 'false',
                                                                            amount: totalAppCommission,
                                                                        },
                                                                    ]

                                                                    try {
                                                                        let transactionCreateResult = await Transaction.bulkCreate(transactionModelUser);
                                                                        if(transactionCreateResult && transactionCreateResult.length){ 
                                                                            res.json({id: 2})
                                                                        }else{
                                                                            next(new Error('Internal server error!'))
                                                                        }
                                                                    } catch (error) {
                                                                        next(new Error(error.message))
                                                                    }
                                                                    }
                                                                }else{
                                                                    next(new Error('Internal server error while increment system lottery info!'));
                                                                }
                                                            } catch (error) {
                                                                next(new Error(error.message));
                                                            }
                                                        }else{
                                                            next(new Error('Internal server error while increment root info!'));
                                                        }
                                                    } catch (error) {
                                                        next(new Error(error.message))
                                                    }
                                                }else{  
                                                    next(new Error('Internal server error while increment seller dashboard info!'));
                                                }
                                            } catch (error) {
                                                next(new Error(error.message))
                                            }
                                        }else{
                                            next(new Error('Internal server error while increment seller info!'));
                                        }
                                    } catch (error) {
                                        next(new Error(error.message))
                                    }
                                }else{
                                    next(new Error('Balance Low!'))
                                }
                            }else{
                                next(new Error('Internal server error while bulk create lottery info!'));
                            }
                        } catch (error) {
                            next(new Error(error.message))
                        }
                        }else{
                            next(new Error('Seller Info not founded!'))
                        }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('Lottery buy system currently off!'))
            }
        } catch (error) {
            next(new Error(error.message));
        }
    }else{
        next(new Error('Invalid post request!'))
    }
});

const handleGetSingleUserLottery = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    let query = req.query;
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    if(userId){
        try {
            let allLotteryResult = await LotteryModel.findAll({where: {userId: userId}, offset: skip, limit: limit}); 
            if(allLotteryResult && allLotteryResult.length){
                try {
                    let allUserCountInfo = await LotteryModel.count({where: {userId}});
                    res.json({users: allLotteryResult, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                res.json({users: [], currentPage: 1, pages: 1})
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid get request!'))
    }
})

const handleGetSingleUserLotteryBuyHistory = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    let query = req.query;
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    if(userId){
        try {
            let allLotteryResult = await Transaction.findAll({where: {userId: userId, typeName: 'LOTTERY BUY'}, offset: skip, limit: limit}); 
            if(allLotteryResult && allLotteryResult.length){
                try {
                    let allUserCountInfo = await Transaction.count({where: {userId, typeName: 'LOTTERY BUY'}});
                    res.json({users: allLotteryResult, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                res.json({users: [], currentPage: 1, pages: 1})
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid get request!'))
    }
})
const handleGetSingleUserTransactionHistory = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    let query = req.query;
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    if(userId){
        try {
            let allLotteryResult = await Transaction.findAll({where: {userId: userId}, offset: skip, limit: limit}); 
            if(allLotteryResult && allLotteryResult.length){
                try {
                    let allUserCountInfo = await Transaction.count({where: {userId}});
                    res.json({users: allLotteryResult, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                res.json({users: [], currentPage: 1, pages: 1})
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid get request!'))
    }
})
const handleGetSingleUserEarningHistory = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    let query = req.query;
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    if(userId){
        try {
            let allLotteryResult = await Transaction.findAll({where: {userId: userId, isIn: 'IN', typeName: 'LOTTERY SALE COMMISSION'}, offset: skip, limit: limit}); 
            if(allLotteryResult && allLotteryResult.length){
                try {
                    let allUserCountInfo = await Transaction.count({where: {userId, isIn: 'IN', typeName: 'LOTTERY SALE COMMISSION'}});
                    res.json({users: allLotteryResult, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                res.json({users: [], currentPage: 1, pages: 1})
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid get request!'))
    }
})
const handleGetSingleUserDepositHistory = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    let query = req.query;
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    if(userId){
        try {
            let allLotteryResult = await Transaction.findAll({where: {userId: userId, isIn: 'IN', typeName: 'WALLET DEPOSIT'}, offset: skip, limit: limit}); 
            if(allLotteryResult && allLotteryResult.length){
                try {
                    let allUserCountInfo = await Transaction.count({where: {userId, isIn: 'IN', typeName: 'WALLET DEPOSIT'}});
                    res.json({users: allLotteryResult, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                res.json({users: [], currentPage: 1, pages: 1})
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid get request!'))
    }
})
const handleGetSingleUserTransferHistory = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    let query = req.query;
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    if(userId){
        try {
            let allLotteryResult = await Transaction.findAll({where: {userId: userId, typeName: 'BALANCE TRANSFER'}, offset: skip, limit: limit}); 
            if(allLotteryResult && allLotteryResult.length){
                try {
                    let allUserCountInfo = await Transaction.count({where: {userId, typeName: 'BALANCE TRANSFER'}});
                    res.json({users: allLotteryResult, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                res.json({users: [], currentPage: 1, pages: 1})
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid get request!'))
    }
})

const handleGetSingleUserWithdrawalHistory = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    let query = req.query;
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    if(userId){
        try {
            let allLotteryResult = await Transaction.findAll({where: {userId: userId, isIn: 'OUT', typeName: 'WALLET WITHDRAWAL'}, offset: skip, limit: limit}); 
            if(allLotteryResult && allLotteryResult.length){
                try {
                    let allUserCountInfo = await Transaction.count({where: {userId, isIn: 'OUT', typeName: 'WALLET WITHDRAWAL'}});
                    res.json({users: allLotteryResult, pages: Math.ceil(allUserCountInfo/limit), currentPage: page})
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                res.json({users: [], currentPage: 1, pages: 1})
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid get request!'))
    }
});

const handleGetAllAllLotteryByPhone = asyncHandler(async(req, res, next) => {
    let {phoneNumber} = req.params;
    if(phoneNumber){
        try {
            let systemLotteryResult = await SystemLotteryModel.findOne({where: {status: 'pending'}});
            if(systemLotteryResult && systemLotteryResult.dataValues && systemLotteryResult.dataValues.id){
                try {
                    let singleUserAllLottery = await LotteryModel.findAll({where: {phone: phoneNumber, status: 'accept', systemLotteryId: systemLotteryResult.dataValues.lotteryId}});
                    res.json(singleUserAllLottery)
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('No lottery available!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid requested!'))
    }
})
module.exports = {
    handleAddSingleSystemLottery,
    handleGetAllSystemLottery,
    handleDeleteSingleSystemLottery,
    handleUpdateSingleSystemLottery,
    handleBuyMultipleLottery,
    handleGetSingleUserLottery,
    handleGetSingleUserLotteryBuyHistory,
    handleGetSingleUserTransactionHistory,
    handleGetSingleUserEarningHistory,
    handleGetSingleUserDepositHistory,
    handleGetSingleUserTransferHistory,
    handleGetSingleUserWithdrawalHistory,
    handleGetAllAllLotteryByPhone
}