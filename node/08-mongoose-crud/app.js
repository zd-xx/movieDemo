var express = require('express')
var app = express()
var bodyParser = require('body-parser')
//引入router。js
var router = require('./router')

app.engine('html',require('express-art-template'))
//配置post请求,模板引擎和body-parser在挂载路由之前
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//开放public和module
app.use('/public/',express.static('./public'))
app.use('/node_modules/',express.static('./node_modules'))
//把路由容器挂载到app服务中
app.use(router)

app.listen(3000,function(){
	console.log('port 3000 running...')
})