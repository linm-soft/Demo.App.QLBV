# Mock Data Review - Permission Testing Scenarios

## 📊 Executive Summary

**Date:** March 27, 2026  
**Reviewer:** Permission Management System  
**Status:** ⚠️ **NEEDS UPDATES** - Missing critical test scenarios

### Overall Assessment

| Category | Status | Coverage |
|----------|--------|----------|
| Workflow States | ✅ Complete | 100% |
| Role-based Scenarios | ⚠️ Incomplete | 60% |
| Permission Test Cases | ❌ Missing Critical | 40% |
| User ID Consistency | ❌ Mismatch | 50% |

---

## 🔍 Detailed Analysis

### 1. User Roles Coverage

#### ✅ What We Have (authService.ts):

```typescript
// From authService MOCK_ACCOUNTS:
user-admin  → Admin    (Admin Hệ thống)
user-5      → Manager  (Phạm Thị D - Hành chính)
user-8      → Manager  (Vũ Thị G - Kho)
user-1      → Staff    (Đinh Bộ Lĩnh - Kỹ thuật)
user-2      → Staff    (Nguyễn Văn A - IT)
```

#### ❌ What Mock Data Uses:

```typescript
// Mock data references users NOT in authService:
user-3, user-4, user-6, user-7, user-9, user-10, user-11
// These users CANNOT be used for login testing!
```

**Impact:** Khi login với demo accounts (admin/manager/staff), không thể test được nhiều tickets/tasks vì chúng thuộc về users không tồn tại trong auth system.

---

## 🎯 Permission Test Scenarios Analysis

### Scenario Matrix

| Scenario | Required | Exists | User | Notes |
|----------|----------|--------|------|-------|
| **Admin as Owner** | ✅ | ❌ | user-admin | NO tickets/tasks created by admin |
| **Admin as Assignee** | ✅ | ❌ | user-admin | NO tickets/tasks assigned to admin |
| **Manager as Owner** | ✅ | ✅ | user-5 | Multiple examples exist |
| **Manager as Assignee** | ✅ | ❌ | user-5 | NO tickets/tasks assigned to manager |
| **Staff as Owner** | ✅ | ❌ | user-1, user-2 | Both only as assignees, NOT owners |
| **Staff as Assignee** | ✅ | ✅ | user-1, user-2 | Multiple examples exist |
| **Staff as Collaborator** | ✅ | ⚠️ Partial | user-1 | Only 1 task, need more |
| **Owner = Assignee** | ✅ | ❌ | Any | NO self-assigned examples |

### Critical Missing Test Cases

#### ❌ Missing #1: Admin Full Permissions Test

**Why Critical:** Admin should have ALL permissions regardless of ownership/assignment.

**Needed:**
```typescript
// Test: Admin can edit/delete/cancel ANY ticket/task
{
  id: 'TKT-ADMIN-001',
  createdById: 'user-admin',    // Admin as owner
  assigneeId: null,              // Not assigned
  status: TicketStatus.Submitted,
  // Should test: Admin can triage own ticket
}

{
  id: 'TKT-ADMIN-002',
  createdById: 'user-1',         // Staff created
  assigneeId: 'user-admin',      // Assigned to Admin
  status: TicketStatus.Assigned,
  // Should test: Admin assigned can do everything
}

{
  id: 'TKT-ADMIN-003',
  createdById: 'user-2',         // Staff created
  assigneeId: 'user-1',          // Assigned to other staff
  status: TicketStatus.InProgress,
  // Should test: Admin can still edit/reassign (not owner, not assignee)
}
```

#### ❌ Missing #2: Staff as Owner Test

**Why Critical:** Staff owns their created tickets/tasks. Should have edit rights (per spec).

**Needed:**
```typescript
// Test: Staff can edit OWN ticket (even if not assigned)
{
  id: 'TKT-STAFF-OWNER-001',
  createdById: 'user-1',         // Staff user-1 is owner
  assigneeId: 'user-2',          // Assigned to OTHER staff
  status: TicketStatus.InProgress,
  // Should test: user-1 can edit but NOT start/progress (not assignee)
}

// Test: Staff CANNOT edit others' tickets
{
  id: 'TKT-STAFF-OTHER-001',
  createdById: 'user-2',         // OTHER staff created
  assigneeId: null,
  status: TicketStatus.Submitted,
  // Should test: user-1 CANNOT edit (not owner, not assignee, not manager)
}
```

