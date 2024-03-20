const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');

//routes

router.get('/', getAll);
router.get('/:id', getById);
router.get('/', createSchema, create);
router.get('/:id', updateSchema, update);
router.get('/:id', _delete);

module.exports  = router;

//route functions

function getAll(req, res, nest){
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next){
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next){
    userService.create(req.body)
        .then(() => res.json({message: 'User Created'}))
        .catch(next);
}

function update(req, res, next){
    userService.delete(req.params.id)
        .then(() => res.json({message: 'User Updated'}))
}

function _delete(res, req, next){
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted'}))
}

function createSchema(req, res, next){
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, res, schema);
}

function updateSchema(req, res, next){
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        title: Joi.string().email().empty(''),
        title: Joi.string().min(6).empty(''),
        title: Joi.string().valid(Joi.ref('password')).empty('')

    }).wth('password', 'confirmpassword');
    validateRequest(req, next, schema);
}