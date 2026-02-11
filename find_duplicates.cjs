const fs = require('fs');
const path = require('path');

const locales = ['ar.ts', 'en.ts'];

locales.forEach(locale => {
    const filePath = path.join(__dirname, 'src/lib/locales', locale);
    console.log(`\nChecking file: ${filePath}`);

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const keyRegex = /^\s*'([^']+)'\s*:/;
    const keys = {};

    console.log(`Total lines: ${lines.length}`);

    lines.forEach((line, index) => {
        const match = line.match(keyRegex);
        if (match) {
            const key = match[1];
            if (!keys[key]) {
                keys[key] = [];
            }
            keys[key].push(index + 1);
        }
    });

    let duplicateCount = 0;
    for (const key in keys) {
        if (keys[key].length > 1) {
            console.log(`Duplicate key found in ${locale}: "${key}" on lines ${keys[key].join(', ')}`);
            duplicateCount++;
        }
    }

    if (duplicateCount === 0) {
        console.log(`No duplicate keys found in ${locale}.`);
    } else {
        console.log(`Total duplicates in ${locale}: ${duplicateCount}`);
    }
});