#### ❌ Missing #3: Manager as Assignee

**Why Critical:** Manager might work on tasks too. Should have both Manager AND Assignee permissions.

**Needed:**
```typescript
// Test: Manager assigned to task has BOTH manager + assignee rights
{
  id: 'TSK-MGR-ASSIGN-001',
  creatorId: 'user-admin',       // Created by admin
  assigneeId: 'user-5',          // Assigned to Manager
  status: TaskStatus.Assigned,
  // Should test: user-5 can Start (assignee) AND Reassign (manager)
}

// Test: Manager can approve OWN completed task (special case)
{
  id: 'TSK-MGR-SELF-001',
  creatorId: 'user-5',           // Manager created
  assigneeId: 'user-5',          // Manager assigned to self
  status: TaskStatus.UnderReview,
  progress: 100,
  // Should test: Can user-5 approve own work? (probably NO per business rules)
}
```

#### ❌ Missing #4: Collaborator vs Assignee Permissions

**Why Critical:** Collaborators have LIMITED permissions vs Assignee.

**Current Issue:** Only 1 task has collaborator (user-1 in TSK-COLLAB-001).

**Needed:**
```typescript
// Test: Collaborator can update progress but NOT other actions
{
  id: 'TSK-COLLAB-002',
  assigneeId: 'user-2',          // Primary assignee
  collaborators: [
    {
      userId: 'user-1',          // Collaborator
      role: 'support',
      status: 'active',
      effortPercentage: 30,
    }
  ],
  status: TaskStatus.InProgress,
  progress: 50,
  // Should test:
  // - user-2 (assignee): Can Start, UpdateProgress, RequestSupport, SubmitReview
  // - user-1 (collaborator): Can ONLY UpdateProgress, CANNOT SubmitReview
}

// Test: Multiple collaborators
{
  id: 'TSK-MULTI-COLLAB-001',
  assigneeId: 'user-2',
  collaborators: [
    { userId: 'user-1', role: 'support', effortPercentage: 20 },
    { userId: 'user-4', role: 'reviewer', effortPercentage: 10 },
  ],
  status: TaskStatus.CollabAssigned,
  // All collaborators can view and update progress
}
```

#### ❌ Missing #5: Self-Assigned Scenarios

**Why Critical:** When owner = assignee, test combined permissions.

**Needed:**
```typescript
// Test: Staff creates AND gets assigned own ticket
{
  id: 'TKT-SELF-ASSIGN-001',
  createdById: 'user-1',         // Staff created
  assigneeId: 'user-1',          // Assigned to self
  status: TicketStatus.InProgress,
  // Should test: Has BOTH owner and assignee permissions
  // Can edit (owner) AND work/resolve (assignee)
}
```

#### ⚠️ Missing #6: Boundary Cases

**Needed:**
```typescript
// Test: Ticket/Task in terminal state (CLOSED/COMPLETED)
// Owner should NOT be able to edit
{
  id: 'TKT-CLOSED-001',
  createdById: 'user-1',         // Staff owner
  assigneeId: 'user-1',
  status: TicketStatus.Closed,   // Terminal state
  // Should test: user-1 CANNOT edit (even as owner + assignee)
  // Only Manager/Admin can Reopen
}

// Test: Ticket with HELPERS assigned (SUPPORT_ASSIGNED status)
{
  id: 'TKT-HELPER-001',
  createdById: 'user-2',
  assigneeId: 'user-1',          // Primary assignee
  status: TicketStatus.SupportAssigned,
  helpers: [
    { userId: 'user-2', assignedAt: '...' }
  ],
  // Should test: Helper permissions (similar to collaborator)
}
```

---

## 📋 Workflow Coverage Review

### Tickets - Status Coverage

