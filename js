<script>
// Initialize dashboard
function initializeDashboard() {
  google.script.run
    .withSuccessHandler(updateDashboard)
    .getDashboardData();
    
  google.script.run
    .withSuccessHandler(updateLogo)
    .getLogoUrl();
}

function updateDashboard(data) {
  // Update metrics
  document.getElementById('todaySubmissions').textContent = data.todaySubmissions;
  document.getElementById('totalUsers').textContent = data.totalUsers;
  document.getElementById('activeSurveys').textContent = data.activeSurveys;
  
  document.getElementById('userCount').textContent = data.metrics.users;
  document.getElementById('clickCount').textContent = data.metrics.clicks;
  document.getElementById('rpiCount').textContent = data.metrics.rpi;
  document.getElementById('placeholderCount').textContent = data.metrics.placeholder;

  // Create charts
  createActivityChart(data.activityData);
  createSubmissionsChart(data.submissionsData);
}

function updateLogo(url) {
  if (url) {
    document.getElementById('logoImg').src = url;
  }
}

function createActivityChart(data) {
  const ctx = document.getElementById('activityChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.label),
      datasets: [{
        label: 'Activity',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.5)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function createSubmissionsChart(data) {
  const ctx = document.getElementById('submissionsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(item => item.label),
      datasets: [{
        label: 'Submissions',
        data: data.map(item => item.value),
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Initialize on load
window.onload = initializeDashboard;
</script>
