#!/usr/bin/env node

const { createReadStream, writeFile } = require('fs');
const { Writable, Transform } = require('stream');
const transformToUppercase = Transform();
const writeFileStream = Writable();

const userInput1 = process.argv[2];
const userInput2 = process.argv[3];

let outputArray = process.argv[2].split('.');
let whereAndWhatToWrite = `${userInput2}${outputArray[0]}_caps.${outputArray[1]}`;

const inputStream = createReadStream(userInput1);

if (!userInput1) {
    console.log('Usage: node streams.js [inputFile] [outputFile]');
    process.exit();
}

transformToUppercase._transform = (buffer, _, callback) => {
    callback(null, buffer.toString().toUpperCase());
};

writeFileStream._write = (buffer, _, next) => {
    writeFile(whereAndWhatToWrite, buffer, (err) => {
        if (err) throw err;
        console.log("The data to write was added to file!");
    });
    next();
};

createReadStream(userInput1).pipe(transformToUppercase).pipe(writeFileStream);