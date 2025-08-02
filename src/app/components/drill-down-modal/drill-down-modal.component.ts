import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-drill-down-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="modal-overlay"
      *ngIf="isVisible"
      (click)="onOverlayClick($event)"
    >
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ drillDownData?.title }}</h2>
          <button class="close-btn" (click)="closeModal()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <!-- Summary Cards -->
          <div class="summary-cards">
            <div class="summary-card current">
              <h4>Current Period</h4>
              <div class="summary-value">
                {{ formatCurrency(drillDownData?.currentTotal || 0) }}
              </div>
            </div>
            <div class="summary-card previous">
              <h4>Previous Period</h4>
              <div class="summary-value">
                {{ formatCurrency(drillDownData?.previousTotal || 0) }}
              </div>
            </div>
            <div class="summary-card growth">
              <h4>Growth</h4>
              <div class="summary-value" [class]="getGrowthClass()">
                {{ getGrowthPercentage() }}
              </div>
            </div>
          </div>

          <!-- Charts Section -->
          <div class="charts-section">
            <div class="chart-container">
              <h4>Current vs Previous Period Comparison</h4>
              <div class="chart-wrapper-inner">
                <canvas #comparisonChart width="800" height="400"></canvas>
              </div>
            </div>
          </div>

          <!-- Data Table -->
          <div class="table-section">
            <h4>Detailed Breakdown</h4>
            <div class="table-wrapper">
              <table class="drill-down-table">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Current</th>
                    <th>Previous</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of drillDownData?.tableData">
                    <td class="city-name">{{ row.city }}</td>
                    <td class="currency">{{ formatCurrency(row.current) }}</td>
                    <td class="currency">{{ formatCurrency(row.previous) }}</td>
                    <td
                      class="growth-cell"
                      [class]="getRowGrowthClass(row.growth)"
                    >
                      {{ row.growth }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      }

      .modal-content {
        background: white;
        border-radius: 24px;
        width: 90%;
        max-width: 1200px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s ease;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32px 40px;
        border-bottom: 1px solid #e2e8f0;
      }

      .modal-header h2 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
        color: #0f172a;
        letter-spacing: -0.025em;
      }

      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
        border-radius: 10px;
        color: #64748b;
        transition: all 0.3s ease;
      }

      .close-btn:hover {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }

      .modal-body {
        padding: 40px;
      }

      .summary-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 24px;
        margin-bottom: 40px;
      }

      .summary-card {
        padding: 24px;
        border-radius: 16px;
        text-align: center;
        border: 1px solid #e2e8f0;
      }

      .summary-card.current {
        background: rgba(59, 130, 246, 0.05);
        border-color: rgba(59, 130, 246, 0.2);
      }

      .summary-card.previous {
        background: rgba(148, 163, 184, 0.05);
        border-color: rgba(148, 163, 184, 0.2);
      }

      .summary-card.growth {
        background: rgba(16, 185, 129, 0.05);
        border-color: rgba(16, 185, 129, 0.2);
      }

      .summary-card h4 {
        margin: 0 0 16px 0;
        font-size: 15px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .summary-value {
        font-size: 28px;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.025em;
      }

      .summary-value.positive {
        color: #10b981;
      }
      .summary-value.negative {
        color: #ef4444;
      }

      .charts-section {
        margin-bottom: 40px;
      }

      .chart-container {
        background: #f8fafc;
        border-radius: 16px;
        padding: 32px;
        border: 1px solid #e2e8f0;
      }

      .chart-container h4 {
        margin: 0 0 24px 0;
        font-size: 20px;
        font-weight: 600;
        color: #0f172a;
        letter-spacing: -0.025em;
      }

      .chart-wrapper-inner {
        position: relative;
        width: 100%;
        max-height: 420px;
        min-height: 320px;
      }

      .chart-container canvas {
        width: 100% !important;
        height: 100% !important;
      }

      .table-section h4 {
        margin: 0 0 24px 0;
        font-size: 20px;
        font-weight: 600;
        color: #0f172a;
        letter-spacing: -0.025em;
      }

      .table-wrapper {
        overflow-x: auto;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
      }

      .drill-down-table {
        width: 100%;
        border-collapse: collapse;
      }

      .drill-down-table th {
        background: #f8fafc;
        padding: 20px;
        text-align: left;
        font-weight: 700;
        color: #0f172a;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .drill-down-table td {
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
      }

      .city-name {
        font-weight: 600;
        color: #0f172a;
      }

      .currency {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
      }

      .growth-cell {
        font-weight: 700;
      }

      .growth-cell.positive {
        color: #10b981;
      }
      .growth-cell.negative {
        color: #ef4444;
      }

      .drill-down-table tr:hover {
        background: rgba(59, 130, 246, 0.05);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .modal-content {
          width: 95%;
          margin: 16px;
          border-radius: 20px;
        }

        .modal-header,
        .modal-body {
          padding: 24px;
        }

        .summary-cards {
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .chart-container {
          padding: 24px;
        }

        .drill-down-table th,
        .drill-down-table td {
          padding: 16px;
        }
      }
    `,
  ],
})
export class DrillDownModalComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @ViewChild('comparisonChart', { static: false })
  comparisonChart!: ElementRef<HTMLCanvasElement>;
  @Input() isVisible = false;
  @Input() drillDownData: any = null;
  @Output() close = new EventEmitter<void>();

  private chart: Chart | null = null;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && this.isVisible && this.drillDownData) {
      // Delay chart creation to ensure DOM is ready
      setTimeout(() => this.createChart(), 200);
    }
    if (changes['drillDownData'] && this.drillDownData && this.isVisible) {
      setTimeout(() => this.createChart(), 200);
    }
  }

  ngAfterViewInit() {
    // Chart will be created via ngOnChanges when data is available
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  onOverlayClick(event: Event) {
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: value >= 10000000 ? 'compact' : 'standard',
    }).format(value);
  }

  getGrowthPercentage(): string {
    if (!this.drillDownData) return '0%';
    const current = this.drillDownData.currentTotal;
    const previous = this.drillDownData.previousTotal;
    const growth = ((current - previous) / previous) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;
  }

  getGrowthClass(): string {
    if (!this.drillDownData) return '';
    const current = this.drillDownData.currentTotal;
    const previous = this.drillDownData.previousTotal;
    return current > previous ? 'positive' : 'negative';
  }

  getRowGrowthClass(growth: string): string {
    const value = parseFloat(growth);
    return value > 0 ? 'positive' : 'negative';
  }

  private createChart() {
    if (
      !this.comparisonChart?.nativeElement ||
      !this.drillDownData ||
      !this.isVisible
    ) {
      return;
    }

    const ctx = this.comparisonChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    try {
      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: this.drillDownData.comparisonCharts.current.labels,
          datasets: [
            {
              label: 'Current Period',
              data: this.drillDownData.comparisonCharts.current.values,
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
            },
            {
              label: 'Previous Period',
              data: this.drillDownData.comparisonCharts.previous.values,
              backgroundColor: 'rgba(148, 163, 184, 0.8)',
              borderColor: 'rgba(148, 163, 184, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  return (
                    context.dataset.label +
                    ': ₹' +
                    context.parsed.y.toLocaleString('en-IN')
                  );
                },
              },
              borderWidth: 1,
              cornerRadius: 4,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(148, 163, 184, 0.1)',
              },
              ticks: {
                callback: function (value: any) {
                  return '₹' + value.toLocaleString('en-IN');
                },
              },
            },
          },
        },
      };

      this.chart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }
}
