//封装异步promise
var fs = require('fs')

function pReadFile(filePath){
	var p = new Promise(function(resolve,reject) {
	fs.readFile(filePath,'utf8',function(err,data){
		if(err){	
			//承诺容器中任务失败了
			//改变容器状态为失败
			reject(err)
		}
		//承诺容器中任务成功了
		resolve(data)
	})
	})
	return p
}

pReadFile('./a.txt').then(function(data){
	console.log(data)
	return pReadFile('./b.txt')
}).then(function(data){
	console.log(data)
	return pReadFile('./c.txt')
}).then(function(data){
	console.log(data)
})