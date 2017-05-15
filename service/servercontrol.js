var fs=require('fs');

exports.get_index_data=function(){
	return fs.readFileSync('./mock/home.json','utf-8');
}

exports.get_female_data=function(){
	console.log(1);
	return fs.readFileSync('./mock/channel/female.json','utf-8')
}
exports.get_rank_data=function(){
	return fs.readFileSync('./mock/rank.json','utf-8')
}

exports.get_category_data=function(){
	return fs.readFileSync('./mock/category.json','utf-8');
}


exports.get_male_data=function(){
	return fs.readFileSync('./mock/channel/male.json','utf-8');
}

exports.get_chapter_data=function(){
	return fs.readFileSync('./mock/reader/chapter.json','utf-8');
}

exports.get_chapter_content_data=function(id){
	if(!id){
		id='1';
	};
	return fs.readFileSync('./mock/reader/data/data'+id+'.json','utf-8');
}

exports.get_book_data=function(id){
	if(!id){
		id="18218";
	};
	
	if(fs.existsSync('./mock/book/'+id+'.json')){
		return fs.readFileSync('./mock/book/'+id+'.json','utf-8');
	}else{
		return fs.readFileSync('./mock/book/18218.json','utf-8');
	}

}
exports.get_movie_data=function(keyword){
	return function(callback){
		var http=require('http');
		var qs=require('querystring');
		var data={
			city:keyword
		};
		var content=qs.stringify(data);
		var httpReq={
			hostname:'api.douban.com',
			port:80,
			path:'/v2/movie/in_theaters?'+content,
			method:'GET'
		};
		var reqObj=http.request(httpReq,function(res){
			var content='';
			res.setEncoding('utf-8');
			res.on('data',function(chunk){
				content+=chunk;
			});
			res.on('end',function(){
				callback(null,content);
			})
		});
		reqObj.on('error',function(e){
			console.log(e)
		});
		reqObj.end();	
	}
}

exports.get_search_data=function(keyword,start,end){
	return function(cb){
		var http=require('http');
		var qs=require('querystring');
		
		var data={
			s:keyword
		};
		
		var content=qs.stringify(data);
		var httpReq={
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/lib/query/onebox?' + content,
			method: 'GET'
		}
		var obj=http.request(httpReq,function(res){
			
			var content='';
			res.setEncoding('utf-8');

			res.on('data', function(chunk) {
				content += chunk;
			});
			
			res.on('end', function(e) {
				cb(null,content);
			});	
		})
		
		obj.on('error', function(e) {
			console.log(e);
		});	
		obj.end();
		
	}
}
