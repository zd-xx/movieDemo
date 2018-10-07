//链接mongodb
const mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://localhost/test');
//创建模型，即设计数据库
//表名为小写cat,且有name为字符串类型
const Cat = mongoose.model('Cat', { name: String });
//实例化cat 持久化保存kitty实例
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
for(var i=0;i<10;i++){
	const kitty = new Cat({ name: 'Zildjian' });
	kitty.save().then(() => console.log('meow'));
}