const errorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                message: err.errors[0].message
            })
        }
    else if(err.name === 'noEmail'){
        res.status(400).json({
            message: 'Email is required.'
        })
    }
    else if(err.name === 'noPassword'){
        res.status(400).json({
            message: 'Password is required.'
        })
    }
    else if(err.name === 'UserDoesNotExist'){
        res.status(401).json({
            message: 'Invalid user. Please register first or make sure your login details are correct.'
        })
    }
    else if(err.name === 'IncorrectPassword'){
        res.status(401).json({
            message: 'Incorrect password. Please try again.'
        })
    }
    else if (err.name === 'JsonWebTokenError'){
        res.status(401).json({
            message: 'Please login first.'
        })
    }
    else if(err.name ==='notFound'){
        res.status(404).json({
            message: 'Error Not Found.'
        })
    }
    else {
        console.log(err)
        res.status(500).json({
            message: "Something happened. Please try again later."
        })
    }
}


module.exports = {errorHandler}