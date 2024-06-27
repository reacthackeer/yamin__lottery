const asyncHandler = require('express-async-handler');   
const UserAccountStatementModel = require('../model/User/UserAccountStatement');

const handleGetLoggerDashboardInfo = asyncHandler(async(req, res, next) => {
    let {userId} = req.params;
    if(userId){
        try {
            let dashboardInfo = await UserAccountStatementModel.findOne({where: {userId}});
            if(dashboardInfo && dashboardInfo.dataValues && dashboardInfo.dataValues.id){
                res.json(dashboardInfo);
            }else{
                next(new Error('No data founded!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server request!'))
    }
})


module.exports = { 
    handleGetLoggerDashboardInfo
}
