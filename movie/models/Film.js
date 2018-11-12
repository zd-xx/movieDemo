//链接mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true });

var Schema = mongoose.Schema

var FilmSchema = new Schema({
	show_title:{
		type:String
	},
	film_name:{
		type:String
	},
	score:{
		type:Number,
		default:0
	},
	intro:{
		type:String
	},
	region:{
		type:String,	//国产 港台 日韩 欧美
	},
	from1:{
		type:Array
	},
	from2:{
		type:Array
	},
	film_type:{
		type:String,	//电影 电视剧 动漫 综艺
	},
	keywords:{		//类别
		type:String
	},
	img:{
		type:String
	},
	lastDate:{
		type:Date,
		required:true,
		default:Date.now
	}
})

var filmModel = mongoose.model('Film', FilmSchema)
//导出模型构造函数，外部可以操作数据库
module.exports = filmModel

filmModel.addFilm=function(film,callback){
	new filmModel(film).save(function(err,ret){
		callback(err,ret)
	})
}

filmModel.findAll=function(films,callback){
	this.find(films,function(err,ret){
		callback(err,ret)
	})
}

filmModel.findOneFilm=function(id,callback){
	this.findById(id, function (err,ret){
        callback(err,ret)
    });
}
filmModel.editOneFilm=function(id,film,callback){
	console.log(id,film,typeof film)
	//delete admin.id
    this.findByIdAndUpdate(id,film,function(err,ret){
		callback(err,ret)
	})
}
filmModel.delFilm=function(id,callback){
	this.findByIdAndRemove(id,function(err,ret){
		callback(err,ret)
	})
}