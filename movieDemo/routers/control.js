var express = require('express')
//链接mongodb
const mongoose = require('mongoose');
//引入加密模块
var md5 = require('blueimp-md5')
//使用session要引入该模块
var session = require('express-session')

// //引入用户模型和封装方法
var Admin = require('../models/Admin')
var router = express.Router()
//3.0 导出router
module.exports = router

//链接数据库
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true });

router.get('/user/login',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('controler/login.html',{
		
	})
	
	//打开登录时建立一个账号
	var master = {
		email:'1037597461@qq.com',
		account:md5('admin'+'bashen'),
		password:md5('123456'+'bashen')
	}
	Admin.findOneAdmin(master,function(err,data){
		if(err){
			return console.log(err)
		}
		if(data){
			return console.log('master已经存在')
		}else{
			Admin.addOneAdmin(master,function(err,msg){
				if(err){
					return console.log('初始创建失败')
				}
					return console.log('初始创建成功')
				})
		}
		
	})
	
})

router.post('/user/login',function(req,res){
	//在此拿到session当数据，并存到模板
	Admin.findOne({
		account:md5(req.body.account+'bashen'),
		password:md5(req.body.password+'bashen')
	},function(err,user){
		if(err){
			return res.status(500).json({
				'success':false,
				'message':'服务器错误'
			})
		}
		if(!user){
			return res.status(200).json({
				err_code:1,
				message:'account or password is invalid'
			})
		}
		//登录成功，通过session记录状态
		req.session.user = user
		
		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	})
	
})

// router.get('/register',function(req,res){
// 	//在此拿到session当数据，并存到模板
// 	res.render('controler/register.html',{
		
// 	})	
// })

// router.post('/register',function(req,res){
// 	var body = req.body
// 	console.log(body)
// 	Admin.addOneAdmin(body,function(err,d){
// 		if(err){
// 			return console.log(err)
// 			// return res.status(500).json({
// 			// 	'success':false,
// 			// 	'message':'服务器错误'
// 			// })
// 		}
// 		console.log(d)
// 	})
// })

router.get('/user/index',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('controler/index.html',{
		
	})	
})