export async function readFromJSONObjectFile(filePath) {
    try {
        const resolvedFilePath = path.resolve(__dirname, filePath);
        if (fs.existsSync(resolvedFilePath)) {
            // file exists
            // read the file
            return new Promise((resolve, reject) => {
                if (path.extname(resolvedFilePath) !== ".json") reject("File not a JSON file");
                const rawJSONString = fs.readFileSync(resolvedFilePath);
                resolve(rawJSONString.toString());
            });
        } else {
            return new Promise((resolve, reject) => {
                resolve("")
            });
        }
    } catch (err) {
        throw err;
    }
}

export function isJsonString(str) {
    try {
        const o = JSON.parse(str);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return true;
        }
    }
    catch (e) { }

    return false;
}

export async function writeToJSONFile(filePath, data, resolve) {
    try {
        console.log('WRITING');
        console.log(data);
        const resolvedFilePath = resolve ? path.resolve(__dirname, filePath) : filePath;
        return new Promise((resolve, reject) => {
            fs.writeFileSync(resolvedFilePath, JSON.stringify(data, null, 4));
            resolve(true);
        })
    } catch(err) {
        throw err;
    }
}