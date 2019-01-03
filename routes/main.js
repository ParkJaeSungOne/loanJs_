var express = require("express");
var router = express.Router();
var Post  = require("../models/Post");
var passport= require("../config/passport");
var multer = require('multer');
var uploadSetting = multer({dest:"../uploads"});
var fs = require('fs');

// MAIN
router.get("/", function(req, res){
    Post.find({division:"free"}).populate("author").sort("-createdAt").limit(5)            
    .exec(function(err, frees){
        if(err) return res.json(err);
            res.render("main", {frees:frees});
        });
});

// login page
router.get("/login", function (req,res) {
 var username = req.flash("username")[0];
 var errors = req.flash("errors")[0] || {};
 res.render("login", {
  username:username,
  errors:errors
 });
});

// login
router.post("/login",
    function(req,res,next){
        var errors = {};
        var isValid = true;
        if(!req.body.username){
            isValid = false;
            errors.username = "ID를 입력해주세요.";
        }
        if(!req.body.password){
            isValid = false;
            errors.password = "비밀번호를 입력해주세요.";
        }
        if(isValid){
            next();
        }
        else {
            req.flash("errors",errors);
            res.redirect("login");
        }
    },
    passport.authenticate("local-login", {
        successRedirect : "/",
        failureRedirect : "login"
    }
));

router.get("/logout", function(req, res) {
 req.logout();
 res.redirect("/");
});

router.post('/upload', uploadSetting.single('upload'), function(req,res) {
  var tmpPath = req.file.path;
  var fileName = req.file.filename;
  var newPath = "../public/image/" + fileName;
  fs.rename(tmpPath, newPath, function (err) {
    if (err) {
      console.log(err);
    }
    var html;
    html = "";
    html += "<script type='text/javascript'>";
    html += " var funcNum = " + req.query.CKEditorFuncNum + ";";
    html += " var url = \"/images/" + fileName + "\";";
    html += " var message = \"업로드 완료\";";
    html += " window.parent.CKEDITOR.tools.callFunction(funcNum, url);";
    html += "</script>";
    res.send(html);
  });
});

module.exports = router;