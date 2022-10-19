const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something went wrong in the actions router"
    })
})

module.exports = router;
