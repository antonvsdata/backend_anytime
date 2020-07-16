var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var mongojs = require("mongojs");
var db = mongojs("connection_string_here", ["users"]);

var app = express();

/*
var logger = (req, res, next) => {
  console.log("Logging...");
  next();
};

app.use(logger);
*/

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static path
app.use(express.static(path.join(__dirname, "public")));

var users = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@iki.fi",
  },
  {
    id: 2,
    first_name: "Jill",
    last_name: "Doe",
    email: "jilldoe@iki.fi",
  },
];

app.get("/", (req, res) => {
  db.users.find((err, docs) => {
    res.render("index", {
      title: "Customers",
      users: docs,
    });
  });
});

app.post("/users/add", (req, res) => {
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };

  db.users.insert(newUser, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

/*
app.delete("/users/delete/:id", (req, res) => {
  console.log(req.params.id);
  db.users.remove({
    _id: mongojs.ObjectId(req.params.id, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }),
  });
});
*/

app.listen(3000, () => {
  console.log("Server started port 3000");
});
