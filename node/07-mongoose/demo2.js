//链接mongodb
const mongoose = require('mongoose');

var Schema = mongoose.Schema
//链接数据库
mongoose.connect('mongodb://localhost/itcast');
//设计集合结构（表结构）
var userSchema = new Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	email:{
		type:String
	}
})
//将文档发布为模型，
//第一个参数：传入大写单词表示数据库名字，mongoose会生成小写复数集合名称
//如 User会变为 users
//第二个参数：架构Schema
//返回：模型构造函数，有此函数可以对user中数据操作
const User = mongoose.model('User', userSchema);

//增加数据
var admin = new User({
	username:'admin',
	password:'123456',
	email:'admin@admin.com'
})
//保存数据，ret为插入的这个数据
admin.save(function(err,ret) {
	if(err){
		console.log('保存失败！')
	}else{
		console.log('保存成功！')
	}
})