var fs = require('fs');	//引入文件模块
//读取数据
//成功：data 数据  error null
//失败：data null error 错误对象
fs.readFile('../data.txt',function(error,data){
	if(data){	//成功
		var res = data.toString();//转义
		console.log(res);
	}
})
//写数据
//成功：error null
//失败：error 错误对象
fs.writeFile('../data.txt','我太弱了！！',function(error){
	if(!error){
		console.log('文件写入成功！')
	}
});