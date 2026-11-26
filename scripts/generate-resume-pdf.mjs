import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const html = path.resolve('resume/Shubh_Shukla_Resume.html');
const pdf = path.resolve('public/Shubh_Shukla_Resume.pdf');
const rootPdf = path.resolve('Shubh_Shukla_Resume.pdf');
const userDir = path.resolve('.tmp_chrome_' + Date.now());

console.log('Rendering PDF from:', html);
console.log('Target output:', pdf);

const cmd = `"${chrome}" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer --run-all-compositor-stages-before-draw --user-data-dir="${userDir}" --print-to-pdf="${pdf}" "file:///${html.replace(/\\/g, '/')}"`;

execSync(cmd, { stdio: 'inherit' });

if (fs.existsSync(pdf)) {
  fs.copyFileSync(pdf, rootPdf);
  console.log('Successfully generated resume PDF!');
  console.log('Size:', fs.statSync(pdf).size, 'bytes');
  console.log('Last modified:', fs.statSync(pdf).mtime);
} else {
  console.error('PDF file was not created!');
}

try {
  fs.rmSync(userDir, { recursive: true, force: true });
} catch (e) {}

