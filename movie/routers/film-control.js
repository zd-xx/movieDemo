var express = require('express')
var multer = require('multer');
var fs = require('fs')
var url = require('url')

//链接mongodb
const mongoose = require('mongoose');
// //引入用户模型和封装方法
var Film = require('../models/Film')
var router = express.Router()
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/img/films');    
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);  
    }
});

// 创建文件夹
var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder); 
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './public/img/films';
createFolder(uploadFolder);

var upload = multer({
	storage:storage
})
//3.0 导出router
module.exports = router
//链接数据库
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true });

router.get('/admin/index/dianying',function(req,res){
	Film.findAll({},function(err,ret){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'查找失败'
			})
		}
		var ret = JSON.stringify(ret)
		var ret = eval("("+ret+")")
		res.render('controler/dianying-list.html',{
			films:ret
		})
	})
		
})

router.get('/admin/index/film-add',function(req,res){
	res.render('controler/film-add.html',{
	})	
})

router.post('/admin/index/film-add',upload.single('img'),function(req,res,next){
	var text = req.body.text
	var check = req.body.check
	var myFilm = new Object()
	var fileName = req.file.filename
	var arr = text.split('&')
	for(var i=0;i<arr.length;i++){
		var ar = arr[i].split('=')
		myFilm[ar[0]] = ar[1] || ' '
	}
	if(fileName){
		myFilm.img = '/public/img/films/'+fileName
	}
	myFilm.keywords = check
	for(var i=0;i<50;i++){
		Film.addFilm(myFilm,function(err,ret){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'添加失败'
			})
			console.log(err)
		}

		res.status(200).json({
			err_code:0,
			message:'添加成功'
		})
	})
	}
})

router.get('/admin/index/film-edit',function(req,res){
	var id = req.query.id
	Film.findOneFilm({_id:id},function(err,data){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'服务端错误'
			})
		}
		var film = {
				score:data.score,
				from1:JSON.stringify(data.from1),
				form2:JSON.stringify(data.from2),
				show_title:data.show_title,
				_id:data._id,
				keywords:data.keywords,
				film_name:data.film_name,
				film_type:data.film_type,
				region:data.region,
				intro:data.intro,
				img:data.img,
				lastDate:data.lastDate
			}
			console.log(film.img)
		res.render('controler/film-edit.html',{
			film:film
		})
	})
})

router.get('/admin/index/dianying',function(req,res){
	Film.findAll({},function(err,ret){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'查找失败'
			})
		}
		var ret = JSON.stringify(ret)
		var ret = eval("("+ret+")")
		res.render('controler/dianying-list.html',{
			films:ret
		})
	})
		
})

router.post('/admin/index/film-del',function(req,res){
	var id = req.body.id
	Film.delFilm(id,function(err,msg){
		if(err){
			res.status(500).json({
				err_code:1,
				message:'服务端错误'
			})
		}
		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	})
})

router.post('/admin/index/film-edit',function(req,res,next){
	var text = req.body.text
	var check = req.body.check
	var myFilm = new Object()
	//var fileName = req.file.filename
	var arr = text.split('&')
	var oldImg = arr.oldImg
	console.log(text)
	// fs.unlink(oldImg, function(err) {
 //    if (err) {
 //        throw err;
 //    }
 //    console.log('成功删除了 /tmp/shiyanlou');
	// })
	
	// for(var i=0;i<arr.length;i++){
	// 	var ar = arr[i].split('=')
	// 	myFilm[ar[0]] = ar[1] || ' '
	// }
	// if(fileName){
	// 	myFilm.img = '/public/img/films/'+fileName
	// }
	// myFilm.keywords = check
	// for(var i=0;i<50;i++){
	// 	Film.addFilm(myFilm,function(err,ret){
	// 	if(err){
	// 		res.status(500).json({
	// 			err_code:1,
	// 			message:'添加失败'
	// 		})
	// 		console.log(err)
	// 	}

	// 	res.status(200).json({
	// 		err_code:0,
	// 		message:'添加成功'
	// 	})
	// })
	// }
})

router.get('/admin/index/product-show',function(req,res){
	console.log(req.query._id)
	res.render('controler/product-show.html',{
	})	
})