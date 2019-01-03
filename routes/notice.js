var express = require("express");
var router = express.Router();
var Post  = require("../models/Post");
var util  = require("../util");

// Index 
router.get("/", function(req, res){
    res.render("notice/index");
});


// 글목록 불러오기
router.post("/get_board_list", function(req, res){
    var page = Math.max(1, req.body.page);
        if(!page){
            page = 1;
        }
    var limit = 10;
    Post.count({division:req.body.division}, function(err, count){
        if(err) return res.json(err);
        var skip = (page-1) * limit;
        var maxPage = Math.ceil(count/limit);
        Post.find({division:req.body.division})   
        .populate("author")
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .exec(function(err, posts){    
            if(err) return res.json(err);
            var responseData = {'posts' : posts, page:page, maxPage:maxPage}
                res.json(responseData);
        });
    });
});

// Create
router.get("/create", util.isLoggedin , function(req, res){
 var post = req.flash("post")[0] || {};
 var errors = req.flash("errors")[0] || {};
 res.render("free/create", { post:post, errors:errors });
});

// Create
router.post("/create", util.isLoggedin, function(req, res){
 req.body.division = "free";
 req.body.author = req.user._id;
 Post.create(req.body, function(err, post){
    if(err){
      req.flash("post", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/free/create");
    }
    res.redirect("/free/" + post.id);
  });
});

// show
router.get("/:id", function(req, res){
 Post.findOne({id:req.params.id, division : "free"})
 .populate("author")
 .exec(function(err, post){       
  if(err) return res.json(err);
  res.render("free/show", {post:post});
 });
});

// edit
router.get("/edit/:id", util.isLoggedin,checkPermission, function(req, res){
 var post = req.flash("post")[0];
 var errors = req.flash("errors")[0] || {};
 
 if(!post){
  Post.findOne({id:req.params.id}, function(err, post){
   if(err) return res.json(err);
   res.render("free/edit", { post:post, errors:errors });
  });
 } else {
  post.id = req.params.id;
  res.render("free/edit", { post:post, errors:errors });
 }
});

// update
router.put("/edit/:id", util.isLoggedin,checkPermission, function(req, res){
 req.body.updatedAt = Date.now();
 
 Post.findOneAndUpdate({id:req.params.id, division:"free"}, req.body, {runValidators:true}, function(err, post){
  if(err){
   req.flash("post", req.body);
   req.flash("errors", util.parseError(err));
   return res.redirect("/free/edit/"+req.params.id);
  }
  res.redirect("/free/"+req.params.id);
 });
});

// destroy
router.delete("/delete/:id", util.isLoggedin,checkPermission, function(req, res){
 Post.remove({id:req.params.id}, function(err){
  if(err) return res.json(err);
  res.redirect("/free");
 });
});

module.exports = router;

function checkPermission(req, res, next){
 Post.findOne({id:req.params.id}, function(err, post){
  if(err) return res.json(err);
  if(post.author != req.user.id) return util.noPermission(req, res);

  next();
 });
}