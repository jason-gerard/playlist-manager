const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                switch(result.error.details[0].context.key) {
                    case 'username':
                        res.status(400).json({
                            error: 'Username was invalid'
                        });
                        break;
                    case 'email' || 'password':
                        res.status(400).json({
                            error: 'Email or password was invalid'
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
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        signUpSchema: Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}