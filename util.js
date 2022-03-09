
const fs = require ('fs');

function readPetsFile(callback){
    fs.readFile('pets.json', 'utf-8', (err, data)=>{
        if (err){
            callback(err);
        }else{
            const parsedData = JSON.parse(data);
            callback(null, parsedData);
        }
    })
};

// function writePetsFile(callback){
//     fs.writeFile('pets.json', JSON.stringify(readPetsFile(data)), (err)=>{
//         if (err){
//             callback(err);
//         }else{
//             callback(null, data);
//         }
//     })
// }

module.exports = { readPetsFile };