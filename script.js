let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (desc === "" || amount === "") {
    alert("Fill all fields");
    return;
  }

  let expense = {
    desc,
    amount: parseFloat(amount),
    category
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
}

function displayExpenses() {
  let list = document.getElementById("expenseList");
  list.innerHTML = "";

  let total = 0;
  let categoryTotals = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Other: 0
  };

  expenses.forEach((exp, index) => {
    total += exp.amount;
    categoryTotals[exp.category] += exp.amount;

    let li = document.createElement("li");
    li.innerText = `${exp.desc} - ₹${exp.amount} (${exp.category})`;

    let btn = document.createElement("button");
    btn.innerText = "X";
    btn.classList.add("delete");

    btn.onclick = function () {
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      displayExpenses();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;

  updateChart(categoryTotals);
}

let chart;

function updateChart(data) {
  let ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}

// Load on start
displayExpenses();