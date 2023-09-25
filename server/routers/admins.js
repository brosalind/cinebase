const express = require('express')
const adminRouter = express.Router()
const Controller = require('../controllers/controller')
const {authentication} = require('../middlewares/authentication')

adminRouter.post('/login', Controller.login)
adminRouter.post('/register', Controller.register)
adminRouter.use(authentication)
adminRouter.post('/movies', Controller.addMovie)
adminRouter.get('/movies', Controller.getMovies)
adminRouter.post('/genres', Controller.addGenre)
adminRouter.get('/genres', Controller.getGenres)
adminRouter.put('/movies/:id', Controller.editMovie)
adminRouter.delete('/movies/:id', Controller.deleteMovie)
adminRouter.put('/genres/:id', Controller.editGenre)
adminRouter.delete('/genres/:id', Controller.deleteGenre)

module.exports = adminRouter