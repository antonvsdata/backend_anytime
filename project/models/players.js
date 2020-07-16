const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  position: [String],
  joined: Number,
  born: Number,
});

playerSchema.plugin(uniqueValidator);

playerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Players", playerSchema);
