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

//增加数据------------------------
// var admin = new User({
// 	username:'admin',
// 	password:'123456',
// 	email:'admin@admin.com'
// })

// admin.save(function(err,ret) {//保存数据，ret为插入的这个数据
// 	if(err){
// 		console.log('保存失败！')
// 	}else{
// 		console.log('保存成功！')
// 	}
// })
//查看数据------------------------------
//查询所有：

User.find(function(err,ret){
	if(err){
		console.log('查询失败！')
	}else{
		console.log(ret)
	}
})

//按条件查询所有（数组）：
// User.find({
// 	username:'admin'
// },function(err,ret){
// 	if(err){
// 		console.log('查询失败！')
// 	}else{
// 		console.log(ret)
// 	}
// })
 
//按照条件查找符合的第一个数据（对象），若无条件则查找第一个数据
// User.findOne({
// 	username:'admin'
// },function(err,ret){
// 	if(err){
// 		console.log('查询失败！')
// 	}else{
// 		console.log(ret)
// 	}
// })

//删除数据
//findOneAndRemove(conditions,[options],[callback])	根据条件删除一个
//findByIdAndRemove(id,[options],callback)	根据id删除一个
//
// User.remove({
// 	username:'admin'
// },function(err,ret){
// 	if(err){
// 		console.log("删除失败！")
// 	}else{
// 		console.log(ret)
// 	}
// })
// 
// 更新数据ret为更改前的数据
// findOneAndUpdate()	根据指定条件更新一个
// findByIdAndUpdate()	根据id更新一个
// 
// User.findByIdAndUpdate('5bba360c87d30d16d099d51a',{
// 	password:'999'
// },function(err,ret){
// 	if(err){
// 		console.log("更新成功！")
// 	}else{
// 		console.log(ret)
// 	}
// })