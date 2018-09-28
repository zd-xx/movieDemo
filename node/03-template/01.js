var template = require('art-template')

var fs = require('fs')

var tplData = fs.readFile('./tpl.html',function(error,data){
	if(error){
		return console.log('读取模板失败！')
		
	}
	//使用toString修改为字符串
	if(data){
		var ret = template.render(data.toString(),{
			name:'Egod',
			age:23,
			hobbies:['写代码','打游戏','看动漫']
		})
		console.log(ret)
		
	}
})



