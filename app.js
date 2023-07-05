const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//express app
const app = express();

//connect to mongodb
const dbURL = "mongodb+srv://biraj:dlTUbicw1dVSBukl@cluster0.p2r01ei.mongodb.net/note-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURL)
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my new blog",
    body: "more about my blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (res, req) => {
  Blog.find()
    .then((result) => {
      // res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "My name is Youshi",
    },
    {
      title: "Mario finds princes",
      snippet: "My name is Mario",
    },
    {
      title: "How to find princess?",
      snippet: "Ways to find princess.",
    },
  ];
  res.render("index", { title: "Home", path: req.path, blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", path: req.path });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create", path: req.path });
});

//404
app.use((req, res) => {
  res.status(404).render("404", { path: req.path });
});
