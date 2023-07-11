const Blog = require ('../models/blog');
const {validationResult} = require ('express-validator');

//Index
const index = (req, res) => {
  Blog.find ()
    .sort ({createdAt: -1})
    .then (result => {
      res.render ('blogs/index', {
        title: 'All Blogs',
        blogs: result,
        path: req.path,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

//Create
const create = (req, res) => {
  res.render ('blogs/create', {title: 'Create', path: req.path});
};

//Store
const store = (req, res) => {
  const blog = new Blog (req.body);
  blog
    .save ()
    .then (() => {
      res.redirect ('/');
    })
    .catch (error => {
      console.log (error);
    });
};

//Show
const show = (req, res) => {
  const id = req.params.id;
  Blog.findById (id)
    .then (result => {
      res.render ('blogs/details', {
        blog: result,
        title: 'Blog Details',
        path: req.path,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

//Edit
const edit = (req, res) => {
  const id = req.params.id;
  Blog.findById (id)
    .then (result => {
      res.render ('blogs/create', {
        blog: result,
        title: 'Blog Details',
        path: req.path,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

//Update
const update = (req, res) => {
  //
};

//Destroy
const destroy = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete (id).then (() => res.redirect ('/')).catch (err => {
    console.log (err);
  });
};

module.exports = {
  index,
  create,
  store,
  show,
  edit,
  show,
  destroy,
};
