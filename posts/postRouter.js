const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(500).json({ error: `There was a problem getting all the posts. ${err}`}))
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(500).json({error: `We can't seem to find that post anymore. ${err}`}))
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(post => res.status(204).json(post))
  .catch(err => res.status(500).json({error: `Um, something happened while trying to remove the post. ${err}`}))
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(post => res.status(201).json(post))
  .catch(err => res.status(500).json({error: `There was an error updating the post. ${err}`}))
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if (!req.params.id) {
    res.status(400).json({error: `What post are you looking for?`})
  } else {
    Posts.getById(req.params.id)
    .then(post => {
      if(!post) {
        res.status(400).json({error: `The post you are looking for is gone.`})
      } else {
        next()
      }
    })
    .catch(err => res.status(500).json({error: `I cannot post that. ${err}`}))
  }
}

module.exports = router;
