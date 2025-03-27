function translateData(language, csvData) {

    if (!['eng', 'ita', 'de'].includes(language)) {
        console.error(`Unsupported language: ${language}`);
        return;
    }

    const rows = csvData.trim().split('\n');
    const headers = rows[0]
    .trim()          // remove trailing carriage return/spaces
    .split(',')
    .map(h => h.trim()); // remove any internal spacing

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

fetch('https://api.ipregistry.co/?key=tryout')
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("Country data:", data);

        // Extract the country code
        const countryCode = data.location?.country?.code || null;
        console.log("Detected country code:", countryCode);

        // Example translation logic
        if (countryCode === 'IT') {
            translateContent('ita');
        } else if (countryCode === 'DE') {
            translateContent('de');
        } else {
            translateContent('eng');
        }
    })
    .catch(error => {
        console.error("Failed to fetch location from ipregistry:", error);
        // Fallback logic, default to English, for example
        translateContent('eng');
    });