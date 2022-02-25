
const express = require('express');
const app = express();
const fs = require('fs');
const { readPetsFile } = require('./util.js');

// const dataPath = "pets.json";

// app.use(express.text()) //use these for post request
// app.use(express.json())

//  catch all error handling
// app.use((req, res, next) => {
//     res.status(404).send("Not Found");
// })


app.get('/pets', (req, res)=>{
    readPetsFile((err, data)=>{
        res.send(data);
    })
});

app.get('/pets/:index', (req, res)=>{
    const index = req.params.index;
    readPetsFile((err, data)=>{
        if (data[index] === undefined){
            res.status(404).set("Content-Type", "text/plain").send('Not Found').end();
        }else{
            res.send(data[index]);
        }
    });
});

        
 

app.listen(8080, ()=>{
    console.log('server is running')
});