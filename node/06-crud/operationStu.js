var fs = require('fs')
var dbPath = './db.json'
//操作学生文件数据到模块
//查询所有
//读文件为异步操作，用回调函数
exports.findAll = function(callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		callback(null,JSON.parse(data).students)
	})
}
//回调函数

//增加学生
exports.add = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		//处理id
		student.id = students[students.length-1].id+1
		students.push(student)
		var ret = JSON.stringify({	//转成字符串
			students:students
		})
		fs.writeFile(dbPath,ret,function(err){	//写文件
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}
//更新学生数据
exports.updataById = function(student,callback) {
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		student.id = parseInt(student.id)
		var students = JSON.parse(data).students
		//es6方法，实现遍历，返回条件成立的项
		//找到id相等的项
		var stu = students.find(function(item){
			return item.id === student.id
		})
		for(key in stu){//遍历项，实现改数据
			stu[key] = student[key]
		}
		//把字符串保存到文件中
		var ret = JSON.stringify({	//转成字符串
			students:students
		})
		//console.log(ret)
		fs.writeFile(dbPath,ret,function(err){	//写文件
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}
//根据id查找学生 
exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		//es6方法，实现遍历，返回条件成立的项
		//找到id相等的项
		var stu = students.find(function(item){
			return item.id === parseInt(id)
		})
		callback(null,stu)
	})
}
//删除学生
exports.delete = function() {
	
}