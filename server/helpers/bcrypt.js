const bcrypt = require('bcryptjs')

const checkPassword = (orgPassword, encryptedPassword) => {
    return bcrypt.compareSync(orgPassword, encryptedPassword)
}

const createPassword = (orgPassword) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(orgPassword, salt)
    return hashedPassword
}

module.exports = {checkPassword, createPassword}