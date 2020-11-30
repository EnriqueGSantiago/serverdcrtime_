const app = require('./app');


async function main (){
    await app.listen(8080);
    console.log('Server on port 8080');
}


main();


