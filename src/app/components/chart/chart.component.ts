import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-wrapper">
      <div class="chart-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="chart-container">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      padding: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-header h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: #2c3e50;
      text-align: center;
    }

    .chart-container {
      position: relative;
      flex: 1;
      min-height: 250px;
    }

    canvas {
      max-height: 100% !important;
    }
  `]
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() title!: string;
  @Input() data: any;
  @Input() type: 'line' | 'bar' | 'doughnut' | 'pie' = 'line';

  private chart: Chart | null = null;

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx || !this.data) return;

    const config = this.getChartConfig();
    this.chart = new Chart(ctx, config);
  }

  private getChartConfig(): ChartConfiguration {
    switch (this.type) {
      case 'bar':
        return this.getBarConfig();
      case 'pie':
        return this.getPieConfig();
      case 'doughnut':
        return this.getDoughnutConfig();
      case 'line':
      default:
        return this.getLineConfig();
    }
  }

  private getLineConfig(): ChartConfiguration {
    // Handle datasets format for multi-dataset line charts
    if (this.data?.datasets) {
      return {
        type: 'line',
        data: {
          labels: this.data.labels,
          datasets: this.data.datasets.map((dataset: any) => ({
            ...dataset,
            borderWidth: dataset.borderWidth || 3,
            fill: dataset.fill !== undefined ? dataset.fill : true,
            tension: dataset.tension || 0.4,
            pointBackgroundColor: dataset.borderColor || '#3b82f6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5
          }))
        },
        options: this.data.options || {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed.y;
                  return `${context.dataset.label}: ₹${Number(value).toLocaleString('en-IN')}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  return '₹' + Number(value).toLocaleString('en-IN');
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      };
    }

    // Fallback for simple values/labels format
    const values = this.data?.values || [];
    const labels = this.data?.labels || [];

    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: this.title.includes('Trend') ? this.title.replace(' Trend', '') : 'Value',
          data: values,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                return `${context.dataset.label}: ₹${Number(value).toLocaleString('en-IN')}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '₹' + Number(value).toLocaleString('en-IN');
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    };
  }

  private getBarConfig(): ChartConfiguration {
    // Handle both single dataset and multiple datasets
    if (this.data?.datasets) {
      return {
        type: 'bar',
        data: {
          labels: this.data.labels,
          datasets: this.data.datasets.map((dataset: any) => ({
            ...dataset,
            borderRadius: 4,
            borderWidth: 1
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed.y;
                  return `${context.dataset.label}: ₹${Number(value).toLocaleString('en-IN')}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  return '₹' + Number(value).toLocaleString('en-IN');
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      };
    }

    // Fallback for simple data structure
    const values = this.data?.values || [];
    const labels = this.data?.labels || [];

    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Value',
          data: values,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                return `${context.dataset.label}: ₹${Number(value).toLocaleString('en-IN')}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '₹' + Number(value).toLocaleString('en-IN');
              }
            }
          }
        }
      }
    };
  }

  private getPieConfig(): ChartConfiguration {
    // Handle Chart.js format with datasets
    if (this.data?.datasets) {
      return {
        type: 'pie',
        data: {
          labels: this.data.labels,
          datasets: this.data.datasets.map((dataset: any) => ({
            ...dataset,
            borderWidth: 2,
            borderColor: '#ffffff'
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 15,
                generateLabels: (chart: any) => {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map((label: string, i: number) => {
                      const value = data.datasets[0].data[i];
                      const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      return {
                        text: `${label}: ₹${Number(value).toLocaleString('en-IN')} (${percentage}%)`,
                        fillStyle: data.datasets[0].backgroundColor[i],
                        strokeStyle: data.datasets[0].borderColor || '#ffffff',
                        lineWidth: 2,
                        pointStyle: 'circle'
                      };
                    });
                  }
                  return [];
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed;
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${context.label}: ₹${Number(value).toLocaleString('en-IN')} (${percentage}%)`;
                }
              }
            }
          }
        }
      };
    }

    // Fallback for legacy segment format
    const segments = this.data?.segments || [];
    return {
      type: 'pie',
      data: {
        labels: segments.map((s: any) => s.label),
        datasets: [{
          data: segments.map((s: any) => s.value),
          backgroundColor: segments.map((s: any) => s.color),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed;
                return `${context.label}: ₹${Number(value).toLocaleString('en-IN')}`;
              }
            }
          }
        }
      }
    };
  }

  private getDoughnutConfig(): ChartConfiguration {
    // Handle simple values/labels format
    if (this.data?.values && this.data?.labels) {
      const colors = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
      ];

      return {
        type: 'doughnut',
        data: {
          labels: this.data.labels,
          datasets: [{
            data: this.data.values,
            backgroundColor: colors.slice(0, this.data.values.length),
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 15,
                generateLabels: (chart: any) => {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map((label: string, i: number) => {
                      const value = data.datasets[0].data[i];
                      return {
                        text: `${label}: ₹${Number(value).toLocaleString('en-IN')}`,
                        fillStyle: data.datasets[0].backgroundColor[i],
                        strokeStyle: '#ffffff',
                        lineWidth: 2,
                        pointStyle: 'circle'
                      };
                    });
                  }
                  return [];
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed;
                  return `${context.label}: ₹${Number(value).toLocaleString('en-IN')}`;
                }
              }
            }
          }
        }
      };
    }

    // Handle Chart.js datasets format
    if (this.data?.datasets) {
      return {
        type: 'doughnut',
        data: {
          labels: this.data.labels,
          datasets: this.data.datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed;
                  return `${context.label}: ₹${Number(value).toLocaleString('en-IN')}`;
                }
              }
            }
          }
        }
      };
    }

    // Handle legacy segments format
    const segments = this.data?.segments || [];
    return {
      type: 'doughnut',
      data: {
        labels: segments.map((s: any) => s.label),
        datasets: [{
          data: segments.map((s: any) => s.value),
          backgroundColor: segments.map((s: any) => s.color),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed;
                return `${context.label}: ₹${Number(value).toLocaleString('en-IN')}`;
              }
            }
          }
        }
      }
    };
  }
}