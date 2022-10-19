const express = require('express');

const {
    validateActionsId,
    validateAction
} = require('./actions-middlware')

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
           .then(actions => {
            res.json(actions)
           })
           .catch(next)
})

router.get('/:id', validateActionsId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) =>{
    Actions.insert(req.action)
           .then(newAction => {
                res.status(201).json(newAction)
           })
           .catch(next)
})

router.put('/:id', validateActionsId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
           .then(() => {
                res.json(req.action)
           })
           .catch(next)
})

router.delete('/:id', validateActionsId, (req, res, next) => {
    Actions.remove(req.params.id)
           .then(() => {
                res.json(req.action)
           })
           .catch(next)
})

router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something went wrong in the actions router"
    })
})

module.exports = router;
