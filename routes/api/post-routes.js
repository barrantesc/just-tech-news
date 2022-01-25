//access express file
const router = require('express').Router();
// know post information and user who post it
const { Post, User } = require('../../models');


// router will retrieve all post in database
// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });


//test route
module.exports = router;