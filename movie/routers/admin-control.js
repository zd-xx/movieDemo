var express = require('express')
//链接mongodb
const mongoose = require('mongoose');

//使用session要引入该模块
var session = require('express-session')

//引入加密模块
var md5 = require('blueimp-md5')
// //引入用户模型和封装方法
var Admin = require('../models/Admin')
var router = express.Router()
//3.0 导出router
module.exports = router

//链接数据库
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true });

router.get('/admin/login',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('controler/login.html',{
		
	})
	
	//打开登录时建立一个账号
	var master = {
		email:'1037597461@qq.com',
		sex:1,
		name:'八神',
		cellNumber:15209251294,
		role:1,
		status:true,
		account:'admin',
		password:'123456',
		password2:'123456',
		remark:'we are venom!'
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

router.post('/admin/login',function(req,res){
	Admin.findOneAdmin({
		account:'admin',
		password:123456
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

router.get('/logout',function(req,res){
	//清楚登录状态
	req.session.user = null
	res.redirect('admin/login')
})

router.get('/admin/index',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('controler/index.html',{
		user:req.session.user
	})	
})
router.get('/admin/index/welcome',function(req,res){
	res.render('controler/welcome.html',{
		
	})	
})

router.get('/admin/index/adminList',function(req,res){
	Admin.findAllAdmin({},function(err,data){
		if(err){
			res.status(200).json({
				err_code:1,
				message:'管理员列表加载失败！'
			})
		}
		res.render('controler/admin-list.html',{
			admin_list:data
		})
	})	
})

router.get('/admin/index/statusClose',function(req,res){
	var query = {_id:req.query.id}
	Admin.findOneAndUpdate(query, { status: false },function(err,data){
		if(err){
			res.status(200).json({
				err_code:1,
				message:'关闭状态失败！'
			})
		}
		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	})
})

router.get('/admin/index/statusOpen',function(req,res){
	var query = {_id:req.query.id}
	console.log(query)
	Admin.findOneAndUpdate(query, { status: true },function(err,data){
		if(err){
			res.status(200).json({
				err_code:1,
				message:'开启状态失败！'
			})
		}
		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	})
})

router.get('/admin/index/addAdmin',function(req,res){
	res.render('controler/admin-add.html',{
	})
})

router.post('/admin/index/addAdmin',function(req,res){
	var body = req.body
	console.log(body,typeof body)
	Admin.addOneAdmin(body,function(err,msg){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'服务端错误'
			})
		}
		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	})
})

router.post('/admin/index/delAdmin',function(req,res){
	var id = {_id:req.body.id}
	Admin.delOneAdmin(id,function(err,msg){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'服务端错误'
			})
		}
		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	})
})

router.get('/admin/index/editAdmin',function(req,res){
	var id = req.query.id
	var admin
	Admin.findOneById({_id:id},function(err,data){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'服务端错误'
			})
		}
		res.render('controler/admin-edit.html',{
			admin:data
		})
	})	
})

router.post('/admin/index/editAdmin',function(req,res){
	var admin = req.body,
		id = admin.id
		Admin.editOneAdmin(id,admin,function(err,data){
			if(err){
				res.status(500).json({
					err_code:1,
					message:'更新失败'
				})
			}
			res.status(200).json({
				err_code:0,
				message:'更新成功'
			})
		})
})
