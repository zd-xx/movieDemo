var express = require('express')
//链接mongodb
const mongoose = require('mongoose');
//引入加密模块
var md5 = require('blueimp-md5')
//引入用户模型
var User = require('../models/Users')
var router = express.Router()

//链接数据库
mongoose.connect('mongodb://localhost/czBlog',{useMongoClient:true});
router.get('/',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('index.html',{
		user:req.session.user
	})	
})

router.get('/login',function(req,res){
	res.render('login.html',{
	})	
})

router.post('/login',function(req,res){
	var body = req.body
	User.findOne({
		email:body.email,
		password:md5(body.password)
	},function(err,user){
		if(err){
			return res.status(500).json({
				err_code:500,
				message:err.message
			})
		}

		if(!user){
			return res.status(200).json({
				err_code:1,
				message:'email or password is invalid'
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

router.get('/logout',function(req,res){
	//清楚登录状态
	req.session.user = null
	res.redirect('login')
})

router.get('/register',function(req,res){
	res.render('register.html',{
	})	
})

router.post('/register',function(req,res){
	var body = req.body
	//密码加密
	body.password = md5(body.password)
	//当邮箱和昵称都不重复时才能添加
	User.findOne({
		$or:[
			{email:body.email},
			{nickname:body.nickname}
		]
	},function(err,user){
		//error_code: 0-成功，1-已存在，500-服务器错误
		if(err){
			return res.status(500).json({
				'success':false,
				'message':'服务器错误'
			})
		}
		if(user){
			//能查到，表示邮箱或昵称已经存在
			return res.status(200).json({
				error_code:1,
				message:'邮箱或昵称已经存在'
			})
		}
		new User(body).save(function(err,user){
			if(err){
				return res.status(500).json({
					error_code:500,
					'message':'服务器错误'
				})
			}
			// res.status(200).send(JSON.stringify({
			// 	'success':true
			// }))
			// 当注册成功，用session记录登录状态
			req.session.user = user
			// 成功：这里可以用express提供的方法来发送数据
			res.status(200).json({
				error_code:0
			})
		})
		
		
	})	
})
//3.0 导出router
module.exports = router