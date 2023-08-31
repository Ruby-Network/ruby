import path from 'path'
import fs from 'fs'
const __dirname = path.resolve();
import chalk from 'chalk';
import createLogger from 'progress-estimator';
import * as sass from 'sass';
async function compile() {
    const logger = createLogger()
    async function compileSCSS() {
        fs.readdirSync(path.join(__dirname, '/src/public/sass')).forEach((file) => {
            if (file.endsWith('.scss')) {
                let test = sass.compile(path.join(__dirname, `/src/public/sass/${file}`), { style: 'compressed' });
                fs.writeFileSync(path.join(__dirname, `/src/public/css/${file.replace('.scss', '.css')}`), test.css);
            }
        });
    }
    await logger(compileSCSS(), 'Compiling SCSS');
}
export default compile;
