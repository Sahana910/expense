let expenses = [];

// Add Expense
document.getElementById('expenseForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  expenses.push({ name, category, amount, date });
  updateExpenseTable();
  this.reset();
});

// Update Expense Table
function updateExpenseTable() {
  const tbody = document.querySelector('#expenseTable tbody');
  tbody.innerHTML = '';
  expenses.forEach((expense, index) => {
    const row = `<tr>
      <td>${expense.name}</td>
      <td>${expense.category}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.date}</td>
      <td><button onclick="removeExpense(${index})">Delete</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Remove Expense
function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenseTable();
}

// Generate Summary
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('summary.html')) {
    const personSummary = {};
    const categorySummary = {};

    expenses.forEach(expense => {
      personSummary[expense.name] = (personSummary[expense.name] || 0) + expense.amount;
      categorySummary[expense.category] = (categorySummary[expense.category] || 0) + expense.amount;
    });

    document.getElementById('personSummary').innerHTML = Object.entries(personSummary)
      .map(([name, total]) => `<li>${name}: $${total.toFixed(2)}</li>`).join('');

    document.getElementById('categorySummary').innerHTML = Object.entries(categorySummary)
      .map(([category, total]) => `<li>${category}: $${total.toFixed(2)}</li>`).join('');
  }
});
