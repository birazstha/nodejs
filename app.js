const express = require ('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const PORT = 3000;
const blogRoutes = require ('./routes/blogRoutes');
require ('dotenv').config ({path: '../.env'});
const methodOverride = require ('method-override');

//express app
const app = express ();

app.use (methodOverride ('_method'));

//connect to mongodb
const dbURL =
  'mongodb+srv://biraj:dlTUbicw1dVSBukl@cluster0.p2r01ei.mongodb.net/note-tuts?retryWrites=true&w=majority';

mongoose
  .connect (dbURL)
  .then (() => {
    console.log ('Connected to MongoDB');
    app.listen (PORT, () => {
      console.log ('Server is up and running at port:', PORT);
    });
  })
  .catch (err => {
    console.log ('Error connecting to MongoDB:', err);
  });

// Register view engine
app.set ('view engine', 'ejs');

//middleware & static files
app.use (express.static ('public'));
app.use (express.urlencoded ({extended: true}));
app.use (morgan ('dev'));

app.use ('/blogs', blogRoutes);

//routes
app.get ('/', (req, res) => {
  res.redirect ('/blogs');
  res.render ('index', {title: 'Home', path: req.path});
});

app.get ('/about', (req, res) => {
  res.render ('about', {title: 'About Us', path: req.path});
});

//404
app.use ((req, res) => {
  res.status (404).render ('404', {path: req.path});
});
