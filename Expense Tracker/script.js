// Global variables
let transactions = [];
let activityLog = [];
let currentEditIndex = -1;
let charts = {};

// Storage keys
const STORAGE_KEYS = {
  transactions: "expense_tracker_transactions",
  activities: "expense_tracker_activities",
  theme: "expense_tracker_theme",
};

// Utility Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID");
}

function formatDateTime(date) {
  return new Date(date).toLocaleString("id-ID");
}

// Data Management
function loadData() {
  transactions =
    JSON.parse(localStorage.getItem(STORAGE_KEYS.transactions)) || [];
  activityLog = JSON.parse(localStorage.getItem(STORAGE_KEYS.activities)) || [];
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
}

function saveActivities() {
  localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activityLog));
}

function logActivity(action, details) {
  const activity = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    action: action,
    details: details,
  };
  activityLog.unshift(activity);
  saveActivities();
}

// Theme Management
function loadTheme() {
  const theme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
  document.body.className = theme === "dark" ? "dark" : "";
  updateThemeIcon();
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  document.body.className = isDark ? "" : "dark";
  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem(STORAGE_KEYS.theme, newTheme);
  updateThemeIcon();
  updateChartThemes();
}

function updateThemeIcon() {
  const themeToggle = document.getElementById("themeToggle");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
}

// Navigation
function initNavigation() {
  const navTabs = document.querySelectorAll(".nav-tab");
  const pages = document.querySelectorAll(".page");

  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPage = tab.dataset.page;

      // Update active tab
      navTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Show target page
      pages.forEach((p) => p.classList.remove("active"));
      document.getElementById(targetPage).classList.add("active");

      // Load page-specific data
      switch (targetPage) {
        case "dashboard":
          renderDashboard();
          break;
        case "transactions":
          renderTransactions();
          break;
        case "history":
          renderHistory();
          break;
        case "analytics":
          renderAnalytics();
          break;
      }
    });
  });
}

// Dashboard Functions
function calculateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    const amount = parseFloat(t.amount) || 0;
    if (t.category === "Pemasukan") {
      totalIncome += amount;
    } else if (t.category === "Pengeluaran") {
      totalExpense += amount;
    }
  });

  return {
    income: totalIncome,
    expense: totalExpense,
    balance: totalIncome - totalExpense,
  };
}

function updateSummaryCards() {
  const summary = calculateSummary();

  document.getElementById("total-income").textContent = formatCurrency(
    summary.income
  );
  document.getElementById("total-expense").textContent = formatCurrency(
    summary.expense
  );
  document.getElementById("balance").textContent = formatCurrency(
    summary.balance
  );
}

function getExpensesByCategory() {
  const expenses = transactions.filter((t) => t.category === "Pengeluaran");
  const categories = {};

  expenses.forEach((t) => {
    const category = t.description || "Other";
    categories[category] = (categories[category] || 0) + parseFloat(t.amount);
  });

  return categories;
}

function getBalanceOverTime() {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const balanceData = {};
  let runningBalance = 0;

  sortedTransactions.forEach((t) => {
    const amount = parseFloat(t.amount);
    runningBalance += t.category === "Pemasukan" ? amount : -amount;
    balanceData[t.date] = runningBalance;
  });

  return balanceData;
}

function renderCharts() {
  const summary = calculateSummary();
  const expensesByCategory = getExpensesByCategory();
  const balanceOverTime = getBalanceOverTime();

  // Pie Chart
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  if (charts.pieChart) charts.pieChart.destroy();

  charts.pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [summary.income, summary.expense],
          backgroundColor: ["#10b981", "#ef4444"],
          borderWidth: 2,
          borderColor: getComputedStyle(document.documentElement)
            .getPropertyValue("--card-light")
            .trim(),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  // Bar Chart
  const barCtx = document.getElementById("barChart").getContext("2d");
  if (charts.barChart) charts.barChart.destroy();

  charts.barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: Object.keys(expensesByCategory),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(expensesByCategory),
          backgroundColor: "#ef4444",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatCurrency(value);
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  // Line Chart
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  if (charts.lineChart) charts.lineChart.destroy();

  charts.lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
      labels: Object.keys(balanceOverTime),
      datasets: [
        {
          label: "Balance Over Time",
          data: Object.values(balanceOverTime),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return formatCurrency(value);
            },
          },
        },
      },
    },
  });
}

function updateChartThemes() {
  Object.values(charts).forEach((chart) => {
    if (chart && chart.update) {
      chart.update();
    }
  });
}

function renderDashboard() {
  updateSummaryCards();
  setTimeout(() => renderCharts(), 100);
}

