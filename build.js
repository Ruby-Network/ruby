import exec from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
import buildRH from './buildFiles/rhbuild.js';
buildRH();
