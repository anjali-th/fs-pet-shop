
const express = require('express');
const app = express();
const fs = require('fs');

const dataPath = "pets.json";

// app.use(express.text()) //use these for post request
// app.use(express.json())


app.get('/pets', (req, res)=>{
    fs.readFile( dataPath, 'utf-8', (err, data)=>{
        const parsedData = JSON.parse(data);
        if (err){
            res.status(500).end();
        }else{
            res.status(200).send(parsedData).end();
        }
    });
});

app.get('/pets/:index', (req, res)=>{
    const index = req.params.index;
        
    fs.readFile( dataPath, 'utf-8', (err, data)=>{
        const parsedData = JSON.parse(data);
    
        if (err){
            res.status(500).end();
        }else if (parsedData[index] === undefined ){
            res.status(404).set("Content-Type", "text/plain").send('Not Found').end();
        }else{
            res.status(200).send(parsedData[index]).end();
        }
    });
});











app.listen(8080, ()=>{
    console.log('server is running')
});