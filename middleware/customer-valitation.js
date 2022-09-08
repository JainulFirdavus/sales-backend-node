module.exports = function () {
    const { check, validationResult } = require('express-validator');

    var data = {};
    data.status = 0;
    data.response = 'Invalid Request';

    var validator = {};

    validator.customersave = [

        // check('username').notEmpty().withMessage('name Required'),
        // check('phone').notEmpty().withMessage('Phone Required'),
        check('email').notEmpty().withMessage('Email Required'),
        check('email').isEmail().withMessage('Invalid Email'),
        check('password').exists()
            // check('confirmPassword', 'Confirm Password field must have the same value as the password field')
            .exists()
            .custom((value, { req }) => value === req.body.password),
        (req, res, next) => {

            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;
                return res.send(data);
            }
            return next();
        }];


    validator.customerlogin = [

        // check('email').isEmail().withMessage('Email Is Required'),
        check('password').exists().withMessage('Email Is Required'),

        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;
                return res.send(data);
            }
            return next();
        }];


    return validator;
};