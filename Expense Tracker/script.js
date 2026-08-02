const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const total = document.getElementById('total');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Array that stores expenses
const expenses = [];

// Check if user is editing
let editingExpenseId = null;

init();

function submitForm(e) {
  e.preventDefault();

  if (editingExpenseId !== null) {
    const expense = expenses.find((expense) => {
      return expense.id === editingExpenseId;
    });
    if (!expense) return;

    expense.description = descriptionInput.value;
    expense.amount = Number(amountInput.value);
    exitEditMode();
  } else {
    const expenseObject = {
      // unique id
      id: crypto.randomUUID(),
      description: descriptionInput.value,
      amount: Number(amountInput.value),
    };
    expenses.push(expenseObject);
    clearForm();
  }

  saveExpenses();
  render();
}

// Clear form inputs
function clearForm() {
  descriptionInput.value = '';
  amountInput.value = '';
}

// Displays expenses on DOM
function displayExpenses() {
  expenseList.replaceChildren();

  expenses.forEach((item) => {
    // Created The list item
    const li = document.createElement('li');
    li.dataset.id = item.id;
    li.classList.add('list-items');

    // Created the text inside list item
    const text = document.createElement('span');
    text.textContent = `${item.description} - £${item.amount.toFixed(2)}`;
    li.appendChild(text);

    // create the edit button
    const actions = document.createElement('div');
    actions.classList.add('actions');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';

    actions.appendChild(editBtn);

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('del-btn');

    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    expenseList.appendChild(li);
  });
}

// Update the total
function updateTotal() {
  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  total.innerText = `Total: £${totalAmount.toFixed(2)}`;
}

// delete Button
function removeBtn(e) {
  if (e.target.classList.contains('del-btn')) {
    const li = e.target.closest('.list-items');
    const id = li.dataset.id;

    const index = expenses.findIndex((expense) => expense.id === id);
    if (index === -1) return;
    expenses.splice(index, 1);

    saveExpenses();

    render();
  }
}

// Edit expenses
function editExpense(e) {
  if (e.target.classList.contains('edit-btn')) {
    const li = e.target.closest('.list-items');
    const id = li.dataset.id;
    const expense = expenses.find((expense) => {
      return expense.id === id;
    });
    if (!expense) return;
    editingExpenseId = expense.id;
    cancelBtn.hidden = false;
    submitBtn.textContent = 'Update Expense';
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
  }
}

// cancel button
function cancelEdit() {
  exitEditMode();
}

function render() {
  displayExpenses();
  updateTotal();
}

// exit editing mode
function exitEditMode() {
  editingExpenseId = null;
  cancelBtn.hidden = true;
  submitBtn.textContent = 'Submit';
  clearForm();
}

// Local Storage

// save expenses to local storage
function saveExpenses() {
  localStorage.setItem('Expenses', JSON.stringify(expenses));
}

// load expenses from local storage
function loadExpenses() {
  const expensesData = JSON.parse(localStorage.getItem('Expenses'));

  if (expensesData === null) return;
  expenses.push(...expensesData);
}

// Initialise app
function init() {
  loadExpenses();
  render();
}

// Event listeners
expenseForm.addEventListener('submit', submitForm);
expenseList.addEventListener('click', removeBtn);
expenseList.addEventListener('click', editExpense);
cancelBtn.addEventListener('click', cancelEdit);
