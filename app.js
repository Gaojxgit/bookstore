var koa=require("koa");
var controller=require("koa-route");

var app=koa();
var views=require('co-views');
var render=views('./view',{
	map:{html:'ejs'}
})
var server=require('./service/servercontrol.js');

var koa_static=require('koa-static-server');
app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/static/',
	maxage:0
}));

app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('index');
}));

app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	this.body=server.get_index_data()
}));

app.use(controller.get('/female',function*(){
	this.set('Cache-control','no-cache');
	this.body=yield render('female',{nav:'女生频道'})
}))
app.use(controller.get('/male',function*(){
	this.set('Cache-control','no-cache');
	this.body=yield render('male',{nav:'男生频道'})
}))

app.use(controller.get('/ajax/male',function*(){
	this.set=('Cache-control','no-cache');
	this.body=server.get_male_data();
}))

app.use(controller.get('/ajax/female',function*(){
	this.set('Cache-control','no-cache');
	this.body=server.get_female_data();
}))
var qs=require('querystring');
app.use(controller.get('/ajax/movie',function*(){
	
	this.set('Cache-Control','no-cache');
	var This=this;
	var params=qs.parse(this.req._parsedUrl.query);
	var keyword=params.keyword;
	console.log(keyword);
	this.body=yield server.get_movie_data(keyword);
}))

app.use(controller.get('/ajax/chapter',function*(){
	this.set('Cache-control','no-cahce');
	this.body=server.get_chapter_data();
}))

app.use(controller.get('/rank',function*(){
	this.set('Cache-control','no-cache');
	this.body=yield render('rank',{nav:'排行频道'});
}))

app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-control','no-cache');
	this.body=server.get_rank_data();
}))

app.use(controller.get('/list',function*(){
	this.set('Cache-control','no-cache');
	this.body=yield render('category',{nav:'分类'});
}))

app.use(controller.get('/ajax/category',function*(){
	this.set('Cache-control','no-cache');
	this.body=server.get_category_data();
}))

app.use(controller.get('/ajax/chapter_data',function*(){
	var para=qs.parse(this.req._parsedUrl.query);
	var id=para.id;
	if(!id){
		id='';
	};
	this.set('Cache-control','no-cache');
	this.body=server.get_chapter_content_data(id);
}))

app.use(controller.get('/book',function*(){
	this.set('Cache-control','no-cache');
	this.body=yield render('book',{nav:'书籍详情'});
}))

app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-control','no-cache');
	var para=qs.parse(this.req._parsedUrl.query);
	var id=para.id;
	if(!id){
		id='';
	}
	this.body=server.get_book_data(id);
}))

app.use(controller.get('/search',function*(){
	this.set('Chche-control','no-cache');
	this.body=yield render('search',{nav:'搜索'});
}))

app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-control','no-cache');
	var para=qs.parse(this.req._parsedUrl.query);
	var keyword=para.keyword;
	this.body=yield server.get_search_data(keyword);
}))

app.use(controller.get('/read',function*(){
	this.set('Cache-control','no-cahce');
	this.body=yield render('read');
}))

app.use(controller.get('/rank',function*(){
	this.set('Cache-control','no-cache');
	this.body=yield render('rank',{nav:'排行榜'});
}))





console.log('服务已启动')
app.listen(8000);
