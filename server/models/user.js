'use strict';
const {
  Model
} = require('sequelize');

const {createPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       User.hasMany(models.Movie, { foreignKey: "authorId" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email is already in use. Please use a different e-mail to register or login using your existing account.'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required.'
        },
        notNull :{
          msg: 'Email is required.'
        },
        isEmail: {
          msg: "Please enter a valid email address."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required.'
        },
        notNull :{
          msg: 'Password is required.'
        },
        checkLength(value) {
          if (this.password.length < 5) {
            throw new Error("Password is too short. Password needs to be at least 5 characters long.")
          }
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = createPassword(user.password)
  })
  return User;
};