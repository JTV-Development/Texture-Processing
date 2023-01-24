# Texture Processing

This script will take a folder of .glb assets, strip them of their images/textures, and output the new .glbs into a folder along with all of those images. 

## Running the program
Firsly, run `npm install` (use nodeJs version 16 or higher)


In the command line you can run as 
```shell
node index.js --inputFolder=relative/path/to/glb/files --outputFolder=relative/path/to/desired/output/location
```

For example, to process the example included in the `/cave` folder you can run 
```shell
node index.js --inputFolder=cave --outputFolder=processedCave
```

If no output folder is specified, the results will be placed in `./processedFiles`

Thanks for using our Texture Processing system!  