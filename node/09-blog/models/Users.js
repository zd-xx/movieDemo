//链接mongodb
const mongoose = require('mongoose');

var Schema = mongoose.Schema

var UserSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	nickname:{	
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	created_time:{
		type:Date,
		default:Date.now	//这里不用加括号
	},
	last_modified_time:{
		type:Date,
		default:Date.now	//这里不用加括号
	},
	avatar:{	//头像
		type:String,
		default:'/public/img/avatar-default.png'
	},
	bio:{	//介绍
		type:String,
		default:""
	},
	gender:{
		type:Number,
		enum:[-1,0,1],
		default:-1
	},
	birthday:{
		type:Date
	},
	status:{
		type:Number,
		enum:[1,2,0],	//0:都可以，1：不能评论，2：不能登录
		default:0
	}
})

//导出模型构造函数，外部可以操作数据库
module.exports = mongoose.model('User', UserSchema);