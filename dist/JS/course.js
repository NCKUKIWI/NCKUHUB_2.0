/*$('.input-number-increment').click(function() {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var val = parseInt($input.val(), 10);
  $input.val(val + 1);
});

$('.input-number-decrement').click(function() {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var val = parseInt($input.val(), 10);
  $input.val(val - 1);
});
*/



//Get data from APIs-------

$.ajax({
  type: "GET",
  url: "https://nckuhub.com/api/course/",
  success: function(response) {
        vue_course_item.course_data_db = response.courses;

        for(var i=0;i<100;i++){
          vue_course_item.course_data.push(vue_course_item.course_data_db[i]);
        }
        console.log(vue_course_item.course_data[0]);

        for( var i in vue_course_item.course_data_db) {
          if(vue_course_item.course_data_db[i].comment_num>0) {
            vue_course_item.course_with_comment.push(vue_course_item.course_data_db[i]);
          }
        }

        // vue_course_item.course_data = vue_course_item.course_with_comment;

  }

});

$.ajax({
  type: "GET",
  url: "https://nckuhub.com/api/course/allDpmt",
  success: function(response) {
    vue_courseFilter.dept = response;
  }
});


// function dropdownFunction() {
//   document.getElementById("dropdown1").classList.toggle("show");
// }

// $(document).ready(function(){

  var vue_course_item = new Vue({
    el: '#course_item',
    data: {
      course_with_comment: [],
      course_data: [],
      course_data_db: [],
      course_by_depart: [],
      heartColor: false,
      comment_only: false,
      count_height: 1,
      count_index: 0,
    },

    methods: {
      courseLink: function(index) {
        vue_courseContent.isShow = true;
        vue_courseContent.course_data = vue_course_item.course_data[index];

        var course_id = vue_courseContent.course_data.id;
        var course_url = "https://nckuhub.com/api/course/" + course_id;
        $.ajax({
          type: "GET",
          url: course_url,
          success: function(response) {
            vue_courseContent.score_data = response;
            vue_courseContent.comment_data = response.comment;

            if(vue_courseContent.comment_data.length==0){
              $(".courseFeedback__msg--default").css("display","block");
            } else {
              $(".courseFeedback__msg--default").css("display","none");
            }
          }

        });


      },

      addCourse: function(index){
        var chooseCourse = vue_course_item.course_data[index];
        vue_courseFilter.wishList.push(chooseCourse);
      },

      handleScroll: function() {
        var list_height = $("#course_item").height();
        var scroll_height = $("#course_item").scrollTop();
        if(scroll_height >= list_height * this.count_height){
          for(var i = 100 + this.count_index*20; i< 100 + (this.count_index+1)*20;i++){
            vue_course_item.course_data.push(vue_course_item.course_data_db[i]);
          }
          this.count_index++;
          this.count_height++;
        }
      },
    },
    created: function() {
      document.getElementById("courseList").addEventListner('scroll', this.handleScroll);
    }
  });


  var vue_courseContent = new Vue ({
    el: '#courseContent',
    data: {
      isShow: false,
      course_data: [],
      score_data: [],
      comment_data: [],
    },
    methods: {
      showContent: function() {
        vue_courseContent.isShow = false;
      }
    }
  });

  var vue_courseFilter = new Vue ({
    el: '#courseFilter',
    data: {
      keyword: '',
      dept: [],
      course_data: [],
      // wishList: [],
      wishlist_cont: [],
      dept_dropdown: [],
      filter_by_dpmt: [],
    },
    methods: {
      comment_filter: function() {
        var cCheck = document.getElementById("commentCheck");
        if (cCheck.checked==true) {
          vue_course_item.course_data = vue_course_item.course_with_comment;
        } else {
          vue_course_item.course_data = [];
          for(var i=0;i<100;i++){
            vue_course_item.course_data.push(vue_course_item.course_data_db[i]);
          }
        }
      },
      result_click: function(index) {
        var key = document.getElementById("dpmtFilter");
        var key_prefix = vue_courseFilter.dept_dropdown[index].prefix;
        key.value = key_prefix + " " + vue_courseFilter.dept_dropdown[index].name;
        console.log(key_prefix);
        this.filter_by_dpmt = [];
        for(var i in vue_course_item.course_data_db) {
          if(vue_course_item.course_data_db[i].系號 == key_prefix){
            this.filter_by_dpmt.push(vue_course_item.course_data_db[i]);
          }
        }

        vue_course_item.course_data = this.filter_by_dpmt;

        console.log(this.filter_by_dpmt);
      },
      refresh: function () {    
        this.wishlist_cont.length = 0;
        console.log ( course_db );
        for ( var i = 0 ; i < vue_user_data.now_wishlist.length ; i ++ ) {
            var class_item = getClassObject ( course_db, vue_user_data.now_wishlist[i] ) ;
            this.wishlist_cont.push( class_item );
        }
      }
    },
    computed: {
      search_result: function() {
        this.dept_dropdown = [];
        if(this.keyword) {
          this.keyword = this.keyword.toUpperCase();
          for(var i in this.dept){
            if(this.dept[i].DepPrefix.match(this.keyword) || this.dept[i].DepName.match(this.keyword)) {
              var result_candidate = [];
              result_candidate.prefix = this.dept[i].DepPrefix;
              result_candidate.name = this.dept[i].DepName;
              this.dept_dropdown.push(result_candidate);
            }
          }
          // var test = this.dept[0].DepPrefix+ " "+this.dept[0].DepName;
          // var test2 = this.dept[1].DepPrefix+ " "+this.dept[1].DepName;
          // this.dept_dropdown.push(test);
          // this.dept_dropdown.push(test2);
        }
        return this.dept_dropdown;


        // for(var i in vue_courseFilter.dept) {
        //   if(vue_courseFilter.dept[i].DepPrefix.match(this.keyword)){
        //     var result1 = vue_courseFilter.dept[i].DepPrefix + vue_courseFilter.dept[i].DepName;
        //     break;
        //   }
        // }
        // if(this.keyword) {
        //   for( var i in this.dept) {
        //   }
        // }
      }
    }
  });

// });
