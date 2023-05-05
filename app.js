const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const ejs = require('ejs');
const querystring = require('querystring');
const { getCustomerByEmail, createCustomer, updateCustomer } = require('./customerService.js')
const { getDBClient, closeDBConnection } = require('./dbHandler.js')
const port = process.env.PORT;

const server = http.createServer(async function(req, res){

	if(req.method === "POST"){

		var client;

		try {

			let body = '';

			req.on('data', chunk => {
				body += chunk;
			});

			await new Promise((resolve, reject) => {
		        req.on('end', resolve);
		        req.on('error', reject);
	      	});

			const formData = querystring.parse(body);

			var message = '';

			client = getDBClient();

			const customer = await getCustomerByEmail(client, formData.email);

			if(customer){
				//console.log('customer exists');
				await updateCustomer(client, customer._id, formData);
				message = `Thank you, <span style="font-weight: bold;">${formData.firstname}</span>, for your update. Your customer id is #${customer.customerId}.`;

			}
			else{
				var customerId = await createCustomer(client, formData)
				message = `Thank you, <span style="font-weight: bold;">${formData.firstname}</span>. Your customer id is #${customerId}.`
				//console.log(customerId);

			}


			fs.readFile("reward.html", "UTF-8", function(err, html){
				if (err) {
					res.statusCode = 500;
					res.setHeader('Content-Type', 'text/plain');
					res.end('Internal Server Error');
				} else {
					const renderedHtml = ejs.render(html, { message });
					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(renderedHtml);
				}
			});

		}
		catch (err){
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write('Internal Server Error');
			res.end();

		}
		finally {
			closeDBConnection(client);
		}
	}
	else if(req.method == "GET"){

		try {

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

		}
		catch (err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write('Internal Server Error');
			res.end();
		}
	}
	else {
		res.writeHead(404);
		res.write('Error: File not found');
	}
	

})

server.listen(port, function(error){
	if(error){
		console.log('Something went wrong', error);
	} else{
		console.log('server is listening on port', + port);
	}
})