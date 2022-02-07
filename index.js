#!/usr/bin/env node

import Yargs from 'yargs';
import fs from 'fs';
import chalk from 'chalk';
import parse from './modules/parser.js';

const options = Yargs(process.argv.slice(2))
 .usage("Usage: -file <file location>")
 .option("file", { alias: "f", describe: "The file to convert", type: "string", demandOption: true })
 .option("outDirectory", { alias: "outdoc", describe: "Output location", type: "string", demandOption: false })
 .option("viceversa", { alias: "vv", describe: "Should it convert .json to .ini instead of .ini to json?", type: "string", demandOption: false })
 .argv;

console.log(chalk.blue("Converting file..."));
fs.readFile(options.file, 'utf8', (err, data) => {
    if (err) {
        console.log(chalk.red("Error: " + err));
        return;
    }

    let outLocation = options.outLocation;
    const lines = data.split('\n');
    const convertedData = parse(lines);
    console.log(lines)
    if (!convertedData[1] == 200) { console.log(chalk.red("Parser error!" + convertedData[0])) }
    console.log(chalk.green("File converted successfully!"));
});