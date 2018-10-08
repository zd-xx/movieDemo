var fs = require('fs')
// var Student = require('./operationStu-fs.js')
var Student = require('./operationStu-mongoose.js')
var express = require('express')
//1.0:创建路由容器
var router = express.Router()
//2.0 路由挂载到router上
	router.get('/students',function(req,res){
		Student.find(function(err,students){
			if(err){
				return res.status(500).send('Server error')
			}
			res.render('index.html',{
			fruits:['苹果','香蕉','菠萝'],
			students:students
			})
		})
	})
	router.get('/students/new',function(req,res){
		res.render('new.html')
	})
	
	router.post('/students/new',function(req,res){
		var stu = new Student(req.body).save(function(err){
			if(err){
					return res.status(500).send('Server error')
				}
				res.redirect('/students')
			})
	})
	//mongoose findById 方法用于根据id查找数据
	//去掉id 的 ""
	router.get('/students/edit',function(req,res){
		Student.findById(req.query.id.replace(/"/g,''),function(err,student){
			if(err){
				return res.status(500).send('Server error')
			}
			res.render('edit.html',{
				student:student
			})
		})
	})
	router.post('/students/edit',function(req,res){
		Student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body,function(err){
			if(err){
				return res.status(500).send('数据修改失败')
			}
			res.redirect('/students')
		})
	})
	router.get('/students/delete',function(req,res){
		var id = req.query.id.replace(/"/g,'')

		Student.findByIdAndRemove(id,function(err){
			if(err){
				return res.status(500).send('数据修改失败')
			}
			res.redirect('/students')
		})
	})
//3.0 导出router
module.exports = router

