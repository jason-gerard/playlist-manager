const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            // checks to see which errors should be returned
            if (result.error) {
                switch(result.error.details[0].context.key) {
                    case 'username':
                        res.status(400).json({
                            error: 'Username is invalid'
                        });
                        break;
                    case 'email' || 'password':
                        res.status(400).json({
                            error: 'Email or password is invalid'
                        });
                        break;
                    default:
                        res.status(400).json({
                            error: 'Invalid information'
                        });
                }
            }

            if (!req.value) {
                req.value = {};
            }

            // returns body of authenticated data
            req.value['body'] = result.value;
            next();
        }
    },

    // object of all auth schemas
    schemas: {
        signUpSchema: Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}