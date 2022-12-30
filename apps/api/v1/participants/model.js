const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const bcrypt = require("bcryptjs");

let PartipantSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "-",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

PartipantSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

PartipantSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = model("Participant", PartipantSchema);
