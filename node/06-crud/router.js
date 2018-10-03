var fs = require('fs')
var Student = require('./operationStu.js')

var express = require('express')
//1.0:创建路由容器
var router = express.Router()
//2.0 路由挂载到router上
	router.get('/students',function(req,res){
		Student.findAll(function(err,students){
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
		Student.add(req.body,function(err){
			if(err){
				return res.status(500).send('Server error')
			}
			res.redirect('/students')
		})
	})
	router.get('/students/edit',function(req,res){
		Student.findById(parseInt(req.query.id),function(err,student){
			if(err){
				return res.status(500).send('Server error')
			}
			res.render('edit.html',{
				student:student
			})
		})
	})
	router.post('/students/edit',function(req,res){
		var student = req.body
		Student.updataById(student,function(err){
			if(err){
				return res.status(500).send('数据修改失败')
			}
			res.redirect('/students')
		})
	})
	router.get('/students/delete',function(req,res){

	})
//3.0 导出router
module.exports = router

