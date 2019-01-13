

    // Get User Data

    var user_data = {               // todo: 這邊資料之後要從後台取得
        user_name: '林耿弘',
        user_photo: 'dist/images/table/profile.png', 
        credit_count: 9,            // todo: 讓他可以用計算ㄉ
        now_wishlist: [ 43081, 4021, 43021, 42973, 42971, 42969, 42968 ],
        now_table: [ 43084, 4021, 43023, 43020 ]
    }


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
            },
            wishlistRemove: function ( target_id ) {
                var index = this.now_wishlist.indexOf( target_id );
                console.log( 'kill wishlist: ' + index );
                this.now_wishlist.splice( index, 1 );
                vue_wishlist.wishlist_cont.splice( index, 1 );
                // vue_wishlist.refresh();
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

    // Component: wishlist-item

    Vue.component( 'wishlist-item', {
        data: function () {
            return {
                hover_now: false
            }
        },
        props: ['class_item'],
        template: [
            '<div v-if="class_item.isSeen" class="list_course_item" @mouseover="mouseoverItem" @mouseout="mouseoutItem" >',
                '<div class="list_course_item_left">',
                    '<p class="list_course_item_category text_20 text_white clickable" @click="deleteItem" :class="getClass()"> {{ class_item.category }} </p>',
                '</div>',
                '<div class="list_course_item_mid" @click="addToTable">',
                    '<p class="list_course_item_title text_16">{{ class_item.dept_id }}-{{ class_item.class_id }} {{ class_item.title }}</p>',
                    '<p class="list_course_item_description text_14 text_dark">{{ class_item.teacher }} — {{ class_item.time }}</p>',
                '</div>',
                '<div class="list_course_item_right" @click="addToTable">',
                    '<div class="list_course_item_button"></div>',
                '</div>',
            '</div>'
        ].join(''),
        methods: {
            getClass: function() {
                var class_context = this.class_item.dept_id ;
                return class_context;
            },
            addToTable: function () {
                if ( checkConflict ( this.class_item, vue_classtable ) ) {
                    vue_user_data.tableAdd( this.class_item.id );
                    vue_user_data.wishlistRemove( this.class_item.id );
                    vue_classtable.clearFilterCell();
                }
            },
            deleteItem: function () {
                console.log ( 'wishlist killed: ' +  vue_wishlist.wishlist_cont.indexOf( this.class_item ) + ' (' + this.class_item.title + ')' ); 
                vue_user_data.wishlistRemove( this.class_item.id );
            },
            mouseoverItem: function () {
                if ( checkConflict ( this.class_item, vue_classtable ) ) {
                    vue_classtable.refresh( this.class_item.id );
                }
            },
            mouseoutItem: function () {
                vue_classtable.refresh();
            }
        }
    })


    // Wishlist

    var vue_wishlist = new Vue({
        el: '#wishlist',
        data: {
            wishlist_cont: [],
            class_table_locked: true
        },
        methods: {
            refresh: function () {    
                this.wishlist_cont.length = 0;
                for ( var i = 0 ; i < vue_user_data.now_wishlist.length ; i ++ ) {
                    var class_item = getClassObject ( course_db, vue_user_data.now_wishlist[i] ) ;
                    class_item.isSeen = true;
                    this.wishlist_cont.push( class_item );
                }
                this.clearFilter() ;
            },
            clearFilter: function () {
                // 重新將所有 wishlist item 設為可見
                for ( var i = 0 ; i < this.wishlist_cont.length ; i ++ ) {
                    this.wishlist_cont[i].isSeen = true ;
                }
            },
            filterItemTIme: function ( filter_day, filter_time ) {
                // 篩選出不符合條件的 item 設為不可見
                filter_time = textTransTime( filter_time );
                for ( var i = 0 ; i < this.wishlist_cont.length ; i ++ ) {
                    var wishlist_item_day = getTimeObject(this.wishlist_cont[i])[0].day ;
                    var wishlist_item_start = getTimeObject(this.wishlist_cont[i])[0].start ;
                    wishlist_item_start = textTransTime( wishlist_item_start );
                    var wishlist_item_end = parseInt(wishlist_item_start) + getTimeObject(this.wishlist_cont[i])[0].hrs - 1 ;
                    if ( filter_day == wishlist_item_day && filter_time >= wishlist_item_start && filter_time <= wishlist_item_end ) {
                    }
                    else {
                        this.wishlist_cont[i].isSeen = false ;
                    }
                }
            },
            switchLockStatus: function () {
                this.class_table_locked = ! this.class_table_locked;
            }
        }
    })


