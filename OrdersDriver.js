var express = require('express');
const app = express();
var mysql = require ('mysql');

var bodyparser = require('body-parser');

var connection = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:'driverinfo'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/orders/',(req,res,next)=>{

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
            res.json("DriverId Found");
        }
        else{

            res.json("DriverId Not Found!! ");
        }
    
    });
});
    app.listen('3002', ()=> {
        console.log('Server started on port 3002');
    }); 