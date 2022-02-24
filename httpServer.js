
const http = require('http');
const fs = require('fs');

const port = 8080;
const dataPath = "pets.json";
const petRegExp = /^\/pets\/(.*)$/;

const server = http.createServer(function(req, res) {
    if (req.method === 'GET' && petRegExp.test(req.url)){
        const index = req.url.match(petRegExp)[1]; 
        
        fs.readFile(dataPath, 'utf-8', (err, data)=>{
            const parsedData = JSON.parse(data);
            if (err){
                res.statusCode = 500;
                res.end();
            }
            if(parsedData[Number(index)]=== undefined){
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.write('Not Found');
                res.end();
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(parsedData[index])); // need to stingify the parsed data first;
                res.end();
            }
        });
    }else if (req.method === 'GET' && req.url === '/pets'){
        fs.readFile(dataPath, 'utf-8', (err, data)=>{
            if (err){
                res.statusCode = 500;
                res.end();
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.write(data);
                res.end();

            }
        });
    }

    
});
                

server.listen(port);
