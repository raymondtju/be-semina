const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "Minimum of category name is 3 character"],
      maxLength: [20, "Maximum of category name is 20 character"],
      required: [true, "You mush fill in the category"],
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "Organizer",
      required: [true, "You mush fill in the organizer"],
    },
  },
  { timestamps: true } //for viewing createdAt and updatedAt
);

module.exports = model("Category", categorySchema);
