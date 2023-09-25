const {checkToken} = require('../helpers/jwt')
const {User} = require('../models')


const authentication = async (req,res,next) => {
    try{
        const {access_token} = req.headers

        const verifyToken = checkToken(access_token)
    
        const foundUser = await User.findByPk(verifyToken.id)
    
        if(!foundUser) {
            throw {name: 'UserDoesNotExist'}
        } 

        req.user = foundUser
        next()
    
    }
    catch(err){
        next(err)
    }
}
module.exports = {authentication}