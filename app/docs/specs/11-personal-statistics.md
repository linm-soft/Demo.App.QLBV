# Feature Spec: Personal Statistics & Analytics

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: STATS-011  
**Priority**: Medium  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Personal analytics dashboard for staff to track their individual performance, productivity metrics, and work patterns. Provides insights, trends, and goal tracking to improve efficiency and job satisfaction.

**Key Capabilities:**
- Real-time performance KPIs
- Work pattern analysis (peak hours, task types)
- Productivity trends over time
- Goal setting and tracking
- Comparative analytics (vs team average)
- Gamification elements (badges, achievements)
- Personalized insights and recommendations
- Export personal reports

---

## 👤 User Stories

### US-STATS-001: View Personal Dashboard
**As a** Staff member  
**I want to** see my performance statistics  
**So that** I understand my productivity and areas to improve

**Acceptance Criteria:**
- ✅ Overview cards:
  - Tasks completed (today/week/month)
  - Tickets resolved (today/week/month)
  - Avg completion time
  - SLA compliance rate
  - Quality rating (from approvals)
- ✅ Charts:
  - Completion trends (line chart, last 30 days)
  - Task distribution by priority (pie chart)
  - Time spent by category (bar chart)
- ✅ Real-time updates (no page refresh needed)
- ✅ Compare: this week vs last week, this month vs last month

### US-STATS-002: Analyze Work Patterns
**As a** Staff member  
**I want to** understand when I'm most productive  
**So that** I can optimize my work schedule

**Acceptance Criteria:**
- ✅ Heatmap: activity by hour of day (7 days)
- ✅ Identify peak productivity hours
- ✅ Task completion rate by time slot
- ✅ Average task duration by time of day
- ✅ Insights: "You're most productive between 9-11 AM"
- ✅ Day-of-week breakdown

### US-STATS-003: Track Personal Goals
**As a** Staff member  
**I want to** set and track personal goals  
**So that** I stay motivated and improve

**Acceptance Criteria:**
- ✅ Set goals: tasks per week, SLA compliance %, response time
- ✅ Visual progress bars
- ✅ Notifications when goal achieved
- ✅ Historical goal tracking
- ✅ Suggested goals based on team averages
- ✅ Celebrate achievements (badges, animations)

### US-STATS-004: Compare with Team
**As a** Staff member  
**I want to** see how I compare to team averages  
**So that** I understand where I stand

**Acceptance Criteria:**
- ✅ Side-by-side comparison: me vs team avg
- ✅ Metrics: completion rate, response time, quality rating
- ✅ Percentile ranking (top 10%, 25%, etc.)
- ✅ Anonymous team comparison (no identifiable names)
- ✅ Opt-out option for privacy
- ✅ Positive framing (not punitive)

### US-STATS-005: View Detailed Analytics
**As a** Staff member  
**I want to** drill down into specific metrics  
**So that** I understand performance in detail

**Acceptance Criteria:**
- ✅ Select metric (e.g., "Tasks Completed")
- ✅ View breakdown: by priority, by category, by day
- ✅ Time series chart with selectable date ranges
- ✅ Identify trends (improving, declining, stable)
- ✅ Filter by project, department, task type
- ✅ Export detailed report (PDF/CSV)

### US-STATS-006: Receive Insights
**As a** Staff member  
**I want** AI-powered insights about my work  
**So that** I can improve continuously

**Acceptance Criteria:**
- ✅ Automated insights displayed on dashboard
- ✅ Examples:
  - "Your SLA compliance increased 15% this month! 🎉"
  - "You complete 30% more tasks on Tuesdays"
  - "Consider breaking tasks >4h into subtasks"
- ✅ Actionable recommendations
- ✅ Weekly email summary with highlights

---

## 📊 Key Metrics

### Performance Metrics

| Metric | Description | Calculation | Target |
|--------|-------------|-------------|--------|
| **Tasks Completed** | Number of tasks finished | Count of COMPLETED tasks | 10-15/week |
| **Tickets Resolved** | Number of tickets resolved | Count of RESOLVED tickets | 5-8/week |
| **Completion Rate** | % of assigned tasks completed on time | (On-time / Total) × 100 | >90% |
| **Avg Response Time** | Time from assignment to first action | Avg(FirstAction - AssignedAt) | <30 min |
| **Avg Completion Time** | Time from start to finish | Avg(CompletedAt - StartedAt) | Varies by task |
| **SLA Compliance** | % of items meeting SLA | (Met SLA / Total) × 100 | >95% |
| **Quality Rating** | Avg approval rating | Avg(ApprovalRating) | >4.0/5 |
| **First-Time Resolution** | % resolved without reopening | (No Reopen / Total) × 100 | >85% |
| **Comment Engagement** | Comments per ticket/task | Avg(Comments) | Good communication |
| **Idle Time** | Time between tasks | Avg(NextTask - PrevTask) | Minimize |

