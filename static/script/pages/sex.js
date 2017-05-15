var sex=location.href.split('/').pop();
$.get('/ajax/'+sex,function(data){
	console.log(data);
	var app=new Vue({
		data:{
			header:data.ad_setting_name.split("-").pop(),
			focus:data.items[0].data.data,
			commend:data.items[1].data.data,
			newbook:data.items[2].data.data,
			finished:data.items[3].data.data
		},
		el:"#app"
		
	})
},'json')
