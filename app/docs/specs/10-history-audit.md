# Feature Spec: History & Audit Trail

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: HISTORY-010  
**Priority**: Medium  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Comprehensive activity history and audit trail system for tracking all user actions, entity changes, and system events. Provides accountability, compliance reporting, and troubleshooting capabilities.

**Key Capabilities:**
- Complete activity timeline for users and entities
- Detailed change tracking (who, what, when, why)
- Search and filter historical data
- Export audit reports
- Compliance-ready logging
- Visual timeline with filtering
- Activity statistics and insights

---

## 👤 User Stories

### US-HIST-001: View Personal Work History
**As a** Staff member  
**I want to** see my work history  
**So that** I can track what I've accomplished

**Acceptance Criteria:**
- ✅ Timeline view of all my activities
- ✅ Show: tasks completed, tickets resolved, comments added
- ✅ Filter by: date range, activity type, entity type
- ✅ Search by keywords, ID, title
- ✅ Group by: day, week, month
- ✅ Export to PDF/CSV
- ✅ Statistics: tasks completed this week/month, avg completion time

### US-HIST-002: View Entity History
**As a** User  
**I want to** see complete history of a ticket/task  
**So that** I understand what happened and why

**Acceptance Criteria:**
- ✅ Timeline of all changes to entity
- ✅ Show: status changes, assignments, comments, attachments
- ✅ Display: timestamp, actor, action, old value → new value
- ✅ Include system actions (SLA warnings, auto-escalations)
- ✅ Attachments: view/download historical versions
- ✅ Expandable detail view for each event
- ✅ Color-coded by event type

### US-HIST-003: Audit Trail for Compliance
**As an** Admin/Manager  
**I want to** view audit logs for compliance  
**So that** we meet regulatory requirements

**Acceptance Criteria:**
- ✅ Filter by: user, action type, entity type, date range
- ✅ Show: authentication events, permission changes, data modifications
- ✅ Include: IP address, user agent, geolocation
- ✅ Tamper-proof logging (immutable records)
- ✅ Export comprehensive audit reports (PDF/CSV)
- ✅ Retention policy enforcement
- ✅ Search with advanced filters (AND/OR logic)

### US-HIST-004: Track Changes Over Time
**As a** Manager  
**I want to** see trends in activities  
**So that** I identify patterns and bottlenecks

**Acceptance Criteria:**
- ✅ Activity heatmap (hourly/daily/weekly)
- ✅ Charts: tasks completed over time, tickets resolved
- ✅ Comparison: this week vs last week, this month vs last month
- ✅ Top performers (most tasks completed)
- ✅ Response time trends
- ✅ SLA breach frequency over time

### US-HIST-005: Restore Previous Version
**As a** User with permissions  
**I want to** view and restore previous versions  
**So that** I can undo mistakes

**Acceptance Criteria:**
- ✅ View previous versions of entity (title, description, fields)
- ✅ Compare: current vs previous version (diff view)
- ✅ Restore specific field to previous value
- ✅ Requires confirmation for restore
- ✅ Restore action logged in audit trail
- ✅ Notification sent to stakeholders

---

## 🔄 Activity Types

### User Activities

| Activity Type | Description | Captured Data |
|---------------|-------------|---------------|
| **LOGIN** | User logged in | IP, device, time |
| **LOGOUT** | User logged out | Time, session duration |
| **TICKET_CREATED** | New ticket created | Ticket details |
| **TICKET_UPDATED** | Ticket modified | Changed fields (before/after) |
| **TICKET_ASSIGNED** | Ticket assigned to user | Assignee, assigner |
| **TICKET_RESOLVED** | Ticket marked resolved | Resolution details |
| **TICKET_CLOSED** | Ticket closed | Closer, rating |
| **TASK_CREATED** | New task created | Task details |
| **TASK_ASSIGNED** | Task assigned | Assignee, method (direct/pool/team) |
| **TASK_CLAIMED** | Task claimed from pool | Claimer |
| **TASK_STARTED** | Task work started | Start time |
| **TASK_PROGRESS** | Task progress updated | Old % → New % |
| **TASK_COMPLETED** | Task marked done | Completion time, deliverables |
| **COMMENT_ADDED** | Comment posted | Comment text, entity |
| **ATTACHMENT_ADDED** | File uploaded | File name, size, type |
| **APPROVAL_GRANTED** | Item approved | Approver, comments |
| **APPROVAL_REJECTED** | Item rejected | Rejecter, reason |
| **ESCALATION** | Item escalated | From/to, reason |
| **REASSIGNMENT** | Item reassigned | Old assignee → New assignee |
| **SLA_WARNING** | SLA entered warning | Entity, remaining time |
| **SLA_BREACH** | SLA breached | Entity, overdue by |
| **SETTINGS_CHANGED** | User settings updated | Changed settings |
| **PASSWORD_CHANGED** | Password reset/changed | No password logged! |
| **PERMISSION_CHANGED** | User permissions modified | Old role → New role |

