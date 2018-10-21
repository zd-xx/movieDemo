var express = require('express')
var router = express.Router()
//3.0 导出router
module.exports = router

router.get('/',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('typePage/dianying.html',{
		pindao:0
	})	
})

router.get('/dianshiju',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('typePage/dianshiju.html',{
		pindao:1
	})	
})

router.get('/dongman',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('typePage/dongman.html',{
		pindao:2
	})	
})

router.get('/zongyi',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('typePage/zongyi.html',{
		pindao:3
	})	
})

router.get('/video',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('video.html',{
		
	})	
})