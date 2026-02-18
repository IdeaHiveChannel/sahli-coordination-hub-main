
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles('./src/pages');

files.forEach(file => {
  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace gradient colors
  content = content.replace(/from-slate-950/g, 'from-white');
  content = content.replace(/via-slate-950/g, 'via-white');
  content = content.replace(/to-slate-950/g, 'to-white');
  
  // Replace remaining bg-slate-950 (e.g. bg-slate-950/40 was already replaced if it matched bg-slate-950/40, but what if it was bg-slate-950 without opacity?)
  // We should be careful.
  content = content.replace(/bg-slate-950/g, 'bg-white');
  
  // Also clean up any 'bg-white' that might have been 'bg-slate-950' where we want 'bg-slate-900' (like decorative elements?)
  // But I already handled bg-slate-950/5 -> bg-slate-900/5 in previous run.
  // Wait, if I run this script again, it might change 'bg-slate-900/5' if I am not careful?
  // No, I am searching for 'slate-950'.
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
