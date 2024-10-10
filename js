<script>
const ANIMATION_DURATION = 1000;
const PAGE_SIZE = 10;
let currentPage = 1;
let sortColumn = 'date';
let sortDirection = 'desc';
let currentData = [];

// Initialize dashboard
function initializeDashboard() {
  initializeTheme();
  initializeCounters();
  initializeCharts();
  initializeTable();
  initializeEventListeners();
  
  refreshData();
}

function initializeTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function initializeCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    animateCounter(counter, target);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / (ANIMATION_DURATION / 16);
  const animate = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(animate);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  animate();
}

function initializeCharts() {
  // Activity Chart
  const activityCtx = document.getElementById('activityChart').getContext('2d');
  new Chart(activityCtx, {
    type: 'line',
    data: getActivityData(),
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  // Performance Chart
  const performanceCtx = document.getElementById('performanceChart').getContext('2d');
  new Chart(performanceCtx, {
    type: 'bar',
    data: getPerformanceData(),
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function initializeTable() {
  currentData = generateTableData();
  renderTable();
  renderPagination();
}

function renderTable() {
  const tableBody = document.getElementById('tableBody');
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  
  const sortedData = [...currentData].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    return sortDirection === 'asc' ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1;
  });

  const rows = sortedData.slice(start, end).map(item => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800">
      <td>${item.id}</td>
      <td>${item.date}</td>
      <td>${item.user}</td>
      <td><span class="badge ${item.type.toLowerCase()}">${item.type}</span></td>
      <td><span class="status-badge ${item.status.toLowerCase()}">${item.status}</span></td>
      <td>
        <div class="progress-bar">
          <div class="progress" style="width: ${item.progress}%"></div>
        </div>
      </td>
      <td>
        <div class="flex gap-2">
          <button class="btn-icon" onclick="viewDetails(${item.id})">👁️</button>
          <button class="btn-icon" onclick="editItem(${item.id})">✏️</button>
        </div>
      </td>
    </tr>
  `).join('');
  
  tableBody.innerHTML = rows;
}

function initializeEventListeners() {
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Refresh button
  document.getElementById('refreshData').addEventListener('click', refreshData);
  
  // Table search
  document.getElementById('tableSearch').addEventListener('input', debounce(handleSearch, 300));
  
  // Table sorting
  document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', () => handleSort(header.dataset.sort));
  });
  
  // Chart type toggle
  document.querySelectorAll('.btn-chart').forEach(btn => {
    btn.addEventListener('click', () => updateChartType(btn.dataset.chart));
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  currentData = generateTableData().filter(item => 
    Object.values(item).some(val => 
      val.toString().toLowerCase().includes(searchTerm)
    )
  );
  currentPage = 1;
  renderTable();
  renderPagination();
}

function handleSort(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  renderTable();
}

// Data generation functions
function getActivityData() {
  return {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: Array.from({length: 7}, () => Math.floor(Math.random() * 100)),
      borderColor: '#3b82f6',
      tension: 0.4
    }]
  };
}

function getPerformanceData() {
  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Performance',
      data: Array.from({length: 4}, () => Math.floor(Math.random() * 100)),
      backgroundColor: '#3b82f6'
    }]
  };
}

function generateTableData() {
  return Array.from({length: 100}, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    user: `User ${i + 1}`,
    type: ['Basic', 'Premium', 'Enterprise'][Math.floor(Math.random() * 3)],
    status: ['Active', 'Pending', 'Completed'][Math.floor(Math.random() * 3)],
    progress: Math.floor(Math.random() * 100)
  }));
}

// Initialize on load
window.onload = initializeDashboard;
</script>
