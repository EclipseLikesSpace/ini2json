export default function parse(lines) {
    let convertedData = {};
    console.log(lines.length - 1);

    try {
        for(var i = 0; i < lines.length - 1; i++){
            console.log('Iteration: ' + i)
            // Line is a comment, therefore should be ignored by the parser
            if (lines[i].startsWith(';') || lines[i].startsWith('#')){ console.log('Comment found, skipping'); }
            // Line is a section, therefore should be a new object
            if (lines[i].startsWith('[')){
                console.log("Header found, parsing...");
                const raw_line = lines[i]
                
                const replace = raw_line.replace(/[\[\]']+/g, '');
    
                convertedData[toString(replace)] = {init: "test"};
            }
        }

        return [convertedData, 200];
    } catch(err) {
        return [err, 500];
    }
}