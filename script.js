function calculate() {
  const birthdate = new Date(document.getElementById('birthdate').value);
  if (!birthdate || isNaN(birthdate)) {
    alert("Please enter a valid birthdate.");
    return;
  }

  const now = new Date();
  const msLived = now - birthdate;
  const daysLived = Math.floor(msLived / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, Math.floor(80 * 365.25 - daysLived));

  const avgHeartRate = 80;
  const avgBreathsPerMin = 16;

  const heartbeats = Math.floor((msLived / 1000 / 60) * avgHeartRate).toLocaleString();
  const breaths = Math.floor((msLived / 1000 / 60) * avgBreathsPerMin).toLocaleString();

  document.getElementById('heartbeats').textContent = heartbeats;
  document.getElementById('breaths').textContent = breaths;
  document.getElementById('daysLived').textContent = daysLived.toLocaleString();
  document.getElementById('daysLeft').textContent = daysLeft.toLocaleString();

  document.getElementById('results').classList.remove('hidden');

  const ctx = document.getElementById('lifeChart').getContext('2d');
  if (window.lifeChart) window.lifeChart.destroy();
  window.lifeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Days Lived', 'Days Left'],
      datasets: [{
        data: [daysLived, daysLeft],
        backgroundColor: ['#00c49a', '#ff6361']
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw.toLocaleString()} days`;
            }
          }
        }
      }
    }
  });
}
