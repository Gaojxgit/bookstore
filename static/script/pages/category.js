
$.get('/ajax/category',function(data){	
	console.log(data);
	var app=new Vue({
		data:{
			male:data.male,
			femlae:data.female
		},
		el:"#app"
	})
},'json')
