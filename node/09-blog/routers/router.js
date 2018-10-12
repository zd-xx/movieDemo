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
	res.render('index.html',{
	})	
})

router.get('/login',function(req,res){
	res.render('login.html',{
	})	
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
	},function(err,data){
		//error_code: 0-成功，1-已存在，500-服务器错误
		if(err){
			return res.status(500).json({
				'success':false,
				'message':'服务器错误'
			})
		}
		if(data){
			//能查到，表示邮箱或昵称已经存在
			return res.status(200).json({
				error_code:1,
				message:'邮箱或昵称已经存在'
			})
		}
		new User(body).save(function(err){
			if(err){
				return res.status(500).json({
					error_code:500,
					'message':'服务器错误'
				})
			}
			// res.status(200).send(JSON.stringify({
			// 	'success':true
			// }))
			// 成功：这里可以用express提供的方法来发送数据
			res.status(200).json({
				error_code:0
			})
		})
		
		
	})	
})
//3.0 导出router
module.exports = router