'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Still extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Still.belongsTo(models.Movie, { foreignKey: "movieId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Still.init({
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Movies",
        key: "id"
      },
      allowNull: false,
      onDelete: 'CASCADE'},
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Still',
  });
  return Still;
};