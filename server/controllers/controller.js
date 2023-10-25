const { User, Movie, Cast, Genre, History, Still } = require('../models')
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt');
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
                const isPasswordValid = checkPassword(req.body.password, user.password)
                if (!isPasswordValid) {
                    throw { name: 'IncorrectPassword' }
                } else {
                    const access_token = createToken({
                        id: user.id,
                        email: user.email
                    })
                    res.json({ access_token, username: user.username, email: user.email, role: user.role })
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
                email: user.email,
                username: user.username
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
                year: req.body.year,
                status: req.body.status
            }, { transaction: t })

            const casts = req.body.cast.map((el) => ({ ...el, movieId: movie.id }))

            const movieCast = await Cast.bulkCreate(casts, { transaction: t })

            const stills = req.body.still.map((el) => ({ ...el, movieId: movie.id }))

            const movieStill = await Still.bulkCreate(stills, { transaction: t })

            await t.commit()

            const history = await History.create({
                title: `${movie.title}`,
                description: `Movie: ${movie.title} was added to the database`,
                by: req.user.username
            })

            res.status(201).json({ movie, movieCast, movieStill, history })



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
                    attributes: ['name', 'profilePict']
                },
                {
                    model: Genre,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Still,
                    attributes: ['url']
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
                    year: req.body.year,
                    status: req.body.status
                }, {
                    where: {
                        id: req.params.id
                    }
                })

                if (req.body.cast) {
                    const casts = req.body.cast.pop()

                    for (const cast of casts) {
                        const { id, name, profilePict } = cast

                        if (id) {
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
                }

                if (req.body.stills) {
                    const stills = req.body.stills
                    for (const still of stills) {
                        const { id, url } = still

                        if (id) {
                            const existingStill = await Still.findByPk(id)
                            await existingStill.update({
                                url
                            })
                        } else {
                            const newStill = await Still.create({
                                url, movieId: updatedMovie.id
                            })
                        }
                    }
                }

                const history = await History.create({
                    title: `${updatedMovie.title}`,
                    description: `Movie: ${updatedMovie.title} was successfully edited`,
                    by: req.user.username
                })
                res.json({ message: `${updatedMovie.title} was successfully edited.`, history })
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
                const history = await History.create({
                    title: `${deletedMovie.title}`,
                    description: `Movie: ${deletedMovie.title} was successfully deleted`,
                    by: req.user.username
                })
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

            if (newGenre) {
                const history = await History.create({
                    title: `${newGenre.name}`,
                    description: `Genre: ${newGenre.name} was added to the database`,
                    by: req.user.username
                })

            }

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

                const history = await History.create({
                    title: `${updatedGenre.name}`,
                    description: `Genre: ${updatedGenre.name} was succcessfully edited`,
                    by: req.user.username
                })

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
                const history = await History.create({
                    title: `${deletedGenre.name}`,
                    description: `Genre: ${deletedGenre.name} was succcessfully deleted`,
                    by: req.user.username
                })
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
                    attributes: ['id', 'name', 'profilePict']
                },
                {
                    model: Genre,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Still,
                    attributes: ['id', 'url']
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

    static async getHistory(req, res, next) {
        try {
            const history = await History.findAll({
                order: [['id', "DESC"]]
            })
            res.json(history)
        }
        catch (err) {
            next(err)
        }
    }



}

module.exports = Controller