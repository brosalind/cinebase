'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, {foreignKey: 'genreId'}) 
      Movie.belongsTo(models.User, {foreignKey: 'authorId'})
      Movie.hasMany(models.Cast, {foreignKey: 'movieId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Title is required.'
        },
        notNull :{
          msg: 'Title is required.'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Slug is required.'
        },
        notNull :{
          msg: 'Slug is required.'
        }
      }
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Synopsis is required.'
        },
        notNull :{
          msg: 'Synopsis is required.'
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Rating is required.'
          },
          notNull :{
            msg: 'Rating is required.'
          },
          min: {
            args: [1],
            msg: 'Rating needs to be at least 1.'
          }
        }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    director: DataTypes.STRING, 
    writer: DataTypes.STRING,
    year: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  Movie.beforeValidate((movie) => {
    movie.slug = movie.title.toLowerCase().trim().replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
  })
  return Movie;
};