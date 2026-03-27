# Feature Spec: SLA Management & Escalation

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: SLA-005  
**Priority**: Critical  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Comprehensive SLA (Service Level Agreement) management system với real-time monitoring, automated alerts, và escalation workflow for tickets và tasks.

**Key Capabilities:**
- Priority-based SLA rules configuration
- Real-time SLA monitoring (background jobs)
- 4-tier status: Safe, Warning, Danger, Breached
- Automated escalation notifications
- Manager approval for reassignments (NO auto-reassign)
- SLA compliance reporting

---

## 👤 User Stories

### US-SLA-001: Configure SLA Rules
**As a** Admin  
**I want to** configure SLA thresholds per priority  
**So that** system monitors deadlines correctly

**Acceptance Criteria:**
- ✅ Configure per priority level:
  - Response time (time to first action)
  - Resolution time (time to complete)
- ✅ Set escalation triggers (Warning at 75%, Danger at 90%)
- ✅ Configure notification rules
- ✅ Set business hours (affects SLA calculation)

**Default SLA Rules:**
| Priority | Response Time | Resolution Time | Escalation |
|----------|---------------|-----------------|------------|
| Critical | 5 minutes | 2 hours | Immediate |
| High | 30 minutes | 4 hours | After 2h |
| Medium | 2 hours | 24 hours | After 12h |
| Low | 8 hours | 3 days | After 2 days |

### US-SLA-002: Real-time SLA Monitoring
**As a** System  
**I want to** continuously monitor SLA status  
**So that** stakeholders được alerted kịp thời

**Acceptance Criteria:**
- ✅ Background job runs every 5 minutes
- ✅ Calculate remaining time for each ticket/task
- ✅ Update SLA status:
  - **🟢 SAFE**: > 25% time remaining
  - **🟡 WARNING**: 10-25% time remaining
  - **🟠 DANGER**: 0-10% time remaining
  - **🔴 BREACHED**: Past deadline
- ✅ Trigger notifications on status change
- ✅ Log SLA events

### US-SLA-003: Escalation Workflow
**As a** Manager  
**I want to** được notified when SLA breached  
**So that** I can take corrective action

**Acceptance Criteria:**
- ✅ When SLA enters DANGER: Notify assignee + manager
- ✅ When SLA BREACHED: High priority notification to manager
- ✅ Manager views:
  - Breach details (by how long)
  - Current assignee & workload
  - Suggested candidates (lighter workload, matching skills)
- ✅ Manager options:
  - Keep current assignee (escalate to Director)
  - Reassign to suggested candidate
  - Add additional resources
- ✅ **IMPORTANT**: NO автоматическая reassignment. Manager must approve.

### US-SLA-004: SLA Dashboard
**As a** Manager  
**I want to** see SLA compliance overview  
**So that** I monitor team performance

**Acceptance Criteria:**
- ✅ Overall SLA compliance %
- ✅ Breakdown by priority
- ✅ At-risk items (Warning + Danger)
- ✅ Breaches today/this week
- ✅ Trend charts
- ✅ Drill-down to individual items

---

## 🔄 SLA Lifecycle

```
┌────────────┐
│ New Ticket │
│  or Task   │
└──────┬─────┘
       │
       │ SLA Timer Starts
       ▼
┌──────────────┐
│   🟢 SAFE    │ > 25% time left
│  All Good    │
└──────┬───────┘
       │ Time passing...
       ▼
┌──────────────┐
│  🟡 WARNING  │ 10-25% time left
│ Notify Staff │ → Notification to assignee
└──────┬───────┘
       │ Still passing...
       ▼
┌──────────────┐
│  🟠 DANGER   │ 0-10% time left
│Notify Manager│ → Notification to manager + assignee
└──────┬───────┘
       │ Deadline passed
       ▼
┌──────────────┐
│  🔴 BREACHED │ Past deadline
│  Escalate!   │ → High priority notification
└──────┬───────┘
       │
       │ Manager decides
       ├─────────┬──────────┐
       ▼         ▼          ▼
   Keep      Reassign    Add Resources
  Current     To New        + Alert
  Assignee   Candidate     Director
```

---

## 🎯 Business Rules

### BR-SLA-001: SLA Scope
**Rule**: SLA applies to:
- All tickets (from TRIAGED onwards)
- All tasks (from ASSIGNED onwards)
- Excludes: SUBMITTED (pre-triage), CANCELLED

