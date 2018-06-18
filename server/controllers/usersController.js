const jwt = require('jsonwebtoken');

// imports config file
const config = require('../config/config');

// imports user model
const { User } = require('../models');

module.exports = {
    sign_up: async (req, res, next) => {
        try {
            const userData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

            // creates new user
            const user = await User.create(userData);

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
    },

    get_user: async (req, res, next) => {
        try {
            // gets user id from params
            const userId = req.params.userId;
            // find user by id
            const user = await User.findById(userId);

            // checks to see if user exists
            if (!user) {
                return res.status(404).json({
                    error: 'User not found'
                });
            }

            // sends back user
            res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch(error) {
            // sends back error message
            res.status(500).json({
                error: 'Error has occured trying to get user profile'
            });
        }
    },

    update_user: async (req, res, next) => {
        try {
            const userData = {
                id: req.params.userId,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            // updates user in db
            await User.update(userData, {
                where: {
                    id: userData.id
                },
                individualHooks: true
            });

            // sends back song
            res.status(200).json({
                user: {
                    id: userData.id,
                    username: userData.username,
                    email: userData.email
                }
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error updating the User profile'
            });
        }
    },

    delete_user: async (req, res, next) => {
        try {
            // deletes user in db
            await User.destroy({
                where: {
                    id: req.params.userId
                }
            });

            // sends back success message
            res.status(200).json({
                message: 'Successfully deleted user'
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error updating the User profile'
            });
        }
    }
}