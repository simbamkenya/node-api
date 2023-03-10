const errorHandler = (err, req, res, next) => {
    //jwt authentication error
    if(err.name === 'UnauthorizedError') return   res.status(500).json(({message: err }));
    //validation error
    if(!err.name === 'ValidationError') return res.status(401).json({message: err});
    //defaul to 500 server error
    return res.status(500).json(err)  
}

module.exports = errorHandler;