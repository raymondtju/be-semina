const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const bcrypt = require("bcryptjs");

let UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "You mush fill in the name"],
    },
    email: {
      type: String,
      required: [true, "You mush fill in the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "You mush fill in the password"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["organizer", "admin", "owner"],
      default: "organizer",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};

module.exports = model("User", UserSchema);
