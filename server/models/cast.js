'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cast.belongsTo(models.Movie, { foreignKey: "movieId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Cast.init({
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Movies",
        key: "id"
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Cast name is required.'
        },
        notEmpty: {
          msg: 'Cast name is required.'
        }
      }
    },
    profilePict: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};