### Productivity Metrics

| Metric | Description | Implication |
|--------|-------------|-------------|
| **Tasks/Hour** | Throughput rate | Higher = more efficient |
| **Multitasking Index** | Concurrent active tasks | Too high = context switching |
| **Focus Time** | Longest uninterrupted work session | Longer = better focus |
| **Peak Hours** | Most productive time slot | Schedule important work here |
| **Rework Rate** | % of tasks requiring changes | Lower = better quality |

---

## 💾 Data Model

```typescript
interface UserStatistics {
  userId: string;
  period: 'TODAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'ALL_TIME';
  startDate: DateTime;
  endDate: DateTime;
  
  // Core Metrics
  tasksCompleted: number;
  ticketsResolved: number;
  commentsAdded: number;
  attachmentsUploaded: number;
  
  // Performance
  avgResponseTime: number;  // Minutes
  avgCompletionTime: number;  // Hours
  slaComplianceRate: number;  // Percentage
  qualityRating: number;  // 0-5
  firstTimeResolutionRate: number;  // Percentage
  
  // Productivity
  totalWorkingHours: number;
  focusTime: number;  // Longest continuous work session
  multitaskingIndex: number;  // Avg concurrent tasks
  peakHours: number[];  // [9, 10, 11] = 9-11 AM most productive
  
  // Breakdown
  tasksByPriority: { critical: number; high: number; medium: number; low: number };
  tasksByCategory: Record<string, number>;
  timeByCategory: Record<string, number>;  // Hours
  
  // Trends
  trend: {
    tasksCompletedChange: number;  // Percentage vs previous period
    responseTimeChange: number;
    slaComplianceChange: number;
  };
  
  // Goals
  goals: PersonalGoal[];
  achievements: Achievement[];
  
  // Computed
  percentileRank: number;  // vs team (0-100)
  teamAverage: TeamAverage;
}

interface PersonalGoal {
  id: string;
  userId: string;
  type: 'TASKS_PER_WEEK' | 'SLA_COMPLIANCE' | 'RESPONSE_TIME' | 'QUALITY_RATING';
  target: number;
  current: number;
  progress: number;  // Percentage
  startDate: DateTime;
  endDate: DateTime;
  status: 'ACTIVE' | 'ACHIEVED' | 'FAILED' | 'ABANDONED';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: DateTime;
  category: 'PRODUCTIVITY' | 'QUALITY' | 'COLLABORATION' | 'MILESTONE';
}

interface TeamAverage {
  tasksCompleted: number;
  ticketsResolved: number;
  avgResponseTime: number;
  avgCompletionTime: number;
  slaComplianceRate: number;
  qualityRating: number;
}

interface InsightRecommendation {
  id: string;
  type: 'POSITIVE' | 'NEUTRAL' | 'ACTIONABLE';
  title: string;
  description: string;
  actionUrl: string | null;
  priority: number;
  createdAt: DateTime;
}
```

---

## 🎨 UI Components

### Statistics Page (`statistics.html`)

