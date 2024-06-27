
const jwt = require('jsonwebtoken');
const TokenModel = require('../model/User/TokenModel');
const UserInfoModel = require('../model/User/UserInfoModel');
let tokenSecret = process.env.JWT_SECRET; 

function generateToken(userInfo) {
    return new Promise((resolve, reject) => {
        // Generate the token with the user payload
        jwt.sign({ userInfo }, tokenSecret, { expiresIn: '7d'}, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);  
            }
        });
    });
};

function verifyToken(token) { 
    const tokenSecret = process.env.JWT_SECRET;

    if (!tokenSecret) { 
        return Promise.reject(new Error('JWT_SECRET environment variable is not defined'));
    }

    

    if (!token || token.split('.').length !== 3) { 
        return Promise.reject(new Error('Invalid token structure'));
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, tokenSecret, (error, decoded) => {
            if (error) { 
                reject(new Error(`JWT verification error: ${error.message}`));
            } else { 
                if (decoded?.userInfo && Number(decoded.userInfo.role) <= 15 && decoded.userInfo.block === 'false') {
                    resolve(decoded); 
                } else {
                    reject(new Error('Unauthenticated'));
                }
            }
        });
    });
}




async function authenticateToken(req, res, next) {
    let authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided', status__code: 401 });
    } 
    try {
        let tokenArray = token.split('__');
        let tokenId = tokenArray[0];
        let userId = tokenArray[1];
        if(tokenArray && tokenId && userId){
            let findMyToken = await TokenModel.findOne({where: {id: tokenId, userId}});
            if(findMyToken && findMyToken.dataValues && findMyToken.dataValues.id){
                let newToken = findMyToken.dataValues.token;  
                try {
                    const decoded = await verifyToken(newToken);
                    req.user = decoded;
                    if(Number(decoded.userInfo.role) <= 15){
                        try {
                            let getCurrentUser = await UserInfoModel.findOne({where: {id: decoded.userInfo.id, email: decoded.userInfo.email}});
                            if(getCurrentUser && getCurrentUser?.dataValues && getCurrentUser?.dataValues?.block === 'false' && Number(getCurrentUser.dataValues.role) <= 15){ 
                                next();
                            }else{
                                res.status(401).json({ message: 'Invalid token', status__code: 401 });
                            }
                        } catch (error) {
                            res.status(401).json({ message: error.message, status__code: 401 });
                        }
                    }else{
                        res.status(401).json({ message: 'Invalid token', status__code: 401 });
                    }
                } catch (err) { 
                    res.status(401).json({ message: err.message, status__code: 401 });
                }
            }else{
                res.status(401).json({ message: 'Invalid token', status__code: 401 });
            }
        }else{
            res.status(401).json({ message: 'Invalid token', status__code: 401 });
        }
    } catch (error) {
        next(new Error(error.message))
    }
}

async function authenticateTokenAdmin(req, res, next) {
    let authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided', status__code: 401 });
    } 
    try {
        let tokenArray = token.split('__');
        let tokenId = tokenArray[0];
        let userId = tokenArray[1];
        if(tokenArray && tokenId && userId){
            let findMyToken = await TokenModel.findOne({where: {id: tokenId, userId}});
            if(findMyToken && findMyToken.dataValues && findMyToken.dataValues.id){
                let newToken = findMyToken.dataValues.token;  
                try {
                    const decoded = await verifyToken(newToken);
                    req.user = decoded;
                    if(Number(decoded.userInfo.role) <= 15){
                        try {
                            let getCurrentUser = await UserInfoModel.findOne({where: {id: decoded.userInfo.id, email: decoded.userInfo.email}});
                            if(getCurrentUser && getCurrentUser?.dataValues && getCurrentUser?.dataValues?.block === 'false' && Number(getCurrentUser.dataValues.role) <= 1 && getCurrentUser.dataValues.designation === 'admin'){ 
                                next();
                            }else{
                                res.status(401).json({ message: 'Invalid token', status__code: 401 });
                            }
                        } catch (error) {
                            res.status(401).json({ message: error.message, status__code: 401 });
                        }
                    }else{
                        res.status(401).json({ message: 'Invalid token', status__code: 401 });
                    }
                } catch (err) { 
                    res.status(401).json({ message: err.message, status__code: 401 });
                }
            }else{
                res.status(401).json({ message: 'Invalid token', status__code: 401 });
            }
        }else{
            res.status(401).json({ message: 'Invalid token', status__code: 401 });
        }
    } catch (error) {
        next(new Error(error.message))
    }
}
// async function authenticateTokenAdmin(req, res, next) {
//     let authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided', status__code: 401 });
//     }

//     try {
//         const decoded = await verifyToken(token);
//         req.user = decoded;
//         if(Number(decoded.userInfo.role) <= 1 && decoded.userInfo.designation === 'admin'){
//             try {
//                 let getCurrentUser = await prisma.user.findUnique({where: {id: decoded.userInfo.id, email: decoded.userInfo.email}});
//                 if(getCurrentUser && getCurrentUser.isJail === 'false' && getCurrentUser.isDisabled === 'false' && Number(getCurrentUser.role) <= 1 && getCurrentUser.designation === 'admin'){
//                     next();
//                 }else{
//                     let newError = new Error('Unauthenticated');
//                     newError.status = 401;
//                     next(newError)
//                 }
//             } catch (error) {
//                 next(new Error(error.message))
//             }
//         }else{
//             let newError = new Error('Unauthenticated');
//                 newError.status = 401;
//                 next(newError)
//         }
//     } catch (err) { 
//         return res.status(401).json({ message: 'Invalid token', status__code: 401 });
//     }
// }

module.exports = {
    generateToken, 
    verifyToken,
    authenticateToken,
    authenticateTokenAdmin
}