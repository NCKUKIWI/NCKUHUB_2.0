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

function dropdownFunction() {
  document.getElementById("dropdown1").classList.toggle("show");
}

$(document).ready(function(){

  var scrollbottom = $(document).height() - $(window).height() - $(window).scrollTop();
  console.log(scrollbottom);

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
      }
    },
  });

  $.ajax({
    type: "GET",
    url: "https://nckuhub.com/test/course/",
    success: function(response) {
          vue_course_item.course_data_db = response.courses;
          // vue_course_item.course_data = response.courses;
          for(var i=0;i<20;i++){
            vue_course_item.course_data.push(vue_course_item.course_data_db[i]);
          }


          // vue_course_item.course_data = vue_course_item.course_by_depart.A1;
          // for(var i in vue_course_item.course_data) {
          //   if(vue_course_item.course_data[i].comment_num > 0){
          //     vue_course_item.course_with_comment.push(vue_course_item.course_data[i]);
          //   }
          // }
          // for(var i in vue_course_item.course_data_db) {
          //   vue_course_item.course_data[i].dept = vue_course_item.course_data[i].系號;
          // }
          // console.log(vue_course_item.course_with_comment);
    }
  });




  var vue_courseContent = new Vue ({
    el: '#courseContent',
    data: {
      isShow: false,
      course_data: [],
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




});
