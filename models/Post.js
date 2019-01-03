var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var util  = require("../util");

// schema
var postSchema = mongoose.Schema({ 
 division : {type:String, required:true},
 title:{type:String, required:[true,"제목을 입력해주세요."]},
 body:{type:String, required:[true,"내용을 입력해주세요."]},
 author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
 createdAt:{type:Date, default:Date.now}, 
 updatedAt:{type:Date},
},{
 toObject:{virtuals:true} 
});

// virtuals
postSchema.virtual("createdDate")
.get(function(){
 return util.getDate(this.createdAt);
});

postSchema.virtual("createdTime")
.get(function(){
 return util.getTime(this.createdAt);
});

postSchema.virtual("updatedDate")
.get(function(){
 return util.getDate(this.updatedAt);
});

postSchema.virtual("updatedTime")
.get(function(){
 return util.getTime(this.updatedAt);
});

postSchema.plugin( autoIncrement.plugin, {model : 'products', field :'id', startAt : 1 });

// model & export
var Post = mongoose.model("post", postSchema);
module.exports = Post;
