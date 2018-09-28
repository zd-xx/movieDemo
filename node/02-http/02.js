var http = require('http');	//引入http模块

//创建web服务器，返回server实例
var server = http.createServer();

//注册request请求事件，当客户端触发request请求，会触发回调函数
//request:获取
//response：发送
server.on('request',function(request,response){
	//告诉客户端编码格式
	response.setHeader('Content-Type','text/plain; charset=utf-8');
	var url = request.url;
	if(url=='/'){
		response.end('hello node.js')
	}else if(url=='/login'){
		response.end('登录');
	}else if(url=='/reg'){
		response.end('注册');
	}else{
		response.end('404');
	}
})

//绑定端口号，启动服务器
server.listen(3000,function(){
	console.log('服务器启动成功，可以通过http://127.0.0.1:3000/来访问');
})