---

## 💾 Data Model

```typescript
interface ActivityLog {
  id: string;
  timestamp: DateTime;
  
  // Actor (who did it)
  actorId: string;
  actorName: string;
  actorRole: string;
  actorType: 'USER' | 'SYSTEM';
  
  // Action (what happened)
  action: ActivityType;
  actionDescription: string;
  
  // Entity (what was affected)
  entityId: string;
  entityType: 'TICKET' | 'TASK' | 'USER' | 'APPROVAL' | 'SETTING';
  entityTitle: string;
  
  // Change Details
  changes: ChangeRecord[];
  
  // Context
  ipAddress: string;
  userAgent: string;
  geolocation: string | null;
  sessionId: string;
  
  // Metadata
  metadata: Record<string, any>;
  tags: string[];
}

interface ChangeRecord {
  field: string;
  fieldLabel: string;
  oldValue: any;
  newValue: any;
  changeType: 'CREATED' | 'UPDATED' | 'DELETED';
}

interface AuditReport {
  id: string;
  title: string;
  generatedBy: string;
  generatedAt: DateTime;
  startDate: DateTime;
  endDate: DateTime;
  filters: AuditFilter;
  entries: ActivityLog[];
  summary: AuditSummary;
}

interface AuditFilter {
  userIds: string[];
  actionTypes: ActivityType[];
  entityTypes: string[];
  dateRange: [DateTime, DateTime];
  searchQuery: string;
}

interface AuditSummary {
  totalEvents: number;
  uniqueUsers: number;
  uniqueEntities: number;
  topActions: { action: string; count: number }[];
  topUsers: { userId: string; name: string; count: number }[];
}
```

---

## 🎨 UI Components

### History Page (`history.html`)

```
┌──────────────────────────────────────────────────────────┐
│  🕐 Lịch Sử Công Việc                  [🔔] [👤]         │
├──────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐ │
│  │ [📊 My Stats] [📅 Timeline] [📥 Export]            │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ This Week:  ✅ 12 tasks completed  🎫 5 tickets     │ │
│  │ Avg Time:   ⏱️ 3.5 hours per task                   │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Filters: [Last 7 days ▼] [All Types ▼] [🔍 Search]    │
│  ☐ Show only mine    ☐ Include system events            │
│                                                           │
│  ── Today (March 25) ──────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 14:30 ✅ Completed task TSK-456                     │ │
│  │       "Database backup automation"                   │ │
│  │       Duration: 2h 15m • Quality: ⭐⭐⭐⭐⭐         │ │
│  │                                                      │ │
│  │ 12:45 💬 Commented on TKT-123                        │ │
│  │       "Fixed printer configuration issue"            │ │
│  │                                                      │ │
│  │ 10:15 🎫 Resolved ticket TKT-789                     │ │
│  │       "Network connectivity problem"                 │ │
│  │       SLA: 🟢 Met (1h 23m remaining)                │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ── Yesterday (March 24) ──────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 16:20 ✅ Completed task TSK-321                     │ │
│  │ 14:50 🔄 Progress update TSK-456: 60% → 85%         │ │
│  │ 11:00 📄 Claimed task TSK-456 from pool             │ │
│  │ 09:30 🔐 Logged in from 192.168.1.100               │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  [Load More...] Showing 8 of 45 activities              │
└──────────────────────────────────────────────────────────┘
```

### Entity History Timeline

