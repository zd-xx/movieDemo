var express = require('express')
//链接mongodb
const mongoose = require('mongoose');
// //引入用户模型和封装方法
var Film = require('../models/Film')
var router = express.Router()
//3.0 导出router
module.exports = router
//链接数据库
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true });


router.get('/admin/index/dianying',function(req,res){
	res.render('controler/dianying-list.html',{
	})	
})

router.get('/admin/index/film-add',function(req,res){
	res.render('controler/film-add.html',{
	})	
})
router.post('/admin/index/film-add',function(req,res){
	var film = req.body
	console.log(film)
	Film.addFilm(film,function(err,ret){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'添加失败'
			})
		}
		res.status(200).json({
			err_code:0,
			message:'添加成功'
		})
	})
})