const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let TalentSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "You mush fill in the name"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", TalentSchema);
