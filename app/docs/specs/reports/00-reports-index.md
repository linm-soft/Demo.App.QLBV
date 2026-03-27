# Report Specs Index

**Feature ID**: REPORTS  
**Priority**: High  
**Status**: Active  
**Last Updated**: March 24, 2026

---

## 📊 Available Reports

### Performance Reports

| Report ID | Report Name | Type | Access Level | Spec File |
|-----------|-------------|------|--------------|-----------|
| RPT-001 | Ticket Performance Report | Dashboard | Manager+ | [01-ticket-performance.md](./01-ticket-performance.md) |
| RPT-002 | Task Completion Report | Dashboard | Manager+ | [02-task-completion.md](./02-task-completion.md) |
| RPT-003 | SLA Compliance Report | Dashboard | Manager+ | [03-sla-compliance.md](./03-sla-compliance.md) |
| RPT-004 | Team Performance Report | Dashboard | Team Lead+ | [04-team-performance.md](./04-team-performance.md) |
| RPT-005 | User Productivity Report | Dashboard | Manager+ | [05-user-productivity.md](./05-user-productivity.md) |
| RPT-006 | Department Analytics | Dashboard | Admin | [06-department-analytics.md](./06-department-analytics.md) |

### Operational Reports

| Report ID | Report Name | Type | Access Level | Spec File |
|-----------|-------------|------|--------------|-----------|
| RPT-007 | Daily Summary Report | Email | All | [07-daily-summary.md](./07-daily-summary.md) |
| RPT-008 | Weekly Digest Report | Email | All | [08-weekly-digest.md](./08-weekly-digest.md) |
| RPT-009 | SLA Breach Report | Alert | Manager+ | [09-sla-breach.md](./09-sla-breach.md) |
| RPT-010 | Overdue Items Report | Alert | Manager+ | [10-overdue-items.md](./10-overdue-items.md) |

### Custom Reports

| Report ID | Report Name | Type | Access Level | Spec File |
|-----------|-------------|------|--------------|-----------|
| RPT-011 | Custom Report Builder | Interactive | Admin | [11-custom-builder.md](./11-custom-builder.md) |
| RPT-012 | Export Data Report | Export | Manager+ | [12-export-data.md](./12-export-data.md) |

---

## 📋 Report Categories

### 1. Performance Reports
Track system and user performance metrics:
- Response times
- Resolution rates
- Completion rates
- Quality ratings
- Efficiency metrics

### 2. Compliance Reports
Monitor SLA and policy compliance:
- SLA adherence by priority
- Breach analysis
- At-risk items
- Escalation frequency
- Policy violations

### 3. Workload Reports
Analyze task distribution and capacity:
- Current workload by user/team
- Capacity utilization
- Workload balance
- Backlog analysis
- Resource allocation

### 4. Trend Reports
Historical analysis and forecasting:
- Volume trends over time
- Seasonal patterns
- Growth projections
- Predictive analytics
- Anomaly detection

### 5. Quality Reports
Measure service quality:
- User satisfaction ratings
- Resolution quality
- First-time fix rate
- Reopen rate
- Customer feedback analysis

---

## 🎯 Common Features Across Reports

### Data Filters
- **Date Range**: Custom, Today, This Week, This Month, Last Month, Last Quarter, Last Year
- **Status**: All, Active, Completed, Cancelled
- **Priority**: All, Critical, High, Medium, Low
- **Department**: All, Specific departments
- **Team**: All, Specific teams
- **Assignee**: All, Specific users
- **Category**: All, Specific categories

### Visualization Options
- **Charts**: Bar, Line, Pie, Doughnut, Area, Radar
- **Tables**: Sortable, Filterable, Paginated
- **Cards**: Summary statistics, KPIs
- **Heatmaps**: Time-based patterns
- **Gauges**: Progress indicators

### Export Formats
- **PDF**: Formatted report with charts
- **Excel**: Raw data + pivot tables
- **CSV**: Raw data for analysis
- **JSON**: API data export
- **Image**: Chart screenshots

### Scheduling
- **Frequency**: Daily, Weekly, Monthly, Quarterly
- **Time**: Configurable send time
- **Recipients**: Email distribution list
- **Format**: Configurable export format
- **Delivery**: Email, Dashboard, Download

---

## 🔌 API Endpoints

### Get Report Data
```http
GET /api/reports/{reportType}
Authorization: Bearer {token}

Query Parameters:
- startDate: ISO date
- endDate: ISO date
- departmentId: UUID (optional)
- teamId: UUID (optional)
- userId: UUID (optional)
- filters: JSON object (optional)
```

### Generate Report
```http
POST /api/reports/{reportType}/generate
Authorization: Bearer {token}

Request Body:
{
  "startDate": "2024-03-01",
  "endDate": "2024-03-31",
  "filters": { ... },
  "format": "pdf",
  "email": "manager@hospital.com"
}
```

