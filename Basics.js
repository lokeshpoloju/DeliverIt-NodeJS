const http=require('http');
console.log("Running port on http:localhost:3000");
http.createServer(function(req,res)
    {
    res.write("<h1> First Program. </h1>");
    res.end();
}).listen(3000);