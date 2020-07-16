var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
//app.use(bodyParser.json);

const Book = require("./models/book");
const Genre = require("./models/genre");

// Connect to mongoose
mongoose.connect("connection_string_here");
var db = mongoose.connection;

app.get("/", (req, res) => {
  res.send("Please use /api/books or /api/genres!");
});

app.get("/api/genres", (req, res) => {
  Genre.getGenres((err, genres) => {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.post("/api/genres", (req, res) => {
  var genre = req.body;
  Genre.addGenre(genre, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.put("/api/genres/:_id", (req, res) => {
  var id = req.params._id;
  var genre = req.body;
  Genre.updateGenre(id, genre, {}, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.delete("/api/genres/:_id", (req, res) => {
  var id = req.params._id;
  Genre.deleteGenre(id, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

// Books
app.get("/api/books", (req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get("/api/books/:_id", (req, res) => {
  Book.getBookById(req.params._id, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.post("/api/books", (req, res) => {
  var book = req.body;
  Book.addBook(books, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.put("/app/books/:_id", (req, res) => {
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {}, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.delete("/api/books/:_id", (req, res) => {
  Book.deleteBook(req.params._id, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.listen(3000);
console.log("Running on port 3000");
