const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.Promise = require('bluebird');


const vendingMachineSchema = new Schema({
  status: String,
  data: [
    {
      id: Number,
      description: String,
      cost: Number,
      quantity: Number,
      money_given: Number,
      money_required: Number
    }
  ]
})



module.exports = mongoose.model('items', vendingMachineSchema);
