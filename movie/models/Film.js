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
		type:Number,	//国产 港台 日韩 欧美
		enum:[0,1,2,3],
		default:0
	},
	from1:{
		type:Array
	},
	from2:{
		type:Array
	},
	film_type:{
		type:String,	//电影 电视剧 动漫 综艺
		enum:[0,1,2,3],
		default:0
	},
	type:{		//类别
		type:Array
	},
	img:{
		type:Buffer
	},
	lastDate:{
		type:Date,
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