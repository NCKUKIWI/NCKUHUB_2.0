var vue_nav_bar = new Vue({
	el: '.hub_navbar',
	// el: '.nav-wrapper',
    data: {
        now_tab : ''
    },
    methods: {
    	change_tab: function( tab ) {
			now_tab = tab ;
			// 切換頁面
    		$( ".change_tab" ).hide();
			$( ".change_tab[name='" + tab + "']" ).show();
			// 切換 Navbar 顯示
    		$( ".nav_link" ).removeClass( "on" );
    		$( ".nav_link[name='" + tab + "']" ).addClass( "on" );
		},
		// dropdownFunction: function() {
		// 	document.getElementById("dropdown1").classList.toggle("show");
		// }
    }
})
