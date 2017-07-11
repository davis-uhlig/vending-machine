const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config")[process.env.NODE_ENV || 'test']
const nodeEnv = process.env.NODE_ENV || "development";
const app = require('../app');
const items = require('../models/items.js')

mongoose.Promise = require('bluebird');

if (require.main === 'module'){
  mongoose.connect(config.mongoURL);
}


router.get('/api/customer/items', function(req, res){
  items.find({}).then(function(item){
    if(item) {
      res.setHeader('Content-Type', 'application/json');
        res.status(200).json(item);
    }
  })
})

router.get('/api/vendor/purchases', function(req, res){
  items.find({status:'success'
  }).then(function(item){
    if(item) {
      res.setHeader('Content-Type', 'application/json');
        res.status(200).json(item);
    }
  })
})

router.post('api/vendor/items', function(req, res){
  let newItem = {
    status: req.body.status,
    data: [
      {
        id: req.body.id,
        description: req.body.description,
        cost: req.body.cost,
        quantity: req.body.quantity,
        money_given: req.body.money_given,
        money_required: req.body.money_required
      }
    ]
  }

  items.create(newItem).then(function(newItem){
    if(newItem) {
      res.setHeader('Content-Type', 'application/json');
        res.status(201).json(stat);
    }
  })
})

// router.get('/api/vendor/money', function(req, res){
//
// })


module.exports = router;
