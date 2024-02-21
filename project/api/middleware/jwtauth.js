const { log } = require('console');
const jwt = require('jsonwebtoken');
const { User } = require('../models/usermodels');

// const { verifyToken } = require('../functions/jwt');

const jwtAuth = async (req, res, next) => {
    try {
        const { token } = req.body
        if (!token) {
            res.status(202).json({ message: '' })
        } else {
            jwt.verify(token, 'huhu-key', (err, data) => {
                if (err) {
                    if (err.message === 'TokenExpirationError') {
                        res.status(202).json({ message: 'Session Expired' })
                    } else {
                        res.status(202).json({ message: 'Invalid Token' })
                    }
                } else {
                    req.user = data
                    next()
                }
            })
        }
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }

}


const verifyUser = async (req, res, next) => {
    try {
        const token = req.user
        const user = await User.findById(token._id)
        if (!user) {
            return res.status(202).json({ message: 'No User Found' })
        }
        if (!user.status) {
            return res.status(202).json({ message: 'Sorry User Blocked' })
        }
        return res.status(200).json({ message: user })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { jwtAuth, verifyUser };