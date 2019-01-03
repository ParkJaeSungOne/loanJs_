var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// schema
var userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"ID를 입력해주세요."],
        match:[/^.{4,12}$/,"ID는 4자 이상 12자 이하입니다."],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"비밀번호를 입력해주세요."],
        select:false
    },
    nickname:{
        type:String,
        required:[true,"별명을 입력해주세요."],
        match:[/^.{1,5}$/,"별명은 1자 이상 5자 이하입니다."],
        trim:true
    },
    name:{
        type:String,
        required:[true,"이름을 입력해주세요."],
        match:[/^.{2,5}$/,"이름은 2자 이상 5자 이하입니다."],
        trim:true
    },
    email:{
        type:String,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,"이메일이 유효하지않습니다."],
        trim:true
    }
},{
    toObject:{virtuals:true}
});

// virtuals
userSchema.virtual("passwordConfirmation")
.get(function(){ return this._passwordConfirmation; })
.set(function(value){ this._passwordConfirmation=value; });

userSchema.virtual("originalPassword")
.get(function(){ return this._originalPassword; })
.set(function(value){ this._originalPassword=value; });

userSchema.virtual("currentPassword")
.get(function(){ return this._currentPassword; })
.set(function(value){ this._currentPassword=value; });

userSchema.virtual("newPassword")
.get(function(){ return this._newPassword; })
.set(function(value){ this._newPassword=value; });


var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
var passwordRegexErrorMessage = "비밀번호는 알파벳 + 숫자 형식이며 최소 6자 이상이어야입니다.";
userSchema.path("password").validate(function(v) {
  var user = this;

  // create user
  if(user.isNew){
    if(!user.passwordConfirmation){
      user.invalidate("passwordConfirmation", "비밀번호를 입력해주세요.");
    }
    if(!passwordRegex.test(user.password)){
      user.invalidate("password", passwordRegexErrorMessage);
    } else if(user.password !== user.passwordConfirmation) {
      user.invalidate("passwordConfirmation", "비밀번호가 일치하지않습니다.");
    }
  }

  // update user
  if(!user.isNew){
    if(!user.currentPassword){
      user.invalidate("currentPassword", "비밀번호를 입력해주세요.");
    }
    if(user.currentPassword && !bcrypt.compareSync(user.currentPassword, user.originalPassword)){
      user.invalidate("currentPassword", "비밀번호가 유효하지 않습니다.");
    }
    if(user.newPassword && !passwordRegex.test(user.newPassword)){
      user.invalidate("newPassword", passwordRegexErrorMessage);
    } else if(user.newPassword !== user.passwordConfirmation) {
      user.invalidate("passwordConfirmation", "비밀번호가 일치하지않습니다.");
    }
  }
});

// hash password
userSchema.pre("save", function (next){
 var user = this;
 if(!user.isModified("password")){
  return next();
 } else {
  user.password = bcrypt.hashSync(user.password);
  return next();
 }
});

userSchema.methods.authenticate = function (password) {
 var user = this;
 return bcrypt.compareSync(password,user.password);
};

// model & export
var User = mongoose.model("user",userSchema);
module.exports = User;