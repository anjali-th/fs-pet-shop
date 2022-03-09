const express = require ('express');
const app = express();
const fs = require ('fs');
const { parse } = require('path');

const dataPath = 'pets.json';

app.use(express.json());
app.use(express.text());


app.get('/pets', (req, res)=>{
    fs.readFile(dataPath, 'utf-8', (err, data)=>{
        const parsedData = JSON.parse(data);
        res.send(parsedData);
    })
})

app.get('/pets/:index', (req, res)=>{
    const index = req.params.index;  // or const { index } = req.params ;
    fs.readFile(dataPath, 'utf-8',(err, data)=>{
        const parsedData = JSON.parse(data);
        if (err){
            res.status(500).send();
        }
        if (!parsedData[index]){
            res.status(404).set("Content-Type", "text/plain").send('Not Found');
        }else{
            res.send(parsedData[index]);
        }
    });
});

app.post('/pets', (req, res)=>{

    const { age, kind, name } = req.body;

    if (!age || !kind || !name){
        res.status(400).send('Bad Request');
        return;
    }

    const newPet = { age, name, kind };
    
    fs.readFile(dataPath, 'utf-8', (err, data)=>{
        const parsedData = JSON.parse(data);
        parsedData.push(newPet);

        fs.writeFile(dataPath, JSON.stringify(parsedData), (err)=>{
            if (err){
                res.status(500).send();
            }else{
                res.status(201).send(newPet);
            };
        });

    });

});

app.patch('/pets/:index', (req, res)=>{
    const index = req.params.index;  // or const { index } = req.params ;
    const patchBody = req.body;

    if (!patchBody.kind && !patchBody.name && !patchBody.age){
        res.status(400).send('Bad request');
    }else {
        fs.readFile(dataPath, 'utf-8', (err, data)=>{
            const parsedData = JSON.parse(data);
            if (err){
                res.status(500).send();
            }else if (!parsedData[index]){
                res.status(404).set("Content-Type", "text/plain").send('Not Found');
            }else{
                const pet = parsedData[index];
                const updatedPet = Object.assign(pet, patchBody);
                parsedData.pop();
                parsedData.push(updatedPet);
    
                fs.writeFile(dataPath, JSON.stringify(parsedData), (err)=>{
                    if (err){
                        res.status(500).send();
                    }else{
                        res.status(200).send(parsedData[index]);
                    }
                })
            }
        });

    };

});

app.delete('/pets/:index', (req, res)=>{
    const index = req.params.index;

    fs. readFile(dataPath, 'utf-8', (err, data)=>{
        const parsedData = JSON.parse(data);
        if (err){
            res.status(500).send();
        }else if(!parsedData[index]){
            res.status(404).set("Content-Type", "text/plain").send('Not Found');
        }else{
            res.status(200).send(parsedData[index]);
            parsedData.splice(index,1);

            fs.writeFile(dataPath, JSON.stringify(parsedData), (err)=>{
                if (err){
                    res.status(500).send();
                }
            })
        }
    })
});







app.listen(8000, () =>{
    console.log('server is running');
});
