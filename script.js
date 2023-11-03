// Include the API URL
const api = "http://api.exchangeratesapi.io/v1/latest?access_key=9297371cdeee64cfa05ec2c5b34bb6a4&base=USD&symbols=INR";

// Selecting different controls
const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const fromCurrency = document.querySelector(".from");
const toCurrency = document.querySelector(".to");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

// Event when currency is changed
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

// Event when currency is changed
toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}

// When the user clicks, it calls function getResults
convert.addEventListener("click", getResults);

// Function getResults
function getResults() {
    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Display results after conversion
function displayResults(currencyData) {
    const fromRate = currencyData.rates[resultFrom];
    const toRate = currencyData.rates[resultTo];
    
    if (isNaN(fromRate) || isNaN(toRate) || isNaN(searchValue)) {
        console.error("Invalid numeric values for conversion");
        return;
    }

    const convertedValue = ((toRate / fromRate) * parseFloat(searchValue)).toFixed(2);

    if (!isNaN(convertedValue)) {
        finalValue.innerHTML = convertedValue;
        finalAmount.style.display = "block";
    } else {
        console.error("Conversion result is not a number");
    }
}


// When the user clicks on the reset button
function clearVal() {
    window.location.reload();
    finalValue.innerHTML = "";
}

