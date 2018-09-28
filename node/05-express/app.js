var express = require('express')

//创建服务器应用程序	就是之前的http.createServer
var app = express()

//公开静态资源
app.use('/public/',express.static('./public/'))

//配置使用art-template
//第一个参数：当渲染以.art结尾当文件时，使用art-template模板
//默认找views
app.engine('html',require('express-art-template'))

app.get('/',function(req,res){
	res.render('index.html',{

	})
})

app.get('/about',function(req,res){
	res.send('你好 about!')
	res.end()
})

app.listen(3000,function(){
	console.log('app is running at port 3000')
})