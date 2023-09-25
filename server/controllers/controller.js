const { User, Movie, Cast, Genre } = require('../models')
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')
const sequelize = require('../models').sequelize;

class Controller {
    static async login(req, res, next) {
        try {

            if (!req.body.email || !req.body.email.trim().length) {
                throw { name: "noEmail" }
            }

            if (!req.body.password || !req.body.password.trim().length) {
                throw { name: "noPassword" }
            }

            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (!user) {
                throw { name: "UserDoesNotExist" }
            } else {
                console.log(user)
                const isPasswordValid = checkPassword(req.body.password, user.password)
                if (!isPasswordValid) {
                    throw { name: 'IncorrectPassword' }
                } else {
                    const access_token = createToken({
                        id: user.id,
                        email: user.email
                    })
                    res.json({ access_token, email: user.email, role: user.role })
                }
            }
        }
        catch (err) {
            next(err)
        }
    }
    static async register(req, res, next) {
        try {
            if (!req.body.email || !req.body.email.trim().length) {
                throw { name: "noEmail" }
            }

            if (!req.body.password || !req.body.password.trim().length) {
                throw { name: "noPassword" }
            }

            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                role: 'admin'
            })

            const access_token = createToken({
                id: user.id,
                email: user.email
            })

            res.status(201).json({
                access_token,
                id: user.id,
                email: user.email
            })

        }
        catch (err) {
            next(err)
        }
    }

    static async addMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const movie = await Movie.create({
                title: req.body.title,
                synopsis: req.body.synopsis,
                trailerUrl: req.body.trailerUrl,
                imgUrl: req.body.imgUrl,
                rating: req.body.rating,
                genreId: req.body.genreId,
                authorId: req.user.id,
                director: req.body.director,
                writer: req.body.writer,
                year: req.body.year
            }, { transaction: t })

            const casts = req.body.cast.map((el) => ({ ...el, movieId: movie.id }))

            const movieCast = await Cast.bulkCreate(casts, { transaction: t })

            res.status(201).json({ movie, movieCast })

            await t.commit()


        } catch (err) {
            await t.rollback()
            next(err)
        }
    }


    static async getMovies(req, res, next) {
        try {
            const movie = await Movie.findAll({
                order: [['id', "ASC"]]
                ,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Cast,
                    attributes:  ['name', 'profilePict']
                },
                {
                    model: Genre,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['username']
                }
                ],
            })
            res.json(movie)
        } catch (err) {
            next(err)
        }
    }

    static async editMovie(req, res, next) {
        try {

            const updatedMovie = await Movie.findByPk(req.params.id)
            if (!updatedMovie) {
                throw { name: "notFound" }
            } else {
                const movie = await Movie.update({
                    title: req.body.title,
                    synopsis: req.body.synopsis,
                    trailerUrl: req.body.trailerUrl,
                    imgUrl: req.body.imgUrl,
                    rating: req.body.rating,
                    genreId: req.body.genreId,
                    authorId: req.user.id,
                    director: req.body.director,
                    writer: req.body.writer,
                    year: req.body.year
                }, {
                    where: {
                        id: req.params.id
                    }
                })

                const casts = req.body.cast.pop()

                for (const cast of casts){
                    const {id, name, profilePict} = cast 
            
                    if(id){
                        const existingCast = await Cast.findByPk(id)
                        await existingCast.update({
                            name, profilePict
                        })
                    } else {
        
                        const newCast = await Cast.create({
                            name, profilePict, movieId: updatedMovie.id
                        })
                    }
                }

                res.json({ message: `${updatedMovie.title} was successfully edited.` })

               
            }

        }
        catch (err) {
            next(err)
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const deletedMovie = await Movie.findByPk(+req.params.id)
            const movie = await Movie.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (!movie) {
                throw { name: "notFound" }
            } else {
                res.json({ message: `${deletedMovie.title} was successfully deleted.` })
            }
        }
        catch (err) {
            next(err)
        }
    }

     static async getGenres(req, res, next) {
        try {
            const genre = await Genre.findAll()
            res.json(genre)
        }
        catch (err) {
            next(err)
        }
    }
    static async addGenre(req, res, next) {
        try {
            const newGenre = await Genre.create({
                name: req.body.newGenre
            })

            res.status(201).json(newGenre)

        }
        catch (err) {
            next(err)
        }
    }

    static async editGenre(req, res, next) {
        try {
            const updatedGenre = await Genre.findByPk(req.params.id)
            if (!updatedGenre) {
                throw { name: "notFound" }
            } else {
                const genre = await Genre.update({
                    name: req.body.name
                }, { where: { id: req.params.id } })

                res.json({
                    message: `${updatedGenre.name} was successfully updated to ${req.body.name}.`
                })

            }
        }
        catch (err) {
            next(err)
        }
    }

    static async deleteGenre(req, res, next) {
        try {
            const deletedGenre = await Genre.findByPk(req.params.id)

            const genre = await Genre.destroy({
                where: {
                    id: req.params.id
                }
            })

            if (!genre) {
                throw { name: "notFound" }
            } else {
                res.json({
                    message: `${deletedGenre.name} was successfully deleted.`
                })
            }

        } catch (err) {
            next(err)
        }
    }

    
    static async getMovieDetails(req, res, next) {
        try {
            const movie = await Movie.findByPk(req.params.id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Cast,
                    attributes:  ['id', 'name', 'profilePict']
                },
                {
                    model: Genre,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['username']
                }
                ],
            })
            if (!movie) {
                throw { name: "notFound" }
            } else {
                res.json(movie)
            }
        } catch (err) {
            next(err)
        }
    }



}

module.exports = Controller