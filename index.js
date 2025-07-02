#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
const dir = process.argv[2]

if(!dir){
    console.log("please enter full folder path \ni.e., node fileOrg.js /path/to/folder\n")
    process.exit(1)
}
if(!fs.existsSync(dir)){
    console.log("Incorrect path given")
     process.exit(1)
}else{
console.log("Entered", dir)
}
console.log("📂 organizing",dir)
const files = fs.readdirSync(dir)
files.forEach(file => {
    const fullPath = path.join(dir,file)
    const stat = fs.statSync(fullPath)
    if(stat.isFile()){//to check if the current entity is file
        const ext = path.extname(file).toLowerCase()
        const type = getFolderName(ext)
        const subFolder = path.join(dir,type)
        if(!fs.existsSync(subFolder)){
            fs.mkdirSync(subFolder)
        } 
        const destPath = path.join(subFolder,file)
        
        if(fs.existsSync(destPath)){
            let counter = 1;
            let newDestPath = destPath;

            while (fs.existsSync(newDestPath)) {
            const { name, ext } = path.parse(file);
            const newName = `${name}(${counter})${ext}`;
            newDestPath = path.join(subFolder, newName);
            counter++;
            }

            fs.renameSync(fullPath, newDestPath);
            console.log(`✅ Moved ${file} → ${path.basename(newDestPath)}`);
            return
        }

        fs.renameSync(fullPath,destPath)
        console.log("✅ file moved")
    }
    else{
        return
    }
})
function getFolderName(ext) {
  const map = {
    '.jpg': 'Images',
    '.jpeg': 'Images',
    '.png': 'Images',
    '.gif': 'Images',
    '.mp3': 'Music',
    '.wav': 'Music',
    '.mp4': 'Videos',
    '.mov': 'Videos',
    '.pdf': 'Documents',
    '.docx': 'Documents',
    '.txt': 'Documents',
    '.js': 'Code',
    '.py': 'Code',
    '.zip': 'Archives',
    '.rar': 'Archives'
  };

  return map[ext] || 'Others';
}