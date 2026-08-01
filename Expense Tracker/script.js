const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const total = document.getElementById('total');

// Array that stores expenses
const expenses = [];
console.log(expenses);

function submitForm(e) {
  e.preventDefault();

  const expenseObject = {
    description: descriptionInput.value,
    amount: Number(amountInput.value),
  };

  expenses.push(expenseObject);
  displayExpenses();

  descriptionInput.value = '';
  amountInput.value = '';
}

function displayExpenses() {
  expenseList.replaceChildren();

  expenses.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('list-items');

    li.innerHTML = `${item.description} - £${item.amount}`;

    expenseList.appendChild(li);
  });
}

// Event listeners
expenseForm.addEventListener('submit', submitForm);
