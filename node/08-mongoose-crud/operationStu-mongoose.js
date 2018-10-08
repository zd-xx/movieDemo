//链接mongodb
const mongoose = require('mongoose');

//链接数据库
mongoose.connect('mongodb://localhost/itcast',{useMongoClient:true});

var Schema = mongoose.Schema

var studentSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	gender:{	//枚举：限定
		type:Number,
		default:0,
		enum:[0,1]
	},
	age:{
		type:Number
	},
	hobies:String
})

//导出模型构造函数，外部可以操作数据库
module.exports = mongoose.model('Student', studentSchema);