var http = require('http')
var fs = require('fs')
var template = require('art-template')	//模板引擎模块
var url = require('url')

var comments = [
{name:'路飞',message:'我是要成为海贼王的男人！',dataTime:'2018-9-22'},
{name:'索隆',message:'天下第一大剑豪',dataTime:'2018-9-22'},
{name:'乔巴',message:'成为万能药',dataTime:'2018-9-22'},
{name:'娜美',message:'画出世界地图',dataTime:'2018-9-22'},
{name:'香吉士',message:'all blue',dataTime:'2018-9-22'}
]

http.createServer(function(req,res){		//简写
	//把url转化为对象
	var parseObj = url.parse(req.url,true)

	var parseName = parseObj.pathname	//仅得到路径部分

	if(parseName=='/'){
		fs.readFile('./views/index.html',function(err,data){
			if(err){
				return console.log('读取首页失败！')
			}
			if(data){
				var htmlStr = template.render(data.toString(),{
					comments:comments
				})
				res.end(htmlStr)
			}
		})
	}else if(parseName.indexOf('/public/')===0){	//这些资源可以被用户访问到
		fs.readFile('.'+parseName,function(err,data){
			if(err){
				return 
			}
			res.end(data)
		})
	}else if(parseName==='/post'){
		fs.readFile('./views/post.html',function(err,data){
			if(err){
				return
			}
			res.end(data)
		})
	}else if(parseName==='/pinglun'){	//评论
		//处理数据
		var date = new Date()
		var comment = parseObj.query
		comment.dataTime = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
		comments.push(comment)

		//重定向到首页 302 临时重定向
		res.statusCode = 302
		res.setHeader('Location','/')
		res.end()
	}else{
		fs.readFile('./views/404.html',function(err,data){
			if(err){
				return res.end('404 not found')
			}
			res.end(data)
		})
	}
}).listen(3000,function(){
	console.log('服务器启动成功，可以通过http://127.0.0.1:3000/来访问')
})