### Schedule Report
```http
POST /api/reports/{reportType}/schedule
Authorization: Bearer {token}

Request Body:
{
  "frequency": "weekly",
  "dayOfWeek": 1,
  "timeOfDay": "08:00",
  "recipients": ["manager@hospital.com"],
  "format": "pdf",
  "filters": { ... }
}
```

### Export Report
```http
GET /api/reports/{reportType}/export?format=pdf&startDate=2024-03-01&endDate=2024-03-31
Authorization: Bearer {token}

Response: Binary file download
```

---

## 💻 Web App Implementation

### Reports Page Layout
```typescript
// features/reports/ReportsPage.tsx
import React, { useState } from 'react';
import { ReportSelector } from '@/components/reports/ReportSelector';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { ReportViewer } from '@/components/reports/ReportViewer';
import { ExportButtons } from '@/components/reports/ExportButtons';

export const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('ticket-performance');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    departmentId: null
  });

  return (
    <div className="reports-page">
      <h1>Reports & Analytics</h1>
      
      <div className="reports-grid">
        <aside className="reports-sidebar">
          <ReportSelector 
            selected={selectedReport}
            onSelect={setSelectedReport}
          />
        </aside>

        <main className="reports-content">
          <ReportFilters 
            filters={filters}
            onChange={setFilters}
          />
          
          <ReportViewer 
            reportType={selectedReport}
            filters={filters}
          />

          <ExportButtons 
            reportType={selectedReport}
            filters={filters}
          />
        </main>
      </div>
    </div>
  );
};
```

---

## 📱 Mobile App Implementation

### Reports Screen
```typescript
// screens/reports/ReportsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { ReportCard } from '@/components/reports/ReportCard';

export const ReportsScreen = () => {
  const reports = [
    { id: 'ticket-performance', title: 'Ticket Performance', icon: '📊' },
    { id: 'task-completion', title: 'Task Completion', icon: '✅' },
    { id: 'sla-compliance', title: 'SLA Compliance', icon: '⏰' },
    { id: 'my-performance', title: 'My Performance', icon: '📈' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {reports.map(report => (
          <ReportCard
            key={report.id}
            title={report.title}
            icon={report.icon}
            onPress={() => navigateToReport(report.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
```

---

## 🗄️ Database Schema

### Scheduled Reports Table
```sql
CREATE TABLE scheduled_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_type VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    frequency VARCHAR(20) NOT NULL, -- daily, weekly, monthly, quarterly
    day_of_week INT, -- 0-6 for weekly
    day_of_month INT, -- 1-31 for monthly
    time_of_day TIME NOT NULL,
    recipients TEXT[] NOT NULL, -- email addresses
    format VARCHAR(20) NOT NULL, -- pdf, excel, csv
    filters JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    last_run_at TIMESTAMP,
    next_run_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scheduled_reports_user ON scheduled_reports(user_id);
CREATE INDEX idx_scheduled_reports_next_run ON scheduled_reports(next_run_at);
```

### Report Runs Table
```sql
CREATE TABLE report_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheduled_report_id UUID REFERENCES scheduled_reports(id),
    report_type VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL, -- pending, completed, failed
    file_url VARCHAR(500),
    error_message TEXT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_report_runs_schedule ON report_runs(scheduled_report_id);
CREATE INDEX idx_report_runs_status ON report_runs(status);
```

---

## 🎨 UI Components

### Report Selector
- List of available reports
- Search/filter reports
- Favorites/recent reports
- Category grouping

### Report Filters
- Date range picker
- Department selector
- Team selector
- User selector
- Priority filter
- Status filter
- Custom filters per report

### Report Viewer
- Chart display area
- Data tables
- Summary cards
- Drill-down capability
- Refresh button
- Loading states

### Export Controls
- Format selector (PDF/Excel/CSV)
- Download button
- Email button
- Schedule button
- Share button

---

## ✅ Acceptance Criteria

### General
- ✅ Users can select and view reports
- ✅ Filters apply correctly to report data
- ✅ Charts render properly
- ✅ Data tables are sortable/filterable
- ✅ Export to PDF/Excel/CSV works
- ✅ Scheduled reports send on time
- ✅ Mobile app shows key reports
- ✅ Performance is acceptable (<3s load time)

### Specific Reports
- ✅ Ticket performance shows correct metrics
- ✅ SLA compliance calculated accurately
- ✅ Team performance aggregates correctly
- ✅ Date range filtering works
- ✅ Department/team filtering works
- ✅ User-specific reports show only authorized data

---

## 🔗 Related Features

- [Dashboard](../06-dashboard.md)
- [SLA Management](../05-sla-management.md)
- [Ticket Management](../02-ticket-management.md)
- [Task Management](../03-task-management.md)

---

**Version**: 1.0.0  
**Last Updated**: March 24, 2026  
**Status**: ✅ Ready for Implementation
