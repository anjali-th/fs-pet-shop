
const fs = require('fs');

function read(index){
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err){
            throw err;
        }
        const parsedData = JSON.parse(data);
        if (process.argv[3] === undefined){
            console.log(parsedData)
        }else if (index > parsedData.length-1 || index < 0){
            console.error('Usage: node pets.js read INDEX');
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
    
    if ( process.argv.length < 6){
        console.error('Usage: node pets.js create AGE KIND NAME');
        process.exit(1);
    }else{
        fs.readFile('./pets.json', 'utf-8', (err,data)=>{
            if (err){
                throw err
            }
            const parsedArr = JSON.parse(data);
            parsedArr.push(obj);
            const resultArray = JSON.stringify(parsedArr);
            
            fs.writeFile('./pets.json', resultArray, (err) =>{
                if (err){
                    throw err
                }
                console.log(obj);
            });  
        
        }); 
    }
}
               


const subcommand = process.argv[2];
if (subcommand === 'read'){
    read(Number(process.argv[3]));
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







