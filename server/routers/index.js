const express = require('express')
const router = express.Router()
const adminRouter = require('./admins')
const {errorHandler} = require('../middlewares/errorHandler')
const Controller = require('../controllers/controller')

router.get('/movies', Controller.getMovies)
router.get('/movies/:id', Controller.getMovieDetails)
router.use('/admin', adminRouter)
router.use(errorHandler)

module.exports = router, adminRouter