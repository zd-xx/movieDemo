//链接mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true });

var Schema = mongoose.Schema

var AdminSchema = new Schema({
	name:{
		type:String,
		default:"匿名"
	},
	sex:{
		type:Number,
		enum:[0,1],
		default:0
	},
	joinDate:{
		type:Date,
		default:Date.now
	},
	status:{
		type:Boolean,
		default:0
	},
	cellNumber:{
		type:Number
	},
	role:{
		type:String,
		default:'管理员'
	},
	remark:{
		type:String
	},
	email:{
		type:String,
		unique:true
	},
	account:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	}
})

var adminModel = mongoose.model('Admin', AdminSchema)
//导出模型构造函数，外部可以操作数据库
module.exports = adminModel

adminModel.addOneAdmin=function(admin,callback){
	new adminModel(admin).save(function(err,ret){
		callback(err,true)
	})
	
}
adminModel.findOneAdmin=function(admin,callback){
	this.findOne(admin,function(err,user){
		callback(err,user)
	})
}
adminModel.findAllAdmin=function(admin,callback){
	this.find(admin,function(err,user){
		callback(err,user)
	})
}