const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, 'huhu-key', { expiresIn: '2h' })
}


module.exports = { generateToken }
