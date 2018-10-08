var fs = require('fs')

//创建promise容器,resolve成功 reject失败
//承诺本身不是异步，但操作的任务是异步
var p1 = new Promise(function(resolve,reject) {
	fs.readFile('./a.txt','utf8',function(err,data){
		if(err){	
			//承诺容器中任务失败了
			//改变容器状态为失败
			reject(err)
		}
		//承诺容器中任务成功了
		resolve(data)
	})
})

var p2 = new Promise(function(resolve,reject) {
	fs.readFile('./b.txt','utf8',function(err,data){
		if(err){	
			//承诺容器中任务失败了
			//改变容器状态为失败
			reject(err)
		}
		//承诺容器中任务成功了
		resolve(data)
	})
})
var p3 = new Promise(function(resolve,reject) {
	fs.readFile('./c.txt','utf8',function(err,data){
		if(err){	
			//承诺容器中任务失败了
			//改变容器状态为失败
			reject(err)
		}
		//承诺容器中任务成功了
		resolve(data)
	})
})

//当承诺成功后执行，data为resolve传递的参数
//err为错误时的错误对象
p1.then(function(data){
	console.log(data)
	//若成功则返回p2
	return p2
},function(err){
	console.log(err)
})
	.then(function(data){	//第一个参数为返回的p2的resolve，第二个参数为reject
		console.log(data)
		return p3
	})
	.then(function(data){
		console.log(data)
	})