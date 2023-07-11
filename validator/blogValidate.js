const {checkSchema} = require ('express-validator');

const blogValidation = checkSchema ({
  title: {
    notEmpty: {
      errorMessage: 'Title is required',
      bail: true,
    },
  },
  snippet: {
    notEmpty: {
      errorMessage: 'Snippet is required',
      bail: true,
    },
  },
  body: {
    notEmpty: {
      errorMessage: 'Body is required',
      bail: true,
    },
  },
});

module.exports = blogValidation;
