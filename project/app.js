require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoURL = process.env.MONGODB_URL;

// Connect to mongoose
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
// Import mongoose models
const Players = require("./models/players");

app.get("/", (req, res) => {
  Players.find({})
    .then((players) => {
      const nactive = players.filter((p) => p.active).length;
      res.send(
        `The team currently has ${players.length} players of which ${nactive} are currently active. To see details, use /api/players.`
      );
    })
    .catch((error) => next(error));
});

// PLAYERS

// List players
app.get("/api/players", (req, res, next) => {
  Players.find({})
    .then((players) => res.json(players))
    .catch((error) => next(error));
});

// Get single player
app.get("/api/players/id/:_id", (req, res, next) => {
  Players.findById(req.params._id)
    .then((player) => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// List active players
app.get("/api/players/active", (req, res, next) => {
  Players.find({ active: true })
    .then((players) => res.json(players))
    .catch((error) => next(error));
});

// Get players by position
app.get("/api/players/position/:position", (req, res, next) => {
  Players.find({ active: true, position: req.params.position })
    .then((players) => res.json(players))
    .catch((error) => next(error));
});

// Add player
app.post("/api/players", (req, res, next) => {
  const player = { ...req.body };
  let number_found = false;
  if (player.active) {
    // Check that no active player has the same number
    Players.find({ active: true }).then((players) => {
      const numbers = players.map((p) => p.number);
      if (numbers.includes(player.number)) {
        res
          .status(400)
          .send({ error: "number already used by another active player" });
        number_found = true;
      } else {
        Players.create(player)
          .then((player) => {
            res.json(player);
          })
          .catch((error) => next(error));
      }
    });
  } else {
    Players.create(player)
      .then((player) => {
        res.json(player);
      })
      .catch((error) => next(error));
  }
});

// Retire player
app.put("/api/players/retire/:_id", (req, res, next) => {
  const query = { _id: req.params._id };
  const update = {
    $set: { active: false },
  };
  Players.findOneAndUpdate(query, update, { new: true })
    .then((player) => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Activate player
app.put("/api/players/activate/:_id", (req, res, next) => {
  const query = { _id: req.params._id };
  const update = {
    $set: { active: true },
  };
  Players.findOneAndUpdate(query, update, { new: true })
    .then((player) => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete player
app.delete("/api/players/id/:_id", (req, res, next) => {
  Players.findByIdAndDelete(req.params._id)
    .then((player) => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Update any info
app.put("/api/players/id/:_id", (req, res, next) => {
  const query = { _id: req.params._id };
  const update = {
    ...req.body,
  };
  Players.findOneAndUpdate(query, update, { new: true })
    .then((player) => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Handle nonexistant addresses
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Handle errors
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