```
┌──────────────────────────────────────────────────────────┐
│  History: TKT-123 - Printer Configuration Issue          │
├──────────────────────────────────────────────────────────┤
│  ● 15:30  Ticket CLOSED by Nguyễn Văn A                 │
│    │      Status: RESOLVED → CLOSED                      │
│    │      Rating: ⭐⭐⭐⭐⭐ (5/5)                         │
│    │                                                      │
│  ● 14:45  Ticket RESOLVED by Đinh Bộ Lĩnh               │
│    │      Status: IN_PROGRESS → RESOLVED                 │
│    │      Solution: "Updated printer driver to v2.3"     │
│    │      SLA: 🟢 Met (45m remaining)                    │
│    │                                                      │
│  ● 13:20  Comment added by Đinh Bộ Lĩnh                 │
│    │      "Identified driver incompatibility issue"      │
│    │                                                      │
│  ● 12:00  Work STARTED by Đinh Bộ Lĩnh                  │
│    │      Status: ASSIGNED → IN_PROGRESS                 │
│    │                                                      │
│  ● 11:30  Ticket ASSIGNED to Đinh Bộ Lĩnh               │
│    │      Assigned by: Manager (Auto-routing)            │
│    │      Status: TRIAGED → ASSIGNED                     │
│    │                                                      │
│  ● 11:00  Ticket TRIAGED by Manager                     │
│    │      Priority: MEDIUM → HIGH                        │
│    │      Status: SUBMITTED → TRIAGED                    │
│    │                                                      │
│  ● 10:45  Ticket CREATED by Nguyễn Văn A                │
│    │      Title: "Printer not working in ER"             │
│    │      Priority: MEDIUM • Category: Technical         │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints

### GET /api/history/me
Get current user's activity history

**Query Parameters:**
- `startDate` (ISO 8601): Start of date range
- `endDate` (ISO 8601): End of date range
- `types` (comma-separated): Activity types to include
- `limit` (number): Max results (default: 50)
- `offset` (number): Pagination offset

**Response:**
```json
{
  "activities": [
    {
      "id": "act_123",
      "timestamp": "2026-03-25T14:30:00Z",
      "action": "TASK_COMPLETED",
      "actionDescription": "Completed task",
      "entity": {
        "id": "tsk_456",
        "type": "TASK",
        "title": "Database backup automation"
      },
      "metadata": {
        "duration": "2h 15m",
        "quality": 5
      }
    }
  ],
  "total": 45,
  "summary": {
    "tasksCompleted": 12,
    "ticketsResolved": 5,
    "avgTaskTime": "3.5 hours"
  }
}
```

### GET /api/history/entity/:type/:id
Get history for specific entity

**Response:**
```json
{
  "entity": {
    "id": "tkt_123",
    "type": "TICKET",
    "title": "Printer Configuration Issue"
  },
  "timeline": [
    {
      "id": "act_789",
      "timestamp": "2026-03-25T15:30:00Z",
      "actor": {
        "id": "usr_456",
        "name": "Nguyễn Văn A",
        "role": "STAFF"
      },
      "action": "TICKET_CLOSED",
      "changes": [
        {
          "field": "status",
          "oldValue": "RESOLVED",
          "newValue": "CLOSED"
        },
        {
          "field": "rating",
          "oldValue": null,
          "newValue": 5
        }
      ]
    }
  ]
}
```

### GET /api/audit/report
Generate audit report (Admin/Manager only)

**Query Parameters:**
- `startDate` (required)
- `endDate` (required)
- `userIds` (optional, comma-separated)
- `actionTypes` (optional, comma-separated)
- `format` (json|pdf|csv)

**Response:**
```json
{
  "report": {
    "id": "rpt_abc",
    "title": "Audit Report: March 18-25, 2026",
    "generatedAt": "2026-03-25T16:00:00Z",
    "summary": {
      "totalEvents": 1247,
      "uniqueUsers": 42,
      "uniqueEntities": 386,
      "topActions": [
        { "action": "TICKET_UPDATED", "count": 234 },
        { "action": "TASK_COMPLETED", "count": 187 }
      ],
      "topUsers": [
        { "userId": "usr_123", "name": "Đinh Bộ Lĩnh", "count": 89 },
        { "userId": "usr_456", "name": "Nguyễn Văn A", "count": 76 }
      ]
    },
    "downloadUrl": "/api/audit/report/rpt_abc/download"
  }
}
```

### GET /api/history/stats
Get activity statistics for current user

**Query Parameters:**
- `period` (today|week|month|year)

**Response:**
```json
{
  "period": "week",
  "stats": {
    "tasksCompleted": 12,
    "ticketsResolved": 5,
    "commentsAdded": 23,
    "avgResponseTime": "1h 15m",
    "avgCompletionTime": "3h 30m",
    "slaCompliance": 94.5,
    "qualityRating": 4.7
  },
  "trend": {
    "tasksCompletedChange": "+20%",
    "complianceChange": "-2.3%"
  }
}
```

---

## 🎯 Business Rules

### BR-HIST-001: Retention Policy
- Activity logs retained for 2 years
- Critical audit events (auth, permissions): 7 years
- Automatic archival after retention period
- Archived logs: read-only, no deletion

### BR-HIST-002: Access Control
- Users can view own activity history
- Managers can view team history
- Admins can view all history
- Audit reports: Manager+ only
- Cannot edit/delete historical records (immutable)

### BR-HIST-003: Sensitive Data
- Never log passwords (even hashed)
- Mask sensitive fields (SSN, credit cards)
- PII redaction for compliance
- Audit log encryption at rest

### BR-HIST-004: Performance
- Index on: timestamp, actorId, entityId, entityType
- Partition tables by month
- Archive old data to cold storage
- Cache common queries (user stats)

---

## ✅ Acceptance Testing

### Test Scenario 1: View Personal History
1. User navigates to History page
2. Sees timeline of own activities
3. Filters to "Last 7 days"
4. Selects "Tasks only"
5. ✅ Shows only task-related activities
6. ✅ Grouped by day
7. ✅ Most recent first
8. ✅ Accurate timestamps and details

### Test Scenario 2: View Entity History
1. User opens ticket TKT-123
2. Clicks "History" tab
3. ✅ Timeline shows all changes
4. ✅ Status transitions clearly marked
5. ✅ Timestamps accurate
6. ✅ Actor names shown
7. Expands a change event
8. ✅ Detailed before/after values visible

### Test Scenario 3: Generate Audit Report
1. Admin navigates to Audit page
2. Selects date range: March 1-25
3. Filters: Login/Logout events only
4. Clicks "Generate Report"
5. ✅ Report generated successfully
6. Downloads as PDF
7. ✅ PDF contains all filtered events
8. ✅ Summary statistics included
9. ✅ Properly formatted and readable

### Test Scenario 4: Activity Statistics
1. User views History page
2. Clicks "My Stats" tab
3. Selects period "This Month"
4. ✅ Shows tasks completed count
5. ✅ Shows tickets resolved count
6. ✅ Shows avg completion times
7. ✅ Shows SLA compliance %
8. ✅ Shows trend vs last month

---

## 🚀 Implementation Notes

### Frontend
- Infinite scroll for timeline (load more on scroll)
- Use virtualization for large lists (react-window)
- Date range picker with presets (today, week, month)
- Export functionality (download as PDF/CSV)
- Responsive timeline design (mobile-friendly)

### Backend
- Asynchronous logging (don't block requests)
- Message queue for activity ingestion (RabbitMQ/Redis)
- Batch inserts for performance
- Separate read replica for history queries
- Background job for archival

### Database
- Partitioned tables by month
- Indexes on common queries
- Compression for archived data
- Regular VACUUM/ANALYZE

### Monitoring
- Track logging latency
- Monitor storage growth
- Alert on missing logs (gaps)
- Regular audit of audit logs (meta!)

---

## 📚 Related Specs
- [08-authentication.md](./08-authentication.md) - Login/logout events
- [02-ticket-management.md](./02-ticket-management.md) - Ticket activity tracking
- [03-task-management.md](./03-task-management.md) - Task activity tracking
- [09-approvals-workflow.md](./09-approvals-workflow.md) - Approval history

---

## 📝 Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-03-25 | System | Initial spec created from HTML analysis |
