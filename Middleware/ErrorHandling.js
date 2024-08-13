function errorHandling(err, req, res, next){
    if(err || res.statusCode >= 400){
        res.json({
            status: err.status || res.statusCode || 500,
            msg: 'An error has occured'
        })
    }else {
        next()
    }
}
export{
    errorHandling
}
