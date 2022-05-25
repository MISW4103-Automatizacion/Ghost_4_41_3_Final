const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');

const { viewportHeight, viewportWidth, browsers, options } = config;

async function executeTest(){
    if(browsers.length === 0){
      return;
    }
    let resultInfo = {}
    let datetime = new Date().toISOString().replace(/:/g,".");
    for(b of browsers){
        if(!b in ['chromium']){
            return;
        }
                
        filewalker("../imagenes1/screenshots", async function(err, archivos){
          if(err){
              throw err;
          }
          
          for(let i = 0; i < archivos.length -1; i++) {       
                        
            let directorio = archivos[i].split('/')[archivos[i].split('/').length-1].replace('(','').replace(')','').replace(' ','').replace('.png','');            
            
            if(fs.existsSync('../reporteFinal_Cypress/' + directorio)){
              fs.mkdirSync('../reporteFinal_Cypress/' + directorio);
            }
            
            directorio = '/' + directorio + '_' + i;

            console.log(directorio)
            
            fs.mkdirSync('../reporteFinal_Cypress/' + directorio);
  
            let nombreArchivo = 'ghost1_' + archivos[i].split('/')[archivos[i].split('/').length-1].replace('(','').replace(')','').replace(' ','');
                        
            
            fs.copyFile(archivos[i], '../reporteFinal_Cypress/' + directorio + '/' + nombreArchivo, function (err) {
              if (err) return console.error(err)
              console.log('success!')
            });
            let nombreArchivo2 = 'ghost2_' + archivos[i].replace('imagenes1', 'imagenes2').split('/')[archivos[i].replace('imagenes1', 'imagenes2').split('/').length-1].replace('(','').replace(')','').replace(' ','');
            
            fs.copyFile(archivos[i].replace('imagenes1', 'imagenes2'), '../reporteFinal_Cypress/' + directorio + '/' + nombreArchivo2, function (err) {
              if (err) return console.error(err)
              console.log('success!')
            });            
          }          
        });
    }
    


    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
  }

  function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]                    
                    //results.push(file);

                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
  };


  function browser(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${config.browsers.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}
(async ()=>console.log(await executeTest()))();