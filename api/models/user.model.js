const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      default: "customer",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [
      { 
        type: ObjectId,
        ref: "Product"
      }
    ],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
