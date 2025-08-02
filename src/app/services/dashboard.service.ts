import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private sampleData = {
    "reportRunDate": "20-06-2025",
    "paymentReports": {
      "reportType": "Payment Mode (Paying & Free)",
      "data": [
        {
          "Patient_Type": "Grand Total (Paying, Free, CC, VCs)",
          "Total": 313435770,
          "Madurai": 66397380,
          "Tirunelveli": 39472750,
          "Coimbatore": 41813620,
          "Pondy": 33583800,
          "Salem": 12191000,
          "Chennai": 58890970,
          "Tirupathi": 28001540,
          "Thanjavur": 702600,
          "Theni": 7144780,
          "Dindigul": 7687050,
          "Tuticorin": 3773050,
          "CBE_CITY": 2084000,
          "Tiruppur": 3846830,
          "Udumalpet": 5677800,
          "Kovilpatti": 2168600
        },
        {
          "Patient_Type": "Consulting Fees",
          "Total": 8120200,
          "Madurai": 1876100,
          "Tirunelveli": 868400,
          "Coimbatore": 987600,
          "Pondy": 810600,
          "Salem": 386700,
          "Chennai": 1175000,
          "Tirupathi": 500500,
          "Thanjavur": 227000,
          "Theni": 308300,
          "Dindigul": 265800,
          "Tuticorin": 154000,
          "CBE_CITY": 149200,
          "Tiruppur": 180200,
          "Udumalpet": 133000,
          "Kovilpatti": 97800
        },
        {
          "Patient_Type": "Surgical/Lasers",
          "Total": 255821070,
          "Madurai": 57425450,
          "Tirunelveli": 28911550,
          "Coimbatore": 23260310,
          "Pondy": 31576270,
          "Salem": 12337000,
          "Chennai": 49771450,
          "Tirupathi": 22636340,
          "Thanjavur": 297000,
          "Theni": 7412700,
          "Dindigul": 6320900,
          "Tuticorin": 3416100,
          "CBE_CITY": 1344500,
          "Tiruppur": 3582700,
          "Udumalpet": 5518500,
          "Kovilpatti": 2010300
        }
      ]
    },
    "cardReports": {
      "reportType": "Digital Payments",
      "data": [
        {
          "Patient_Type": "Cash Collection",
          "Total": 84195850,
          "Madurai": 20353250,
          "Tirunelveli": 12415450,
          "Coimbatore": 17306680,
          "Pondy": 9278850,
          "Salem": 3059600,
          "Chennai": 9974770,
          "Tirupathi": 4188300,
          "Thanjavur": 527000,
          "Theni": 1979550,
          "Dindigul": 1952950,
          "Tuticorin": 641450,
          "CBE_CITY": 170500,
          "Tiruppur": 78800,
          "Udumalpet": 1435400,
          "Kovilpatti": 833300
        },
        {
          "Patient_Type": "Card Collections",
          "Total": 71210920,
          "Madurai": 16160100,
          "Tirunelveli": 10733220,
          "Coimbatore": 8176700,
          "Pondy": 5789300,
          "Salem": 2214500,
          "Chennai": 15040660,
          "Tirupathi": 5760800,
          "Thanjavur": 0,
          "Theni": 1994100,
          "Dindigul": 1965650,
          "Tuticorin": 1105690,
          "CBE_CITY": 211000,
          "Tiruppur": 1012700,
          "Udumalpet": 900000,
          "Kovilpatti": 146500
        },
        {
          "Patient_Type": "Other digital Collections",
          "Total": 82666210,
          "Madurai": 16025700,
          "Tirunelveli": 7362250,
          "Coimbatore": 9764550,
          "Pondy": 11683060,
          "Salem": 2569100,
          "Chennai": 17335610,
          "Tirupathi": 6018550,
          "Thanjavur": 175600,
          "Theni": 1689900,
          "Dindigul": 1837700,
          "Tuticorin": 1398290,
          "CBE_CITY": 1001500,
          "Tiruppur": 1995600,
          "Udumalpet": 2817000,
          "Kovilpatti": 991800
        },
        {
          "Patient_Type": "Corporate/Insurance",
          "Total": 74597890,
          "Madurai": 13607230,
          "Tirunelveli": 8819630,
          "Coimbatore": 6518490,
          "Pondy": 6718390,
          "Salem": 4315000,
          "Chennai": 16492530,
          "Tirupathi": 12020390,
          "Thanjavur": 0,
          "Theni": 1402130,
          "Dindigul": 1921150,
          "Tuticorin": 627620,
          "CBE_CITY": 701000,
          "Tiruppur": 747330,
          "Udumalpet": 510000,
          "Kovilpatti": 197000
        }
      ]
    }
  };

  private cities = [
    'Madurai', 'Tirunelveli', 'Coimbatore', 'Pondy', 'Salem', 'Chennai', 
    'Tirupathi', 'Thanjavur', 'Theni', 'Dindigul', 'Tuticorin', 
    'CBE_CITY', 'Tiruppur', 'Udumalpet', 'Kovilpatti'
  ];

  private ophthalmologyServices = [
    'Cataract Surgery', 'LASIK', 'Retinal Procedures', 'Glaucoma Treatment', 
    'Corneal Transplant', 'Pediatric Eye Care', 'Oculoplasty', 'General Consultation'
  ];

  private timeSlots = ['Morning (8-12)', 'Afternoon (12-16)', 'Evening (16-20)', 'Night (20-24)'];
  private expenseCategories = ['Staff Salaries', 'Medical Equipment', 'Surgical Supplies', 'Facility Costs', 'Technology', 'Marketing'];
  private majorVendors = ['Alcon Inc', 'Johnson & Johnson Vision', 'Bausch + Lomb', 'Carl Zeiss Meditec', 'Hoya Corporation'];

  private getExpenseData(revenue: number): number {
    return Math.floor(revenue * 0.65);
  }

  private getPreviousData(currentValue: number): number {
    return Math.floor(currentValue * 0.85);
  }

  private generateTrendData(currentValue: number, growthRate: number) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const values = [];
    const baseValue = currentValue / (1 + growthRate / 100);
    
    for (let i = 0; i < 6; i++) {
      const variation = 1 + (growthRate * i) / 500 + (Math.random() - 0.5) * 0.1;
      values.push(Math.floor(baseValue * variation));
    }
    
    return { labels: months, values };
  }

  private generateRandomData(baseValue: number, count: number) {
    return Array.from({ length: count }, () => 
      Math.floor(baseValue * (0.7 + Math.random() * 0.6))
    );
  }

  private generateTargetData(actual: number[]) {
    return actual.map(value => Math.floor(value * (1.1 + Math.random() * 0.2)));
  }

  private generatePatientVolumeData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseVolume = 15000;
    const volumes = months.map((_, i) => baseVolume + (i * 500) + Math.floor(Math.random() * 1000));
    return { labels: months, values: volumes };
  }

  private generateAlertsData(dashboardData: any) {
    const alerts = [];

    // Revenue Mismatch (Mismatch >5% of total revenue)
    const revenueMismatchThreshold = dashboardData.totalRevenue * 0.05;
    const revenueMismatchCities = this.cities.filter(city => {
      const actual = (dashboardData.cityRevenueData.find((d: any) => d.city === city)?.revenue || 0);
      const expected = this.getPreviousData(actual) * 1.1; // Expected 10% growth
      return Math.abs(actual - expected) > revenueMismatchThreshold / this.cities.length;
    });
    alerts.push({
      type: 'revenueMismatch',
      title: 'Revenue Mismatch',
      status: revenueMismatchCities.length > 3 ? 'Critical' : revenueMismatchCities.length > 0 ? 'Warning' : 'Info',
      details: revenueMismatchCities.length > 0 
        ? `Revenue mismatch detected in ${revenueMismatchCities.length} cities: ${revenueMismatchCities.join(', ')}`
        : 'No significant revenue mismatches detected.',
      drilldown: this.getRevenueMismatchDrilldown(dashboardData, revenueMismatchCities)
    });

    // Unposted Transaction (5% of transactions unposted)
    const unpostedAmount = dashboardData.totalRevenue * 0.05;
    const unpostedCities = this.cities.filter(city => 
      Math.random() > 0.7 // Simulate unposted transactions
    ).slice(0, 3);
    alerts.push({
      type: 'unpostedTransaction',
      title: 'Unposted Transaction',
      status: unpostedCities.length > 2 ? 'Critical' : unpostedCities.length > 0 ? 'Warning' : 'Info',
      details: unpostedCities.length > 0 
        ? `Unposted transactions detected in ${unpostedCities.length} cities: ${unpostedCities.join(', ')}`
        : 'All transactions posted in Tally.',
      drilldown: this.getUnpostedTransactionDrilldown(dashboardData, unpostedCities)
    });

    // Delayed Bank Credit (>3 days for 10% of cash collections)
    const delayedCreditThreshold = dashboardData.totalCashCollection * 0.1;
    const delayedCreditCities = this.cities.filter(city => 
      (dashboardData.cityRevenueData.find((d: any) => d.city === city)?.cash || 0) * 0.15 > delayedCreditThreshold / this.cities.length
    ).slice(0, 4);
    alerts.push({
      type: 'delayedBankCredit',
      title: 'Delayed Bank Credit',
      status: delayedCreditCities.length > 3 ? 'Critical' : delayedCreditCities.length > 0 ? 'Warning' : 'Info',
      details: delayedCreditCities.length > 0 
        ? `Delayed bank credits detected in ${delayedCreditCities.length} cities: ${delayedCreditCities.join(', ')}`
        : 'No significant bank credit delays detected.',
      drilldown: this.getDelayedBankCreditDrilldown(dashboardData, delayedCreditCities)
    });

    // Negative Cash Flow (Expenses > Revenue)
    const negativeCashFlowCities = dashboardData.cityRevenueData.filter((d: any) => d.expense > d.revenue);
    alerts.push({
      type: 'negativeCashFlow',
      title: 'Negative Cash Flow',
      status: negativeCashFlowCities.length > 2 ? 'Critical' : negativeCashFlowCities.length > 0 ? 'Warning' : 'Info',
      details: negativeCashFlowCities.length > 0 
        ? `Negative cash flow in ${negativeCashFlowCities.length} cities: ${negativeCashFlowCities.map((d: any) => d.city).join(', ')}`
        : 'No negative cash flow detected.',
      drilldown: this.getNegativeCashFlowDrilldown(dashboardData, negativeCashFlowCities)
    });

    // Underperformance (Revenue < ₹1 crore)
    const underperformanceThreshold = 10000000; // ₹1 crore
    const underperformingCities = dashboardData.cityRevenueData.filter((d: any) => d.revenue < underperformanceThreshold);
    alerts.push({
      type: 'underperformance',
      title: 'Underperformance',
      status: underperformingCities.length > 3 ? 'Critical' : underperformingCities.length > 0 ? 'Warning' : 'Info',
      details: underperformingCities.length > 0 
        ? `Underperformance in ${underperformingCities.length} cities: ${underperformingCities.map((d: any) => d.city).join(', ')}`
        : 'All cities meeting revenue thresholds.',
      drilldown: this.getUnderperformanceDrilldown(dashboardData, underperformingCities)
    });

    // AR Delay (Insurance/Scheme delays >7 days)
    const arDelayThreshold = dashboardData.totalInsurance * 0.15;
    const arDelayCities = this.cities.filter(city => 
      (dashboardData.cityRevenueData.find((d: any) => d.city === city)?.insurance || 0) * 0.2 > arDelayThreshold / this.cities.length
    ).slice(0, 3);
    alerts.push({
      type: 'arDelay',
      title: 'AR Delay',
      status: arDelayCities.length > 2 ? 'Critical' : arDelayCities.length > 0 ? 'Warning' : 'Info',
      details: arDelayCities.length > 0 
        ? `Insurance/Scheme payment delays in ${arDelayCities.length} cities: ${arDelayCities.join(', ')}`
        : 'No significant AR delays detected.',
      drilldown: this.getARDelayDrilldown(dashboardData, arDelayCities)
    });

    return alerts;
  }

  getDashboardData() {
    const grandTotal = this.sampleData.paymentReports.data[0];
    const consultingFees = this.sampleData.paymentReports.data[1];
    const surgicalLasers = this.sampleData.paymentReports.data[2];
    
    const cashCollection = this.sampleData.cardReports.data[0];
    const cardCollection = this.sampleData.cardReports.data[1];
    const digitalCollection = this.sampleData.cardReports.data[2];
    const insuranceCollection = this.sampleData.cardReports.data[3];

    const combinedDigitalCard = cardCollection.Total + digitalCollection.Total;
    const totalExpenses = this.getExpenseData(grandTotal.Total);
    const investmentIncome = Math.floor(grandTotal.Total * 0.12);
    const netIncome = grandTotal.Total - totalExpenses;
    const patientVolumeData = this.generatePatientVolumeData();

    const dashboardData = {
      totalRevenue: grandTotal.Total,
      totalExpenses: totalExpenses,
      totalCashCollection: cashCollection.Total,
      totalCardCollection: cardCollection.Total,
      totalDigitalCollection: digitalCollection.Total,
      totalCombinedDigital: combinedDigitalCard,
      totalInsurance: insuranceCollection.Total,
      totalConsultingFees: consultingFees.Total,
      totalSurgicalRevenue: surgicalLasers.Total,
      totalInvestmentIncome: investmentIncome,
      netIncome: netIncome,
      
      revenueTrend: 8.5,
      expenseTrend: 5.2,
      cashTrend: -2.3,
      digitalTrend: 15.2,
      insuranceTrend: 18.2,
      investmentTrend: 22.5,
      
      revenueExpenseChartData: {
        labels: this.cities,
        datasets: [
          {
            label: 'Revenue',
            data: this.cities.map(city => (grandTotal as any)[city] || 0),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2
          },
          {
            label: 'Expenses',
            data: this.cities.map(city => this.getExpenseData((grandTotal as any)[city] || 0)),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2
          }
        ]
      },
      
      paymentModeData: {
        labels: ['Cash', 'Digital & Card', 'Insurance'],
        datasets: [{
          data: [
            cashCollection.Total,
            combinedDigitalCard,
            insuranceCollection.Total
          ],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      
      topCitiesData: {
        labels: this.cities.slice(0, 5),
        datasets: [{
          data: this.cities.slice(0, 5).map(city => (grandTotal as any)[city] || 0),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      
      revenueSourcesData: {
        labels: ['Consulting', 'Surgical/Lasers', 'Investments', 'Other Services'],
        datasets: [{
          data: [
            consultingFees.Total,
            surgicalLasers.Total,
            investmentIncome,
            grandTotal.Total - consultingFees.Total - surgicalLasers.Total - investmentIncome
          ],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      
      ophthalmologyRevenueData: {
        labels: this.ophthalmologyServices,
        datasets: [{
          label: 'Revenue',
          data: this.generateRandomData(grandTotal.Total / this.ophthalmologyServices.length, this.ophthalmologyServices.length),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2
        }]
      },
      
      timeSlotRevenueData: {
        labels: this.timeSlots,
        datasets: [{
          label: 'Revenue',
          data: this.generateRandomData(grandTotal.Total / this.timeSlots.length, this.timeSlots.length),
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 2
        }]
      },
      
      expenseCategoryData: {
        labels: this.expenseCategories,
        datasets: [{
          data: this.generateRandomData(totalExpenses / this.expenseCategories.length, this.expenseCategories.length),
          backgroundColor: ['#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4', '#8b5cf6'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      
      ophthalmologyExpenseData: {
        labels: this.ophthalmologyServices.slice(0, 5),
        datasets: [{
          label: 'Expenses',
          data: this.generateRandomData(totalExpenses / this.ophthalmologyServices.length, 5),
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2
        }]
      },
      
      majorVendorsData: {
        labels: this.majorVendors,
        datasets: [{
          data: this.generateRandomData(totalExpenses / this.majorVendors.length, this.majorVendors.length),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },

      paymentComparisonData: {
        labels: ['Digital Payments', 'Traditional Payments'],
        datasets: [{
          data: [combinedDigitalCard, cashCollection.Total],
          backgroundColor: ['#10b981', '#ef4444'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },

      revenueExpensesTrendData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue',
            data: this.generateTrendData(grandTotal.Total / 10000000, 8.5).values,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Expenses',
            data: this.generateTrendData(totalExpenses / 10000000, 5.2).values,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }
        ],
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
                label: function(context: any) {
                  return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (₹ Crores)'
              },
              ticks: {
                callback: function(value: any) {
                  return Number(value).toLocaleString('en-IN') + ' Cr';
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
      },

      netIncomeTrendData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Net Income',
          data: this.generateTrendData(netIncome / 10000000, 12.3).values,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }],
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
                label: function(context: any) {
                  return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Net Income (₹ Crores)'
              },
              ticks: {
                callback: function(value: any) {
                  return Number(value).toLocaleString('en-IN') + ' Cr';
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
      },

      reconciliationTrendData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Reconciliation Rate',
          data: this.generateTrendData(95, 3.5).values.map(v => v / 1000),
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }],
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
                label: function(context: any) {
                  return `${context.dataset.label}: ${Number(context.parsed.y).toFixed(1)}%`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Reconciliation Rate (%)'
              },
              ticks: {
                callback: function(value: any) {
                  return Number(value).toFixed(1) + '%';
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
      },

      cashFlowData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Cash Inflow',
            data: this.generateTrendData(grandTotal.Total * 0.85 / 10000000, 6.2).values,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Cash Outflow',
            data: this.generateTrendData(totalExpenses * 0.9 / 10000000, 4.1).values,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }
        ],
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
                label: function(context: any) {
                  return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (₹ Crores)'
              },
              ticks: {
                callback: function(value: any) {
                  return Number(value).toLocaleString('en-IN') + ' Cr';
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
      },

      revenueTargetData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Actual Revenue',
            data: this.generateTrendData(grandTotal.Total / 10000000, 8.5).values,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2
          },
          {
            label: 'Target Revenue',
            data: this.generateTargetData(this.generateTrendData(grandTotal.Total / 10000000, 8.5).values),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2
          }
        ],
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
                label: function(context: any) {
                  return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue (₹ Crores)'
              },
              ticks: {
                callback: function(value: any) {
                  return Number(value).toLocaleString('en-IN') + ' Cr';
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
      },

      patientVolumeRevenueData: {
        labels: patientVolumeData.labels,
        datasets: [
          {
            label: 'Patient Volume',
            data: patientVolumeData.values,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Revenue',
            data: this.generateTrendData(grandTotal.Total / 10000000, 8.5).values,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            yAxisID: 'y1'
          }
        ],
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
                label: function(context: any) {
                  if (context.dataset.label === 'Patient Volume') {
                    return `${context.dataset.label}: ${Number(context.parsed.y).toLocaleString('en-IN')}`;
                  }
                  return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
                }
              }
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Patient Volume'
              },
              ticks: {
                callback: function(value: any) {
                  return Number(value).toLocaleString('en-IN');
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Revenue (₹ Crores)'
              },
              ticks: {
                callback: function(value: any) {
                  return Number(value).toLocaleString('en-IN') + ' Cr';
                }
              },
              grid: {
                drawOnChartArea: false
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      },
      
      cityRevenueData: this.cities.map(city => ({
        city,
        revenue: (grandTotal as any)[city] || 0,
        expense: this.getExpenseData((grandTotal as any)[city] || 0),
        cash: (cashCollection as any)[city] || 0,
        card: (cardCollection as any)[city] || 0,
        digital: (digitalCollection as any)[city] || 0,
        insurance: (insuranceCollection as any)[city] || 0
      })),

      alerts: this.generateAlertsData({
        totalRevenue: grandTotal.Total,
        totalExpenses: totalExpenses,
        totalCashCollection: cashCollection.Total,
        totalCombinedDigital: combinedDigitalCard,
        totalInsurance: insuranceCollection.Total,
        cityRevenueData: this.cities.map(city => ({
          city,
          revenue: (grandTotal as any)[city] || 0,
          expense: this.getExpenseData((grandTotal as any)[city] || 0),
          cash: (cashCollection as any)[city] || 0,
          insurance: (insuranceCollection as any)[city] || 0
        }))
      })
    };

    return dashboardData;
  }

  getKPIDrilldownData(kpiType: string) {
    const dashboardData = this.getDashboardData();
    
    switch (kpiType) {
      case 'totalRevenue':
        return this.getRevenueDrilldown(dashboardData);
      case 'totalExpenses':
        return this.getExpensesDrilldown(dashboardData);
      case 'cashCollection':
        return this.getCashDrilldown(dashboardData);
      case 'combinedDigital':
        return this.getCombinedDigitalDrilldown(dashboardData);
      case 'insurance':
        return this.getInsuranceDrilldown(dashboardData);
      case 'investmentIncome':
        return this.getInvestmentDrilldown(dashboardData);
      case 'revenueMismatch':
        return dashboardData.alerts.find((a: any) => a.type === 'revenueMismatch')?.drilldown;
      case 'unpostedTransaction':
        return dashboardData.alerts.find((a: any) => a.type === 'unpostedTransaction')?.drilldown;
      case 'delayedBankCredit':
        return dashboardData.alerts.find((a: any) => a.type === 'delayedBankCredit')?.drilldown;
      case 'negativeCashFlow':
        return dashboardData.alerts.find((a: any) => a.type === 'negativeCashFlow')?.drilldown;
      case 'underperformance':
        return dashboardData.alerts.find((a: any) => a.type === 'underperformance')?.drilldown;
      case 'arDelay':
        return dashboardData.alerts.find((a: any) => a.type === 'arDelay')?.drilldown;
      default:
        return null;
    }
  }

  private getRevenueDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    const previousData = currentData.map((item: any) => ({
      ...item,
      revenue: this.getPreviousData(item.revenue)
    }));

    return {
      title: 'Total Revenue Analysis',
      currentTotal: data.totalRevenue,
      previousTotal: this.getPreviousData(data.totalRevenue),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          datasets: [{
            label: 'Current Revenue',
            data: currentData.map((item: any) => item.revenue / 10000000),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2
          }]
        },
        previous: {
          labels: previousData.map((item: any) => item.city),
          datasets: [{
            label: 'Previous Revenue',
            data: previousData.map((item: any) => item.revenue / 10000000),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getExpensesDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    const previousData = currentData.map((item: any) => ({
      ...item,
      expense: this.getPreviousData(item.expense)
    }));

    return {
      title: 'Total Expenses Analysis',
      currentTotal: data.totalExpenses,
      previousTotal: this.getPreviousData(data.totalExpenses),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          datasets: [{
            label: 'Current Expenses',
            data: currentData.map((item: any) => item.expense / 10000000),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2
          }]
        },
        previous: {
          labels: previousData.map((item: any) => item.city),
          datasets: [{
            label: 'Previous Expenses',
            data: previousData.map((item: any) => item.expense / 10000000),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Expenses (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getCashDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    const previousData = currentData.map((item: any) => ({
      ...item,
      cash: this.getPreviousData(item.cash)
    }));

    return {
      title: 'Cash Collection Analysis',
      currentTotal: data.totalCashCollection,
      previousTotal: this.getPreviousData(data.totalCashCollection),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          datasets: [{
            label: 'Current Cash Collection',
            data: currentData.map((item: any) => item.cash / 10000000),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2
          }]
        },
        previous: {
          labels: previousData.map((item: any) => item.city),
          datasets: [{
            label: 'Previous Cash Collection',
            data: previousData.map((item: any) => item.cash / 10000000),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cash Collection (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getCombinedDigitalDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    const previousData = currentData.map((item: any) => ({
      ...item,
      digital: this.getPreviousData(item.card + item.digital)
    }));

    return {
      title: 'Digital & Card Payments Analysis',
      currentTotal: data.totalCombinedDigital,
      previousTotal: this.getPreviousData(data.totalCombinedDigital),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          datasets: [{
            label: 'Current Digital & Card Payments',
            data: currentData.map((item: any) => (item.card + item.digital) / 10000000),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2
          }]
        },
        previous: {
          labels: previousData.map((item: any) => item.city),
          datasets: [{
            label: 'Previous Digital & Card Payments',
            data: previousData.map((item: any) => item.digital / 10000000),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Digital & Card Payments (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getInsuranceDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    const previousData = currentData.map((item: any) => ({
      ...item,
      insurance: this.getPreviousData(item.insurance)
    }));

    return {
      title: 'Insurance Collections Analysis',
      currentTotal: data.totalInsurance,
      previousTotal: this.getPreviousData(data.totalInsurance),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          datasets: [{
            label: 'Current Insurance Collections',
            data: currentData.map((item: any) => item.insurance / 10000000),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2
          }]
        },
        previous: {
          labels: previousData.map((item: any) => item.city),
          datasets: [{
            label: 'Previous Insurance Collections',
            data: previousData.map((item: any) => item.insurance / 10000000),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Insurance Collections (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getInvestmentDrilldown(data: any) {
    const currentData = this.generateRandomData(data.totalInvestmentIncome / this.cities.length, this.cities.length);
    const previousData = currentData.map((value: number) => this.getPreviousData(value));

    return {
      title: 'Investment Income Analysis',
      currentTotal: data.totalInvestmentIncome,
      previousTotal: this.getPreviousData(data.totalInvestmentIncome),
      comparisonCharts: {
        current: {
          labels: this.cities,
          datasets: [{
            label: 'Current Investment Income',
            data: currentData.map(value => value / 10000000),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2
          }]
        },
        previous: {
          labels: this.cities,
          datasets: [{
            label: 'Previous Investment Income',
            data: previousData.map(value => value / 10000000),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Investment Income (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getRevenueMismatchDrilldown(data: any, mismatchCities: string[]) {
    const currentData = data.cityRevenueData.filter((item: any) => mismatchCities.includes(item.city));
    const previousData = currentData.map((item: any) => ({
      ...item,
      revenue: this.getPreviousData(item.revenue) * 1.1 // Expected 10% growth
    }));

    return {
      title: 'Revenue Mismatch Analysis',
      currentTotal: currentData.reduce((sum: number, item: any) => sum + item.revenue, 0),
      previousTotal: previousData.reduce((sum: number, item: any) => sum + item.revenue, 0),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          datasets: [{
            label: 'Actual Revenue',
            data: currentData.map((item: any) => item.revenue / 10000000),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2
          },
          {
            label: 'Expected Revenue',
            data: previousData.map((item: any) => item.revenue / 10000000),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getUnpostedTransactionDrilldown(data: any, unpostedCities: string[]) {
    const unpostedData = unpostedCities.map(city => ({
      city,
      amount: Math.floor((data.cityRevenueData.find((d: any) => d.city === city)?.revenue || 0) * 0.05)
    }));

    return {
      title: 'Unposted Transactions Analysis',
      currentTotal: unpostedData.reduce((sum: number, item: any) => sum + item.amount, 0),
      previousTotal: 0, // No previous data for unposted transactions
      comparisonCharts: {
        current: {
          labels: unpostedData.map((item: any) => item.city),
          datasets: [{
            label: 'Unposted Transaction Amount',
            data: unpostedData.map((item: any) => item.amount / 10000000),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Unposted Amount (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getDelayedBankCreditDrilldown(data: any, delayedCities: string[]) {
    const delayedData = delayedCities.map(city => ({
      city,
      amount: Math.floor((data.cityRevenueData.find((d: any) => d.city === city)?.cash || 0) * 0.15)
    }));

    return {
      title: 'Delayed Bank Credit Analysis',
      currentTotal: delayedData.reduce((sum: number, item: any) => sum + item.amount, 0),
      previousTotal: 0, // No previous data for delayed credits
      comparisonCharts: {
        current: {
          labels: delayedData.map((item: any) => item.city),
          datasets: [{
            label: 'Delayed Credit Amount',
            data: delayedData.map((item: any) => item.amount / 10000000),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Delayed Amount (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getNegativeCashFlowDrilldown(data: any, negativeCashFlowCities: any[]) {
    return {
      title: 'Negative Cash Flow Analysis',
      currentTotal: negativeCashFlowCities.reduce((sum: number, item: any) => sum + (item.expense - item.revenue), 0),
      previousTotal: 0, // No previous data for negative cash flow
      comparisonCharts: {
        current: {
          labels: negativeCashFlowCities.map((item: any) => item.city),
          datasets: [
            {
              label: 'Revenue',
              data: negativeCashFlowCities.map((item: any) => item.revenue / 10000000),
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2
            },
            {
              label: 'Expenses',
              data: negativeCashFlowCities.map((item: any) => item.expense / 10000000),
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 2
            }
          ]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getUnderperformanceDrilldown(data: any, underperformingCities: any[]) {
    const threshold = 10000000; // ₹1 crore
    return {
      title: 'Underperformance Analysis',
      currentTotal: underperformingCities.reduce((sum: number, item: any) => sum + item.revenue, 0),
      previousTotal: 0, // No previous data for underperformance
      comparisonCharts: {
        current: {
          labels: underperformingCities.map((item: any) => item.city),
          datasets: [
            {
              label: 'Revenue',
              data: underperformingCities.map((item: any) => item.revenue / 10000000),
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 2
            },
            {
              label: 'Threshold (₹1 Cr)',
              data: underperformingCities.map(() => threshold / 10000000),
              backgroundColor: 'rgba(16, 185, 129, 0.8)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 2
            }
          ]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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

  private getARDelayDrilldown(data: any, arDelayCities: string[]) {
    const delayedData = arDelayCities.map(city => ({
      city,
      amount: Math.floor((data.cityRevenueData.find((d: any) => d.city === city)?.insurance || 0) * 0.2)
    }));

    return {
      title: 'AR Delay Analysis',
      currentTotal: delayedData.reduce((sum: number, item: any) => sum + item.amount, 0),
      previousTotal: 0, // No previous data for AR delays
      comparisonCharts: {
        current: {
          labels: delayedData.map((item: any) => item.city),
          datasets: [{
            label: 'Delayed Insurance Payments',
            data: delayedData.map((item: any) => item.amount / 10000000),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2
          }]
        }
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
              label: function(context: any) {
                return `${context.dataset.label}: ₹${Number(context.parsed.y).toLocaleString('en-IN')} Cr`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Delayed Amount (₹ Crores)'
            },
            ticks: {
              callback: function(value: any) {
                return Number(value).toLocaleString('en-IN') + ' Cr';
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
}