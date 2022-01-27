// Model and Data types from sequelize package
const { Model, DataTypes } = require('sequelize');
// Import connection to mysql data stored in connection.js 
const sequelize = require('../config/connection');

// Define/create the Post model 
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ]
      });
    });
  }
}

// create fields/columns for Post model, configure naming conventions and pass current connection instance to initialize the Post model
Post.init( //define post schema
    {
      id: { //id column = primary key & autoincrement
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
      },
      title: {
        type: DataTypes.STRING, // title column defines as a string value
        allowNull: false
      },
      post_url: {
        type: DataTypes.STRING, // post_url column defines as a string value
        allowNull: false,
        validate: {
          isURL: true //makes sure url is verified
        }
      },
      user_id: { //column defines who posted new articles
        type: DataTypes.INTEGER,
        references: { // this establishes relationship between post and user by creating reference to user model & define id as key property
          model: 'user', 
          key: 'id'
        }
      }
    },
    { // metadata configured including naming conventions
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  // Expression to make Post model accessible to other parts of the application
  module.exports = Post;