const express=require("express")
const app=express()
const port=10001
const request = require('request');
var course;
var allinfo; 
app.use(express.static(__dirname + '/public2'))
app.listen(10001)
app.get('/hi',function(req,res)
{
  var options = { 
   method: 'GET',
    url: 'https://nckuhub.com/test/course',
    };
   request(options,function(error,response,body) {
   if(error) 
      throw new Error(error);
      course=response.body;
      var obj = JSON.parse(course);
      console.log(obj.courses[0]["課程名稱"]);
      var obj1=Object.entries(obj)[0];
      //console.log(Object.entries(obj1)[0]);
      console.log(Object.keys(obj1[1]).length);  //the amount of the courses
      allinfo=obj1[1];
      res.send(allinfo)
     });
})
