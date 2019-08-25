const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'

const users = require("./users.js");
const User = users.model;

const counterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    stops: Array,
});
  
const Counter = mongoose.model('Counter', counterSchema);

router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
        let matchingCounter = await Counter.findOne({
            user: req.user,
            title: req.params.title
        });
        if (matchingCounter != null) {
            return res.sendStatus(500).send('Matching Counter Exists!');
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    const counter = new Counter({
        user: req.user,
        title: req.body.title,
        stops: []
    });
    try {
        await counter.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/", async (req, res) => {
    try {
        let counters = await Counter.find({
            user: req.user
        });
        return res.send(counters);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

router.get("/:title", async (req, res) => {
    try {
        let counter = await Counter.findOne({
            user: req.user,
            title: req.params.title
        });
        return res.send(counter);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

router.put("/:title", async (req, res) => {
    try {
        let counter = await Counter.findOne({
            user: req.user,
            title: req.params.title
        });
        if (req.body.title != null) {
            counter.title = req.body.title;
        }
        if (req.body.stops != null) {
            counter.stops = req.body.stops;
        }
        await counter.save();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

router.delete('/:title', async (req, res) => { // Delete after game found
	try {
        await Counter.deleteOne({
            user: req.user,
            title: req.params.title
	    });
        res.send('Counter Deleted');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Counter,
    routes: router,
}