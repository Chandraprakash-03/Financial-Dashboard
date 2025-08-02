import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <div class="table-header">
        <h3 class="table-title">{{title}}</h3>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th *ngFor="let column of columns">{{column.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of data">
              <td *ngFor="let column of columns">
                {{getFormattedValue(row[column.key], column.format)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-wrapper {
      padding: 0;
    }

    .table-title {
      margin: 0 0 24px 0;
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.025em;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background: #f8fafc;
      padding: 20px 16px;
      text-align: left;
      font-weight: 700;
      color: #0f172a;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .data-table td {
      padding: 20px 16px;
      border-bottom: 1px solid #e2e8f0;
      color: #374151;
      font-weight: 500;
      font-size: 15px;
    }

    .data-table tr:hover {
      background: rgba(59, 130, 246, 0.05);
    }
  `]
})
export class DataTableComponent {
  @Input() title!: string;
  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  getFormattedValue(value: any, format?: string): string {
    if (value === null || value === undefined) return '-';
    
    if (typeof value === 'string') return value;
    if (typeof value !== 'number') return value.toString();

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          notation: value >= 10000000 ? 'compact' : 'standard'
        }).format(value);
      default:
        return value.toLocaleString('en-IN');
    }
  }
}