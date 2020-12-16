var express=require('express');
var mysql= require ('mysql');
var bodyparser = require('body-parser');

var connection = mysql.createConnection({

    host:"localhost",
    user:"root", 
    password:"",
    database:'driverinfo'
});

var app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

connection.connect(function(err){
if(err) throw err;
console.log("Connected..!!");
});


app.post('/orders/',(req,res,next)=>{

var data= req.body;
var driverid=data.driverid;
var name=data.name;
var orderid=data.orderid;
var time=data.time;
connection.query("SELECT * FROM orders WHERE driverid=?",[driverid],function(err,result,fields){

    connection.on('error',(err)=>{
        console.log("[mysql error]",err);
    });

    if(result && result.length){

        res.json("Driver Id exists ");
    }
    else{
var insertcmd="INSERT INTO orders(driverid,name,orderid,time) values(?,?,?,?)";
var values=[driverid,name,orderid,time];

connection.query(insertcmd,values,(err,result,fields)=>{
    connection.on('error',(err)=>{
        console.log("[mysql error]",err);

    });
    console.log("Entry recorded. ");
    res.json("Recorded");
});
}
});
});

app.post('/customer/',(req,res,next)=>{
    var data=req.body;
    var name;
    var driverid;
    var orderid = data.orderid;
    var time;

  connection.query("SELECT * FROM orders WHERE orderid= ?",[orderid],(err,result,fields)=>{

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);

        });

        if(result && result.length){
            var values=[name,driverid,orderid,time];
            console.log(result);
            res.json("Delivering by "+result[0].name +" of orderid " +result[0].orderid +" at " +result[0].time) ;
            

        }
        else{
            console.log("no")
            res.json("Order Id Not Found")
        }
    
    });
});

app.post('/driver/',(req,res,next)=>{

    var data=req.body;
    var name= data.name;
    var driverid=data.driverid;
    var orderid= data.orderid;
    var time=data.time;

    connection.query("SELECT * FROM orders WHERE driverid= ?",[driverid],(err,result,fields)=>{

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            var values=[name,driverid,orderid,time];
            console.log(result);
            res.json("Hi "+result[0].name +" Your tasks are " +result[0].orderid +" scheduled at " +result[0].time) ;
        
        }
        else{

            res.json("DriverId Not Found!! ");
        }
    
    });
});



var server=app.listen(3007,()=>{
    console.log("server is running at http://localhost:3017");
 });