let lastBettingTime = 0; // Добавляем переменную для отслеживания последнего времени "betting"

function getRan(min, max) {
    return Math.random() * (max - min) + min;
}

async function checkSignal() {
    let randomNumber1 = getRan(1.7, 2.2).toFixed(2);
    const url = 'https://lucky-jet-history.gamedev-atech.cc/public/history/api/history/replay';
    const response = await fetch(url);
    const data = await response.json();
    const state = data.state;

    let responseText = document.getElementById('responseText');

    if (state === "betting" && Date.now() - lastBettingTime > 5000) {
        let resultText = `${randomNumber1}x`;
        document.getElementById("responseText").textContent = resultText;
        localStorage.setItem('resultText', resultText);
        responseText.className = 'text betting';
        lastBettingTime = Date.now();
    } else if (state === "ending") {
        responseText.textContent = "Waiting..";
        responseText.className = 'text fly';
    }
}

function fetchDataAndUpdate() {
    fetch('https://lucky-jet-history.gamedev-atech.cc/public/history/api/history/replay')
        .then(response => response.json())
        .then(data => {
            const kef = parseFloat(data.current_coefficients);
            updateCoefficients(kef);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updateCoefficients(coefficients) {
    const coefficientsDiv = document.getElementById('coefficients');

    if (coefficients === 1) {
        coefficientsDiv.innerText = "Waiting..";
        coefficientsDiv.classList.remove('kif');
        coefficientsDiv.classList.add('smallt');
    } else {
        coefficientsDiv.innerText = `x${coefficients}`;
        coefficientsDiv.classList.remove('smallt');
        coefficientsDiv.classList.add('kif');
    }
}

fetchDataAndUpdate();
setInterval(fetchDataAndUpdate, 100);

let intervalId = setInterval(checkSignal, 1000);
checkSignal(); 
