const calculateButton = document.querySelector('.calculate-button');

calculateButton.addEventListener('click', () => {
    event.preventDefault();
    console.log('hello');
    validateInputs();
});

function validateInputs() {
    const mortgageAmount = document.querySelector('.mortgage-amount');
    const mortgageTerm = document.querySelector('.term-input');
    const interestRate = document.querySelector('.interest-input');
    
    const radioButtons = document.querySelector('.js-radio');

    const amountInput = mortgageAmount.value.trim();
    const termInput = mortgageTerm.value.trim();
    const rateInput = interestRate.value.trim();

    const container = document.querySelector('.amount-input-container');
    const mortgageContainer = document.querySelector('.mortgage-types');
    container.querySelectorAll('.error').forEach(msg => {msg.remove();});

    if (amountInput === '' || termInput === '' || interestRate === '') {
        displayError(container, 'this field is required');
    }

    const isChecked = Array.from(radioButtons).some(radio => radio.checked);

    if (!isChecked) {
        displayError(mortgageContainer, 'This field is required');
        //return false;
       
    } 
}

function displayError(container, message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error');
    errorMessage.textContent = message;
    container.appendChild(errorMessage);
}