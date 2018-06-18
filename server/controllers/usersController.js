const jwt = require('jsonwebtoken');

// imports config file
const config = require('../config/config');

// imports user model
const { User } = require('../models');

module.exports = {
    sign_up: async (req, res, next) => {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            // creates new user
            const user = await User.create({
                username,
                email,
                password
            });

            // creates token for signed up user
            const token = jwt.sign({user}, config.auth.jwt_secret);

            // sends back new user data
            res.status(201).json({
                user,
                token
            });
        } catch(error) {
            // sends back error message
            res.status(400).json({
                error: error.errors[0].message
            });
        }
    },

    sign_in: async (req, res, next) => {
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
            if (!user || !user.isValidPassword(password)) {
                return res.status(403).json({
                    error: 'Email or password was incorrect'
                });
            }

            // creates token for logged on user
            const token = jwt.sign({ user }, config.auth.jwt_secret);

            // sends back user data
            res.status(200).json({
                user,
                token
            });
        } catch(error) {
            // sends back error message
            res.status(500).json({
                error: 'Error has occured trying to sign in'
            });
        }
    }
}