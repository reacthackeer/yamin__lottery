const asyncHandler = require('express-async-handler');
const { hashPassword, comparePasswords } = require('../../utils/Password');
const UserInfoModel = require('../../model/User/UserInfoModel');
const UserAddressModel = require('../../model/User/UserAddressModel');
const UserAccountStatementModel = require('../../model/User/UserAccountStatement');
const { generateToken, verifyToken } = require('../../utils/jsonwebtoken');
const TokenModel = require('../../model/User/TokenModel'); 
const AdminApplicationModel = require('../../model/Earning/AdminApplicationModel');
const AdminApplicationStoreModel = require('../../model/Earning/AdminApplicationStore');
const BackupPassword = require('../../model/BackupPassword');
const Currency = require('../../model/Currency');
const { currencyUtils } = require('../../utils/utils/CurrencyUtils');
const Transaction = require('../../model/Transaction');

const handleRegisterUser = asyncHandler(async(req, res, next)=>{  
    let postInfo = req.body; 
    let {userInfo, addressInfo} = postInfo;
    if(postInfo && userInfo && addressInfo){
        try {
            let hasPasswordResult = await hashPassword(userInfo.password);
            if(hasPasswordResult && hasPasswordResult.status__code == 200){
                userInfo.password = hasPasswordResult.password;
                try {
                    let userCreateResult = await UserInfoModel.create(userInfo);
                    if(userCreateResult && userCreateResult.dataValues.id){
                        try {
                            let userAddressCreateResult = await UserAddressModel.create(addressInfo);
                            if(userAddressCreateResult && userAddressCreateResult.dataValues.id){
                                let userStatementCreateResult = await UserAccountStatementModel.create({userId: userInfo.userId});
                                if(userStatementCreateResult && userAddressCreateResult && userAddressCreateResult.dataValues && userAddressCreateResult.dataValues.id){
                                    try {
                                        let accountStatementResult = await UserAccountStatementModel.increment({
                                            'totalUsers': 1
                                        },{where: {userId: userInfo.referralCode}});
                                        if(accountStatementResult && accountStatementResult[0] && accountStatementResult[0][1]){
                                            res.json({status__code: 201}); 
                                        }else{
                                            try {
                                                let accountStatementResult = await UserAccountStatementModel.increment({
                                                    'totalUsers': 1
                                                },{where: {userId: 'SSSSSSSSSSSSSSS'}});
                                                if(accountStatementResult && accountStatementResult[0] && accountStatementResult[0][1]){
                                                    let updateAffiliateUser = await UserInfoModel.update({referralCode: 'SSSSSSSSSSSSSSS'},{where: {userId: userCreateResult.userId}}); 
                                                    if(updateAffiliateUser && updateAffiliateUser[0]){
                                                        res.json({status__code: 201}); 
                                                    }else{
                                                        next(new Error('Internal server error!'))
                                                    }
                                                }else{
                                                    next(new Error('Invalid update request!'))
                                                } 
                                            } catch (error) {
                                                next(new Error(error.message))
                                            }
                                        }
                                    } catch (error) {
                                        next(new Error(error.message))
                                    }
                                }else{
                                    next(new Error('Invalid server request'));
                                }
                            }else{
                                next(new Error('Invalid server request!'))
                            }
                        } catch (error) {
                            next(new Error(error.message))
                        }
                    }else{
                        next('Invalid server request!')
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
        next(new Error("Invalid server request!"));
    }
});

const handleLoginUser = asyncHandler(async(req, res, next)=> {
    let {email, password} = req.body;
    if( req.body && email && password){
        try {
            let getCurrentUser = await UserInfoModel.findOne({where: {email}});
                getCurrentUser = getCurrentUser?.dataValues;
            if(getCurrentUser && getCurrentUser.id){
                try {
                    let passwordCompareResult = await comparePasswords(password, getCurrentUser.password);
                    if(passwordCompareResult && passwordCompareResult.status__code === 200){
                        let userInfo = getCurrentUser;
                            delete userInfo.password;
                            try {
                                let tokenResult = await generateToken(userInfo); 
                                if(tokenResult){
                                    try {
                                        let findToken = await TokenModel.findOne({where: {userId: userInfo.userId}}); 
                                        if(findToken){ 
                                            try {
                                                let updateTokenResult = await TokenModel.update({token: tokenResult},{where: {userId: userInfo.userId}});
                                                if(updateTokenResult && updateTokenResult[0]){
                                                    try {
                                                        let findMyToken = await TokenModel.findOne({where: {userId: userInfo.userId}});
                                                        res.json({status__code: 200, userInfo: {...userInfo, tokenId: findMyToken.dataValues.id}})
                                                    } catch (error) {
                                                        next(new Error(error.message))
                                                    }
                                                }else{
                                                    next(new Error('Invalid server request'))
                                                }
                                            } catch (error) {
                                                next(new Error(error.message))
                                            }
                                        }else{
                                            try {
                                                let tokenCreateResult = await TokenModel.create({token: tokenResult, userId: userInfo.userId}); 
                                                if(tokenCreateResult && tokenCreateResult.dataValues.id){
                                                    res.json({status__code: 200, userInfo: {...userInfo, tokenId: tokenCreateResult.dataValues.id}});
                                                }else{
                                                    next(new Error('Invalid server request!'))
                                                }
                                            } catch (error) {  
                                                next(new Error(error.message))
                                            }
                                        }
                                    } catch (error) { 
                                        next(new Error(error.message))
                                    }
                                }else{ 
                                    next(new Error('Invalid server request!'))
                                } 
                            } catch (error) {
                                next(new Error(error.message))
                            }
                    }else{
                        next(new Error('Invalid password!'))
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('User not founded'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

const handleValidateToken = asyncHandler(async(req, res, next) => {
    let {tokenId} = req.params; 
    if(tokenId){
        try {
            let findMyToken = await TokenModel.findOne({where: {id: tokenId}});
                if(findMyToken && findMyToken.dataValues){
                    let token = findMyToken.dataValues;
                    try { 
                        let tokenInfo = await verifyToken(token.token); 
                            if(tokenInfo && tokenInfo.userInfo){
                                try {
                                    let getCurrentUserInfo = await UserInfoModel.findOne({where: {userId: tokenInfo.userInfo.userId}});
                                    res.json({...getCurrentUserInfo.dataValues, tokenId})
                                } catch (error) {
                                    next(new Error(error.message))
                                }
                            }else{
                                next(new Error('Invalid server request!'))
                            }
                    } catch (error) {
                        next(new Error(error.message))
                    }
                }else{
                    next(new Error('Invalid server request!'))
                }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

const handleChangePassword = asyncHandler(async(req, res, next)=>{
    let postInfo = req.body;
    let {oldPassword, password, userId} = postInfo;
    if(postInfo && password && oldPassword && userId){
        try {
            let getUserInfo = await UserInfoModel.findOne({where: {userId}});
            if(getUserInfo && getUserInfo?.dataValues && getUserInfo.dataValues.id){
                let userInfo = getUserInfo.dataValues;
                try {
                    let passwordResult = await comparePasswords(oldPassword, userInfo.password);
                    if(passwordResult && passwordResult.status__code === 200){
                        try {
                            let hasPasswordResult = await hashPassword(password);
                            if(hasPasswordResult && hasPasswordResult.status__code === 200 && hasPasswordResult.password){
                                let updateResult = await UserInfoModel.update({password: hasPasswordResult.password},{where: {userId}});
                                if(updateResult && updateResult[0]){ 
                                    res.json({status__code: 401, message: 'Successfully password updated!'});
                                }else{
                                    next(new Error('Internal server error!'))
                                }
                            }else{
                                next(new Error('Invalid server request!'))
                            }
                        } catch (error) {
                            next(new Error(error.message))
                        } 
                    }else{
                        next(new Error('Invalid old password'));
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next('Invalid server request!')
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

const handleGetSingleAddress = asyncHandler(async(req, res, next)=>{
    let params = req.params
    let {userId} = params;
    if(params && userId){
        try {
            let userAddressInfo = await UserAddressModel.findOne({where: {userId}});
            if(userAddressInfo && userAddressInfo.dataValues && userAddressInfo.dataValues.id){
                let address = userAddressInfo.dataValues;
                res.json({
                    country: address.country,
                    division: address.division,
                    district: address.district,
                    address__line__3: address.addressLineThree,
                    address__line__2: address.addressLineTwo,
                    address__line__1: address.addressLineOne, 
                    post__code: address.postCode
                });
            }else{
                next(new Error('Address not available!'))
            }
        } catch (error) {
            next(new Error(error.message));
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

const handleGetSingleInfo = asyncHandler(async(req, res, next)=>{
    let params = req.params
    let {userId} = params;
    if(params && userId){
        try {
            let userAddressInfo = await UserInfoModel.findOne({where: {userId}});
            if(userAddressInfo && userAddressInfo.dataValues && userAddressInfo.dataValues.id){
                let address = userAddressInfo.dataValues;
                delete address.password
                res.json(address);
            }else{
                next(new Error('Address not available!'))
            }
        } catch (error) {
            next(new Error(error.message));
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

const handleUpdateAddress = asyncHandler(async(req, res, next)=> {
    let postInfo = req.body;
    const {country, userId} = postInfo;
    if(postInfo && country && userId){
        let updateResult = await UserAddressModel.update(postInfo,{where: {userId}});
            if(updateResult && updateResult[0]){
                res.json({status__code: 200, message: 'Successfully address updated!', addressInfo: postInfo});
            }else{
                next(new Error('Internal server error!'))
            }
    }else{
        next(new Error('Invalid server request!'))
    }
})

const handleAddAdmin = asyncHandler(async(req, res, next) => {
    let postInfo = req.body;
    let {phone, email, userId} = postInfo;
    if(postInfo && email && phone && userId){
        try {
            let adminCreateResult = await AdminApplicationModel.create(postInfo);
            if(adminCreateResult && adminCreateResult.dataValues && adminCreateResult.dataValues.id){
                res.json({status__code: 201, message: 'Successfully application submitted!', adminInfo: adminCreateResult.dataValues})
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) {
            next(new Error('Previous application applied!'))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
})

const handleGetallAdmin = asyncHandler(async(req, res, next)=> {
    let {adminType} = req.params;
    if(adminType){
        try {
            let getAdminResult = await AdminApplicationModel.findAll({where: {type: adminType, status: 'pending'}});
            res.json(getAdminResult)
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

const handleDeleteAdmin = asyncHandler(async(req, res, next) => {
    let {itemId} = req.params;
    if(itemId){
        try {
            let adminDeleteResult = await AdminApplicationModel.destroy({where: {id: itemId}});
            res.json(adminDeleteResult);
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

const handleConfirmAdmin = asyncHandler(async(req, res, next) => {
    let {itemId} = req.params;
    const designationObject = [
        {designation: 'admin', role: 1},
        {designation: 'partner', role: 2},
        {designation: 'superAgent', role: 3},
        {designation: 'masterAgent', role: 4},
        {designation: 'localAgent', role: 5},
        {designation: 'seller', role: 6},
        {designation: 'publisher', role: 7},
        {designation: 'peddler', role: 8}, 
        {designation: 'user', role: 15}
    ]
    if(itemId){
        try {
            let adminInfo = await AdminApplicationModel.findOne({where: {id: itemId}});
            if(adminInfo && adminInfo.dataValues && adminInfo.dataValues.id){
                let currentAdmin = adminInfo.dataValues;
                try {
                    let currentItem = designationObject.filter((info)=> info.designation === currentAdmin.type)[0]; 
                    let updateUserInfo = await UserInfoModel.update({applicationId: currentAdmin.id, designation: currentItem.designation, role:currentItem.role}, {where: {userId: currentAdmin.userId}});
                    if(updateUserInfo && updateUserInfo[0]){
                        currentAdmin.status = 'confirm'
                            delete currentAdmin.created_at;
                            delete currentAdmin.updated_at;  
                            try {
                                let adminStoreCreateResult = await AdminApplicationStoreModel.create(currentAdmin);
                                if(adminStoreCreateResult && adminStoreCreateResult.dataValues && adminStoreCreateResult.dataValues.id){
                                    let adminDeleteResult = await AdminApplicationModel.destroy({where: {id: itemId}});
                                    res.json(adminDeleteResult)
                                }else{
                                    next(new Error('Invalid server request!'))
                                }
                            } catch (error) {
                                next(new Error(error.message))
                            } 
                    }else{
                        next(new Error('Invalid server request!'))
                    }
                    
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('Invalid server request!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error("Invalid server request!"))
    }
});

const handleGetAllUser = asyncHandler(async(req, res, next) => {
    let query = req.query; 
    let limit = Number(query.limit) || 10;
    let page = Number(query.page) || 1;
    let skip = (limit * page) - limit;
    let whereInfo = query;
        delete whereInfo.limit;
        delete whereInfo.page; 
    try {
        let allUserInfo = await UserInfoModel.findAll({where: whereInfo, offset: skip, limit: limit});
            if(allUserInfo && allUserInfo.length){
                try {
                    let allUserCountInfo = await UserInfoModel.count({where: whereInfo});
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

const handleBlockSingleUser = asyncHandler(async(req, res, next) => {
    let itemId = req.params.itemId;
    if(itemId){
        try {
            let updateUserStatus = await UserInfoModel.update({block: 'true'},{where: {id: itemId}}); 
            if(updateUserStatus && updateUserStatus[0]){
                res.json({message: 'Successfully updated!', status__code: 200})
            }else{
                next(new Error('Invalid update request!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
})

const handleCancelSingleUser = asyncHandler(async(req, res, next) => {
    let itemId = req.params.itemId;
    if(itemId){
        try {
            let updateUserStatus = await UserInfoModel.update({designation: 'user',  role: 15, block: 'false'},{where: {id: itemId}}); 
            if(updateUserStatus && updateUserStatus[0]){
                res.json({message: 'Successfully updated!', status__code: 200})
            }else{
                next(new Error('Invalid update request!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
})
const handleAddSingleBackupPassword = asyncHandler(async(req ,res, next)=>{  
    let {email, password, mainPassword} = req.body;
    if(email && password && mainPassword){
        try {
            let getSingleUserResult = await UserInfoModel.findOne({where: {email}});
            if(getSingleUserResult && getSingleUserResult.id){
                try {
                    let comparePasswordResult = await comparePasswords(password, getSingleUserResult.password);
                    if(comparePasswordResult.status__code === 204){
                        try {
                            let hashPasswordResult = await hashPassword(password);
                            if(hashPasswordResult.status__code === 200){
                                let postData = {
                                    email,
                                    password: hashPasswordResult.password
                                } 
                                try {
                                    let userPasswordCheckResult = await comparePasswords(mainPassword, getSingleUserResult.password);
                                    if(userPasswordCheckResult && userPasswordCheckResult.status__code === 200){
                                        try {
                                            let createResult = await BackupPassword.create(postData);
                                            if(createResult && createResult.dataValues?.id > 0){
                                                res.json(createResult);
                                            }else{
                                                next(new Error('Backup password already created'));
                                            }
                                        } catch (error) {
                                            next(new Error('Backup password already created'));
                                        }
                                    }else{
                                        next(new error('Incorrect password provided!'))
                                    }
                                } catch (error) {
                                    next(new Error('Incorrect password provided!'))
                                }
                            }else{
                                next(new Error('Internal server error'))
                            }
                        } catch (error) {
                            next(new Error(error.message))
                        }
                    }else{
                        next(new Error('Please use different password'));
                    }
                } catch (error) {
                    next(new Error('Please use different password'));
                }
            }else{
                next(new Error('Internal server  error!'))
            }
        } catch (error) { 
            next(new Error('Wallet already existed!'))
        }
    }else{
        next(new Error(`Invalid post request!`));
    }
});
const handleUserBalanceTransfer = asyncHandler(async(req ,res, next)=>{
    let {userId, receiverId, amount, password, backupPassword, currency} = req.body;
    if(amount && userId && receiverId && password  && backupPassword){
        try {
            let getSingleUserResult = await UserInfoModel.findOne({where: {userId}});
            if(getSingleUserResult && getSingleUserResult.id){
                try {
                    let currencyResult = await Currency.findOne({where: {
                        name: currency
                    }});
                    if(currencyResult && currencyResult.id){
                        let amountConvertToDollar = Number(amount) / Number(currencyResult.currencyRate); 
                        if(Number(getSingleUserResult.realBalance) >= Number(amountConvertToDollar) && getSingleUserResult.block === 'false'){
                            try {
                                let receiverResult = await UserInfoModel.findOne({where:{userId:receiverId}});
                                if(receiverResult && receiverResult.id > 0){
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
                                                                    let transaction = currencyUtils.transferBalanceTransactionGenerator(amountConvertToDollar,receiverId,receiverResult.referralCode,userId);
                                                                    try { 
                                                                        let senderUpdate = await UserInfoModel.decrement({realBalance: Number(amountConvertToDollar)},{where: {userId}});
                                                                        if(senderUpdate && senderUpdate[0] && senderUpdate[0][1] > 0){
                                                                            try {
                                                                                let receiverUpdate = await UserInfoModel.increment({realBalance: Number(transaction.increment)},{where: {userId:receiverId}});
                                                                                if(receiverUpdate && receiverUpdate[0] && receiverUpdate[0][1] > 0){
                                                                                    try {
                                                                                        let transactionCreateResult = await Transaction.bulkCreate(transaction.transactions);
                                                                                        if(transactionCreateResult && transactionCreateResult.length > 0){
                                                                                            try {
                                                                                                let userStatementUpdateResult = await UserAccountStatementModel.increment({
                                                                                                    'totalBalance': amountConvertToDollar,
                                                                                                    'totalDeposit':  amountConvertToDollar,
                                                                                                    'totalIn':  amountConvertToDollar
                                                                                                },{where: {userId: receiverId}}) 
                                                                                                if(userStatementUpdateResult && userStatementUpdateResult[0] && userStatementUpdateResult[0][1]){
                                                                                                    try {
                                                                                                        let userStatementUpdateResultSender = await UserAccountStatementModel.increment({
                                                                                                            'totalTransfer': amountConvertToDollar, 
                                                                                                            'totalOut': amountConvertToDollar, 
                                                                                                            'totalWithdrawal': amountConvertToDollar, 
                                                                                                        },{where: {userId}}) 
                                                                                                        if(userStatementUpdateResultSender && userStatementUpdateResultSender[0] && userStatementUpdateResultSender[0][1]){
                                                                                                            try {
                                                                                                                let userStatementUpdateResultSenderOne = await UserAccountStatementModel.decrement({
                                                                                                                    'totalBalance': amountConvertToDollar,  
                                                                                                                },{where: {userId}}) 
                                                                                                                if(userStatementUpdateResultSenderOne && userStatementUpdateResultSenderOne[0] && userStatementUpdateResultSenderOne[0][1]){
                                                                                                                    res.json({senderUpdate: {id: 2, userId},receiverUpdate: {id: 3, userId: receiverId}})
                                                                                                                }else{
                                                                                                                    next(new Error('Internal server request!'))
                                                                                                                }
                                                                                                            } catch (error) { 
                                                                                                                next(new Error(error.message));
                                                                                                            }
                                                                                                        }else{
                                                                                                            next(new Error('Internal server request!'))
                                                                                                        }
                                                                                                    } catch (error) { 
                                                                                                        next(new Error(error.message));
                                                                                                    }
                                                                                                }else{
                                                                                                    next(new Error('Internal server request!'))
                                                                                                }
                                                                                            } catch (error) { 
                                                                                                next(new Error(error.message));
                                                                                            }
                                                                                        }else{
                                                                                            next(new Error('Error occurred while creating transfer transaction'))
                                                                                        }
                                                                                    } catch (error) {
                                                                                        next(new Error(error.message))
                                                                                    }
                                                                                }else{
                                                                                    next('Error occurred while increment receiver balance')
                                                                                }
                                                                            } catch (error) {
                                                                                next(new Error(error.message))
                                                                            }
                                                                        }else{
                                                                            next('Error occurred while decrement sender balance')
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
                                    next(new Error('Receiver User Not founded!'))
                                }
                            } catch (error) {
                                next(new Error(error.message))
                            }
                        }else{
                            next(new Error('Balance low!'))
                        }
                    }else{
                        next(new Error('Currency not found!'))
                    }
                } catch (error) {
                    next(new Error(error.message))
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
    handleRegisterUser,
    handleLoginUser,
    handleValidateToken,
    handleChangePassword,
    handleGetSingleAddress,
    handleUpdateAddress,
    handleAddAdmin,
    handleGetallAdmin,
    handleDeleteAdmin,
    handleDeleteAdmin,
    handleConfirmAdmin,
    handleGetAllUser,
    handleBlockSingleUser,
    handleCancelSingleUser,
    handleAddSingleBackupPassword,
    handleUserBalanceTransfer,
    handleGetSingleInfo
}