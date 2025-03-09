import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
    selector: 'odell-chart-solds',
    imports: [],
    template: `
    <div style="width: 100%; max-width: 600px; margin: auto;">
      <canvas id="salesChart"></canvas>
    </div>
  `,
    styleUrl: './chart-solds.component.scss'
})
export class ChartSoldsComponent implements OnInit{
  ngOnInit(): void {
    // Registrar todos los elementos de Chart.js
    Chart.register(...registerables);

    // Configuración de la gráfica
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'], // Meses
        datasets: [
          {
            label: 'Ventas',
            data: [50, 100, 150, 200, 250, 300, 400], // Datos de ejemplo
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Crecimiento de Ventas a lo Largo del Tiempo',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Ventas (en unidades)',
            },
            beginAtZero: true,
          },
        },
      },
    };

    // Renderizar la gráfica
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    new Chart(ctx, config);
  }
}
