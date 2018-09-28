var http = require('http');	//引入http模块

//创建web服务器，返回server实例
var server = http.createServer();

//注册request请求事件，当客户端触发request请求，会触发回调函数
//request:获取
//response：发送
server.on('request',function(request,response){
	console.log('收到客户端请求！路径为：'+request.url);

	//response.write 用来发送响应，必须用end结束
	response.write('hello');
	response.write('world');
	response.end();	//结束响应
})

//绑定端口号，启动服务器
server.listen(3000,function(){
	console.log('服务器启动成功，可以通过http://127.0.0.1:3000/来访问');
})