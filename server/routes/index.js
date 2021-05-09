var express = require('express');
var router = express.Router();
var Category = require("../models/Category");
var Post = require("../models/Post");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/category', (req, res, next) => {
  Category.find((err, categories) => {
    if (err) return next(err);
    res.json(categories)
  })
});
// find post by category id
router.get('/bycategory/:id', (req, res, next) => {
  Post.find({ category: req.params.id }, (err, posts) => {
    if (err) return next(err);
    res.json(posts)
  })
});

router.get('/post', (req, res, next) => {
  Post.find((err, posts) => {
    if (err) return next(err);
    res.json(posts)
  })
});

router.get('/post/:id', (req, res, next) => {
  Post.findById(req.params.id, (err, posts) => {
    if (err) return next(err);
    res.json(posts)
  })
});

module.exports = router;
