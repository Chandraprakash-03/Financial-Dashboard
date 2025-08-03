import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { ChartComponent } from '../chart/chart.component';
import { DrillDownModalComponent } from '../drill-down-modal/drill-down-modal.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    ChartComponent,
    DrillDownModalComponent,
  ],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="header-content">
          <h1 class="dashboard-title">Financial Analytics Dashboard</h1>
          <p class="dashboard-subtitle">Real-time insights across 15+ cities</p>
          <div class="header-stats">
            <span class="stat-item">
              <span class="stat-label">Last Updated</span>
              <span class="stat-value">{{ getCurrentTime() }}</span>
            </span>
            <span class="stat-divider"></span>
            <span class="stat-item">
              <span class="stat-label">Data Sources</span>
              <span class="stat-value">15 Active</span>
            </span>
          </div>
        </div>
        <div class="header-controls">
          <button class="control-btn secondary" (click)="toggleTimeRange()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
            {{ currentTimeRange }}
          </button>
          <button class="control-btn primary" (click)="refreshData()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
              />
            </svg>
            Refresh
          </button>
        </div>
      </header>

      <!-- Summary Metrics KPIs -->
      <section class="metrics-section">
        <div class="section-title">
          <h2>Summary Metrics</h2>
          <div class="section-subtitle">
            Key performance indicators overview
          </div>
        </div>

        <div class="kpi-grid summary-kpis">
          <!-- Primary Financial KPIs -->
          <app-kpi-card
            title="Total Revenue"
            [value]="dashboardData.totalRevenue || 0"
            [trend]="dashboardData.revenueTrend || 0"
            format="currency"
            trendColor="success"
            kpiType="totalRevenue"
            subtitle="MTD / YTD Performance"
            (cardClick)="onKpiCardClick($event)"
            class="kpi-primary"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Total Expenses"
            [value]="dashboardData.totalExpenses || 0"
            [trend]="dashboardData.expenseTrend || 0"
            format="currency"
            trendColor="warning"
            kpiType="totalExpenses"
            subtitle="MTD / YTD Tracking"
            (cardClick)="onKpiCardClick($event)"
            class="kpi-primary"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Net Operating Income"
            [value]="
              (dashboardData.totalRevenue || 0) -
              (dashboardData.totalExpenses || 0)
            "
            [trend]="dashboardData.netIncomeTrend || 0"
            format="currency"
            trendColor="success"
            kpiType="netOperatingIncome"
            subtitle="Revenue - Expenses"
            (cardClick)="onKpiCardClick($event)"
            class="kpi-featured"
          >
          </app-kpi-card>

          <!-- Secondary Financial KPIs -->
          <app-kpi-card
            title="Avg Revenue Per Patient"
            [value]="dashboardData.avgRevenuePerPatient || 0"
            [trend]="dashboardData.avgRevenuePerPatientTrend || 0"
            format="currency"
            trendColor="info"
            kpiType="avgRevenuePerPatient"
            subtitle="Patient efficiency metric"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Reconciliation %"
            [value]="dashboardData.reconciliationPercentage || 0"
            [trend]="dashboardData.reconciliationTrend || 0"
            format="percentage"
            trendColor="success"
            kpiType="reconciliationPercentage"
            subtitle="Account accuracy"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Cash on Hand"
            [value]="dashboardData.cashOnHand || 0"
            [trend]="dashboardData.cashTrend || 0"
            format="currency"
            trendColor="info"
            kpiType="cashOnHand"
            subtitle="Aggregated cash balance"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Bank Balance"
            [value]="dashboardData.bankBalance || 0"
            [trend]="dashboardData.bankBalanceTrend || 0"
            format="currency"
            trendColor="success"
            kpiType="bankBalance"
            subtitle="Total bank summary"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <app-kpi-card
            title="AR Days"
            [value]="dashboardData.arDays || 0"
            [trend]="dashboardData.arDaysTrend || 0"
            format="number"
            trendColor="warning"
            kpiType="arDays"
            subtitle="Account receivable days"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <!-- Payment Mode KPIs -->
          <app-kpi-card
            title="Cash Collection"
            [value]="dashboardData.totalCashCollection || 0"
            [trend]="dashboardData.cashCollectionTrend || 0"
            format="currency"
            trendColor="warning"
            kpiType="cashCollection"
            subtitle="Cash payment mode"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Digital & Card"
            [value]="dashboardData.totalCombinedDigital || 0"
            [trend]="dashboardData.digitalTrend || 0"
            format="currency"
            trendColor="success"
            kpiType="combinedDigital"
            subtitle="Digital payment modes"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Insurance"
            [value]="dashboardData.totalInsurance || 0"
            [trend]="dashboardData.insuranceTrend || 0"
            format="currency"
            trendColor="info"
            kpiType="insurance"
            subtitle="Insurance collections"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>

          <app-kpi-card
            title="Investment Income"
            [value]="dashboardData.totalInvestmentIncome || 0"
            [trend]="dashboardData.investmentTrend || 0"
            format="currency"
            trendColor="success"
            kpiType="investmentIncome"
            subtitle="Investment returns"
            (cardClick)="onKpiCardClick($event)"
          >
          </app-kpi-card>
        </div>
      </section>

      <!-- Breakdown Views Section -->
      <section class="breakdown-section">
        <div class="section-title">
          <h2>Breakdown Views</h2>
          <div class="section-subtitle">
            Detailed categorization of income & expenses
          </div>
        </div>

        <div class="breakdown-grid">
          <!-- Revenue Breakdown -->
          <div class="breakdown-panel revenue-panel">
            <div class="panel-header">
              <h3>Revenue Breakdown</h3>
              <div class="panel-controls">
                <button class="panel-btn" (click)="switchRevenueView('source')">
                  Source
                </button>
                <button
                  class="panel-btn"
                  (click)="switchRevenueView('location')"
                >
                  Location
                </button>
                <button
                  class="panel-btn"
                  (click)="switchRevenueView('department')"
                >
                  Department
                </button>
              </div>
            </div>
            <div class="panel-content">
              <app-chart
                title="Revenue Sources"
                [data]="dashboardData.revenueSourcesData"
                type="doughnut"
              >
              </app-chart>
            </div>
          </div>

          <!-- Expense Breakdown -->
          <div class="breakdown-panel expense-panel">
            <div class="panel-header">
              <h3>Expense Breakdown</h3>
              <div class="panel-controls">
                <button
                  class="panel-btn"
                  (click)="switchExpenseView('category')"
                >
                  Category
                </button>
                <button
                  class="panel-btn"
                  (click)="switchExpenseView('department')"
                >
                  Department
                </button>
                <button
                  class="panel-btn"
                  (click)="switchExpenseView('vendors')"
                >
                  Vendors
                </button>
              </div>
            </div>
            <div class="panel-content">
              <app-chart
                title="Expenses by Category"
                [data]="dashboardData.expenseCategoryData"
                type="doughnut"
              >
              </app-chart>
            </div>
          </div>

          <!-- Payment Mode Analysis -->
          <div class="breakdown-panel payment-panel">
            <div class="panel-header">
              <h3>Payment Mode Analysis</h3>
            </div>
            <div class="panel-content">
              <app-chart
                title="Payment Mode Distribution"
                [data]="dashboardData.paymentModeData"
                type="pie"
              >
              </app-chart>
            </div>
          </div>

          <!-- Location Performance -->
          <div class="breakdown-panel location-panel">
            <div class="panel-header">
              <h3>Location Performance</h3>
            </div>
            <div class="panel-content">
              <app-chart
                title="City-wise Revenue vs Expenses"
                [data]="dashboardData.revenueExpenseChartData"
                type="bar"
              >
              </app-chart>
            </div>
          </div>

          <!-- Time Slot Analysis -->
          <div class="breakdown-panel timeslot-panel">
            <div class="panel-header">
              <h3>Revenue by Time Slot</h3>
            </div>
            <div class="panel-content">
              <app-chart
                title="Revenue by Time Slot"
                [data]="dashboardData.timeSlotRevenueData"
                type="bar"
              >
              </app-chart>
            </div>
          </div>

          <!-- Major Vendors -->
          <div class="breakdown-panel vendors-panel">
            <div class="panel-header">
              <h3>Major Vendors Expenses</h3>
            </div>
            <div class="panel-content">
              <app-chart
                title="Major Vendors Expenses"
                [data]="dashboardData.majorVendorsData"
                type="doughnut"
              >
              </app-chart>
            </div>
          </div>
        </div>
      </section>

      <!-- Trend Charts Section -->
      <section class="trends-section">
        <div class="section-title">
          <h2>Trend Analysis</h2>
          <div class="section-subtitle">
            Performance patterns and seasonality insights
          </div>
        </div>

        <div class="trends-grid">
          <div class="trend-card primary-trend">
            <app-chart
              title="Revenue and Expenses Trend"
              [data]="dashboardData.revenueExpensesTrendData"
              type="line"
            >
            </app-chart>
          </div>

          <div class="trend-card">
            <app-chart
              title="Net Income Trend"
              [data]="dashboardData.netIncomeTrendData"
              type="line"
            >
            </app-chart>
          </div>

          <div class="trend-card">
            <app-chart
              title="Reconciliation Trend"
              [data]="dashboardData.reconciliationTrendData"
              type="line"
            >
            </app-chart>
          </div>

          <div class="trend-card">
            <app-chart
              title="Cash Flow Analysis"
              [data]="dashboardData.cashFlowData"
              type="line"
            >
            </app-chart>
          </div>

          <div class="trend-card">
            <app-chart
              title="Revenue vs Target"
              [data]="dashboardData.revenueTargetData"
              type="bar"
            >
            </app-chart>
          </div>

          <div class="trend-card">
            <app-chart
              title="Patient Volume vs Revenue"
              [data]="dashboardData.patientVolumeRevenueData"
              type="line"
            >
            </app-chart>
          </div>
        </div>
      </section>

      <!-- Alerts Section -->
      <section class="alerts-section">
        <div class="section-title">
          <h2>System Alerts</h2>
          <div class="section-subtitle">
            Critical notifications and performance warnings
          </div>
        </div>

        <div class="alerts-grid">
          <div
            class="alert-card"
            *ngFor="let alert of dashboardData.alerts"
            [ngClass]="[alert.status.toLowerCase(), alert.type.toLowerCase()]"
            (click)="onAlertClick(alert.type)"
          >
            <div class="alert-icon">
              <svg
                *ngIf="alert.status === 'Critical'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2L1 21h22L12 2zm0 3.3L19.53 19H4.47L12 5.3zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"
                />
              </svg>
              <svg
                *ngIf="alert.status === 'Warning'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"
                />
              </svg>
              <svg
                *ngIf="alert.status === 'Info'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                />
              </svg>
            </div>

            <div class="alert-content">
              <div class="alert-header">
                <h4>{{ alert.title }}</h4>
                <span class="alert-status">{{ alert.status }}</span>
              </div>
              <p class="alert-description">{{ alert.details }}</p>
              <div class="alert-meta">
                <span class="alert-time">{{
                  alert.timestamp || 'Just now'
                }}</span>
                <span class="alert-severity">{{
                  alert.severity || 'Medium'
                }}</span>
              </div>
            </div>

            <button class="alert-action">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Drill Down Modal -->
      <app-drill-down-modal
        [isVisible]="showDrillDown"
        [drillDownData]="currentDrillDownData"
        (close)="closeDrillDown()"
      >
      </app-drill-down-modal>
    </div>
  `,
  styles: [
    `
      /* Variables */
      :host {
        --primary-50: #eff6ff;
        --primary-100: #dbeafe;
        --primary-500: #3b82f6;
        --primary-600: #2563eb;
        --primary-700: #1d4ed8;

        --success-50: #f0fdf4;
        --success-100: #dcfce7;
        --success-500: #22c55e;
        --success-600: #16a34a;

        --warning-50: #fffbeb;
        --warning-100: #fef3c7;
        --warning-500: #f59e0b;
        --warning-600: #d97706;

        --danger-50: #fef2f2;
        --danger-100: #fee2e2;
        --danger-500: #ef4444;
        --danger-600: #dc2626;

        --gray-50: #f9fafb;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-300: #d1d5db;
        --gray-400: #9ca3af;
        --gray-500: #6b7280;
        --gray-600: #4b5563;
        --gray-700: #374151;
        --gray-800: #1f2937;
        --gray-900: #111827;

        --surface: #ffffff;
        --surface-2: #f8fafc;
        --border: #e2e8f0;
        --border-hover: #cbd5e1;

        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);
        --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);
        --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
          0 8px 10px -6px rgb(0 0 0 / 0.1);

        --border-radius: 12px;
        --border-radius-lg: 16px;
        --border-radius-xl: 20px;
      }

      /* Base Styles */
      .dashboard-container {
        min-height: 100vh;
        background: var(--gray-50);
        padding: 24px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          sans-serif;
      }

      /* Header Styles */
      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 32px;
        padding: 32px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
      }

      .header-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .dashboard-title {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        color: var(--gray-900);
        letter-spacing: -0.025em;
      }

      .dashboard-subtitle {
        margin: 0;
        font-size: 16px;
        color: var(--gray-600);
        font-weight: 500;
      }

      .header-stats {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 12px;
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .stat-label {
        font-size: 12px;
        color: var(--gray-400);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .stat-value {
        font-size: 14px;
        color: var(--gray-700);
        font-weight: 600;
      }

      .stat-divider {
        width: 1px;
        height: 24px;
        background: var(--border);
      }

      .header-controls {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .control-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        border: 1px solid var(--border);
        border-radius: var(--border-radius);
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        outline: none;
      }

      .control-btn.primary {
        background: var(--primary-500);
        color: white;
        border-color: var(--primary-500);
      }

      .control-btn.primary:hover {
        background: var(--primary-600);
        border-color: var(--primary-600);
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
      }

      .control-btn.secondary {
        background: var(--surface);
        color: var(--gray-700);
      }

      .control-btn.secondary:hover {
        background: var(--gray-50);
        border-color: var(--border-hover);
      }

      /* Section Styles */
      .metrics-section,
      .breakdown-section,
      .trends-section,
      .alerts-section {
        margin-bottom: 48px;
      }

      .section-title {
        margin-bottom: 24px;
        text-align: center;
      }

      .section-title h2 {
        margin: 0 0 8px 0;
        font-size: 28px;
        font-weight: 700;
        color: var(--gray-900);
        letter-spacing: -0.025em;
      }

      .section-subtitle {
        font-size: 16px;
        color: var(--gray-600);
        font-weight: 500;
      }

      /* KPI Grid */
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }

      .summary-kpis {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      /* Breakdown Section */
      .breakdown-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 24px;
      }

      .breakdown-panel {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
        transition: all 0.2s ease;
      }

      .breakdown-panel:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }

      .panel-header {
        padding: 24px 24px 16px 24px;
        border-bottom: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .panel-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--gray-900);
      }

      .panel-controls {
        display: flex;
        gap: 8px;
      }

      .panel-btn {
        padding: 6px 12px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--gray-600);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .panel-btn:hover,
      .panel-btn.active {
        background: var(--primary-50);
        color: var(--primary-600);
        border-color: var(--primary-200);
      }

      .panel-content {
        padding: 24px;
        min-height: 300px;
      }

      /* Trends Section */
      .trends-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 24px;
      }

      .trend-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        padding: 24px;
        min-height: 350px;
        transition: all 0.2s ease;
      }

      .trend-card:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }

      .trend-card.primary-trend {
        grid-column: 1 / -1;
        min-height: 400px;
      }

      /* Alerts Section */
      .alerts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 20px;
      }

      .alert-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }

      .alert-card::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: var(--gray-300);
        transition: all 0.2s ease;
      }

      .alert-card.critical::before {
        background: var(--danger-500);
      }
      .alert-card.warning::before {
        background: var(--warning-500);
      }
      .alert-card.info::before {
        background: var(--primary-500);
      }

      .alert-card:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }

      .alert-icon {
        flex-shrink: 0;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: var(--gray-100);
      }

      .alert-card.critical .alert-icon {
        background: var(--danger-50);
        color: var(--danger-600);
      }

      .alert-card.warning .alert-icon {
        background: var(--warning-50);
        color: var(--warning-600);
      }

      .alert-card.info .alert-icon {
        background: var(--primary-50);
        color: var(--primary-600);
      }

      .alert-content {
        flex: 1;
        min-width: 0;
      }

      .alert-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .alert-header h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--gray-900);
      }

      .alert-status {
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .alert-card.critical .alert-status {
        background: var(--danger-100);
        color: var(--danger-700);
      }

      .alert-card.warning .alert-status {
        background: var(--warning-100);
        color: var(--warning-700);
      }

      .alert-card.info .alert-status {
        background: var(--primary-100);
        color: var(--primary-700);
      }

      .alert-description {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: var(--gray-600);
        line-height: 1.5;
      }

      .alert-meta {
        display: flex;
        gap: 16px;
        font-size: 12px;
        color: var(--gray-400);
      }

      .alert-time,
      .alert-severity {
        font-weight: 500;
      }

      .alert-action {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 8px;
        background: var(--gray-100);
        color: var(--gray-600);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .alert-action:hover {
        background: var(--gray-200);
        color: var(--gray-700);
      }

      /* Responsive Design */
      @media (max-width: 1400px) {
        .summary-kpis {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .breakdown-grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }

        .trends-grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
      }

      @media (max-width: 1200px) {
        .dashboard-container {
          padding: 16px;
        }

        .dashboard-header {
          padding: 24px;
          margin-bottom: 24px;
        }

        .dashboard-title {
          font-size: 28px;
        }

        .metrics-section,
        .breakdown-section,
        .trends-section,
        .alerts-section {
          margin-bottom: 32px;
        }

        .section-title h2 {
          font-size: 24px;
        }
      }

      @media (max-width: 768px) {
        .dashboard-container {
          padding: 12px;
        }

        .dashboard-header {
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          text-align: center;
        }

        .header-controls {
          justify-content: center;
        }

        .dashboard-title {
          font-size: 24px;
        }

        .kpi-grid,
        .breakdown-grid,
        .trends-grid,
        .alerts-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .trend-card.primary-trend {
          grid-column: 1;
        }

        .panel-header {
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .panel-controls {
          align-self: stretch;
          justify-content: center;
        }
      }

      @media (max-width: 480px) {
        .dashboard-container {
          padding: 8px;
        }

        .dashboard-header {
          padding: 16px;
        }

        .dashboard-title {
          font-size: 20px;
        }

        .control-btn {
          padding: 10px 16px;
          font-size: 13px;
        }

        .section-title h2 {
          font-size: 20px;
        }

        .panel-content {
          padding: 16px;
          min-height: 250px;
        }

        .trend-card {
          padding: 16px;
          min-height: 300px;
        }

        .alert-card {
          padding: 16px;
        }
      }

      /* KPI Card Enhancements */
      :host ::ng-deep .kpi-primary {
        border-left: 4px solid var(--primary-500);
      }

      :host ::ng-deep .kpi-featured {
        border-left: 4px solid var(--success-500);
        background: linear-gradient(
          135deg,
          var(--success-50) 0%,
          var(--surface) 100%
        );
      }

      /* Chart Container Enhancements */
      :host ::ng-deep app-chart {
        display: block;
        height: 100%;
      }

      /* Hover Effects */
      .breakdown-panel:hover .panel-header h3 {
        color: var(--primary-600);
      }

      .trend-card:hover {
        border-color: var(--primary-200);
      }

      /* Loading States */
      .loading {
        opacity: 0.7;
        pointer-events: none;
      }

      .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid var(--primary-500);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Focus States */
      .control-btn:focus,
      .panel-btn:focus,
      .alert-card:focus,
      .alert-action:focus {
        outline: 2px solid var(--primary-500);
        outline-offset: 2px;
      }

      /* Print Styles */
      @media print {
        .dashboard-container {
          background: white;
          padding: 0;
        }

        .header-controls,
        .panel-controls,
        .alert-action {
          display: none;
        }

        .dashboard-header,
        .breakdown-panel,
        .trend-card,
        .alert-card {
          box-shadow: none;
          border: 1px solid var(--gray-300);
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};
  showDrillDown = false;
  currentDrillDownData: any = null;
  currentTimeRange = 'MTD';
  isLoading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
    this.initializeAlerts();
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  toggleTimeRange() {
    const ranges = ['MTD', 'YTD', 'Daily'];
    const currentIndex = ranges.indexOf(this.currentTimeRange);
    this.currentTimeRange = ranges[(currentIndex + 1) % ranges.length];
    this.loadDashboardData();
  }

  refreshData() {
    this.isLoading = true;
    setTimeout(() => {
      this.loadDashboardData();
      this.isLoading = false;
    }, 1000);
  }

  onKpiCardClick(kpiType: string) {
    this.currentDrillDownData =
      this.dashboardService.getKPIDrilldownData(kpiType);
    this.showDrillDown = true;
  }

  onAlertClick(alertType: string) {
    this.currentDrillDownData =
      this.dashboardService.getKPIDrilldownData(alertType);
    this.showDrillDown = true;
  }

  closeDrillDown() {
    this.showDrillDown = false;
    this.currentDrillDownData = null;
  }

  switchRevenueView(view: string) {
    // Implementation for switching revenue breakdown view
    console.log('Switching revenue view to:', view);
  }

  switchExpenseView(view: string) {
    // Implementation for switching expense breakdown view
    console.log('Switching expense view to:', view);
  }

  private loadDashboardData() {
    this.dashboardData = this.dashboardService.getDashboardData();

    // Add computed fields for new KPIs
    if (this.dashboardData) {
      this.dashboardData.avgRevenuePerPatient =
        this.calculateAvgRevenuePerPatient();
      this.dashboardData.reconciliationPercentage =
        this.calculateReconciliationPercentage();
      this.dashboardData.cashOnHand = this.calculateCashOnHand();
      this.dashboardData.bankBalance = this.calculateBankBalance();
      this.dashboardData.arDays = this.calculateARDays();
    }
  }

  private initializeAlerts() {
    // Initialize alerts with required KPI types
    if (!this.dashboardData.alerts) {
      this.dashboardData.alerts = [];
    }

    // Add missing alert types
    const requiredAlerts = [
      {
        type: 'revenueMismatch',
        title: 'Revenue Mismatch Detected',
        details: 'Discrepancy found between reported and calculated revenue',
        status: 'Critical',
        timestamp: new Date().toISOString(),
        severity: 'High',
      },
      {
        type: 'unpostedTransaction',
        title: 'Unposted Transactions',
        details: 'Transactions not posted in Tally system',
        status: 'Warning',
        timestamp: new Date().toISOString(),
        severity: 'Medium',
      },
      {
        type: 'delayedBankCredit',
        title: 'Delayed Bank Credit',
        details: 'Bank credits pending for over 24 hours',
        status: 'Warning',
        timestamp: new Date().toISOString(),
        severity: 'Medium',
      },
      {
        type: 'negativeCashFlow',
        title: 'Negative Cash Flow',
        details: 'Expenses exceeding revenue this period',
        status: 'Critical',
        timestamp: new Date().toISOString(),
        severity: 'High',
      },
      {
        type: 'underperformance',
        title: 'Revenue Underperformance',
        details: 'Revenue below expected threshold',
        status: 'Warning',
        timestamp: new Date().toISOString(),
        severity: 'Medium',
      },
      {
        type: 'arDelay',
        title: 'AR Collection Delay',
        details: 'Insurance/scheme payments overdue',
        status: 'Info',
        timestamp: new Date().toISOString(),
        severity: 'Medium',
      },
    ];

    this.dashboardData.alerts = [
      ...(this.dashboardData.alerts || []),
      ...requiredAlerts,
    ];
  }

  private calculateAvgRevenuePerPatient(): number {
    // Mock calculation - replace with actual logic
    const totalRevenue = this.dashboardData.totalRevenue || 0;
    const totalPatients = 1250; // This should come from actual patient data
    return totalPatients > 0 ? totalRevenue / totalPatients : 0;
  }

  private calculateReconciliationPercentage(): number {
    // Mock calculation - replace with actual logic
    return 94.5; // This should be calculated from actual reconciliation data
  }

  private calculateCashOnHand(): number {
    // Mock calculation - replace with actual logic
    return (this.dashboardData.totalCashCollection || 0) * 0.8;
  }

  private calculateBankBalance(): number {
    // Mock calculation - replace with actual logic
    return (
      (this.dashboardData.totalCombinedDigital || 0) +
      (this.dashboardData.totalInsurance || 0)
    );
  }

  private calculateARDays(): number {
    // Mock calculation - replace with actual logic
    const totalAR = this.dashboardData.totalInsurance || 0;
    const dailyRevenue = (this.dashboardData.totalRevenue || 0) / 30;
    return dailyRevenue > 0 ? totalAR / dailyRevenue : 0;
  }
}