| Status | Exists | Count | Missing Scenarios |
|--------|--------|-------|-------------------|
| SUBMITTED | ✅ | 2 | ❌ Admin as creator |
| PENDING | ✅ | 1 | ❌ Staff as creator |
| TRIAGED | ✅ | 1 | ✅ Good |
| REJECTED | ✅ | 1 | ✅ Good |
| ASSIGNED | ✅ | 1 | ❌ Self-assigned, Manager assigned |
| IN_PROGRESS | ✅ | 2 | ❌ Staff owner working on ticket |
| HELP_REQUESTED | ✅ | 1 | ✅ Good |
| SUPPORT_ASSIGNED | ❌ | 0 | **MISSING ENTIRELY** |
| BLOCKED | ❌ | 0 | **MISSING ENTIRELY** |
| RESOLVED | ⚠️ | Multiple | Need clearer test case |
| APPROVED | ⚠️ | Multiple | Need clearer test case |
| REOPENED | ⚠️ | 1 | Need permission test |
| CLOSED | ✅ | Multiple | ❌ Ownership test |

### Tasks - Status Coverage

| Status | Exists | Count | Missing Scenarios |
|--------|--------|-------|-------------------|
| CREATED | ✅ | 1 | ❌ Pool strategy examples |
| ASSIGNED | ✅ | 1 | ❌ Self-assigned, Manager assigned |
| IN_PROGRESS | ✅ | 2 | ❌ Collaborator working |
| SUPPORT_REQUESTED | ✅ | 1 | ✅ Good |
| COLLAB_ASSIGNED | ✅ | 1 | ❌ Multiple collaborators |
| BLOCKED | ✅ | 1 | ✅ Good |
| UNDER_REVIEW | ✅ | 1 | ❌ Wrong reviewer test |
| CHANGES_REQUESTED | ✅ | 1 | ✅ Good |
| COMPLETED | ✅ | Multiple | ✅ Good |
| CANCELLED | ✅ | Multiple | ✅ Good |

---

## 🔧 Recommended Fixes

### Priority 1: Fix User ID Consistency (CRITICAL)

**Problem:** Mock data uses user-3 through user-11 which DON'T exist in authService.

**Solution:** Replace ALL mock data user IDs with valid auth users:

```typescript
// BEFORE (WRONG):
createdById: 'user-6'  // user-6 doesn't exist in authService
assigneeId: 'user-3'   // user-3 doesn't exist in authService

// AFTER (CORRECT):
createdById: 'user-1'  // Maps to staff "Đinh Bộ Lĩnh"
assigneeId: 'user-2'   // Maps to staff "Nguyễn Văn A"
```

**Valid User IDs to use:**
- `user-admin` (Admin)
- `user-5` (Manager - Phạm Thị D)
- `user-8` (Manager - Vũ Thị G) 
- `user-1` (Staff - Đinh Bộ Lĩnh)
- `user-2` (Staff - Nguyễn Văn A)

### Priority 2: Add Missing Permission Test Cases

**Add these 15 new mock entries:**

1. ✅ Admin-created ticket (SUBMITTED)
2. ✅ Admin-assigned ticket (IN_PROGRESS)
3. ✅ Admin accessing others' ticket (not owner, not assignee)
4. ✅ Staff-created ticket, assigned to another (test owner edit)
5. ✅ Staff-created ticket, unassigned (test owner edit)
6. ✅ Manager-assigned ticket (test manager + assignee combo)
7. ✅ Self-assigned ticket (owner = assignee)
8. ✅ Staff-created task, assigned to another
9. ✅ Manager-assigned task
10. ✅ Task with multiple active collaborators
11. ✅ Ticket SUPPORT_ASSIGNED status with helpers
12. ✅ Ticket BLOCKED status
13. ✅ Closed ticket (test no-edit terminal state)
14. ✅ Task in pool (CREATED + pool strategy)
15. ✅ Completed task owned by staff

### Priority 3: Add Permission-Specific Comments

Add comments explaining WHAT permission is being tested:

```typescript
// ===== PERMISSION TEST: Staff as Owner =====
// Test Case: Staff creates ticket but assigned to another staff
// Expected: user-1 can Edit (owner) but NOT Resolve (not assignee)
{
  id: 'TKT-PERM-STAFF-OWNER-001',
  createdById: 'user-1',      // TEST: Owner permissions
  assigneeId: 'user-2',       // TEST: Different assignee
  status: TicketStatus.InProgress,
  // LOGIN AS: staff (user-1)
  // SHOULD SEE: Edit button
  // SHOULD NOT SEE: Resolve, Request Help
}
```

