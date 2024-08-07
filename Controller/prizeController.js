const asyncHandler = require('express-async-handler');   
const Prize = require('../model/Prize');
const Email = require('../model/Email');

const handleAddPrize = asyncHandler(async(req, res, next) => {
    let {name, amount} = req.body; 
    if(name && amount){
        try {
            let prizeCreateResult = await Prize.create({name, amount});
            res.json(prizeCreateResult);
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    } 
}); 
const handleSubscribeEmail = asyncHandler(async(req, res, next) => {
    let {email} = req.body; 
    if(email){
        try {
            let prizeCreateResult = await Email.create({email});
            res.json(prizeCreateResult);
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    } 
}); 
const handleDeleteSinglePrize = asyncHandler(async(req ,res, next)=>{
    let {id} = req.body;
    if(id){
        try {
            let walletDeleteResult = await Prize.destroy({
                where: {id}
            })
            if(walletDeleteResult && walletDeleteResult > 0){
                res.json(walletDeleteResult);
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error(`Invalid post request!`));
    }
});
const handleGetAllPrize = asyncHandler(async(req ,res, next)=>{
    try {
        let walletResult = await Prize.findAll({})
        if(walletResult && walletResult.length > 0){
            res.json(walletResult)
        }else{ 
            res.json([]);
        }
    } catch (error) {
        next(new Error(error.message))
    }
});


module.exports = { 
    handleAddPrize, 
    handleGetAllPrize,
    handleDeleteSinglePrize,
    handleSubscribeEmail
}
