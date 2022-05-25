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
        
        filewalker("../reporteFinal_Kraken", async function(err, archivosCompare){
          if(err){
              throw err;
          }
          for(let i=0; i < archivosCompare.length -1; i++) {
            let FileBefore = archivosCompare[i];
            let FileAfter = archivosCompare[i].replace('Ghost_1','Ghost_2')
            
            const data = await compareImages(
              fs.readFileSync(FileBefore),
              fs.readFileSync(FileAfter),
              options
            );
            resultInfo[b] = {
              isSameDimensions: data.isSameDimensions,
              dimensionDifference: data.dimensionDifference,
              rawMisMatchPercentage: data.rawMisMatchPercentage,
              misMatchPercentage: data.misMatchPercentage,
              diffBounds: data.diffBounds,
              analysisTime: data.analysisTime
            }
            let directorio = archivosCompare[i].split('/')[archivosCompare[i].split('/').length -3]  +  '/' + archivosCompare[i].split('/')[archivosCompare[i].split('/').length -2] +  '/';            
            let archivoCompare = archivosCompare[i].replace('.png','').replace('Ghost_1_','') + `_compare-${b}.png`;
            
            fs.writeFileSync(archivoCompare, data.getBuffer());
            fs.copyFileSync('./results/index.css', '../reporteFinal_Kraken/' + directorio + 'index.css');
            fs.writeFileSync('../reporteFinal_Kraken/' + directorio + 'report.html', createReport(datetime, resultInfo, FileBefore, FileAfter, archivoCompare));
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


  function browser(b, info, FileBefore, FileAfter, fileCompare){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src=${FileBefore} id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src=${FileAfter} id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src=${fileCompare} id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo, FileBefore, FileAfter, fileCompare){
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
                ${config.browsers.map(b=>browser(b, resInfo[b], FileBefore, FileAfter, fileCompare))}
            </div>
        </body>
    </html>`
}
(async ()=>console.log(await executeTest()))();