const fs = require('fs');

const removeLines = (data, lines = []) => {
    return data
        .split('\n')
        .filter((val, idx) => lines.indexOf(idx) === -1)
        .join('\n');
}

let fileName = 'dist/app.js';
fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) throw err;

    // remove the first line and the 5th and 6th lines in the file
    let t = removeLines(data, [2]);
    t= t.replaceAll("p5_1.", "p5.")
    fs.writeFile(fileName, t, 'utf8', function(err) {
        if (err) throw err;
        console.log("the lines have been removed.");
    });
})