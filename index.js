#!/usr/bin/env node

import Yargs from 'yargs';
import fs from 'fs';
import chalk from 'chalk';
import parse from './modules/parser.js';

const options = Yargs(process.argv.slice(2))
 .usage("Usage: -file <file location>")
 .option("file", { alias: "f", describe: "The file to convert", type: "string", demandOption: true })
 .option("outDirectory", { alias: "outdir", describe: "Output location", type: "string", demandOption: true })
 .option("viceversa", { alias: "vv", describe: "Should it convert .json to .ini instead of .ini to json?", type: "string", demandOption: false })
 .argv;

console.log(chalk.blue("Converting file..."));
fs.readFile('./' + options.file, 'utf8', (err, data) => {
    if (err) {
        console.log(chalk.red("Error: " + err));
        return;
    }

    let outLocation = options.outLocation;
    const lines = data.split('\n');
    const convertedData = JSON.stringify(parse(lines));
    if (convertedData[1] == 500) { console.log(chalk.red("Parser error! Log: " + convertedData[0])) }
    if (convertedData[1] == 200) {
        console.log(chalk.green("File converted successfully!"));
        console.log(chalk.blue("Writing to file..."));
        fs.writeFile('./examples/test.json', toString(convertedData[0]), function(err){
            if (err){
                console.log(chalk.red("File Write Error: " + err));
                return;
            }
            console.log(chalk.green("File written successfully!"));
        });
    }
});