const mongoose = require('mongoose');
const validator = require('validator');

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Stock name is required'],
    trim: true,
    uppercase: true,
    minlength: [1, 'Stock name must be at least 1 character long'],
    maxlength: [5, 'Stock name cannot be more than 5 characters long'],
    validate: {
      validator: (v) => validator.isAlpha(v) && validator.isUppercase(v),
      message: (props) => `${props.value} is not a valid uppercase alphabetic stock name (1-5 letters).`,
    },
    unique: true, // Ensure stock names are unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Stock', StockSchema);