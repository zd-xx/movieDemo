var express = require('express')

var app = express()
//在express 对中间件有集中分类

//1:
//不关心请求路径和请求方法的中间件
//也就是说，任何请求都会进入这个中间件
//若有next方法，则找到下一个匹配的中间件执行
//next 若传错误对象，则会之间去到有4个参数的中间件去执行
app.use(function(req,res){
	console.log('ok')
	next()		
})

//2:
//请求需要匹配的中间件,以 /a 开头
app.use('/a',function(req,res){
	console.log('a')
})

//3:必须请求 /
app.get('/',function(req,res){
	console.log('get')
})
app.listen(3000,function(){
	console.log('app is running')
})
//4:错误处理中间件,(当发生错误时，传递错误对象，调用该中间件统一处理错误)
app.use(function(err,req,res,next){
	console.log(err.message)
})