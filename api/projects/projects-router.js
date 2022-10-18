const express = require('express');
const { 
    validateProjectId,
    validateProject
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

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.project)
            .then(newProject => {
                res.status(201).json(newProject)
            })
            .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
            .then(() => {
                res.json(req.project)
            })
            .catch(next)
})

router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something went wrong in the project router"
    })
})

module.exports = router;