const fs = require ('fs');
//var mystream = require('fs').createReadStream('')
//var eachreg = [];
/*var obj = {
    table: []
};*/
const lineReader = require('line-reader');
const lineReader2 = require('readline');

const readjson = fs.readFile('data.json', 'utf-8', (err, data) => {
    if(err){
        console.log('error:', err);
    } 
        /*var series = JSON.parse(data);
    console.log(series.length);
        return {series};*/
    console.log(data);
    return JSON.parse(data);
            
})
//const books = readjson;


module.exports.comparejson = (info) => {

    console.log('holiiii');

    var flag = 0;
    var seriesdp = [];
    /*seriesdp = fs.readFile('data.json', 'utf-8', (err, data) =>{
        if(err){
            console.log('error:', err);
        } else {
            var seriesd = JSON.parse(data);
            console.log(seriesd.length); 
            return seriesd;       
            
        }
    });*/
    /*var seriesd = fs.readFile('data.json', 'utf-8', (err, data) => {
        if(err){
            console.log('error:', err);
            return;
        } else{
            return JSON.parse(data);
        }
        
    });*/


    var infocomp = info;
    //console.log(books.length);
    /*for(let i=0; i<readjson.length; i++){
        console.log('entre al for');
        if(seriesd[i].email == infocomp.email && seriesd[i].digestFirmed == infocomp.digestFirmed){
            return false;
        } else{
            flag = true;
            console.log('true');
        }
    }*/
    for(var i in books){
        console.log('entre al puto for');
    }
}






module.exports.readjson2 = (emandhash) => {
    /*var mystream = fs.createReadStream('data.json');
    mystream.on('data', (data) =>  {
        console.log(data.toString());
    })*/
    /*lineReader.open('data.json', (err, reader) => {
        if (err) throw err;
        if (reader.hasNextLine()){
            reader.nextLine((err, line) => {
                try{
                    if(err) throw err;
                    if (emandhash == line){
                        console.log('te encontré perroo');
                    }
                    console.log(line + '/');
                } finally{
                    reader.close((err) => {
                        if(err) throw err;
                    })
                }
            })
        }
        else{
            reader.close((err) => {
                if (err) throw err;
            })
        }
    })*/
    lineReader2.createInterface({
        input: fs.createReadStream('data.json')
    })

    lineReader2.on('line', (line) => {
        line = line.trim();


    })
}

var rflag = false;
var dlen = 0;
var dlenAct = 0;
module.exports.pushreg = (info) => {
    var flag = false;
    
    fs.readFile('data.json', 'utf-8', (err, data) =>{
        if(err){
            console.log('error:', err);
        } else {
            var compldata = JSON.parse(data);
            dlen = compldata.length;     
            for(let i=0; i<compldata.length; i++){
                console.log('entre al for');
                if(compldata[i].email == info.email && compldata[i].digestFirmed == info.digestFirmed){
                    console.log('entre al if');
                    flag = true;
                }
            }
            const eachreg = JSON.parse(data);
            eachreg.push(info);
            if(!flag){
                fs.writeFile('data.json', JSON.stringify(eachreg), function(err){
                    if(err){
                        return console.log(err);
                    }
                    rflag = true; 
                })
            }
        }
    });

    fs.readFile('data.json', 'utf-8', (err, dataAct) =>{
        if(err){
            console.log('erro:', err);
        } else {
            var compldataAct = JSON.parse(dataAct);
            dlenAct = compldataAct.length;
        }
    })

    if(dlenAct>dlen){
        return true;
    }

}

writejson: () => {


}

