const Actions = require('./actions-model');

async function validateActionsId(req, res, next) {
    try{
    const action = await Actions.get(req.params.id);
    if(!action){
        res.status(404).json({
            message: `Action with id: ${req.params.id} not found`
        })
    }else{
        req.action = action;
        next();
    }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

function validateAction(req, res, next) {
    const { project_id, notes, description } = req.body;
    if(!project_id || !notes || !description){
        res.status(400).json({
            message: 'Missing required fields'
        })
    }else{
        req.action = req.body;
        next();
    }
}

module.exports = {
    validateActionsId,
    validateAction
}
