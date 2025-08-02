import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { ChartComponent } from '../chart/chart.component';
import { DrillDownModalComponent } from '../drill-down-modal/drill-down-modal.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, ChartComponent, DrillDownModalComponent],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="header-content">
          <h1 class="dashboard-title">Financial Analytics Dashboard</h1>
          <p class="dashboard-subtitle">Real-time insights across 15+ cities</p>
        </div>
        <div class="header-controls">
          <button class="refresh-btn" (click)="refreshData()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Primary KPI Cards Grid -->
      <div class="kpi-grid">
        <app-kpi-card
          title="Total Revenue"
          [value]="dashboardData.totalRevenue || 0"
          [trend]="dashboardData.revenueTrend || 0"
          format="currency"
          trendColor="success"
          kpiType="totalRevenue"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          title="Total Expenses"
          [value]="dashboardData.totalExpenses || 0"
          [trend]="dashboardData.expenseTrend || 0"
          format="currency"
          trendColor="warning"
          kpiType="totalExpenses"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          title="Cash Collection"
          [value]="dashboardData.totalCashCollection || 0"
          [trend]="dashboardData.cashTrend || 0"
          format="currency"
          trendColor="warning"
          kpiType="cashCollection"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          title="Digital & Card"
          [value]="dashboardData.totalCombinedDigital || 0"
          [trend]="dashboardData.digitalTrend || 0"
          format="currency"
          trendColor="success"
          kpiType="combinedDigital"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          title="Insurance"
          [value]="dashboardData.totalInsurance || 0"
          [trend]="dashboardData.insuranceTrend || 0"
          format="currency"
          trendColor="info"
          kpiType="insurance"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          title="Investment Income"
          [value]="dashboardData.totalInvestmentIncome || 0"
          [trend]="dashboardData.investmentTrend || 0"
          format="currency"
          trendColor="success"
          kpiType="investmentIncome"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>
      </div>

      <!-- Main Revenue & Expense Charts -->
      <div class="main-charts-grid">
        <div class="chart-card large-chart">
          <app-chart
            title="City-wise Revenue vs Expenses"
            [data]="dashboardData.revenueExpenseChartData"
            type="bar">
          </app-chart>
        </div>

        <div class="chart-card">
          <app-chart
            title="Payment Mode Distribution"
            [data]="dashboardData.paymentModeData"
            type="pie">
          </app-chart>
        </div>
      </div>

      <!-- Bento Grid Layout for Analytics -->
      <div class="bento-grid">
        <div class="bento-item large-bento">
          <app-chart
            title="Revenue Sources"
            [data]="dashboardData.revenueSourcesData"
            type="pie">
          </app-chart>
        </div>

        <div class="bento-item">
          <app-chart
            title="Revenue"
            [data]="dashboardData.ophthalmologyRevenueData"
            type="bar">
          </app-chart>
        </div>

        <div class="bento-item">
          <app-chart
            title="Revenue by Time Slot"
            [data]="dashboardData.timeSlotRevenueData"
            type="bar">
          </app-chart>
        </div>

        <div class="bento-item wide-bento">
          <app-chart
            title="Top 5 Cities by Revenue"
            [data]="dashboardData.topCitiesData"
            type="doughnut">
          </app-chart>
        </div>

        <div class="bento-item">
          <app-chart
            title="Expenses by Category"
            [data]="dashboardData.expenseCategoryData"
            type="pie">
          </app-chart>
        </div>

        <div class="bento-item">
          <app-chart
            title="Expenses"
            [data]="dashboardData.ophthalmologyExpenseData"
            type="bar">
          </app-chart>
        </div>

        <div class="bento-item tall-bento">
          <app-chart
            title="Major Vendors Expenses"
            [data]="dashboardData.majorVendorsData"
            type="doughnut">
          </app-chart>
        </div>

        <div class="bento-item">
          <app-chart
            title="Digital vs Traditional Payments"
            [data]="dashboardData.paymentComparisonData"
            type="doughnut">
          </app-chart>
        </div>
      </div>

      <!-- Trends Bento Grid Section -->
      <div class="trends-kpi-section">
        <div class="section-header">
          <h2>Key Performance Indicators & Trends</h2>
        </div>
        
        <div class="bento-grid-trends">
          <div class="bento-item revenue-expenses">
            <app-chart
              title="Revenue and Expenses Trend"
              [data]="dashboardData.revenueExpensesTrendData"
              type="line">
            </app-chart>
          </div>

          <div class="bento-item net-income">
            <app-chart
              title="Net Income Trend"
              [data]="dashboardData.netIncomeTrendData"
              type="line">
            </app-chart>
          </div>

          <div class="bento-item reconciliation">
            <app-chart
              title="Reconciliation Trend"
              [data]="dashboardData.reconciliationTrendData"
              type="line">
            </app-chart>
          </div>

          <div class="bento-item cash-flow">
            <app-chart
              title="Cash Flow Analysis"
              [data]="dashboardData.cashFlowData"
              type="line">
            </app-chart>
          </div>

          <div class="bento-item revenue-target">
            <app-chart
              title="Revenue vs Target"
              [data]="dashboardData.revenueTargetData"
              type="bar">
            </app-chart>
          </div>

          <div class="bento-item patient-volume">
            <app-chart
              title="Patient Volume vs Revenue"
              [data]="dashboardData.patientVolumeRevenueData"
              type="line">
            </app-chart>
          </div>
        </div>
      </div>

      <!-- Alerts Section -->
      <div class="alerts-section">
        <div class="section-header">
          <h2>Alerts</h2>
        </div>
        <div class="alerts-grid">
          <div class="alert-card" *ngFor="let alert of dashboardData.alerts" [ngClass]="alert.status | lowercase" (click)="onAlertClick(alert.type)">
            <div class="alert-header">
              <h3>{{ alert.title }}</h3>
              <span class="alert-status" [ngClass]="alert.status | lowercase">{{ alert.status }}</span>
            </div>
            <p class="alert-details">{{ alert.details }}</p>
            <div class="alert-action">
              <button>View Details</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Drill Down Modal -->
      <app-drill-down-modal
        [isVisible]="showDrillDown"
        [drillDownData]="currentDrillDownData"
        (close)="closeDrillDown()">
      </app-drill-down-modal>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 12px;
      min-height: 100vh;
      background: #F5F5F5;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(15px);
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .dashboard-title {
      margin: 0;
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .dashboard-subtitle {
      margin: 4px 0 0 0;
      color: #64748b;
      font-size: 14px;
    }

    .refresh-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 8px;
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.3s ease;
    }

    .refresh-btn:hover {
      background: rgba(59, 130, 246, 0.2);
      transform: translateY(-1px);
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .main-charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 12px;
      margin-bottom: 20px;
    }

    /* Bento Grid Styles (Analytics) */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .bento-item {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(15px);
      border-radius: 16px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 12px;
      min-height: 300px;
    }

    .bento-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    }

    .bento-item app-chart {
      flex: 1;
      overflow: visible;
      max-height: 100%;
    }

    .bento-item.large-bento {
      grid-column: 1 / 5;
      grid-row: 1 / 3;
      min-height: 400px;
    }

    .bento-item:nth-child(2) {
      grid-column: 5 / 9;
      grid-row: 1 / 2;
    }

    .bento-item:nth-child(3) {
      grid-column: 9 / 13;
      grid-row: 1 / 2;
    }

    .bento-item.wide-bento {
      grid-column: 5 / 13;
      grid-row: 2 / 3;
    }

    .bento-item:nth-child(5) {
      grid-column: 1 / 5;
      grid-row: 3 / 4;
    }

    .bento-item:nth-child(6) {
      grid-column: 5 / 9;
      grid-row: 3 / 4;
    }

    .bento-item.tall-bento {
      grid-column: 9 / 13;
      grid-row: 3 / 5;
      min-height: 450px;
    }

    .bento-item:nth-child(8) {
      grid-column: 1 / 9;
      grid-row: 4 / 5;
    }

    /* Trends Bento Grid Styles */
    .trends-kpi-section {
      margin-bottom: 24px;
      padding: 16px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .section-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .bento-grid-trends {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 12px;
    }

    .bento-grid-trends .bento-item {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 10px 36px rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
      overflow: visible;
      padding: 12px;
      display: flex;
      flex-direction: column;
      min-height: 350px;
    }

    .bento-grid-trends .bento-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 48px rgba(0, 0, 0, 0.18);
    }

    .bento-grid-trends .bento-item app-chart {
      flex: 1;
      overflow: visible;
    }

    .bento-grid-trends .bento-item.revenue-expenses {
      grid-column: span 4;
    }

    .bento-grid-trends .bento-item.net-income {
      grid-column: span 3;
    }

    .bento-grid-trends .bento-item.reconciliation {
      grid-column: span 2;
    }

    .bento-grid-trends .bento-item.cash-flow {
      grid-column: span 3;
    }

    .bento-grid-trends .bento-item.revenue-target {
      grid-column: span 2;
    }

    .bento-grid-trends .bento-item.patient-volume {
      grid-column: span 3;
    }

    /* Alerts Section Styles */
    .alerts-section {
      margin-bottom: 24px;
      padding: 16px;
    }

    .alerts-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 12px;
    }

    .alert-card {
      grid-column: span 4;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(15px);
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .alert-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
    }

    .alert-card.critical {
      border-left: 4px solid #ef4444;
    }

    .alert-card.warning {
      border-left: 4px solid #f59e0b;
    }

    .alert-card.info {
      border-left: 4px solid #3b82f6;
    }

    .alert-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .alert-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .alert-status {
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
    }

    .alert-status.critical {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .alert-status.warning {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
    }

    .alert-status.info {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    .alert-details {
      margin: 0;
      font-size: 14px;
      color: #64748b;
    }

    .alert-action button {
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      background: #3b82f6;
      color: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .alert-action button:hover {
      background: #2563eb;
    }

    .chart-card {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(15px);
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
      min-height: 300px;
      transition: all 0.3s ease;
      overflow: visible;
      padding: 12px;
    }

    .chart-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
    }

    .large-chart {
      min-height: 350px;
    }

    /* Responsive Design */
    @media (max-width: 1600px) {
      .bento-grid {
        grid-template-columns: repeat(8, 1fr);
      }

      .bento-item.large-bento {
        grid-column: 1 / 5;
        grid-row: 1 / 3;
      }

      .bento-item:nth-child(2) {
        grid-column: 5 / 7;
        grid-row: 1 / 2;
      }

      .bento-item:nth-child(3) {
        grid-column: 7 / 9;
        grid-row: 1 / 2;
      }

      .bento-item.wide-bento {
        grid-column: 5 / 9;
        grid-row: 2 / 3;
      }

      .bento-item:nth-child(5) {
        grid-column: 1 / 3;
        grid-row: 3 / 4;
      }

      .bento-item:nth-child(6) {
        grid-column: 3 / 5;
        grid-row: 3 / 4;
      }

      .bento-item.tall-bento {
        grid-column: 5 / 7;
        grid-row: 3 / 5;
      }

      .bento-item:nth-child(8) {
        grid-column: 7 / 9;
        grid-row: 3 / 4;
      }

      .bento-grid-trends .bento-item.revenue-expenses {
        grid-column: span 4;
      }

      .bento-grid-trends .bento-item.net-income {
        grid-column: span 3;
      }

      .bento-grid-trends .bento-item.reconciliation {
        grid-column: span 2;
      }

      .bento-grid-trends .bento-item.cash-flow {
        grid-column: span 3;
      }

      .bento-grid-trends .bento-item.revenue-target {
        grid-column: span 2;
      }

      .bento-grid-trends .bento-item.patient-volume {
        grid-column: span 3;
      }
    }

    @media (max-width: 1400px) {
      .main-charts-grid {
        grid-template-columns: 1fr;
      }

      .bento-grid-trends {
        grid-template-columns: repeat(12, 1fr);
      }

      .bento-grid-trends .bento-item.revenue-expenses {
        grid-column: span 4;
      }

      .bento-grid-trends .bento-item.net-income {
        grid-column: span 4;
      }

      .bento-grid-trends .bento-item.reconciliation {
        grid-column: span 4;
      }

      .bento-grid-trends .bento-item.cash-flow {
        grid-column: span 4;
      }

      .bento-grid-trends .bento-item.revenue-target {
        grid-column: span 4;
      }

      .bento-grid-trends .bento-item.patient-volume {
        grid-column: span 4;
      }

      .alerts-grid {
        grid-template-columns: repeat(12, 1fr);
      }

      .alert-card {
        grid-column: span 6; /* Two cards per row */
      }
    }

    @media (max-width: 1200px) {
      .bento-grid {
        grid-template-columns: repeat(4, 1fr);
      }

      .bento-item.large-bento {
        grid-column: 1 / 5;
        grid-row: 1 / 2;
      }

      .bento-item:nth-child(2) {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
      }

      .bento-item:nth-child(3) {
        grid-column: 3 / 5;
        grid-row: 2 / 3;
      }

      .bento-item.wide-bento {
        grid-column: 1 / 5;
        grid-row: 3 / 4;
      }

      .bento-item:nth-child(5) {
        grid-column: 1 / 3;
        grid-row: 4 / 5;
      }

      .bento-item:nth-child(6) {
        grid-column: 3 / 5;
        grid-row: 4 / 5;
      }

      .bento-item.tall-bento {
        grid-column: 1 / 3;
        grid-row: 5 / 6;
      }

      .bento-item:nth-child(8) {
        grid-column: 3 / 5;
        grid-row: 5 / 6;
      }

      .bento-grid-trends {
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: auto auto;
      }

      .bento-grid-trends .bento-item.revenue-expenses {
        grid-column: 1 / 5;
        grid-row: 1 / 2;
        min-height: 320px;
      }

      .bento-grid-trends .bento-item.net-income {
        grid-column: 5 / 9;
        grid-row: 1 / 2;
        min-height: 320px;
      }

      .bento-grid-trends .bento-item.reconciliation {
        grid-column: 9 / 13;
        grid-row: 1 / 2;
        min-height: 320px;
      }

      .bento-grid-trends .bento-item.cash-flow {
        grid-column: 1 / 7;
        grid-row: 2 / 3;
        min-height: 320px;
      }

      .bento-grid-trends .bento-item.revenue-target {
        grid-column: 7 / 13;
        grid-row: 2 / 3;
        min-height: 320px;
      }

      .bento-grid-trends .bento-item.patient-volume {
        grid-column: 1 / 7;
        grid-row: 3 / 4;
        min-height: 320px;
      }

      .alerts-grid {
        grid-template-columns: repeat(12, 1fr);
      }

      .alert-card {
        grid-column: span 6; /* Two cards per row */
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 8px;
      }
      
      .dashboard-header {
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }
      
      .dashboard-title {
        font-size: 24px;
        text-align: center;
      }
      
      .kpi-grid {
        grid-template-columns: 1fr;
      }

      .bento-grid, .bento-grid-trends, .alerts-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .bento-item, .bento-grid-trends .bento-item, .alert-card {
        grid-column: 1 / -1 !important;
        grid-row: auto !important;
        min-height: 320px;
      }

      .chart-card {
        min-height: 250px;
      }
      
      .large-chart {
        min-height: 300px;
      }
    }

    @media (max-width: 480px) {
      .dashboard-container {
        padding: 6px;
      }
      
      .dashboard-header {
        padding: 12px;
      }
      
      .dashboard-title {
        font-size: 20px;
      }
      
      .chart-card {
        min-height: 220px;
      }
      
      .large-chart {
        min-height: 260px;
      }

      .bento-item, .bento-grid-trends .bento-item, .alert-card {
        min-height: 300px !important;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};
  showDrillDown = false;
  currentDrillDownData: any = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  refreshData() {
    this.loadDashboardData();
  }

  onKpiCardClick(kpiType: string) {
    this.currentDrillDownData = this.dashboardService.getKPIDrilldownData(kpiType);
    this.showDrillDown = true;
  }

  onAlertClick(alertType: string) {
    this.currentDrillDownData = this.dashboardService.getKPIDrilldownData(alertType);
    this.showDrillDown = true;
  }

  closeDrillDown() {
    this.showDrillDown = false;
    this.currentDrillDownData = null;
  }

  private loadDashboardData() {
    this.dashboardData = this.dashboardService.getDashboardData();
  }
}