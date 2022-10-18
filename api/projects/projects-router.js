const express = require('express');
const { 
    validateProjectId
} = require('./projects-middleware');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
            .then(projects => {
                res.json(projects)
            })
            .catch(next)
})

router.get('/:id', validateProjectId, (req, res) =>{
    res.json(req.project)
})

router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something went wrong in the project router"
    })
})

module.exports = router;