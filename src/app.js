const express = require ('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const axios = require('axios');

const fs = require ('fs');

const cron = require('node-cron');

const filemanagement = require('./funct');

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

/*app.get('/hola', (req, res)=>{
    res.send({message: 'Hola mundo!'})
})*/

/*app.get('/hola/:name', (req, res)=>{
    res.send({message: `Hola ${req.params.name}!`})
})*/






// Settings
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//Routes
app.use(require('./routes/index'));
//Static
// 404
/*app.use((req, res, next)=>{
    res.status(404).send('404 Not Found');   
})*/


// prueba
app.get('/api/answ', (req, res) =>{
    res.send(200, {products: []})
})

app.post('/api/answ', (req, res)=>{
    //res.send(200, {message: 'Datos recibidos'})
    console.log(req.body);
    let data = req.body;
    console.log(data['item'][0]['request']['url']['raw'])
    //res.send(200, {message: 'El producto se ha recibido'})

    axios.post(data['item'][0]['request']['url']['raw'], {
        "id": "dcrtime cli",
        "digests":[
            "d412ba345bc44fb6fbbaf2db9419b648752ecfcda6fd1aec213b45a5584d1b13"
        ]
    })
    .then(res =>{
        let resstatus = res['data']['results'];
        console.log(res);
        console.log(resstatus);
    })
    .catch(error => {
        console.error(error)
    })

})


app.post('/api/answ2', (req, res)=>{
    //console.log(req.body);
    //let data = req.body;
    //console.log(data['item'][0]['request']['url']['raw'])
    //let regjson = filemanagement.pushreg(req);
    const {email, titulo, size, digestFirmed, digest} = req.body;

    if(!email || !digestFirmed) {
        res.status(400).send('Faltan datos');
        return;
    }
    let newreg = {
        email,
        titulo,
        size,
        digestFirmed,
        digest
    }

    let regjson = filemanagement.pushreg(newreg);
    console.log(regjson);
    /*let comparedatFile = filemanagement.comparejson(newreg);
    console.log(comparedatFile);

    if(comparedatFile){
        console.log('pru');
        let regjson = filemanagement.pushreg(newreg);    
    }*/
    

    //console.log(req.body);
    //res.send('received');
    //filemanagement.readjson2(newreg);

})

cron.schedule('*/15 * * * *', () => {
    console.log('holi');
    fs.readFile('data.json', 'utf-8', (err, dataAct) =>{
        if(err){
            console.log('erro:', err);
        } else {
            var compldataAct = JSON.parse(dataAct);
            dlenAct = compldataAct.length;

            for(let i=0; i<compldataAct.length; i++){

                setTimeout(()=>{

                    axios.post("https://time-testnet.decred.org:59152/v2/timestamp/batch", {
                        "id": "dcrtime cli",
                        "digests":[
                            compldataAct[i].digestFirmed
                        ]
                    })
                    .then(res =>{
                        let resstatus = res['data']['results'];
                        //console.log(res);
                        console.log(resstatus);
                    })
                    .catch(error => {
                        console.error(error)
                    })

                }, 500);
            }
        }
    })
})


/*let prueba = filemanagement.readjson();
console.log(prueba);*/

/*let prueba2 = filemanagement.pushreg('email: kikegs');
console.log(prueba2);*/


module.exports = app;


