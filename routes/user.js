var express = require("express");
var router = express.Router();
var User  = require("../models/User");
var util  = require("../util"); 

// Create
router.get("/register", function(req, res){
 var user = req.flash("user")[0] || {};
 var errors = req.flash("errors")[0] || {};
 res.render("user/register", { user:user, errors:errors });
});

// Create
router.post("/register", function(req, res){
 User.create(req.body, function(err, user){
  if(err){
   req.flash("user", req.body);
   req.flash("errors", util.parseError(err));
   console.log(req.body);
   console.log(util.parseError(err));
   return res.redirect("/user/register");
  }
  res.redirect("/");
 });
});

module.exports = router;