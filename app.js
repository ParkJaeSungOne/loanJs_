var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var autoIncrement = require('mongoose-auto-increment');
var flash     = require("connect-flash");
var session    = require("express-session");
var passport   = require("./config/passport");
var app = express();

var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

// DB setting
mongoose.connect("", {useCreateIndex: true,useNewUrlParser: true});

autoIncrement.initialize(mongoose.connection);

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret", resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session()); 

app.use(function(req,res,next){
 res.locals.isAuthenticated = req.isAuthenticated();
 res.locals.currentUser = req.user;
 next();
})

// Routes
app.use("/", require("./routes/main"));
app.use("/free", require("./routes/free"));
app.use("/notice", require("./routes/notice"));
app.use("/user", require("./routes/user"));

var port = process.env.PORT || 3000;

// Port setting
app.listen(port, function(){
 console.log("server on!" + port);
});
