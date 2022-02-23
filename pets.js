
const fs = require('fs');

function read(index){
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err){
            throw err;
        }
        const parsedData = JSON.parse(data);
        if (process.argv.length < 4){
            console.log(parsedData)
        }else if (index > parsedData.length-1 || index < 0){
            console.log('Usage: node pets.js read INDEX');
            process.exit(1);
        }else{
            console.log(parsedData[index]);
        }
    });
}


function create(age, kind, name){
    const obj = {};
    obj.age = Number(age);
    obj.kind = kind;
    obj.name = name;
    
    fs.readFile('./pets.json', 'utf-8', (err,data)=>{
        if (err){
            throw err
        }
        const parsedArr = JSON.parse(data);
        parsedArr.push(obj);
        const resultArray = JSON.stringify(parsedArr);
        
        if ( process.argv.length < 6){
            console.log('Usage: node pets.js create AGE KIND NAME');
            process.exit(1);
        }else{
            fs.writeFile('./pets.json', resultArray, (err) =>{
                if (err){
                    throw err
                }
                console.log('it worked');
            });  
        
        }   
    })
}


const subcommand = process.argv[2];
if (subcommand === 'read'){
    read(process.argv[3]);
}else if (subcommand === 'create' ){
    create(process.argv[3], process.argv[4], process.argv[5]);
}else if (subcommand === 'update'){
    console.log('updating file');
}else if (subcommand === 'destroy'){
    console.log('destroying file');
}else{
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1);
}






