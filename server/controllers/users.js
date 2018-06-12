// imports user model
const { User } = require('../models');

module.exports = {
    user_sign_up: async (req, res, next) => {
        try {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            res.status(201).json({
                newUser
            });
        } catch(error) {
            res.status(400).json({
                error: error
            });
        }
    }
}