var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var multer = require('multer');
//使用session要引入该模块
var session = require('express-session')

var page_router = require('./routers/page.js')
var admin_router = require('./routers/admin-control.js')
var film_router = require('./routers/film-control.js')

app.use('/public/',express.static(path.join(__dirname,'./public')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))
//配置post请求,模板引擎和body-parser在挂载路由之前
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialized:true
}))

app.use(page_router)
app.use(admin_router)
app.use(film_router)

//配置404中间件,404必须在最后,否则由于是万能中间件，会阻断其他中间件的执行
app.use(function(req,res){
	res.render('404.html')
})

//配置错误处理中间件
app.use(function(err,req,res,next){
	res.status(500).json({
		err_code:500,
		message:err.message
	})
})

app.listen(3000,function(){
	console.log('port 3000 running...')
})