### BR-SLA-002: Business Hours
**Rule**: SLA calculated using business hours only (configurable):
- Default: Mon-Fri, 08:00-17:00
- Excludes: Weekends, Public holidays
- Pause timer outside business hours

### BR-SLA-003: SLA Reset Conditions
**Rule**: SLA timer resets when:
- Ticket reopened after closure
- Task reassigned (if Manager approves reset)
- Priority upgraded
**Does NOT reset:**
- Status changes (ASSIGNED → IN_PROGRESS)
- Comments/updates
- Priority downgraded

### BR-SLA-004: Escalation Triggers
**Rule**: Escalation notifications sent:
- WARNING (75% time used): Assignee
- DANGER (90% time used): Assignee + Manager
- BREACH: Manager + Director (email)

### BR-SLA-005: No Auto-Reassign
**Rule**: System NEVER automatically reassigns. Только suggests candidates. Manager must explicitly approve.

---

## 💾 Data Model

```typescript
interface SLAConfiguration {
  priority: Priority;
  responseTimeMinutes: number;
  resolutionTimeMinutes: number;
  warningThresholdPercent: number;    // Default 75%
  dangerThresholdPercent: number;     // Default 90%
  escalationDelayMinutes: number;
  businessHoursOnly: boolean;
}

interface SLATracker {
  entityId: string;                    // Ticket or Task ID
  entityType: 'TICKET' | 'TASK';
  priority: Priority;
  
  // Timestamps
  slaStartedAt: DateTime;
  responseDeadline: DateTime;
  resolutionDeadline: DateTime;
  
  // Status
  currentStatus: 'SAFE' | 'WARNING' | 'DANGER' | 'BREACHED';
  firstResponseAt: DateTime | null;
  resolvedAt: DateTime | null;
  
  // Breach tracking
  breachedAt: DateTime | null;
  breachDurationMinutes: number;
  
  // Escalations
  escalations: Escalation[];
  
  // Pause/Resume (for business hours)
  pausedAt: DateTime | null;
  totalPausedMinutes: number;
}

interface Escalation {
  id: string;
  timestamp: DateTime;
  reason: string;
  notifiedUsers: string[];
  action: 'KEPT_ASSIGNEE' | 'REASSIGNED' | 'ADDED_RESOURCES';
  notes: string;
}
```

---

## 🔌 API Endpoints

```http
# Configuration
GET    /api/sla/config
PUT    /api/sla/config
GET    /api/sla/business-hours

# Monitoring
GET    /api/sla/:entityType/:entityId      # Get SLA status for item
GET    /api/sla/at-risk                    # Get all at-risk items
GET    /api/sla/breaches                   # Get current breaches

# Escalation
POST   /api/sla/:entityType/:entityId/escalate
POST   /api/sla/:entityType/:entityId/reassign-approve
GET    /api/sla/:entityType/:entityId/candidates   # Get suggested candidates

# Reporting
GET    /api/sla/compliance-report
GET    /api/sla/breach-report
```

---

## 🎨 UI Components

### SLA Indicator Badge
Display on every ticket/task card:
- 🟢 SAFE: Green badge "On Track"
- 🟡 WARNING: Yellow badge "2h left"
- 🟠 DANGER: Orange badge "15m left!"
- 🔴 BREACHED: Red angry badge "BREACHED 30m ago"

### SLA Dashboard Widget
- Gauge chart: Overall compliance %
- At-risk counter
- Breach counter
- Trend sparkline

### Escalation Dialog (Manager)
When SLA breached:
- Show: Current assignee, workload, breach time
- Suggested candidates list với scores
- Radio options:
  - ○ Keep current assignee → Escalate to Director
  - ○ Reassign to: [Dropdown]
  - ○ Add resources: [User picker]
- Text area: Decision notes
- Buttons: [Approve] [Cancel]

---

## 🔔 Notifications

### Staff Notifications
- 🟡 Your ticket/task entering WARNING zone
- 🟠 Your ticket/task in DANGER! Immediate attention needed

### Manager Notifications
- 🟠 Team item in DANGER zone (list)
- 🔴 SLA BREACH ALERT! [Item ID] (email + push)
- ℹ️ Daily SLA summary report

### Director Notifications
- 🔴 SLA breach escalated by manager
- 📊 Weekly SLA compliance report

---

## 📊 Metrics & KPIs

