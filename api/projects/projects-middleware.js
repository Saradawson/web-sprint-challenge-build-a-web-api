// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({
                message: `User with id: ${req.params.id} not found`
            })
        }else {
            req.porject = project;
            next();
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    validateProjectId
}