
const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    database: 'petshop',
});

app.use(express.json())

app.get('/pets', (req, res)=>{
    pool.query('SELECT * FROM pets', (err, result)=>{
        if (err){
            res.sendStatus(500);
        }
        res.status(200).send(result.rows);
    })
})

app.get('/pets/:petId', (req, res)=>{
    const { petId } = req.params;
    pool.query('SELECT * FROM pets WHERE id = $1 ', [petId], (err, result)=>{
        if (err){
            res.sendStatus(500);
        }else if(!result.rows[0]){
            res.set('Content-Type', 'text/plain').sendStatus(404);
        }else{
            res.status(200).send(result.rows[0]);
        }
    });
})

app.post('/pets', (req, res)=>{
    const { age, name, kind } = req.body;

    if (!age || !name || !kind ){
        res.sendStatus(400);
        return;
    }
    pool.query('INSERT INTO pets (age, name, kind) VALUES ($1, $2, $3) RETURNING *;', [age, name, kind] , (err, result)=>{
        if (err){
            res.sendStatus(500);
        }
        res.status(201).send(result.rows[0]);
    });
});

app.patch('/pets/:petId', (req, res)=>{
    const { age , name , kind } = req.body;
    const { petId } = req.params;
    const query = `UPDATE pets SET
    age = COALESCE($1, age),
    name = COALESCE($2, name),
    kind = COALESCE($3, kind)
    WHERE id = $4 RETURNING *;`;

    if (!age && !name && !kind){
        res.sendStatus(400);
    }else{
        pool.query( query , [age, name, kind, petId], (err, result)=>{
            if (err){
                res.sendStatus(500);
            }else if (!result.rows[0]){
                res.set('Content-Type', 'text/plain').sendStatus(404);
            }else{
                res.send(result.rows[0]);
            }
        })
    }
});

app.delete('/pets/:petId', (req, res)=>{
    const { petId } = req.params;

    pool.query( 'DELETE FROM pets WHERE id = $1 RETURNING * ', [petId], (err, result)=>{
        if (err){
            res.sendStatus(500);
        }else if(!result.rows[0]){
            res.set('Content-Type', 'text/plain').sendStatus(404);
        }else{
            res.send(result.rows[0]);
        }
    })
})
                   

//  catch all error handling
app.use((req, res, next) => {
    res.status(404).set ('Content-Type', 'text/plain').send("Not Found");
    next();
})
        
 

app.listen(8000, ()=>{
    console.log('server is running')
});

module.exports = app;