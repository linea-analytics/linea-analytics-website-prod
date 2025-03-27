function translateData(language, csvData) {

    if (!['eng', 'ita', 'de'].includes(language)) {
        console.error(`Unsupported language: ${language}`);
        return;
    }

    const rows = csvData.trim().split('\n');
    const headers = rows[0].split(',');

    const classIndex = headers.indexOf('html-class');
    const langIndex = headers.indexOf(language);

    if (classIndex === -1 || langIndex === -1) {
        console.error('CSV missing required columns');
        return;
    }

    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(',');
        const className = cols[classIndex];
        const textValue = cols[langIndex];

        if (className && textValue) {
            const elements = document.getElementsByClassName(className);
            for (const el of elements) {
                el.textContent = textValue;
            }
        }
    }
}

function translateContent(language) {
    fetch('./js/lang-map.csv')
        .then(res => res.text())
        .then(csvData => {
            translateData(language, csvData);
        });
}