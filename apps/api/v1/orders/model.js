const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
    minlength: 3,
    maxlength: 50,
  },
  date: {
    type: Date,
    required: [true, "Date and time required"],
  },
  about: {
    type: String,
  },
  venueName: {
    type: String,
    required: [true, "Venue name required"],
  },
  statusEvent: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  image: {
    type: mongoose.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  talent: {
    type: mongoose.Types.ObjectId,
    ref: "Talent",
    required: true,
  },
  organizer: {
    type: mongoose.Types.ObjectId,
    ref: "Organizer",
    required: true,
  },
});

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Ticket category type required"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity required"],
  },
});

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  personalDetails: {
    firstName: {
      type: String,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [20, "First name must be at most 20 characters long"],
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [20, "Last name must be at most 20 characters long"],
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    role: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  totalPay: {
    type: Number,
    required: true,
  },
  totalOrderTicket: {
    type: Number,
    required: true,
  },
  orderItems: [orderDetailSchema],
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant",
    required: true,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  history: historySchema,
});

module.exports = mongoose.model("Order", orderSchema);
