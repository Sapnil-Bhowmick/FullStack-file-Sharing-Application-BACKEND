

async function ErrorMiddleware(err , req , res , next){
    const errorStatus = parseInt(err.status) || 500
    const errorMessage = err.message || 'Something went wrong'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err
    })
}


module.exports = ErrorMiddleware
 
