import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card" [class]="'kpi-card--' + trendColor" (click)="onCardClick()">
      <div class="kpi-header">
        <h3 class="kpi-title">{{title}}</h3>
      </div>
      
      <div class="kpi-content">
        <div class="kpi-value mono">{{getFormattedValue()}}</div>
        
        <div class="kpi-trend" *ngIf="trend !== null">
          <div class="trend-indicator" [class]="getTrendClass()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path *ngIf="trend > 0" d="M7 14l5-5 5 5z"/>
              <path *ngIf="trend < 0" d="M7 10l5 5 5-5z"/>
              <path *ngIf="trend === 0" d="M8 12h8"/>
            </svg>
            <span class="trend-value mono">{{getTrendValue()}}</span>
          </div>
        </div>
      </div>
      
      <div class="drill-down-hint">
        <span>Click to drill down</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      min-height: 180px;
      cursor: pointer;
      position: relative;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-color: #cbd5e1;
    }

    .kpi-card--success { border-left: 4px solid #10b981; }
    .kpi-card--danger { border-left: 4px solid #ef4444; }
    .kpi-card--warning { border-left: 4px solid #f59e0b; }
    .kpi-card--info { border-left: 4px solid #3b82f6; }

    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .kpi-title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .kpi-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 20px;
    }

    .kpi-value {
      font-size: 32px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.025em;
    }

    .trend-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
    }

    .trend-indicator.positive { 
      background: rgba(16, 185, 129, 0.2); 
      color: #10b981; 
    }
    .trend-indicator.negative { 
      background: rgba(239, 68, 68, 0.2); 
      color: #ef4444; 
    }
    .trend-indicator.neutral { 
      background: rgba(148, 163, 184, 0.2); 
      color: #94a3b8; 
    }

    .drill-down-hint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color: #64748b;
      opacity: 0.8;
      transition: opacity 0.3s ease;
      font-weight: 500;
    }

    .kpi-card:hover .drill-down-hint {
      opacity: 1;
    }
  `]
})
export class KpiCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() trend: number | null = null;
  @Input() format = 'currency';
  @Input() trendColor = 'info';
  @Input() kpiType!: string;
  @Output() cardClick = new EventEmitter<string>();

  onCardClick() {
    this.cardClick.emit(this.kpiType);
  }

  getFormattedValue(): string {
    if (this.format === 'currency') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: this.value >= 10000000 ? 'compact' : 'standard'
      }).format(this.value);
    }
    return this.value.toLocaleString();
  }

  getTrendClass(): string {
    if (this.trend === null) return 'neutral';
    return this.trend > 0 ? 'positive' : this.trend < 0 ? 'negative' : 'neutral';
  }

  getTrendValue(): string {
    if (this.trend === null) return '';
    return `${Math.abs(this.trend).toFixed(1)}%`;
  }
}