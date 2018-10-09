var express = require('express')
//path用于操作和得到路径信息：path.parse()
var path = require('path')
var app = express()

//开放public和module
//path.join 用于拼接路径
//每个模块中，除了require和exports外还有__dirname,__filename
//__dirname:用来获取当前文件模块所属目录的绝对路径
//__filename:用来获取当前文件绝对路径
//在node中，文件操作路径相对于执行 node 命令所处路径
//文件操作中使用相对路径使用此方法,把相对路径转换为 动态绝对路径
app.use('/public/',express.static(path.join(__dirname,'./public')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')))

app.engine('html',require('express-art-template'))
//默认为views目录，也可更改
app.set('views',path.join(__dirname,'./views/'))

app.get('/',function(req,res){
	res.render('index.html',{
		name:'shen'
	})
})


app.listen(3000,function(){
	console.log('port 3000 running...')
})