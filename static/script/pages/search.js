new Vue({
	el: '#app',
	data: {
		search:[],
		condition:true,
		empty:false
	},
	methods: {
		dosearch: function(e) {
			var keyword = $('.search_input').val();
			var _this = this;
			$.get('/ajax/search',{
				keyword:keyword
			},function(d){
				console.log(d);
				_this.condition = false;
				_this.search = d.items;
				if(_this.search.length == 0){
					_this.empty = true;
				}else{
					_this.empty = false;
				}
			},'json')
		}
	}
});