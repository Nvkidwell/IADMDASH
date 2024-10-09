// Code.gs
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Interactive Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutput(
    HtmlService.createTemplateFromFile(filename).getRawContent()
  ).getContent();
}

function getDashboardData() {
  // Demo data - replace with actual spreadsheet data later
  return {
    metrics: {
      totalSales: 125000,
      monthlyGrowth: 12.5,
      activeCustomers: 450,
      averageOrder: 275
    },
    charts: {
      salesTrend: generateDemoSalesData(),
      topProducts: generateDemoProductData()
    }
  };
}

function generateDemoSalesData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => {
    return [month, Math.floor(Math.random() * 50000) + 30000];
  });
}

function generateDemoProductData() {
  const products = [
    ['Product A', 45000],
    ['Product B', 35000],
    ['Product C', 28000],
    ['Product D', 22000],
    ['Product E', 15000]
  ];
  return products;
}

// index.html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?!= include('styles'); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
  </head>
  <body>
    <div class="dashboard">
      <header class="header">
        <h1>Business Analytics Dashboard</h1>
        <div class="date-range">
          <select id="timeRange" onchange="updateDashboard()">
            <option value="7">Last 7 Days</option>
            <option value="30" selected>Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
      </header>

      <div class="metrics-grid">
        <div class="metric-card">
          <h3>Total Sales</h3>
          <div class="metric-value" id="totalSales">Loading...</div>
          <div class="metric-trend positive">↑ 8.2% vs last period</div>
        </div>
        
        <div class="metric-card">
          <h3>Monthly Growth</h3>
          <div class="metric-value" id="monthlyGrowth">Loading...</div>
          <div class="metric-trend positive">↑ 2.1% vs last period</div>
        </div>
        
        <div class="metric-card">
          <h3>Active Customers</h3>
          <div class="metric-value" id="activeCustomers">Loading...</div>
          <div class="metric-trend positive">↑ 5.3% vs last period</div>
        </div>
        
        <div class="metric-card">
          <h3>Average Order Value</h3>
          <div class="metric-value" id="averageOrder">Loading...</div>
          <div class="metric-trend negative">↓ 1.2% vs last period</div>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-card">
          <h3>Sales Trend</h3>
          <canvas id="salesChart"></canvas>
        </div>
        
        <div class="chart-card">
          <h3>Top Products</h3>
          <canvas id="productsChart"></canvas>
        </div>
      </div>
    </div>
    <?!= include('javascript'); ?>
  </body>
</html>

// styles.html
<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --accent-color: #3498db;
  --success-color: #2ecc71;
  --warning-color: #f1c40f;
  --danger-color: #e74c3c;
  --text-color: #2c3e50;
  --background-color: #ecf0f1;
  --card-background: #ffffff;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
}

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  color: var(--primary-color);
}

.date-range select {
  padding: 8px 16px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: var(--card-background);
  color: var(--text-color);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.metric-card h3 {
  margin: 0 0 10px 0;
  color: var(--secondary-color);
  font-size: 0.9rem;
  text-transform: uppercase;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.metric-trend {
  font-size: 0.9rem;
  color: var(--text-color);
}

.metric-trend.positive {
  color: var(--success-color);
}

.metric-trend.negative {
  color: var(--danger-color);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-card {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 400px;
}

.chart-card h3 {
  margin: 0 0 20px 0;
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>

// javascript.html
<script>
let salesChart;
let productsChart;

function updateDashboard() {
  showLoadingState();
  google.script.run
    .withSuccessHandler(renderDashboard)
    .withFailureHandler(handleError)
    .getDashboardData();
}

function showLoadingState() {
  const metrics = ['totalSales', 'monthlyGrowth', 'activeCustomers', 'averageOrder'];
  metrics.forEach(metric => {
    document.getElementById(metric).textContent = 'Loading...';
  });
}

function renderDashboard(data) {
  // Update metrics
  document.getElementById('totalSales').textContent = formatCurrency(data.metrics.totalSales);
  document.getElementById('monthlyGrowth').textContent = `${data.metrics.monthlyGrowth}%`;
  document.getElementById('activeCustomers').textContent = data.metrics.activeCustomers;
  document.getElementById('averageOrder').textContent = formatCurrency(data.metrics.averageOrder);

  // Update charts
  updateSalesChart(data.charts.salesTrend);
  updateProductsChart(data.charts.topProducts);
}

function updateSalesChart(salesData) {
  const ctx = document.getElementById('salesChart').getContext('2d');
  
  if (salesChart) {
    salesChart.destroy();
  }
  
  salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: salesData.map(row => row[0]),
      datasets: [{
        label: 'Sales',
        data: salesData.map(row => row[1]),
        borderColor: '#3498db',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(52, 152, 219, 0.1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => formatCurrency(value)
          }
        }
      }
    }
  });
}

function updateProductsChart(productsData) {
  const ctx = document.getElementById('productsChart').getContext('2d');
  
  if (productsChart) {
    productsChart.destroy();
  }
  
  productsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsData.map(row => row[0]),
      datasets: [{
        data: productsData.map(row => row[1]),
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#f1c40f',
          '#e74c3c',
          '#9b59b6'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => formatCurrency(value)
          }
        }
      }
    }
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function handleError(error) {
  console.error('Error updating dashboard:', error);
  alert('An error occurred while updating the dashboard. Please try again.');
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', updateDashboard);
</script>