---

## 📊 Coverage Metrics

### Current Coverage

| Category | Current | Target | Gap |
|----------|---------|--------|-----|
| Admin Scenarios | 0% | 20% | ❌ -20% |
| Manager Scenarios | 40% | 20% | ✅ +20% |
| Staff Owner Scenarios | 0% | 25% | ❌ -25% |
| Staff Assignee Scenarios | 70% | 25% | ✅ +45% |
| Collaborator Scenarios | 10% | 10% | ⚠️ Minimal |
| Workflow States | 85% | 100% | ⚠️ -15% |

### Target Distribution

For proper permission testing, mock data should have:

- **Admin tests:** 20% (currently 0%) ❌
- **Manager tests:** 20% (currently 40%) ✅
- **Staff Owner:** 25% (currently 0%) ❌
- **Staff Assignee:** 25% (currently 70%) ✅
- **Cross-role:** 10% (currently 10%) ✅

---

## ✅ Action Items

### Must-Do (Blocking Testing)

- [ ] **Action 1:** Replace all user-3 to user-11 with valid auth user IDs (user-admin, user-1, user-2, user-5, user-8)
- [ ] **Action 2:** Add 3 Admin test cases (owner, assignee, neither)
- [ ] **Action 3:** Add 3 Staff-as-Owner test cases
- [ ] **Action 4:** Add 2 Manager-as-Assignee test cases
- [ ] **Action 5:** Add SUPPORT_ASSIGNED and BLOCKED status examples for tickets

### Should-Do (Improves Coverage)

- [ ] **Action 6:** Add 5 self-assigned scenarios (owner = assignee)
- [ ] **Action 7:** Add 3 collaborator test cases with multiple users
- [ ] **Action 8:** Add permission test comments to each mock entry
- [ ] **Action 9:** Add terminal state examples (CLOSED, COMPLETED) with permission notes

### Nice-to-Have (Enhanced Testing)

- [ ] **Action 10:** Add edge cases (ticket 99% complete, SLA breached, etc.)
- [ ] **Action 11:** Add delegation scenarios (Manager delegates to Staff)
- [ ] **Action 12:** Add department-based permission tests

---

## 🎯 Validation Checklist

Use this checklist when testing permissions:

### Login as Admin (user-admin):
- [ ] Can view ALL tickets/tasks
- [ ] Can edit ANY ticket/task (even not owned)
- [ ] Can triage ANY submitted ticket
- [ ] Can assign/reassign ANY ticket/task
- [ ] Can approve/cancel ANY task
- [ ] Can close ANY ticket

### Login as Manager (user-5):
- [ ] Can view all tickets/tasks in department
- [ ] Can edit OWN created tickets/tasks
- [ ] Can triage submitted tickets
- [ ] Can assign tickets/tasks to staff
- [ ] Can approve completed tasks
- [ ] Can close resolved tickets
- [ ] If ASSIGNED to task: Can also start/update like staff

### Login as Staff (user-1):
- [ ] Can view OWN created/assigned tickets/tasks
- [ ] Can edit OWN created tickets (owner permission)
- [ ] CANNOT edit others' tickets (not owner, not manager)
- [ ] Can start ASSIGNED tasks
- [ ] Can update progress on ASSIGNED tasks
- [ ] Can request support on ASSIGNED tasks
- [ ] Can submit for review when task 100%
- [ ] CANNOT approve/cancel (need manager)
- [ ] If COLLABORATOR: Can only view + update progress

---

## 📚 References

- [Permission Rules](./PERMISSION_MANAGEMENT.md) - Complete permission matrix
- [Ticket Spec](../docs/specs/02-ticket-management.md) - Ticket workflow
- [Task Spec](../docs/specs/03-task-management.md) - Task workflow
- [Auth Service](../src/web/src/services/authService.ts) - Demo accounts

---

**Generated:** March 27, 2026  
**Next Review:** After mock data updates  
**Priority:** 🔴 HIGH - Blocking comprehensive permission testing
