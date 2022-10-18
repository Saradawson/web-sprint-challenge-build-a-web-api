const express = require('express');
const { 
    validateUserID
} = require('./projects-middleware');
const Projects = require('./projects-model');

const router = express.Router();

module.exports = router;