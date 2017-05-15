var rank=location.href.split('/').pop();
$.get('/ajax/'+rank,function(data){
	
	for(var i=0;i<data.items.length;i++){
		data.items[i].booklist=data.items[i].description.split('\n');
	}
	console.log(data);
	
	var app=new Vue({
		data:{
			data:data.items
		},
		el:"#app"
	})
},'json')
