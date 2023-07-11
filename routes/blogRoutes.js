const express = require ('express');
const BlogController = require ('../controllers/BlogController');
const router = express.Router ();
const blogValidation = require ('../validator/blogValidate');
const validate = require ('../validate');

//Listing Data
router.get ('/', BlogController.index);
//Storing Data
router.post ('/', BlogController.store);
//Create Page
router.get ('/create', BlogController.create);
//View
router.get ('/:id', BlogController.show);
//Delete
router.delete ('/:id', BlogController.destroy);

//Edit Page
router.get ('/:id/edit', BlogController.edit);

module.exports = router;
