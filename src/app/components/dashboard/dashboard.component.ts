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
      padding: 24px;
      min-height: 100vh;
      background: #f8fafc;
      max-width: 1920px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding: 32px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .dashboard-title {
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.025em;
    }

    .dashboard-subtitle {
      margin: 4px 0 0 0;
      color: #64748b;
      font-size: 16px;
      font-weight: 500;
    }

    .refresh-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: #ffffff;
      color: #475569;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .refresh-btn:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .main-charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    /* Bento Grid Styles (Analytics) */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }

    .bento-item {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 20px;
      min-height: 320px;
    }

    .bento-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-color: #cbd5e1;
    }

    .bento-item app-chart {
      flex: 1;
      overflow: visible;
      max-height: 100%;
    }

    .bento-item.large-bento {
      grid-column: 1 / 5;
      grid-row: 1 / 3;
      min-height: 420px;
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
      min-height: 480px;
    }

    .bento-item:nth-child(8) {
      grid-column: 1 / 9;
      grid-row: 4 / 5;
    }

    /* Trends Bento Grid Styles */
    .trends-kpi-section {
      margin-bottom: 40px;
      padding: 0;
    }

    .section-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .section-header h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.025em;
    }

    .bento-grid-trends {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
    }

    .bento-grid-trends .bento-item {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      overflow: visible;
      padding: 20px;
      display: flex;
      flex-direction: column;
      min-height: 380px;
    }

    .bento-grid-trends .bento-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-color: #cbd5e1;
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
      margin-bottom: 40px;
      padding: 0;
    }

    .alerts-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
    }

    .alert-card {
      grid-column: span 4;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .alert-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-color: #cbd5e1;
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
      font-size: 20px;
      font-weight: 600;
      color: #0f172a;
    }

    .alert-status {
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
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
      font-size: 15px;
      color: #64748b;
      line-height: 1.6;
    }

    .alert-action button {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background: #3b82f6;
      color: white;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .alert-action button:hover {
      background: #2563eb;
    }

    .chart-card {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      min-height: 320px;
      transition: all 0.3s ease;
      overflow: visible;
      padding: 20px;
    }

    .chart-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-color: #cbd5e1;
    }

    .large-chart {
      min-height: 380px;
    }

    /* Responsive Design */
    @media (max-width: 2560px) {
      .dashboard-container {
        padding: 32px;
      }
    }

    @media (max-width: 1600px) {
      .dashboard-container {
        padding: 24px;
      }

      .bento-grid {
        grid-template-columns: repeat(8, 1fr);
        gap: 16px;
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

      .bento-grid-trends {
        gap: 16px;
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

      .alerts-grid {
        gap: 16px;
      }
    }

    @media (max-width: 1400px) {
      .dashboard-container {
        padding: 20px;
      }

      .main-charts-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .bento-grid-trends {
        grid-template-columns: repeat(12, 1fr);
        gap: 16px;
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
        gap: 16px;
      }

      .alert-card {
        grid-column: span 6; /* Two cards per row */
      }
    }

    @media (max-width: 1200px) {
      .dashboard-container {
        padding: 16px;
      }

      .kpi-grid {
        gap: 16px;
      }

      .bento-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
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
        gap: 16px;
      }

      .bento-grid-trends .bento-item.revenue-expenses {
        grid-column: 1 / 5;
        grid-row: 1 / 2;
        min-height: 340px;
      }

      .bento-grid-trends .bento-item.net-income {
        grid-column: 5 / 9;
        grid-row: 1 / 2;
        min-height: 340px;
      }

      .bento-grid-trends .bento-item.reconciliation {
        grid-column: 9 / 13;
        grid-row: 1 / 2;
        min-height: 340px;
      }

      .bento-grid-trends .bento-item.cash-flow {
        grid-column: 1 / 7;
        grid-row: 2 / 3;
        min-height: 340px;
      }

      .bento-grid-trends .bento-item.revenue-target {
        grid-column: 7 / 13;
        grid-row: 2 / 3;
        min-height: 340px;
      }

      .bento-grid-trends .bento-item.patient-volume {
        grid-column: 1 / 7;
        grid-row: 3 / 4;
        min-height: 340px;
      }

      .alerts-grid {
        grid-template-columns: repeat(12, 1fr);
        gap: 16px;
      }

      .alert-card {
        grid-column: span 6; /* Two cards per row */
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }
      
      .dashboard-header {
        flex-direction: column;
        gap: 16px;
        padding: 24px;
        margin-bottom: 24px;
      }
      
      .dashboard-title {
        font-size: 28px;
        text-align: center;
      }

      .dashboard-subtitle {
        text-align: center;
      }
      
      .kpi-grid {
        grid-template-columns: 1fr;
        gap: 16px;
        margin-bottom: 24px;
      }

      .main-charts-grid {
        gap: 16px;
        margin-bottom: 24px;
      }

      .bento-grid, .bento-grid-trends, .alerts-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .bento-item, .bento-grid-trends .bento-item, .alert-card {
        grid-column: 1 / -1 !important;
        grid-row: auto !important;
        min-height: 300px;
        padding: 16px;
      }

      .chart-card {
        min-height: 280px;
        padding: 16px;
      }
      
      .large-chart {
        min-height: 320px;
      }

      .trends-kpi-section, .alerts-section {
        margin-bottom: 32px;
      }

      .section-header {
        margin-bottom: 24px;
      }

      .section-header h2 {
        font-size: 24px;
      }
    }

    @media (max-width: 480px) {
      .dashboard-container {
        padding: 12px;
      }
      
      .dashboard-header {
        padding: 20px;
      }
      
      .dashboard-title {
        font-size: 24px;
      }

      .dashboard-subtitle {
        font-size: 14px;
      }
      
      .chart-card {
        min-height: 260px;
        padding: 16px;
      }
      
      .large-chart {
        min-height: 300px;
      }

      .bento-item, .bento-grid-trends .bento-item, .alert-card {
        min-height: 280px !important;
        padding: 16px;
      }

      .section-header h2 {
        font-size: 22px;
      }

      .alert-card {
        padding: 20px;
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