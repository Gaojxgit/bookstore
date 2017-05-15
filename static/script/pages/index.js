(function (){
	var app=null;
	var screenWidth=$(window).width();
	var tabWidth=$('.tab_switch_border').eq(0).width();
	if(screenWidth<320){
		screenWidth=320;
	}
	var data={
				screenWidth:'',
				pos:{
					tabPos:'',
					position:'',
					tab_1_class:'',
					tab_2_class:'',
				},
				tabWidth:'',
				movieData:{},
				hot:'',
				commend:'',
				male:'',
				female:'',
				free:'',
				choosed:''
		}
	
	
	
	$.get('/ajax/index',function(data){
		data={
				screenWidth:screenWidth,
				pos:{
					tabPos:0,
					position:0,
					tab_1_class:'tab_switch active',
					tab_2_class:'tab_switch',
				},
				tabWidth:tabWidth,				
				movieData:{},
				hot:data.items[1].data.data,
				commend:data.items[2].data.data,
				male:data.items[3].data.data,
				female:data.items[4].data.data,
				free:data.items[5].data.data,
				choosed:data.items[6].data.data
		};
		app=new Vue({
			el:'#app',
			data:data,
			methods:{
				tabSwitch:function(num){
					if(num==0){
						this.pos.position=0;
						this.pos.tabPos=0;
						this.pos.tab_1_class='tab_switch active';
						this.pos.tab_2_class='tab_switch';
						
					}else{
						this.pos.position=-screenWidth;
						this.pos.tabPos=tabWidth;
						this.pos.tab_1_class='tab_switch';
						this.pos.tab_2_class='tab_switch active';					
					}
				}
			}
		})
	},'json');
	
	$.get('/ajax/movie',{keyword:'北京'},function(movieData){
		Vue.set(app.movieData,'movieData',movieData.subjects);
	},'json');

	var l=null,
		s=null
	$('#app')[0].addEventListener('touchstart',function(ev){
		l=ev.touches[0].pageX;
	})
	$('#app')[0].addEventListener('touchmove',function(ev){
			s=ev.touches[0].pageX-l;
	});
	$('#app')[0].addEventListener('touchend',function(ev){
		if(s>50){
			Vue.set(app.pos,'position',0);
			Vue.set(app.pos,'tabPos',0);
			Vue.set(app.pos,'tab_1_class','tab_switch active');
			Vue.set(app.pos,'tab_2_class','tab_switch');
		}else if(s<-50){
			Vue.set(app.pos,'position',-screenWidth);
			Vue.set(app.pos,'tabPos',tabWidth);
			Vue.set(app.pos,'tab_1_class','tab_switch');
			Vue.set(app.pos,'tab_2_class','tab_switch active');
		}
	});


	$(document).ready(function(){
		  $(".owl-carousel").owlCarousel(
		  	{
		  		loop:true,
			    dots:true,
			    items:1,
			    autoplay:true,
			    autoplayTimeout:5000
			}
		  );
	});
})()