### Compliance Metrics
- Overall SLA compliance %
- Compliance by priority
- Compliance by department/team
- Compliance trend (daily/weekly/monthly)

### Breach Analysis
- Total breaches
- Breach duration average
- Breaches by priority
- Breaches by assignee
- Breach root causes

### Performance Metrics
- Average response time
- Average resolution time
- % items breaching SLA
- Escalation frequency

---

## 🧪 Test Scenarios

### TS-SLA-001: Normal Flow
1. Ticket created with High priority
2. SLA: Response 30min, Resolution 4h
3. Assigned after 10min → Response SLA met
4. Status WARNING at 3h mark
5. Resolved at 3.5h → Resolution SLA met
6. SLA status: SAFE throughout ✅

### TS-SLA-002: Breach & Escalation
1. Critical task assigned
2. SLA: 2 hours resolution
3. At 1.5h: DANGER notification
4. At 2h: BREACH
5. Manager notified
6. Manager views suggested candidates
7. Manager reassigns to staff B
8. New SLA timer starts

### TS-SLA-003: Business Hours
1. Ticket assigned Friday 16:00
2. SLA: 4 hours resolution
3. Business hours: M-F 08:00-17:00
4. Timer runs: 16:00-17:00 (1h)
5. Timer pauses weekend
6. Timer resumes Monday 08:00
7. Deadline: Monday 11:00 (3h more)

---

## 🚀 Implementation Notes

### Background Job
```typescript
// Runs every 5 minutes
async function monitorSLA() {
  const activeItems = await getActiveTicketsAndTasks();
  
  for (const item of activeItems) {
    const sla = await getSLATracker(item.id);
    const now = DateTime.now();
    
    // Calculate remaining time
    const remaining = sla.resolutionDeadline.diff(now, 'minutes').minutes;
    const total = sla.resolutionDeadline.diff(sla.slaStartedAt, 'minutes').minutes;
    const percentUsed = ((total - remaining) / total) * 100;
    
    // Determine status
    let newStatus;
    if (remaining < 0) newStatus = 'BREACHED';
    else if (percentUsed >= 90) newStatus = 'DANGER';
    else if (percentUsed >= 75) newStatus = 'WARNING';
    else newStatus = 'SAFE';
    
    // Update if changed
    if (newStatus !== sla.currentStatus) {
      await updateSLAStatus(sla.id, newStatus);
      await sendSLANotifications(item, newStatus);
    }
  }
}
```

### Candidate Suggestion Algorithm
```typescript
function suggestCandidates(
  item: Ticket | Task,
  excludeUserId: string
): CandidateScore[] {
  const eligible = getEligibleStaff(item);
  
  return eligible
    .filter(staff => staff.id !== excludeUserId)
    .map(staff => ({
      userId: staff.id,
      score: calculateScore(staff, item),
      workload: staff.currentTaskCount,
      skills: staff.skills,
      availability: staff.status
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);  // Top 5 candidates
}

function calculateScore(staff: Staff, item: any): number {
  let score = 100;
  
  // Skill match (0-40 points)
  const skillMatch = calculateSkillMatch(staff.skills, item.requiredSkills);
  score += skillMatch * 40;
  
  // Workload (0-30 points, inverse relationship)
  const workloadPenalty = (staff.currentTaskCount / 10) * 30;
  score -= workloadPenalty;
  
  // Past performance (0-20 points)
  score += staff.averageRating * 4;  // 5-star → 20 points
  
  // Department match (0-10 points)
  if (staff.departmentId === item.departmentId) score += 10;
  
  return Math.max(0, Math.min(100, score));
}
```

---

## ✅ Acceptance Criteria Summary

**Definition of Done for SLA Management:**
- [ ] SLA config UI functional
- [ ] Background monitoring job running every 5min
- [ ] SLA status correctly calculated for all items
- [ ] Notifications sent at correct thresholds
- [ ] Escalation workflow tested with manager approval
- [ ] Candidate suggestion algorithm validated
- [ ] SLA dashboard displaying real-time data
- [ ] Breach reports accurate
- [ ] Business hours calculation correct
- [ ] Performance: Monitor 10,000 items < 30 seconds
- [ ] No auto-reassignment implemented (only manual)

---

**Related Specs:**
- [02-ticket-management.md](./02-ticket-management.md)
- [03-task-management.md](./03-task-management.md)
- [07-notifications.md](./07-notifications.md)
- [reports/03-sla-compliance.md](./reports/03-sla-compliance.md)
