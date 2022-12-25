const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let OrganizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "You mush fill in the organizer name"],
    },
  },
  { timestamps: true }
);

module.exports = model("Organizer", OrganizerSchema);
