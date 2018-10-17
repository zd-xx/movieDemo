var express = require('express')
var router = express.Router()
//3.0 导出router
module.exports = router

router.get('/',function(req,res){
	//在此拿到session当数据，并存到模板
	res.render('index.html',{
		
	})	
})