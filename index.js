const gltfPipeline = require("gltf-pipeline");
const fsExtra = require("fs-extra");
const minimist = require('minimist');
const path = require('path');
const fs = require('fs')


const args = minimist(process.argv.slice(2));
const inputDirectory = args.inputFolder;
let outputDirectory = args.outputFolder;

if(outputDirectory){
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
    }
} else {
    if (!fs.existsSync('processedFiles')) {
        fs.mkdirSync('processedFiles');
    }
    outputDirectory = 'processedFiles'
}


if(inputDirectory && fs.existsSync(inputDirectory)) {
    const directoryFiles = fsExtra.readdirSync(inputDirectory);

    const files = directoryFiles.filter(file => path.extname(file) === '.glb');
    const processGlb = gltfPipeline.processGlb;
    const options = {
        separateTextures: true,
    };
    
    files.forEach((file)=> {
            
        const glb = fsExtra.readFileSync(path.join(inputDirectory,file));
    
        processGlb(glb,options).then((results)=>{
            const resources = results.separateResources;
            for (const relativePath in resources) {
                if (resources.hasOwnProperty(relativePath)) {
                const resource = resources[relativePath];
                fsExtra.writeFileSync(path.join(outputDirectory,relativePath), resource);
                }
            }
            const glb = results.glb;
            fsExtra.writeFileSync(path.join(outputDirectory,file), glb);
    
        });
    
    });
      
    
    console.log("Enjoy your texture-split glb files!!")
} else if(inputDirectory !== null && inputDirectory !== undefined && !fs.existsSync(inputDirectory)) {
    console.log("Input directory does not exist")
} else {
    console.log("You must specify an input directory for your .glb files \n For example: node index.js --inputFolder='cave' ")
}