```
┌──────────────────────────────────────────────────────────┐
│  📊 Thống Kê Cá Nhân                   [🔔] [👤]         │
├──────────────────────────────────────────────────────────┤
│  Period: [This Week ▼]  [📥 Export Report]              │
│                                                           │
│  ── Performance Overview ──────────────────────────────  │
│  ┌──────┬──────┬──────┬──────┬──────────────┐          │
│  │  12  │  5   │ 2.5h │ 96%  │    ⭐ 4.8   │          │
│  │Tasks │Ticket│ Avg  │ SLA  │   Quality   │          │
│  │Done  │Solved│ Time │      │             │          │
│  │ +20% │ -5%  │ +15% │ +2%  │    +0.3     │          │
│  └──────┴──────┴──────┴──────┴──────────────┘          │
│                                                           │
│  ── AI Insights ───────────────────────────────────────  │
│  💡 Great work! Your SLA compliance improved 15% 🎉      │
│  ⏰ You're most productive 9-11 AM (83% completion)      │
│  🎯 You're on track to exceed your weekly goal!          │
│                                                           │
│  ── Trends (Last 30 Days) ─────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │        Tasks Completed per Day                      │ │
│  │  15 ┤                                        ●      │ │
│  │  12 ┤                              ●      ●         │ │
│  │   9 ┤                ●          ●               ●  │ │
│  │   6 ┤          ●           ●                       │ │
│  │   3 ┤     ●                                        │ │
│  │   0 └───────────────────────────────────────────── │ │
│  │     Mar 1    Mar 8   Mar 15  Mar 22  Today        │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ── Work Patterns ─────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Activity Heatmap (by hour)                         │ │
│  │     0-6  6-9  9-12 12-15 15-18 18-24               │ │
│  │ Mon  ░░  ███  ████  ███   ██   ░░                 │ │
│  │ Tue  ░░  ███  ████  ███   ███  ░░                 │ │
│  │ Wed  ░░  ██   ████  ███   ██   ░░                 │ │
│  │ Thu  ░░  ███  ████  ██    ███  ░░                 │ │
│  │ Fri  ░░  ██   ███   ███   ██   ░░                 │ │
│  │                                                     │ │
│  │ Peak: 9-11 AM (83% task completion rate)           │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ── My Goals ──────────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 📌 Complete 15 tasks this week                      │ │
│  │    ████████████████░░░░  12/15 (80%)  🔥 On track! │ │
│  │                                                      │ │
│  │ 📌 Maintain >95% SLA compliance                     │ │
│  │    ████████████████████  96% ✅ Achieved!          │ │
│  │                                                      │ │
│  │ 📌 Avg response time <30 min                        │ │
│  │    ██████████░░░░░░░░░░  25 min ✅ Achieved!       │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ── vs Team Average ───────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │            Me     Team Avg   Percentile             │ │
│  │ Tasks      12        9.5       Top 25% 🏆          │ │
│  │ Response   25m       42m       Top 15% 🏆          │ │
│  │ SLA        96%       92%       Top 20% 🏆          │ │
│  │ Quality   4.8/5     4.5/5      Top 10% 🏆          │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ── Achievements ──────────────────────────────────────  │
│  🏅 Speedy Resolver (Resolve 10 tickets <1h)            │
│  🏅 Quality Champion (15 consecutive 5-star ratings)    │
│  🏅 100 Tasks Completed                                 │
│  [View All Badges]                                      │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints

### GET /api/statistics/me
Get current user's statistics

**Query Parameters:**
- `period` (today|week|month|year|custom)
- `startDate` (ISO 8601, for custom period)
- `endDate` (ISO 8601, for custom period)

**Response:**
```json
{
  "userId": "usr_123",
  "period": "WEEK",
  "startDate": "2026-03-18T00:00:00Z",
  "endDate": "2026-03-25T23:59:59Z",
  "metrics": {
    "tasksCompleted": 12,
    "ticketsResolved": 5,
    "avgResponseTime": 25,
    "avgCompletionTime": 2.5,
    "slaComplianceRate": 96,
    "qualityRating": 4.8,
    "firstTimeResolutionRate": 88
  },
  "trends": {
    "tasksCompletedChange": 20,
    "responseTimeChange": 15,
    "slaComplianceChange": 2
  },
  "breakdown": {
    "tasksByPriority": {
      "critical": 2,
      "high": 5,
      "medium": 4,
      "low": 1
    },
    "tasksByCategory": {
      "Technical": 7,
      "Administrative": 3,
      "Clinical": 2
    }
  },
  "patterns": {
    "peakHours": [9, 10, 11],
    "activityHeatmap": {
      "monday": [0, 0, 2, 5, 3, 1],
      "tuesday": [0, 0, 3, 5, 4, 0]
    }
  },
  "teamComparison": {
    "percentileRank": 75,
    "teamAverage": {
      "tasksCompleted": 9.5,
      "avgResponseTime": 42,
      "slaComplianceRate": 92,
      "qualityRating": 4.5
    }
  }
}
```

### GET /api/statistics/goals
Get user's personal goals

**Response:**
```json
{
  "goals": [
    {
      "id": "goal_1",
      "type": "TASKS_PER_WEEK",
      "target": 15,
      "current": 12,
      "progress": 80,
      "status": "ACTIVE",
      "startDate": "2026-03-18T00:00:00Z",
      "endDate": "2026-03-25T23:59:59Z"
    }
  ]
}
```

### POST /api/statistics/goals
Create new personal goal

**Request:**
```json
{
  "type": "SLA_COMPLIANCE",
  "target": 95,
  "period": "MONTH"
}
```

### GET /api/statistics/insights
Get AI-powered insights

**Response:**
```json
{
  "insights": [
    {
      "id": "ins_1",
      "type": "POSITIVE",
      "title": "Great improvement!",
      "description": "Your SLA compliance increased 15% this month! 🎉",
      "priority": 1
    },
    {
      "id": "ins_2",
      "type": "ACTIONABLE",
      "title": "Optimize your schedule",
      "description": "You're 30% more productive 9-11 AM. Consider scheduling complex tasks then.",
      "actionUrl": "/settings/schedule",
      "priority": 2
    }
  ]
}
```

### GET /api/statistics/achievements
Get user's earned achievements

**Response:**
```json
{
  "achievements": [
    {
      "id": "ach_1",
      "title": "Speedy Resolver",
      "description": "Resolve 10 tickets in under 1 hour",
      "icon": "⚡",
      "earnedAt": "2026-03-20T14:30:00Z",
      "category": "PRODUCTIVITY"
    }
  ],
  "totalEarned": 15,
  "totalAvailable": 50
}
```

---

## 🎯 Business Rules

### BR-STATS-001: Data Privacy
- Users can only view own statistics
- Team comparison: anonymized, no individual names
- Opt-out option for team comparison
- Manager access: aggregated team stats only (not individual)

### BR-STATS-002: Calculation Periods
- Today: 00:00 - 23:59 current day
- Week: Monday 00:00 - Sunday 23:59
- Month: First day 00:00 - Last day 23:59
- Real-time updates every 5 minutes

### BR-STATS-003: Goal Achievement
- Goal progress calculated hourly
- Achievement notifications sent immediately
- Achievements unlocked: badge + notification + 100 XP points
- Gamification: optional, can be disabled

### BR-STATS-004: Insights Generation
- AI insights generated daily (midnight)
- Min 7 days of data required for pattern detection
- Max 5 insights shown at once (prioritized)
- Refresh insights weekly

---

## ✅ Acceptance Testing

### Test Scenario 1: View Weekly Stats
1. User navigates to Statistics page
2. Selects period "This Week"
3. ✅ Shows tasks completed this week
4. ✅ Shows trend vs last week (+20%)
5. ✅ Shows avg completion time
6. ✅ Shows SLA compliance rate
7. ✅ Charts render correctly
8. ✅ Data matches actual work completed

### Test Scenario 2: Set Personal Goal
1. User clicks "Set Goal"
2. Selects "Tasks per Week"
3. Sets target: 15 tasks
4. Confirms goal creation
5. ✅ Goal appears in "My Goals" section
6. ✅ Progress bar shows current: 12/15 (80%)
7. Complete 3 more tasks
8. ✅ Goal marked ACHIEVED
9. ✅ Notification received
10. ✅ Badge unlocked

### Test Scenario 3: Compare with Team
1. User scrolls to "vs Team Average" section
2. ✅ Shows user stats vs team average
3. ✅ Identifies user percentile rank
4. ✅ No individual names shown (privacy)
5. ✅ Positive framing (not punitive)
6. User opts out of comparison
7. ✅ Section hidden

### Test Scenario 4: Analyze Work Patterns
1. User views activity heatmap
2. ✅ Heatmap shows activity by hour/day
3. ✅ Peak hours highlighted (9-11 AM)
4. ✅ Insight shown: "Most productive 9-11 AM"
5. ✅ Task completion rate by time slot accurate

---

## 🚀 Implementation Notes

### Frontend
- Chart library: Chart.js or Recharts
- Real-time updates via WebSocket/MQTT
- Responsive design (mobile-friendly)
- Skeleton loaders for async data
- Export: client-side PDF generation (jsPDF)

### Backend
- Statistics calculation: scheduled job (hourly)
- Cache computed stats (Redis, 5-min TTL)
- Aggregation pipeline for team averages
- ML model for insights (optional)
- Background worker for achievement checks

### Performance
- Pre-compute statistics hourly
- Index on userId + timestamp
- Partition stats table by month
- Cache frequently accessed metrics
- Lazy load charts (render on viewport)

### Gamification
- Achievement system with point tracking
- Leaderboards (optional, privacy-aware)
- Badges with unlock criteria
- Progress animations for goals

---

## 📚 Related Specs
- [10-history-audit.md](./10-history-audit.md) - Historical data source
- [06-dashboard.md](./06-dashboard.md) - Dashboard integration
- [03-task-management.md](./03-task-management.md) - Task completion data
- [02-ticket-management.md](./02-ticket-management.md) - Ticket resolution data

---

## 📝 Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-03-25 | System | Initial spec created from HTML analysis |
