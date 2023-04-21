const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const port = 3000;

const server = http.createServer(function(req, res){


	if(req.url === "/"){
	    fs.readFile("index.html", "UTF-8", function(err, html){

	        res.writeHead(200, {"Content-Type": "text/html"});
	        res.end(html);
	    });
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, '', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    }else if(req.url.match("\.js")){
        var cssPath = path.join(__dirname, '', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/js"});
        fileStream.pipe(res);

    }else if(req.url.match("\.assets")){
        var imagePath = path.join(__dirname, '', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }else{
    
	    var q = url.parse(req.url, true);
		var filename = "."+ q.pathname;
		res.writeHead(200, { 'Content-Type': 'text/html' });

		fs.readFile(filename, function(error, data) {
			if(error) {
				res.writeHead(404);
				res.write('Error: File not found');
			} else {
				res.write(data);
			}
			res.end();
		})
    }
	

})

server.listen(port, function(error){
	if(error){
		console.log('Something went wrong', error);
	} else{
		console.log('server is listening on port', + port);
	}
})