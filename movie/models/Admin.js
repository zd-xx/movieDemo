//链接mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true });
//引入加密模块
var md5 = require('blueimp-md5')
var Schema = mongoose.Schema

var AdminSchema = new Schema({
	name:{
		type:String,
		default:"匿名",
		required:true
	},
	sex:{
		type:Number,
		enum:[1,2],
		default:1
	},
	joinDate:{
		type:Date,
		default:Date.now
	},
	status:{
		type:Boolean,
		default:0,
		required:true
	},
	cellNumber:{
		type:Number,
		required:true
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
		unique:true,
		required:true
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
	if(admin.password!==admin.password2){
		callback(true,false)
	}else{
		delete admin.password2
		admin.password = md5(admin.password+'bashen')
	}
	new adminModel(admin).save(function(err,ret){
		callback(err,ret)
	})
}
adminModel.delOneAdmin=function(id,callback){
	console.log(id)
	this.remove(id,function(err,ret){
		callback(err,ret)
	})
}
adminModel.findOneAdmin=function(admin,callback){
	admin.password = md5(admin.password+'bashen')
	this.findOne(admin,function(err,user){
		callback(err,user)
	})
}
adminModel.findAllAdmin=function(admin,callback){
	this.find(admin,function(err,user){
		callback(err,user)
	})
}

adminModel.findOneById=function(id,callback){
	console.log(id)
	this.findById(id, function (err,user){
        callback(err,user)
    });
}

adminModel.editOneAdmin=function(id,admin,callback){
	delete admin.id
	console.log(admin)
    this.findByIdAndUpdate(id,admin,function(err,ret){
		callback(err,ret)
	})
}