export default function parse(lines) {
    let convertedData = JSON.stringify(`{}`);
    console.log(lines)

    try {
        for(var i = 0; i < lines.length - 1; i++){
            // Line is a comment, therefore should be ignored by the parser
            if (lines[i].startsWith(';')){ console.log('Comment found, skipping'); continue; }
            // Line is a section, therefore should be a new object
            if (lines[i].startsWith('[')){
                console.log("Header found, parsing...");
                const raw_line = lines[i]
                const regex = /[\[\]']+/g
                
                const replace = raw_line.replace(regex, '')
    
                convertedData[replace] = {}
                continue;
            }
        }
        return [convertedData, 200];
    } catch(err) {
        return [err, 500];
    }
}