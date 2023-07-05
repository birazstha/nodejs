const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const PORT = 3000;
const methodOverride = require("method-override");

//express app
const app = express();

app.use(methodOverride("_method"));

//connect to mongodb
const dbURL = "mongodb+srv://biraj:dlTUbicw1dVSBukl@cluster0.p2r01ei.mongodb.net/note-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server is up and running at port:", PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 3",
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

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Storing Data
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Listing Data
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result, path: req.path });
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create", path: req.path });
});

//View
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details", path: req.path });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  console.log("Inside the blogs delete router handler");
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
  res.render("index", { title: "Home", path: req.path });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", path: req.path });
});

//404
app.use((req, res) => {
  res.status(404).render("404", { path: req.path });
});
