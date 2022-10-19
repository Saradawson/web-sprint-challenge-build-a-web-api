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

module.exports = {
    validateActionsId
}
