const express = require('express');

const Posts = require('../posts/postDb');
const Users = require('../users/userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => res.status(500).json({error: `Error adding a new user. ${err}`}))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert({user_id: req.params.id, text: req.body.text})
    .then(newPost => res.status(200).json(newPost))
    .catch(err => {res.status(500).json({ error: `${err}`})})
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error: "Error retrieving users."}))
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: "User could not be found."}))
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(userPosts => {
      if(!userPosts){
        res.status(404).json({ message: 'That post does not exist.'})
        return null
      }
      res.status(200).json(userPosts)
    })
    .catch(err => res.status(500).json({ error: `There was an error looking for posts. ${err}`}))
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(user => {
      res.status(204).json(user);
    })
    .catch(err => res.status(500).json({ error: `The user could not be removed. ${err}`}))
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: "The user information could not be modified"}))
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userId = req.params.id

  if(userId){
    req.user = userId;
    Users.getById(req.params.id)
      .then(user => {
        if(!user){
          res.status(400).json({ message: "The user has been lost on the trail."})
        }else{
          next();
        }
      })
      .catch(err =>  res.status(500).json({ error: "There was a problem looking for that user.", err}));
  } else {
      res.status(400).json({message: "invalid user id"});
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body || !req.body.name) {
    res.status(400).json({ message: "Please provide a name for the new user."});
  }else{
    next();
  }  
}

function validatePost(req, res, next) {
  // do your magic!
  if(req.body && !req.body.text){
    res.status(400).json({message: "Missing required text field"})
}else if(!req.body){
    res.status(400).json({message: "Missing post data"})
}else{
    next();
}
}

module.exports = router;
