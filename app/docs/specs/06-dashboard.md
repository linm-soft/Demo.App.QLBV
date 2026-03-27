# Feature Spec: Dashboard & Statistics

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: DASH-006  
**Priority**: High  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Comprehensive dashboard system với customizable widgets, real-time statistics, và role-based views cho Staff, Team Lead, Manager, và Admin.

**Key Capabilities:**
- Role-based dashboard layouts
- Customizable widget grid
- Real-time data updates (MQTT)
- Interactive charts & graphs
- Quick actions & shortcuts
- Performance KPIs
- At-a-glance status overview

---

## 👤 User Stories

### US-DASH-001: Staff Dashboard
**As a** Staff  
**I want to** see my work overview  
**So that** I prioritize và track my tasks

**Acceptance Criteria:**
- ✅ My Stats cards:
  - Open tickets assigned to me
  - In-progress tasks
  - Pending reviews
  - SLA warnings
- ✅ My Work list:
  - Recent tickets/tasks
  - Sorted by priority & deadline
  - SLA status indicators
- ✅ Quick Actions:
  - Create ticket
  - Browse task pool
  - View my completed work
- ✅ Recent Activity feed
- ✅ Today's schedule/deadlines

### US-DASH-002: Manager Dashboard
**As a** Manager  
**I want to** monitor team performance  
**So that** I manage resources effectively

**Acceptance Criteria:**
- ✅ Team Overview:
  - Team workload distribution chart
  - SLA compliance gauge
  - Open tickets/tasks count
  - At-risk items alert
- ✅ SLA Breach Alerts section
- ✅ Pending Approvals queue
- ✅ Performance charts:
  - Completion trends
  - Response time averages
  - Quality ratings
- ✅ Team member cards với quick stats
- ✅ Department comparison

### US-DASH-003: Customizable Widgets
**As a** User  
**I want to** customize my dashboard  
**So that** I see most relevant info

**Acceptance Criteria:**
- ✅ Drag & drop widget reordering
- ✅ Add/remove widgets
- ✅ Resize widgets (1x1, 1x2, 2x1, 2x2)
- ✅ Widget library with 20+ options
- ✅ Save layout per user
- ✅ Reset to default option

---

## 🎨 Dashboard Layouts

### Staff Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  🏠 Welcome back, Đinh Bộ Lĩnh!         [🔔5] [👤]     │
├────────┬────────┬────────┬────────────────────────────────┤
│   12   │   8    │   3    │   94%                          │
│ Open   │ Pend   │ At-Risk│  SLA                           │
│Tickets │ Tasks  │ Items  │                                │
├────────┴────────┴────────┴────────────────────────────────┤
│ 📋 My Work (8)                      [View All]            │
│ ┌────────────────────────────────────────────────────┐  │
│ │ 🔴 TKT-001: Printer ER | Due in 1h | IN_PROGRESS  │  │
│ │ 🟡 TSK-456: DB Update | Due today | 65% progress  │  │
│ │ 🟢 TKT-003: Equipment | Due tomorrow               │  │
│ └────────────────────────────────────────────────────┘  │
│                                                            │
│ ⚡ Quick Actions                                          │
│ [+ New Ticket] [🏊 Task Pool] [📊 My Stats]              │
│                                                            │
│ 📰 Recent Activity                                        │
│ • TKT-001 commented by Manager - 5min ago                │
│ • TSK-456 approved - 1h ago                               │
└────────────────────────────────────────────────────────────┘
```

### Manager Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ 👨‍💼 Manager Dashboard                [Date Range ▼]      │
├──────────────┬──────────────┬────────────────────────────┤
│     145      │    82.7%     │      4.5h                  │
│ Total Tickets│  Resolution  │   Avg Time                 │
├──────────────┴──────────────┴────────────────────────────┤
│ ⚠️ SLA Breach Alerts (3)              [View All]        │
│ ┌────────────────────────────────────────────────────┐  │
│ │ 🔴 TKT-001 Breached 30min | Đinh Bộ Lĩnh          │  │
│ │ Suggested: [Jane (4.8★)] [Keep] [Reassign]        │  │
│ └────────────────────────────────────────────────────┘  │
│                                                            │
│ ┌───────────────────┬────────────────────────────────┐  │
│ │ 📊 Team Workload  │  ✅ Pending Approvals (2)     │  │
│ │                   │  • TSK-456 - DB Update        │  │
│ │ John  ████████░░  │  • TSK-789 - Maintenance      │  │
│ │ Jane  █████░░░░░  │  [Review All]                 │  │
│ │ Bob   ███░░░░░░░  │                                │  │
│ └───────────────────┴────────────────────────────────┘  │
│                                                            │
│ 📈 Performance Trends (30 days)                           │
│ [Line chart showing completion trends]                    │
└────────────────────────────────────────────────────────────┘
```

---

## 📊 Available Widgets

### Performance Widgets
1. **My Stats Card** - Personal counters
2. **Team Performance Card** - Team metrics
3. **SLA Compliance Gauge** - Real-time compliance %
4. **Completion Trend Chart** - Line/bar chart
5. **Response Time Chart** - Average response times
6. **Quality Rating** - Average ratings & reviews

### Workload Widgets
7. **My Tasks List** - Personal task list
8. **Team Workload Bars** - Horizontal bars showing distribution
9. **Capacity Utilization** - Gauge showing capacity %
10. **Overdue Items** - List of overdue items
11. **At-Risk SLA** - Items warnings/danger

### Activity Widgets
12. **Recent Activity Feed** - Timeline of recent events
13. **Today's Schedule** - Calendar view of today
14. **Upcoming Deadlines** - Next 7 days deadlines
15. **Notifications Feed** - Recent notifications

