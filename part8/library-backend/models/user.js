const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  favouriteGenre: {
    type: String,
    required: true,
    minLength: 2,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
});

module.exports = mongoose.model("User", schema);
