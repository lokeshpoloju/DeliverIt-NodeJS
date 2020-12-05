var express=require('express');
const app=express();
var mysql= require ('mysql');

var connection = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:'driverinfo'
});

connection.connect(function(err){
if(err) throw err;
console.log("Connected..!!");

var driverid="41";
var name="Naveen";
var orderid="12345";
var time="1600";

var insertcmd="INSERT INTO orders(driverid,name,orderid,time) values(?,?,?,?)";
var values=[driverid,name,orderid,time];

connection.query(insertcmd,values,function(err,result){
    if(err) throw  err;
    console.log("Entry recorded. ");
});
});


var server=app.listen(3000,()=>{
   console.log("server is running at http://localhost:3000");
});