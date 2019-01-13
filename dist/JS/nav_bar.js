var vue_nav_bar = new Vue({
	el: '.nav-wrapper',
    data: {
        now_tab : ''
    },
    methods: {
    	change_tab: function(tab){
    		$(".change_tab").hide();
    		$(".change_tab[name='" + tab + "']").show();
    		// console.log(tab);
    		// alert(tab);
    	}
    }
})
