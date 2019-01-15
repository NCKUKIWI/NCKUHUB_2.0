


    /* 說明：
        課程加入願望清單：  vue_user_data.wishlistAdd( id );
        課程移出願望清單：  vue_user_data.wishlistRemove( id );
    */

    

    // Get Course Data

    var course_db = [];

    axios.get ( 'https://nckuhub.com/api/course/' )
        .then ( function ( response ) {
            course_db = response.data.courses; 
            console.log ( '課程資料庫: 抓取資料成功！' ) ;
            vue_user_data.checkValid();
            vue_wishlist.refresh(); 
            vue_courseFilter.refresh(); 
            vue_classtable.refresh(); 
        })
        .catch ( function ( error ) {
            console.log (  '課程資料庫:' + error ) ; 
        }); 


    // User Data

    var vue_user_data = new Vue ({
        el: '#user_data',
        data: {                                                 // todo: 不合格或重複的兩清單內容要刪掉（並存回資料庫）
            user_id: '5',                                       // todo: 從登錄狀態取得
            user_name: '',
            user_photo: 'dist/images/table/profile.png',        // todo: 取得正確圖片
            credit_count: 9,                                    // todo: 讓他可以用計算ㄉ
            now_wishlist: [],
            now_table: []
        },
        created: function() {
            this.getData( this.user_id );                       // todo: 每次登入都要重新開始
            this.wishlistUpdate() ;
        },
        methods: {
            getData: function( user_id ) {
                var user_data = {} ;
                axios.get ( 'https://nckuhub.com/api/user/getList/'+ user_id )
                    .then ( function ( response ) {
                        user_data = response.data ;
                        console.log ( '使用者資料: 抓取資料成功！' ) ;
                        vue_user_data.fillData( user_data ) ;
                    })
                    .catch ( function ( error ) {
                        console.log (  '使用者資料:' + error ) ; 
                    }); 
            },
            fillData: function ( user_data ) {
                // 初始化用戶資料
                this.user_name = '';
                // this.user_photo = '';                       // todo
                // this.credit_count = 0;                      // todo
                this.now_wishlist.length = 0;
                this.now_table.length = 0;
                // 填入取得の資料
                this.user_name = user_data.name;
                // this.user_photo = user_data.photo;          // todo
                // this.credit_count = 計算 ;                   // todo
                this.now_wishlist = user_data.now_wishlist;
                this.now_table = user_data.now_table;
            },
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
            },
            wishlistUpdate: function() {
                axios.post('https://nckuhub.com/api/post/setWish/5', {
                        "now_table": [43081, 4021, 43021, 42973, 42971, 42969, 42968, 99999]        // todo: 不知為啥傳不成功？？
                    })
                    .then ( function ( response ) {
                        console.log ( response ) ;
                        // console.log ( '更新願望清單: 更新成功！' ) ;
                    })
                    .catch ( function ( error ) {
                        console.log (  '更新願望清單:' + error ) ; 
                    });
            }
        }
    })