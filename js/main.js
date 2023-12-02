document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to be fully loaded
  
    // Get references to the necessary HTML elements
    const billInput = document.querySelector('.fill-in input');
    const tipButtons = document.querySelectorAll('.tip button');
    const numberOfPeopleInput = document.querySelector('.fill-in input[type="text"]');
    const tipAmountDisplay = document.querySelector('.half-width2 h3:nth-child(2)');
    const totalBillDisplay = document.querySelector('.half-width2 h3:nth-child(4)');
  
    // Add event listener for bill input changes
    billInput.addEventListener('input', updateCalculations);
  
    // Add event listeners for tip buttons
    tipButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Set the custom tip input value to an empty string when a predefined button is clicked
        document.querySelector('.tip input').value = '';
  
        // Update calculations when a tip button is clicked
        updateCalculations();
      });
    });
  
    // Add event listener for custom tip input changes
    document.querySelector('.tip input').addEventListener('input', updateCalculations);
  
    // Add event listener for number of people input changes
    numberOfPeopleInput.addEventListener('input', updateCalculations);
  
    // Add event listener for the reset button
    document.querySelector('.btn button').addEventListener('click', resetCalculations);
  
    function updateCalculations() {
      // Get the bill amount
      const billAmount = parseFloat(billInput.value) || 0;
  
      // Get the selected tip percentage
      let tipPercentage;
      tipButtons.forEach(button => {
        if (button.classList.contains('active')) {
          tipPercentage = parseFloat(button.textContent);
        }
      });
  
      // If no predefined tip button is selected, use the custom tip input value
      if (isNaN(tipPercentage)) {
        tipPercentage = parseFloat(document.querySelector('.tip input').value) || 0;
      }
  
      // Get the number of people
      const numberOfPeople = parseInt(numberOfPeopleInput.value) || 1;
  
      // Calculate the tip amount per person
      const tipAmountPerPerson = (billAmount * (tipPercentage / 100)) / numberOfPeople;
  
      // Calculate the total bill per person
      const totalBillPerPerson = (billAmount + (billAmount * (tipPercentage / 100))) / numberOfPeople;
  
      // Update the displayed tip amount and total bill
      tipAmountDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
      totalBillDisplay.textContent = `$${totalBillPerPerson.toFixed(2)}`;
    }
  
    function resetCalculations() {
      // Reset input values
      billInput.value = '';
      numberOfPeopleInput.value = '';
      document.querySelector('.tip input').value = '';
  
      // Reset displayed tip amount and total bill
      tipAmountDisplay.textContent = '$0.00';
      totalBillDisplay.textContent = '$0.00';
  
      // Remove active class from all tip buttons
      tipButtons.forEach(button => button.classList.remove('active'));
    }
  });
  