// Transaction Functions
function renderTransactions() {
  const tbody = document.getElementById("transactions-body");
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const categoryFilter = document.getElementById("filter-category").value;
  const dateFilter = document.getElementById("filter-date").value;

  let filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      !searchTerm || t.description.toLowerCase().includes(searchTerm);
    const matchesCategory = !categoryFilter || t.category === categoryFilter;
    const matchesDate = !dateFilter || t.date === dateFilter;
    return matchesSearch && matchesCategory && matchesDate;
  });

  if (filteredTransactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">
          <h3>No transactions found</h3>
          <p>Add your first transaction to get started!</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredTransactions
    .map(
      (t, index) => `
    <tr>
      <td>${formatDate(t.date)}</td>
      <td>${t.description}</td>
      <td>
        <span class="badge ${
          t.category === "Pemasukan" ? "badge-success" : "badge-danger"
        }">
          ${t.category === "Pemasukan" ? "Income" : "Expense"}
        </span>
      </td>
      <td>${formatCurrency(t.amount)}</td>
      <td class="actions">
        <button class="btn btn-primary btn-sm" onclick="editTransaction(${transactions.indexOf(
          t
        )})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${transactions.indexOf(
          t
        )})">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");
}

function addTransaction(transactionData) {
  transactions.push({
    id: Date.now(),
    ...transactionData,
    createdAt: new Date().toISOString(),
  });

  saveTransactions();
  logActivity(
    "Added",
    `${transactionData.category}: ${
      transactionData.description
    } - ${formatCurrency(transactionData.amount)}`
  );
  renderTransactions();
  updateSummaryCards();
}

function editTransaction(index) {
  const transaction = transactions[index];

  document.getElementById("date").value = transaction.date;
  document.getElementById("description").value = transaction.description;
  document.getElementById("category").value = transaction.category;
  document.getElementById("amount").value = transaction.amount;

  currentEditIndex = index;
  document.querySelector(
    '#transaction-form button[type="submit"]'
  ).textContent = "Update Transaction";
}

function updateTransaction(index, transactionData) {
  const oldTransaction = transactions[index];
  transactions[index] = {
    ...oldTransaction,
    ...transactionData,
    updatedAt: new Date().toISOString(),
  };

  saveTransactions();
  logActivity(
    "Updated",
    `${transactionData.category}: ${
      transactionData.description
    } - ${formatCurrency(transactionData.amount)}`
  );
  renderTransactions();
  updateSummaryCards();
}

function deleteTransaction(index) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    const deletedTransaction = transactions[index];
    transactions.splice(index, 1);

    saveTransactions();
    logActivity(
      "Deleted",
      `${deletedTransaction.category}: ${
        deletedTransaction.description
      } - ${formatCurrency(deletedTransaction.amount)}`
    );
    renderTransactions();
    updateSummaryCards();
  }
}

function initTransactionForm() {
  const form = document.getElementById("transaction-form");
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const transactionData = {
      date: document.getElementById("date").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      amount: parseFloat(document.getElementById("amount").value),
    };

    if (currentEditIndex >= 0) {
      updateTransaction(currentEditIndex, transactionData);
      currentEditIndex = -1;
      document.querySelector(
        '#transaction-form button[type="submit"]'
      ).textContent = "Add Transaction";
    } else {
      addTransaction(transactionData);
    }

    form.reset();
    document.getElementById("date").value = today;
  });

  // Filter event listeners
  document
    .getElementById("search")
    .addEventListener("input", renderTransactions);
  document
    .getElementById("filter-category")
    .addEventListener("change", renderTransactions);
  document
    .getElementById("filter-date")
    .addEventListener("change", renderTransactions);
}

// History Functions
function renderHistory() {
  const tbody = document.getElementById("history-body");
  const actionFilter = document.getElementById("filter-action").value;
  const dateFilter = document.getElementById("history-filter-date").value;

  let filteredActivities = activityLog.filter((activity) => {
    const matchesAction = !actionFilter || activity.action === actionFilter;
    const matchesDate =
      !dateFilter || activity.timestamp.startsWith(dateFilter);
    return matchesAction && matchesDate;
  });

  if (filteredActivities.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="empty-state">
          <h3>No activity history</h3>
          <p>Your activity history will appear here as you use the app.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredActivities
    .map(
      (activity) => `
    <tr>
      <td>${formatDateTime(activity.timestamp)}</td>
      <td>
        <span class="badge ${
          activity.action === "Added"
            ? "badge-success"
            : activity.action === "Deleted"
            ? "badge-danger"
            : "badge-primary"
        }">
          ${activity.action}
        </span>
      </td>
      <td>${activity.details}</td>
    </tr>
  `
    )
    .join("");
}

function clearLog() {
  if (
    confirm(
      "Are you sure you want to clear all activity history? This action cannot be undone."
    )
  ) {
    activityLog = [];
    localStorage.removeItem(STORAGE_KEYS.activities);
    renderHistory();
  }
}

function initHistoryFilters() {
  document
    .getElementById("filter-action")
    .addEventListener("change", renderHistory);
  document
    .getElementById("history-filter-date")
    .addEventListener("change", renderHistory);
}

// Analytics Functions
function filterTransactionsByPeriod(period) {
  const now = new Date();

  return transactions.filter((t) => {
    const date = new Date(t.date);

    switch (period) {
      case "weekly":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return date >= oneWeekAgo;

      case "monthly":
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );

      case "yearly":
        return date.getFullYear() === now.getFullYear();

      default:
        return true;
    }
  });
}

function renderDonutChart(filteredTransactions) {
  const expenses = filteredTransactions.filter(
    (t) => t.category === "Pengeluaran"
  );
  const categories = {};

  expenses.forEach((t) => {
    const category = t.description || "Other";
    categories[category] = (categories[category] || 0) + parseFloat(t.amount);
  });

  const ctx = document.getElementById("donutChart").getContext("2d");
  if (charts.donutChart) charts.donutChart.destroy();

  const colors = [
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f97316",
  ];

  charts.donutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Expense by Category",
          data: Object.values(categories),
          backgroundColor: colors.slice(0, Object.keys(categories).length),
          borderWidth: 2,
          borderColor: getComputedStyle(document.documentElement)
            .getPropertyValue("--card-light")
            .trim(),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  return categories;
}

function generateInsights(filteredTransactions, categories) {
  const insightBox = document.getElementById("insight");

  if (filteredTransactions.length === 0) {
    insightBox.innerHTML = `
      <h3>💡 Smart Insights</h3>
      <p>Add some transactions to see detailed analytics and insights!</p>
    `;
    return;
  }

  const expenses = filteredTransactions.filter(
    (t) => t.category === "Pengeluaran"
  );
  const income = filteredTransactions.filter((t) => t.category === "Pemasukan");

  const totalExpenses = expenses.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );
  const totalIncome = income.reduce((sum, t) => sum + parseFloat(t.amount), 0);

  let insights = [];

  if (Object.keys(categories).length > 0) {
    const maxCategory = Object.keys(categories).reduce((a, b) =>
      categories[a] > categories[b] ? a : b
    );
    const maxAmount = categories[maxCategory];
    const percentage = ((maxAmount / totalExpenses) * 100).toFixed(1);

    insights.push(
      `Your biggest expense category is "<strong>${maxCategory}</strong>" with ${formatCurrency(
        maxAmount
      )} (${percentage}% of total expenses).`
    );
  }

  if (totalIncome > totalExpenses) {
    const surplus = totalIncome - totalExpenses;
    insights.push(
      `Great job! You have a surplus of ${formatCurrency(
        surplus
      )} this period. 💚`
    );
  } else if (totalExpenses > totalIncome) {
    const deficit = totalExpenses - totalIncome;
    insights.push(
      `You have a deficit of ${formatCurrency(
        deficit
      )} this period. Consider reviewing your expenses. ⚠️`
    );
  }

  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  if (avgExpense > 0) {
    insights.push(
      `Your average expense per transaction is ${formatCurrency(avgExpense)}.`
    );
  }

  insightBox.innerHTML = `
    <h3>💡 Smart Insights</h3>
    ${insights.map((insight) => `<p>${insight}</p>`).join("")}
  `;
}

function renderAnalytics() {
  const period = document.getElementById("time-filter").value;
  const filteredTransactions = filterTransactionsByPeriod(period);
  const categories = renderDonutChart(filteredTransactions);
  generateInsights(filteredTransactions, categories);
}

function initAnalytics() {
  document
    .getElementById("time-filter")
    .addEventListener("change", renderAnalytics);
}

// Initialization
function init() {
  loadData();
  loadTheme();
  initNavigation();
  initTransactionForm();
  initHistoryFilters();
  initAnalytics();

  // Theme toggle event listener
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);

  // Initial render
  renderDashboard();

  // Auto-refresh data every 5 minutes
  setInterval(() => {
    const activePage = document.querySelector(".page.active").id;
    switch (activePage) {
      case "dashboard":
        renderDashboard();
        break;
      case "transactions":
        renderTransactions();
        break;
      case "history":
        renderHistory();
        break;
      case "analytics":
        renderAnalytics();
        break;
    }
  }, 300000); // 5 minutes

  console.log("🚀 Personal Expense Tracker initialized successfully!");
}

// Start the application
document.addEventListener("DOMContentLoaded", init);
