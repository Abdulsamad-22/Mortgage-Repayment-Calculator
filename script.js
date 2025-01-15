    const calculateButton = document.querySelector('.calculate-button');

    let resultSection = document.querySelector('.results-section');
    const clearButton = document.querySelector('.clear-all');

    const container = document.querySelector('.form-group');
    const termContainer = document.querySelector('.term-container');
    const rateContainer = document.querySelector('.rate-container');
    const mortgageContainer = document.querySelector('.mortgage-types');
    const currencySymbol = document.querySelector('.currency-symbol');
    const suffix = document.querySelectorAll('.suffix');
    setupActiveRadio();

    
    clearButton.addEventListener('click', () => {
        clearAllFields();
    });

    calculateButton.addEventListener('click', () => {
        event.preventDefault();
        console.log('hello');
        validateInputs();
        checksActiveRadio();
    });

    function validateInputs() {
        const mortgageAmount = document.querySelector('.mortgage-amount');
        const mortgageTerm = document.querySelector('.term-input');
        const interestRate = document.querySelector('.interest-input');

        const amountInput = mortgageAmount.value.trim();
        const termInput = mortgageTerm.value.trim();
        const rateInput = interestRate.value.trim();


        container.querySelectorAll('.error').forEach(msg => {msg.remove();});
        termContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});
        rateContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});

        if (amountInput === '' || amountInput < 0) {
            displayError(container, 'This field is required');
            mortgageAmount.classList.add('input-error');
            currencySymbol.style.backgroundColor = 'hsl(4, 69%, 50%)';
        }

        if (termInput === '') {
            displayError(termContainer, 'This field is required');
            mortgageTerm.classList.add('input-error');

            const firstSuffix = document.querySelectorAll('.suffix')[0];
            if (firstSuffix) {
                firstSuffix.classList.add('suffix-error');
            }
        }

        if (rateInput === '') {
            displayError(rateContainer, 'This field is required');
            interestRate.classList.add('input-error');

            const secondSuffix = document.querySelectorAll('.suffix')[1];
            if (secondSuffix) {
                secondSuffix.classList.add('suffix-error');
                console.log('suffix 2');
            }
        } else {
            const secondSuffix = document.querySelectorAll('.suffix')[1];
            if (secondSuffix) {
                secondSuffix.classList.remove('suffix-error');
            }
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

    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-page');
    let resultsWrapper = document.querySelector('.results-container2');
    resultsWrapper.style.display = 'none';

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
        const rateCalc = (1 + result);
        const total = power(rateCalc, term);
        const times = amountInput * result * total
        const numerator = times;
        const total2 =  power((1 + result), term) - 1;

        let monthlyRepayment = (numerator / total2).toFixed(2);
        let totalRepaymentFee = (monthlyRepayment * term).toFixed(2);

        const fee =document.querySelector('.monthly-amount');

        let option1 = '';
        let option2 = '';

            
        let formattedMonthlyRepayment = '';
        let formattedTotalRepaymentFee = '';

        radioButtons.forEach((radio, index) => {
            if (radio.checked && index === 0) {
                // Repayment fee total calculation
                option1 = 'repayments';
                option2= ` you'll repay`;
                monthlyRepayment;
                totalRepaymentFee;

                // Format numbers for display
                formattedMonthlyRepayment = formattedNumber(monthlyRepayment);
                formattedTotalRepaymentFee = formattedNumber(totalRepaymentFee);

                console.log('Monthly Repayment:', formattedMonthlyRepayment);
                console.log('Total Repayment Fee:', formattedTotalRepaymentFee);

            } else if (radio.checked && index === 1) {
                // Interest fee total calculation
                monthlyRepayment = (((monthlyRepayment * term) - amountInput) / term).toFixed(2);
                totalRepaymentFee = (totalRepaymentFee - amountInput).toFixed(2);

                // Format numbers for display
                formattedMonthlyRepayment = formattedNumber(monthlyRepayment);
                formattedTotalRepaymentFee = formattedNumber(totalRepaymentFee);

                console.log('Monthly Interest Repayment:', formattedMonthlyRepayment);
                console.log('Total Interest Fee:', formattedTotalRepaymentFee);
            }
        });

        if (!isChecked) {
            displayError(mortgageContainer, 'This field is required');
            //return false;
        
        }

            resultContainer.innerHTML = `
                <h2>
                    Your results
                </h2>

                <p>
                    Your results are shown below based on the information you provided. 
                    To adjust the results, edit the form and click “calculate repayments” again.
                </p>

                <div class="fee-section">
                    <section class="monthly-section">
                        <p class="monthly-desc">
                            Your monthly ${option1}
                        </p>

                        <h3 class="monthly-amount">
                            &#163;${formattedMonthlyRepayment}
                        </h3>
                    </section>

                    <hr class="divider">

                    <section class="total-section">
                        <p class="total-desc">
                            Total ${option2} over the term
                        </p>

                        <h3 class="total-amount">
                            &#163;${formattedTotalRepaymentFee}
                        </h3>
                    </section>
                </div>
            `;

            resultsWrapper.innerHTML = '';

            if (amountInput < 0 || termInput < 0 || rateInput < 0) {
                console.log('invalid input');
                return;
            }

        if (amountInput && termInput && rateInput && isChecked) {
            console.log('successful');
            resultSection.style.display = 'none';
            resultsWrapper.style.display = 'block';

            mortgageAmount.classList.remove('input-error');
            mortgageTerm.classList.remove('input-error');
            interestRate.classList.remove('input-error');
            currencySymbol.style.backgroundColor = 'hsl(202, 86%, 94%)';

            suffix.forEach((suffix) => {
                suffix.classList.remove(`suffix-error`);
            });
            
            resultsWrapper.appendChild(resultContainer);
        }
    }

    function clearAllFields() {
        const mortgageAmount = document.querySelector('.mortgage-amount');
        const mortgageTerm = document.querySelector('.term-input');
        const interestRate = document.querySelector('.interest-input');

        console.log('clear all');
        mortgageAmount.value = '';
        mortgageTerm.value = '';
        interestRate.value = '';

        mortgageAmount.classList.remove('input-error');
        mortgageTerm.classList.remove('input-error');
        interestRate.classList.remove('input-error');


        mortgageContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});
        container.querySelectorAll('.error').forEach(msg => {msg.remove();});
        termContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});
        rateContainer.querySelectorAll('.error').forEach(msg => {msg.remove();});

        suffix.forEach((suffix, index) => {
            suffix.classList.remove(`suffix-error`);
        });


        const radioButtons = document.querySelectorAll('.js-radio');
        const radioContainers = document.querySelectorAll('.type-container');

        radioContainers.forEach(container => container.classList.remove('active'));

        // Uncheck all radio buttons
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        currencySymbol.style.backgroundColor = 'hsl(202, 86%, 94%)';

        resultSection.style.display = 'block';
        resultsWrapper.style.display = 'none';
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

    function formattedNumber(number) {
        let str = number.toString();
        const groups = [];
        while(str.length > 3){
            groups.unshift(str.slice(-3));
            str = str.slice(0, -3);
        }

        groups.unshift(str);

        str = groups.join(',');
        return str;
    }

    let nums = 122791 + 12;
    console.log(formattedNumber(nums));
    console.log(formattedNumber(1234));

    function displayError(container, message) {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error');
        errorMessage.textContent = message;
        container.appendChild(errorMessage);
    }