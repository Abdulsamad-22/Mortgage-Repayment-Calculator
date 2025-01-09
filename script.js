const calculateButton = document.querySelector('.calculate-button');

const clearButton = document.querySelector('.clearAll-button');

clearButton.addEventListener('click', () => {
    console.log('clear all');
});

calculateButton.addEventListener('click', () => {
    event.preventDefault();
    console.log('hello');
    validateInputs();
    checksActiveRadio();
    setupActiveRadio();
});

function validateInputs() {
    const mortgageAmount = document.querySelector('.mortgage-amount');
    const mortgageTerm = document.querySelector('.term-input');
    const interestRate = document.querySelector('.interest-input');
    const radioButtons = document.querySelectorAll('.js-radio');

    const amountInput = mortgageAmount.value.trim();
    const termInput = mortgageTerm.value.trim();
    const rateInput = interestRate.value.trim();


    const container = document.querySelector('.amount-input-container');
    const termContainer = document.querySelector('.term-container');
    const rateContainer = document.querySelector('.rate-container');
    const radioContainers = document.querySelectorAll('.type-container');
    //const mortgageContainer = document.querySelector('.mortgage-types');
    container.querySelectorAll('.error').forEach(msg => {msg.remove();});
    termContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});
    rateContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});

    if (amountInput === '') {
        displayError(container, 'this field is required');
    }

    if (termInput === '') {
        displayError(termContainer, 'this field is required');
    }

    if (rateInput === '') {
        displayError(rateContainer, 'this field is required');
    }
}

function setupActiveRadio() {
    const radioButtons = document.querySelectorAll('.js-radio');
    const radioContainers = document.querySelectorAll('.type-container');

    // Add event listener to each radio button to update the background on click
    radioButtons.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            // Clear any existing active classes
            radioContainers.forEach(container => container.classList.remove('active'));

            // Add the active class to the clicked radio button's container
            if (radio.checked && radioContainers[index]) {
                radioContainers[index].classList.add('active');
            }
        });
    });
}

function checksActiveRadio() {
    const mortgageAmount = document.querySelector('.mortgage-amount');
    const mortgageTerm = document.querySelector('.term-input');
    const interestRate = document.querySelector('.interest-input');

    const amountInput = mortgageAmount.value.trim();
    const termInput = mortgageTerm.value.trim();
    const rateInput = interestRate.value.trim();
    const radioButtons = document.querySelectorAll('.js-radio');
    const mortgageContainer = document.querySelector('.mortgage-types');

    mortgageContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});

    // Check if any radio button is selected
    const isChecked = Array.from(radioButtons).some(radio => radio.checked);

    // Calculate mortgage amount

    const result = Number(rateInput / 12) * 0.01;
    const term = Number(termInput * 12);
    const repaymentFee = (1 + result);
    const total = power(repaymentFee, term);
    const times = amountInput * result * total
    const numerator = times;
    const total2 =  power((1 + result), term) - 1;
    const mortgageTotal = (numerator / total2).toFixed(2);

    //const radioContainers = document.querySelectorAll('.type-container');
    radioButtons.forEach((radio, index) => {
        if (radio.checked && index === 0) {
            console.log(mortgageTotal);
            console.log(mortgageTotal * term);

        } else if (radio.checked && index === 1) {
            console.log('interest only');
            console.log((mortgageTotal * term) - amountInput);
            console.log(((mortgageTotal * term) - amountInput) / term);
        }
    });

    if (!isChecked) {
        displayError(mortgageContainer, 'This field is required');
        //return false;
       
    }
}

function power(base, exponential) {
    let result = 1;

    if (exponential < 0) {
        return 1 / power(base, -exponential);
    }

    if (exponential === 0) {
        return 1;
    }
    
    for(let i = 0; i < exponential; i++) {
        result *= base;
    }
    return result;
}

function displayError(container, message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error');
    errorMessage.textContent = message;
    container.appendChild(errorMessage);
}