### Management Widgets
16. **SLA Breach Alerts** - Critical breach list
17. **Pending Approvals** - Queue of items needing approval
18. **Candidate Suggestions** - For breach reassignments
19. **Department Comparison** - Multi-department metrics

### Analytics Widgets
20. **Priority Distribution** - Pie chart of priorities
21. **Category Breakdown** - Bar chart by categories
22. **User Productivity** - Leaderboard style
23. **System Health** - Technical metrics

---

## 💾 Data Model

```typescript
interface DashboardLayout {
  userId: string;
  role: Role;
  widgets: Widget[];
  lastModified: DateTime;
}

interface Widget {
  id: string;
  type: WidgetType;
  position: { x: number; y: number; };
  size: { width: number; height: number; };  // Grid units
  config: WidgetConfig;
}

interface WidgetConfig {
  dataSource?: string;
  filters?: FilterOptions;
  chartType?: ChartType;
  refreshInterval?: number;  // seconds
  styling?: WidgetStyling;
}

enum WidgetType {
  MY_STATS = 'MY_STATS',
  TEAM_WORKLOAD = 'TEAM_WORKLOAD',
  SLA_GAUGE = 'SLA_GAUGE',
  BREACH_ALERTS = 'BREACH_ALERTS',
  RECENT_ACTIVITY = 'RECENT_ACTIVITY',
  // ... etc
}
```

---

## 🔌 API Endpoints

```http
# Dashboard Data
GET    /api/dashboard/my-overview           # Staff dashboard data
GET    /api/dashboard/manager-overview      # Manager dashboard data
GET    /api/dashboard/admin-overview        # Admin dashboard data

# Widget Data
GET    /api/dashboard/widgets/:type/data    # Get widget data
POST   /api/dashboard/widgets/:type/refresh # Force refresh

# Layout
GET    /api/dashboard/layout                # Get user's layout
PUT    /api/dashboard/layout                # Save layout
POST   /api/dashboard/layout/reset          # Reset to default

# Statistics
GET    /api/dashboard/stats/personal        # Personal stats
GET    /api/dashboard/stats/team/:teamId    # Team stats
GET    /api/dashboard/stats/department/:id  # Department stats
GET    /api/dashboard/stats/system          # System-wide stats
```

---

## 🎨 UI Components

### Stats Card Component
```tsx
<StatsCard
  icon="📋"
  label="Open Tickets"
  value={12}
  change={+2}       // +2 from yesterday
  trend="up"        // up/down/same
  color="primary"
  onClick={() => navigateTo('/tickets')}
/>
```

### Chart Component
```tsx
<ChartWidget
  type="line"              // line/bar/pie/doughnut/area
  title="Completion Trend"
  data={completionData}
  xAxis="date"
  yAxis="count"
  height={300}
  refreshInterval={60}     // Refresh every 60s
/>
```

### Widget Container
- Drag handle (top left)
- Refresh button (top right)
- Settings gear (top right)
- Remove X (top right)
- Resize handle (bottom right)

---

## 🔄 Real-Time Updates

### MQTT Integration
```typescript
// Connect to dashboard hub
const connection = new HubConnectionBuilder()
  .withUrl('/hubs/dashboard')
  .build();

// Listen for updates
connection.on('StatsUpdated', (data) => {
  updateStatsCard(data);
});

connection.on('SLAStatusChanged', (item) => {
  refreshSLAWidget();
});

connection.on('NewNotification', (notification) => {
  updateNotificationFeed(notification);
});
```

---

## 📊 Key Metrics

### Personal Metrics (Staff)
- My open tickets
- My pending tasks
- My tasks at-risk
- My SLA compliance %
- My average resolution time
- My quality rating

### Team Metrics (Manager)
- Team total tickets/tasks
- Team SLA compliance
- Team capacity utilization
- Team average response time
- Team quality ratings
- Workload distribution balance

### System Metrics (Admin)
- Total active items
- System-wide SLA compliance
- Average resolution times across all
- Total breaches today/week
- User activity levels
- Department comparisons

---

## 🚀 Implementation Priorities

### Phase 1: Core Dashboards (P0)
- Staff dashboard với basic widgets
- Manager dashboard với team overview
- Real-time data updates
- Fixed layouts (no customization yet)

### Phase 2: Customization (P1)
- Drag & drop widget reordering
- Add/remove widgets
- Widget resize
- Save personal layouts

### Phase 3: Advanced (P2)
- Custom widget builder
- Advanced filtering options
- Export dashboard data
- Scheduled reports
- Mobile dashboard optimized views

---

## 📱 Mobile Considerations

### Mobile Dashboard
- Simplified single-column layout
- Swipe between widget sections
- Pull-to-refresh
- Critical stats at top
- Collapsible sections
- Quick actions floating button

---

## ✅ Acceptance Criteria

**Definition of Done:**
- [ ] Staff dashboard loads < 1 second
- [ ] Manager dashboard loads < 2 seconds
- [ ] Real-time updates with < 5s delay
- [ ] All widgets responsive on desktop/tablet
- [ ] Mobile dashboard functional
- [ ] Widget data accuracy 100%
- [ ] Chart interactions smooth (hover/click)
- [ ] Layout save/restore working
- [ ] Performance: 1000+ concurrent users

---

**Related Specs:**
- [02-ticket-management.md](./02-ticket-management.md)
- [03-task-management.md](./03-task-management.md)
- [05-sla-management.md](./05-sla-management.md)
- [reports/](./reports/)
