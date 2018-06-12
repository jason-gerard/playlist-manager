// imports user model
const { User } = require('../models');

module.exports = {
    user_sign_up: async (req, res, next) => {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            // creates new user
            const newUser = await User.create({
                username,
                email,
                password
            });

            // sends back new user data
            res.status(201).json({
                user: newUser
            });
        } catch(error) {
            // sends back error message
            res.status(400).json({
                error: error.errors[0].message
            });
        }
    },

    user_login: async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            // find user in db
            const user = await User.findOne({
                where: {
                    email
                }
            });

            // checks to see if user was found / exists
            if (!user || password !== user.password) {
                return res.status(403).json({
                    error: 'Email or password was incorrect'
                });
            }

            // sends back user data
            res.status(200).json({
                user
            });
        } catch(error) {
            // sends back error message
            res.status(500).json({
                error: 'Error has occured trying to login'
            });
        }
    }
}