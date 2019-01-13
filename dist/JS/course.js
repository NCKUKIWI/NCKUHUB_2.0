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

        for(var i=0;i<40;i++){
          vue_course_item.course_data.push(vue_course_item.course_data_db[i]);
        }
  }
});



function dropdownFunction() {
  document.getElementById("dropdown1").classList.toggle("show");
}

// $(document).ready(function(){

// listen scroll

  var scroll1 = $("#courseList").height();
  var scroll2 = $("#course_item").height();
  var scroll3 = $("#course_item").scrollTop();

  var courseList_height = $("#courseList").height();
  var courseList_scrollTop = document.getElementById("course_item").scrollTop;




  document.getElementById("test1").innerHTML = scroll1;
  document.getElementById("test2").innerHTML = scroll2;
  document.getElementById("test3").innerHTML = scroll3;



  var vue_course_item = new Vue({
    el: '#course_item',
    data: {
      course_with_comment: [],
      course_data: [],
      course_data_db: [],
      course_by_depart: [],
      heartColor: false,
      comment_only: false,
    },
    created: function() {
      // $.ajax({
      //   type: "GET",
      //   url: "https://nckuhub.com/course/allcourse",
      //   success: function(response) {
      //         vue_course_item.course_data = response.nowCourse;
      //         vue_course_item.course_by_depart= = response.courses_Department;
      //         console.log(response);
      //   }
      // });
    },
    // computed: {
    //   filterComment: function() {
    //     if(this.comment_only == false) {
    //       return this.course_data_db;
    //     } else {
    //       return this.course_with_comment;
    //
    //     }
    //   }
    // },
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
            console.log("comment: " + vue_courseContent.comment_data.length);
                console.log("recommend: "+response.recommand);
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
        vue_wishList.wishList.push(chooseCourse);
      },
      commentfilter: function() {
        // var filt_data = this.course_data.filter(function(item){
        //   return item.系號 == "I6";
        // });
        // vue_courseContent.course_data = filt_data;
        // console.log(vue_courseContent.course_data);
        var cCheck = document.getElementById("commentCheck");
        if(cCheck.checked == true) {
          this.comment_only = true;
        } else {
          this.comment_only = false;
        }
      },
      handleScroll: function() {
        console.log($("#course_item").scrollTop());
      },
    },
    created: function() {
      document.getElementById("courseList").addEventListner('scroll', this.handleScroll);
    }
  });

  // var vue_courseList = new Vue ({
  //   el: '#courseList',
  //   data: [],
  //   methods: {
  //     handleScroll: function() {
  //       console.log("HI!");
  //     },
  //   },
  //   created: function() {
  //     document.getElementById("courseList").addEventListner('scroll', this.handleScroll);
  //   },
  // });






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


  var vue_wishList = new Vue ({
    el: '#wishList',
    data: {
      wishList: [],
    }
  });


  var vue_courseComment = new Vue ({
    el: "#courseArrange",
    data: {
      course_data: [],
    },
    methods: {
      cfilter: function() {
        console.log("test");
        var cCheck = document.getElementById("commentCheck");
        if(cCheck.checked == true) {
          vue_course_item.comment_only = true;
          vue_course_item.course_data = vue_course_item.course_with_comment;
        } else {
          vue_course_item.comment_only = false;
          vue_course_item.course_data = vue_course_item.course_data;
        }
        console.log("test2");
      },
      sortByDept: function() {
        // vue_course_item.course_data.sort(function(a,b) {
        //   return a.系號[0] > b.系號[0];
        // });
        //
        // var sorted_data = [];
        //
        // for(i in vue_course_item.course_data) {
        //   var s = vue_course_item.course_data[i].系號[0];
        //   if (sorted_data[s] && sorted_data[s].length >= 0) {
        //       sorted_data[s].push(vue_course_item.course_data[i]);
        //   } else {
        //     sorted_data[s] = {};
        //     sorted_data[s].push(vue_course_item.course_data[i]);
        //   }
        // }
        // console.log(sorted_data);

        var course_arr2 = vue_course_item.course_data;
        var course_arr = [{"id":1,"dept":"C3"},{"id":3,"dept":"A3"},{"id":2,"dept":"H3"}];

        console.log(course_arr2[0]);

        course_arr2.sort(function(a, b) {
          return a.dept.localeCompare(b.dept);
        });

        console.log(course_arr2);
        vue_course_item.course_data = course_arr2;
        // var test2_s = JSON.stringify(test2);
        // console.log(test2_s);

      }
    },
  });




// });
