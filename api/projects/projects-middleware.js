// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({
                message: `Project with id: ${req.params.id} not found`
            })
        }else {
            req.project = project;
            next();
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if(!name || !description || completed === undefined){
            res.status(400).json({
                message: 'Missing required fields'
            })
        }else{
            req.project = req.body;
            next();
        }
}

module.exports = {
    validateProjectId,
    validateProject
}