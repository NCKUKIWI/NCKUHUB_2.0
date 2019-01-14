var vue_nav_bar = new Vue({
	el: '.hub_navbar',
	// el: '.nav-wrapper',
    data: {
        now_tab : 'default'
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
		switch_profile_window: function() {
			// todo: 切換用起來怪怪的，有空再調整一下？
			if ( now_tab != 'profile' ) {
				$( ".nav_link[name='profile']" ).toggleClass( "on" );
			}
			$( ".hub_navbar__profile__dropdown" ).toggleClass( "on" );
		}
    }
})
