var express = require("express");
var router= express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  // Create all our routes and set up logic within those routes where required.
  router.get("/burgers", function(req, res) {
    burger.all(function(data) {
      res.json({ burgers: data });
    });
  });
  
  router.post("/burgers", function(req, res) {
    burger.create([
      "name", "devoured"
    ], [
      req.body.name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
     });
  });
  
  router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.json({ id: req.params.id});
      }
    });
  });
  
  router.delete("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;
  