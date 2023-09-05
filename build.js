import exec from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
import buildRH from './buildFiles/rhbuild.js';
console.log(chalk.green('Setting up Files and folders'));
if (fs.existsSync('./src/public/js/dynamic/')) {
    if (fs.existsSync('./src/public/js/dynamic/dynamic.config.js')) {
        fs.mkdirSync('./tmp');
        fs.renameSync('./src/public/js/dynamic/dynamic.config.js', './tmp/dynamic.config.js');
        fs.rmdirSync('./src/public/js/dynamic/', { recursive: true });
    }
    else {
        fs.rmdirSync('./src/public/js/dynamic/', { recursive: true });
    }
}
console.log(chalk.red('Done with Files and folders'));
console.log(chalk.green('Starting Dynamic build'));
exec.execSync('npm i', { cwd: './dynamic/', stdio: 'inherit' });
exec.execSync('npm run build:prod', { cwd: './dynamic/', stdio: 'inherit' });
console.log(chalk.green('Dynamic build complete'));
console.log(chalk.magenta('Moving files'));
fs.rmSync('./dynamic/dist/dynamic.config.js');
fs.renameSync('./dynamic/dist/', './src/public/js/dynamic/');
fs.renameSync('./tmp/dynamic.config.js', './src/public/js/dynamic/dynamic.config.js');
fs.rmdirSync('./tmp');
console.log(chalk.bgGreen.black('Dynamic build complete'));
console.log(chalk.green('Starting RH Browser build'));
buildRH();
