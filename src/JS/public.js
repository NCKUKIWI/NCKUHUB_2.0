

    // Get User Data

    var user_data = {               // todo: 這邊資料之後要從後台取得
        user_name: '林耿弘',
        user_photo: 'dist/images/table/profile.png', 
        credit_count: 9,            // todo: 讓他可以用計算ㄉ
        now_wishlist: [ 43081, 4021, 43021, 42973, 42971, 42969, 42968 ],
        now_table: [ 43084, 4021, 43023, 43020 ]
    }

    /* 說明：
        課程加入願望清單：  vue_user_data.wishlistAdd( id );
        課程移出願望清單：  vue_user_data.wishlistRemove( id );
    */


    // Get Course Data

    var course_db = [];

    axios.get ( 'https://nckuhub.com/api/course/' )
        .then ( function ( response ) {
            console.log ( 'axios: 抓取資料成功！' ) ;
            course_db = response.data.courses; 
            vue_user_data.checkValid();
            vue_wishlist.refresh(); 
            vue_courseFilter.refresh(); 
            vue_classtable.refresh(); 
        })
        .catch ( function ( error ) {
            console.log (  'axios:' + error ) ; 
        }); 


    // User Data

    var vue_user_data = new Vue ({
        el: '#user_data',
        data: user_data,
        methods: {
            checkValid: function () {
                for ( var i = 0 ; i < this.now_wishlist.length ; i ++ ) {
                    if ( ! getClassObject ( course_db, vue_user_data.now_wishlist[i] ) ) {
                        this.now_wishlist.splice( i, 1 );
                    }
                }
                for ( var i = 0 ; i < this.now_table.length ; i ++ ) {
                    if ( ! getClassObject ( course_db, vue_user_data.now_table[i] ) ) {
                        this.now_table.splice( i, 1 );
                    }
                }
            },
            wishlistAdd: function ( target_id ) {
                this.now_wishlist.push( target_id );
                vue_wishlist.refresh();
                vue_courseFilter.refresh();
            },
            wishlistRemove: function ( target_id ) {
                var index = this.now_wishlist.indexOf( target_id );
                console.log( 'kill wishlist: ' + index );
                this.now_wishlist.splice( index, 1 );
                vue_wishlist.wishlist_cont.splice( index, 1 );
                vue_courseFilter.wishlist_cont.splice( index, 1 );
                // vue_wishlist.refresh();
                // vue_courseFilter.refresh(); 
            },
            tableAdd: function ( target_id ) {
                this.now_table.push( target_id );
                console.log ( target_id );
                vue_classtable.refresh();
            },
            tableRemove: function ( target_id ) {
                var index = vue_user_data.now_table.indexOf( target_id );
                vue_user_data.now_table.splice( index, 1 );
                vue_classtable.refresh();
            }
        }
    })