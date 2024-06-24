document.getElementById('factorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cohesion = parseFloat(document.getElementById('cohesion').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const angulo = parseFloat(document.getElementById('angulo').value);

    const anguloRad = angulo * (Math.PI / 180); // Convertir a radianes
    const numerador = cohesion + (peso * altura * Math.cos(anguloRad) * Math.tan(anguloRad));
    const denominador = peso * altura * Math.sin(anguloRad);
    const factorSeguridad = numerador / denominador;

    updateChart(altura, factorSeguridad);
    updateTable(factorSeguridad);
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('factorForm').reset();
    resetChart();
    resetTable();
});

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Altura del Talud', 'Factor de Seguridad'],
        datasets: [{
            label: 'Valores',
            data: [0, 0],
            borderColor: ['#FFD700', '#8B4513'],
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: ['#FFD700', '#8B4513'],
            pointBorderColor: ['#8B4513', '#FFD700'],
            pointRadius: 5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valores'
                }
            }
        }
    }
});

function updateChart(altura, factorSeguridad) {
    myChart.data.datasets[0].data[0] = altura;
    myChart.data.datasets[0].data[1] = factorSeguridad;
    myChart.update();
}

function resetChart() {
    myChart.data.datasets[0].data = [0, 0];
    myChart.update();
}

function updateTable(factor) {
    const tbody = document.querySelector('#resultTable tbody');
    const row = document.createElement('tr');

    const cellFactor = document.createElement('td');
    cellFactor.textContent = factor.toFixed(2);
    row.appendChild(cellFactor);

    const cellStability = document.createElement('td');
    if (factor >= 1.5) {
        cellStability.textContent = 'FS en situaciones casi permanentes: Estable';
    } else if (factor >= 1.3) {
        cellStability.textContent = 'FS en situaciones provisionales: Estable';
    } else if (factor >= 1.1) {
        cellStability.textContent = 'FS en situaciones accidentales o de sismo: Estable';
    } else {
        cellStability.textContent = 'No Estable';
    }
    row.appendChild(cellStability);

    tbody.appendChild(row);
}

function resetTable() {
    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';
}