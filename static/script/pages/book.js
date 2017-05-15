var id=location.href.split('?id=').pop();
console.log(id);
$.get('/ajax/book?id='+id,function(data){
	console.log(data);
	
	var app=new Vue({
		el:'#app',
		data:{
			item:data.item,
			related:data.related
		}
	})	
},'json')
