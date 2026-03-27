# Feature Spec: Approval Workflow

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: APPROVAL-009  
**Priority**: High  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Multi-level approval workflow system for tasks, tickets, resource requests, and personnel changes. Supports sequential and parallel approval chains with delegation and escalation.

**Key Capabilities:**
- Multi-stage approval workflows
- Sequential and parallel approval chains
- Approval delegation
- Auto-escalation on timeout
- Approval history & audit trail
- Bulk approval actions
- Conditional approval rules
- Email & push notifications

---

## 👤 User Stories

### US-APPR-001: View Pending Approvals
**As a** Manager/Approver  
**I want to** see all items awaiting my approval  
**So that** I can review and make decisions

**Acceptance Criteria:**
- ✅ Dashboard widget showing pending count
- ✅ Dedicated "Approvals" page
- ✅ Filter by: type (task/ticket/resource), priority, requester, date
- ✅ Sort by: priority, submission date, deadline
- ✅ Quick preview of item details without opening
- ✅ Batch selection for bulk actions
- ✅ Search by ID, title, requester name

### US-APPR-002: Review & Approve Item
**As a** Approver  
**I want to** review item details and approve  
**So that** work can proceed

**Acceptance Criteria:**
- ✅ View complete item details (title, description, attachments)
- ✅ See approval chain (who approved, who's pending)
- ✅ See business justification/reason
- ✅ View related items/dependencies
- ✅ Add comments/notes before approving
- ✅ Click "Approve" button
- ✅ Optional: set conditions (e.g., budget limit)
- ✅ Notification sent to requester
- ✅ If final approver: item status changes to APPROVED
- ✅ If intermediate: moves to next approver

### US-APPR-003: Reject Item
**As a** Approver  
**I want to** reject item with reason  
**So that** requester understands why

**Acceptance Criteria:**
- ✅ Click "Reject" button
- ✅ Required: rejection reason (dropdown + free text)
- ✅ Common reasons: Budget constraints, Insufficient info, Out of scope, Duplicate
- ✅ Optional: suggestions for resubmission
- ✅ Item status changes to REJECTED
- ✅ Notification sent to requester
- ✅ Requester can revise and resubmit
- ✅ Audit trail preserved

### US-APPR-004: Request Changes
**As a** Approver  
**I want to** request clarifications/changes  
**So that** item can be approved after corrections

**Acceptance Criteria:**
- ✅ Click "Request Changes" button
- ✅ Specify what needs to be changed
- ✅ Item status: CHANGES_REQUESTED
- ✅ Notification sent to requester
- ✅ Requester updates item
- ✅ Resubmit for approval (goes back to same approver)
- ✅ Track revision history

### US-APPR-005: Delegate Approval
**As a** Approver  
**I want to** delegate approval to another person  
**So that** decisions continue when I'm unavailable

**Acceptance Criteria:**
- ✅ Click "Delegate" button on item
- ✅ Select delegate from eligible users
- ✅ Optional: reason for delegation
- ✅ Optional: date range (temporary delegation)
- ✅ Delegate receives notification
- ✅ Delegate can approve/reject with same authority
- ✅ Audit trail shows delegationaction
- ✅ Original approver notified of outcome

### US-APPR-006: Approval Escalation
**As a** System  
**I want to** auto-escalate pending approvals  
**So that** critical items don't stall

**Acceptance Criteria:**
- ✅ Configurable timeout per priority (e.g., Critical: 2h, High: 8h, Medium: 24h)
- ✅ Warning notification at 75% of timeout
- ✅ At timeout: escalate to next level (approver's manager)
- ✅ Original approver CC'd on escalation
- ✅ Escalation logged in audit trail
- ✅ Max 2 escalation levels before auto-approval (configurable)

---

## 🔄 Approval Workflows

### Workflow Types

#### 1. Task Completion Approval
**Trigger**: Staff marks task as "Done"  
**Flow**:
```
Staff marks Done → Manager Review → [Approve/Reject/Request Changes]
                                  ↓
                           If Approved: Task COMPLETED
                           If Rejected: Task IN_PROGRESS
```

#### 2. Ticket Resolution Approval
**Trigger**: Staff marks ticket as "Resolved"  
**Flow**:
```
Staff resolves → Requester Review → [Accept/Reopen]
                                  ↓
                             If Accept: Ticket CLOSED
                             If Reopen: Ticket IN_PROGRESS
```

#### 3. Reassignment Approval (SLA Breach)
**Trigger**: Manager requests reassignment due to SLA breach  
**Flow**:
```
Manager requests → Staff gets notification → Staff [Accept/Decline]
                                                    ↓
                                     If Accept: Task reassigned
                                     If Decline: Escalate to Director
```

#### 4. Resource Request Approval
**Trigger**: Staff requests resources (equipment, budget, personnel)  
**Flow**:
```
Staff submits → Direct Manager → Department Head → Finance/HR
              ↓                ↓                  ↓
          Approve/Reject   Approve/Reject   Final Approve/Reject
```

#### 5. Leave Request Approval (if applicable)
**Trigger**: Staff requests time off  
**Flow**:
```
Staff submits → Manager → [Approve/Reject]
                        ↓
                 If Approved: Calendar updated
```

---

## 💾 Data Model

```typescript
interface ApprovalRequest {
  id: string;
  type: 'TASK_COMPLETION' | 'TICKET_RESOLUTION' | 'REASSIGNMENT' | 'RESOURCE_REQUEST' | 'LEAVE_REQUEST';
  relatedEntityId: string;  // Task ID, Ticket ID, etc.
  relatedEntityType: 'TASK' | 'TICKET' | 'RESOURCE' | 'LEAVE';
  
  requesterId: string;
  requesterName: string;
  requestedAt: DateTime;
  
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED' | 'DELEGATED' | 'ESCALATED';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  
  approvalChain: ApprovalStep[];
  currentStep: number;
  
  escalationThreshold: number;  // Hours
  escalatedAt: DateTime | null;
  completedAt: DateTime | null;
  
  metadata: Record<string, any>;
}

interface ApprovalStep {
  stepNumber: number;
  approverId: string;
  approverName: string;
  approverRole: string;
  
  action: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED' | 'DELEGATED';
  actionAt: DateTime | null;
  
  comments: string;
  attachments: string[];
  
  delegatedTo: string | null;
  delegatedAt: DateTime | null;
  delegationReason: string;
}

interface ApprovalRule {
  id: string;
  entityType: 'TASK' | 'TICKET' | 'RESOURCE' | 'LEAVE';
  conditions: ApprovalCondition[];
  chain: ApprovalChainStep[];
  escalationPolicy: EscalationPolicy;
}

interface ApprovalCondition {
  field: string;
  operator: '=' | '>' | '<' | 'contains';
  value: any;
}

interface ApprovalChainStep {
  stepNumber: number;
  approverRole: string;
  approverUserId: string | null;  // null = any user with role
  parallel: boolean;  // true = multiple approvers at same level
  required: boolean;  // false = optional approval
}

interface EscalationPolicy {
  enabled: boolean;
  timeoutHours: number;
  escalateToRole: string;
  maxEscalations: number;
  autoApproveAfterMax: boolean;
}
```

---

## 🎨 UI Components

### Approvals Page (`approvals.html`)

```
┌──────────────────────────────────────────────────────────┐
│  📋 Phê Duyệt                           [🔔] [👤]         │
├──────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐ │
│  │ [🔴 Urgent: 4]  [📊 Summary]  [⚙️ Settings]       │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Filter: [All Types ▼] [All Priority ▼] [🔍 Search]     │
│  ☐ Select All  [✅ Approve Selected] [❌ Reject Bulk]   │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ ☐ 🔴 TSK-123: Database Migration                   │ │
│  │    Requester: Đinh Bộ Lĩnh • 2 hours ago           │ │
│  │    Priority: CRITICAL • Type: Task Completion       │ │
│  │    [👁️ View] [✅ Approve] [❌ Reject] [💬 Comment]  │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ☐ 🟡 TKT-456: Printer Issue Resolved               │ │
│  │    Requester: Nguyễn Văn A • 4 hours ago           │ │
│  │    Priority: HIGH • Type: Ticket Resolution         │ │
│  │    [👁️ View] [✅ Approve] [❌ Reject] [💬 Comment]  │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ☐ 🟢 REQ-789: Equipment Request                    │ │
│  │    Requester: Trần Thị B • Yesterday               │ │
│  │    Priority: MEDIUM • Type: Resource Request        │ │
│  │    [👁️ View] [✅ Approve] [❌ Reject] [💬 Comment]  │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Showing 3 of 7 pending | [Load More]                   │
└──────────────────────────────────────────────────────────┘
```

### Approval Detail Modal

```
┌──────────────────────────────────────────────────────────┐
│  Task Completion Approval                         [✕]    │
├──────────────────────────────────────────────────────────┤
│  TSK-123: Database Migration to PostgreSQL 15            │
│  Submitted by: Đinh Bộ Lĩnh                             │
│  Submitted at: March 25, 2026 10:30 AM                  │
│  Priority: 🔴 CRITICAL                                   │
│                                                          │
│  ── Description ─────────────────────────────────────── │
│  Completed migration from PG 14 to PG 15. All tests     │
│  passing. Ready for production deployment.              │
│                                                          │
│  ── Deliverables ───────────────────────────────────── │
│  ✅ Migration scripts executed                          │
│  ✅ Data integrity verified                             │
│  ✅ Performance tests passed                            │
│  ✅ Rollback plan documented                            │
│                                                          │
│  ── Approval Chain ─────────────────────────────────── │
│  1. ✅ Team Lead (You) - PENDING                        │
│  2. ⏳ Department Head - WAITING                        │
│                                                          │
│  ── Your Decision ──────────────────────────────────── │
│  Comments (optional):                                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │                                                    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  [ ✅ Approve ]  [ ❌ Reject ]  [ 🔄 Request Changes ]  │
│                               [ 👥 Delegate ]           │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints

### GET /api/approvals/pending
Get pending approvals for current user

**Response:**
```json
{
  "approvals": [
    {
      "id": "appr_123",
      "type": "TASK_COMPLETION",
      "relatedEntity": {
        "id": "tsk_123",
        "title": "Database Migration",
        "type": "TASK"
      },
      "requester": {
        "id": "usr_456",
        "name": "Đinh Bộ Lĩnh"
      },
      "requestedAt": "2026-03-25T10:30:00Z",
      "priority": "CRITICAL",
      "currentStep": 1,
      "totalSteps": 2
    }
  ],
  "total": 7,
  "urgentCount": 4
}
```

### POST /api/approvals/:id/approve
Approve an item

**Request:**
```json
{
  "comments": "Looks good, approved for deployment",
  "conditions": {
    "deployAfter": "2026-03-26T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "approval": {
    "id": "appr_123",
    "status": "APPROVED",
    "nextStep": 2,
    "nextApprover": {
      "id": "usr_789",
      "name": "Department Head",
      "role": "MANAGER"
    }
  }
}
```

### POST /api/approvals/:id/reject
Reject an item

**Request:**
```json
{
  "reason": "INSUFFICIENT_INFO",
  "comments": "Please provide rollback testing results",
  "suggestions": "Add rollback test evidence before resubmit"
}
```

### POST /api/approvals/:id/request-changes
Request changes

**Request:**
```json
{
  "requiredChanges": [
    "Add security review signoff",
    "Include performance benchmark comparison"
  ],
  "comments": "Need additional documentation"
}
```

### POST /api/approvals/:id/delegate
Delegate approval

**Request:**
```json
{
  "delegateToUserId": "usr_999",
  "reason": "Out of office this week",
  "validUntil": "2026-04-01T00:00:00Z"
}
```

---

## 🎯 Business Rules

### BR-APPR-001: Approval Authority
- Users can only approve items at their authority level
- Delegation requires same or higher authority level
- Audit trail required for all approval actions

### BR-APPR-002: Escalation Timing
| Priority | Initial Timeout | Escalation Level |
|----------|-----------------|------------------|
| Critical | 2 hours | +1 level (Manager → Director) |
| High | 8 hours | +1 level |
| Medium | 24 hours | +1 level |
| Low | 3 days | +1 level |

### BR-APPR-003: Bulk Approvals
- Max 20 items per bulk action
- All items must be same type
- Individual audit records created
- Cannot bulk reject (must provide reason per item)

### BR-APPR-004: Resubmission
- Rejected items can be revised and resubmitted
- Returns to first approver (not skipping steps)
- Max 3 resubmissions before manager review required

---

## ✅ Acceptance Testing

### Test Scenario 1: Simple Approval
1. Manager navigates to Approvals page
2. Sees pending task completion approval
3. Clicks "View" to see details
4. Reviews task deliverables
5. Adds comment "Approved"
6. Clicks "Approve" button
7. ✅ Success message shown
8. ✅ Item removed from pending list
9. ✅ Requester receives notification
10. ✅ Task status updated to COMPLETED

### Test Scenario 2: Rejection with Reason
1. Manager reviews approval request
2. Clicks "Reject"
3. Selects reason "Insufficient information"
4. Adds comment explaining what's missing
5. Confirms rejection
6. ✅ Item status: REJECTED
7. ✅ Requester notified with feedback
8. ✅ Requester can revise and resubmit

### Test Scenario 3: Delegation
1. Manager needs to delegate due to vacation
2. Opens approval item
3. Clicks "Delegate"
4. Selects delegate (another manager)
5. Specifies reason and date range
6. Confirms delegation
7. ✅ Delegate receives notification
8. ✅ Delegate can now approve/reject
9. ✅ Original manager notified of decision

### Test Scenario 4: Escalation
1. Approval request sits pending for threshold time
2. ✅ Warning notification sent at 75% of threshold
3. Threshold reached
4. ✅ Auto-escalated to next level approver
5. ✅ Original approver CC'd on escalation
6. ✅ Escalation logged in audit trail

---

## 🚀 Implementation Notes

### Frontend
- Create reusable `ApprovalCard` component
- Implement bulk selection with checkboxes
- Use confirmation dialogs for reject/delegate
- Real-time updates via MQTT for status changes
- Client-side filtering and sorting

### Backend
- Approval workflow engine
- Scheduled job for escalation checks (every 5 minutes)
- Transaction support for approval actions
- Notification service integration
- Audit logging for all actions

### Performance
- Index on `approverId` + `status` for fast queries
- Cache approval rules in memory
- Batch notification sending
- Pagination for approval lists

---

## 📚 Related Specs
- [03-task-management.md](./03-task-management.md) - Task completion approval
- [02-ticket-management.md](./02-ticket-management.md) - Ticket resolution approval
- [05-sla-management.md](./05-sla-management.md) - SLA breach reassignment approval
- [07-notifications.md](./07-notifications.md) - Approval notifications

---

## 📝 Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-03-25 | System | Initial spec created from HTML analysis |
