# Workflow Documentation Update Log

**Date**: March 26, 2026  
**Updated By**: AI Assistant  
**Purpose**: Align all workflow documentation with help-workflows.html and add missing statuses

---

## 📝 Summary of Changes

This update ensures consistency across all workflow documentation by adding statuses that were present in the HTML visual workflows but missing from the specification documents.

---

## ✅ Files Updated

### 1. **WORKFLOW_ANALYSIS.md** - Primary workflow documentation
**Location**: `docs/WORKFLOW_ANALYSIS.md`

**Changes Made:**
- ✅ Added **HELP_REQUESTED** status for tickets (staff requests help)
- ✅ Added **SUPPORT_ASSIGNED** status for tickets (helper assigned)
- ✅ Added **APPROVED** status for tickets (resolution approved before rating)
- ✅ Added **POOL** status for tasks (explicit pool state)
- ✅ Added **DEPT_ASSIGNED** status for tasks (department assignment)
- ✅ Added **SUPPORT_REQUESTED** status for tasks (collaboration request)
- ✅ Added **COLLAB_ASSIGNED** status for tasks (collaborators assigned)
- ✅ Added new workflow steps (4a, 4b) for help/support workflows
- ✅ Added status definitions tables for both tickets and tasks
- ✅ Updated status transition diagrams with all new statuses
- ✅ Updated allowed transitions list

**New Workflow Steps Added:**
- **Tickets**:
  - Step 4a: Request Help (Staff requests support during work)
  - Step 4b: Support Assignment (Manager assigns helper)
- **Tasks**:
  - Step 2c: Department Assignment (Assign to dept for member selection)
  - Step 4a: Request Collaboration (Staff requests collaborator)
  - Step 4b: Collaborator Assignment (Manager assigns collaborator)

---

### 2. **02-ticket-management.md** - Ticket spec
**Location**: `docs/specs/02-ticket-management.md`

**Changes Made:**
- ✅ Updated status definitions table with HELP_REQUESTED, SUPPORT_ASSIGNED, APPROVED
- ✅ Updated workflow diagram to show help request flow
- ✅ Updated API query parameters to include new statuses
- ✅ Added US-TICKET-004a: Request Help user story
- ✅ Added US-TICKET-004b: Assign Helper user story
- ✅ Updated US-TICKET-004 to include help request action
- ✅ Updated US-TICKET-005 to detail the approval → rating → closed flow

---

### 3. **03-task-management.md** - Task spec
**Location**: `docs/specs/03-task-management.md`

**Changes Made:**
- ✅ Updated status definitions table with POOL, DEPT_ASSIGNED, SUPPORT_REQUESTED, COLLAB_ASSIGNED
- ✅ Updated assignment strategy flow diagram to show collaboration support
- ✅ Renamed "TEAM Assignment" to "DEPARTMENT Assignment" for clarity
- ✅ Added US-TASK-005a: Request Collaboration Support user story
- ✅ Added US-TASK-005b: Assign Collaborator user story
- ✅ Updated US-TASK-005 to include collaboration support action

---

### 4. **00-index.md** - Feature index
**Location**: `docs/specs/00-index.md`

**Changes Made:**
- ✅ Updated workflow summary diagrams for both tickets and tasks
- ✅ Added key status explanations for new statuses
- ✅ Improved visual clarity of workflow transitions

---

## 🔄 Complete Status Lists

### Ticket Statuses (13 total)
1. SUBMITTED - Initial ticket creation
2. PENDING - Waiting for user information
3. TRIAGED - Reviewed and approved by manager
4. REJECTED - Ticket rejected (terminal)
5. ASSIGNED - Assigned to staff member
6. IN_PROGRESS - Staff working on ticket
7. **HELP_REQUESTED** ⭐ NEW - Staff requests assistance
8. **SUPPORT_ASSIGNED** ⭐ NEW - Helper assigned to ticket
9. BLOCKED - Blocked by dependency
10. RESOLVED - Staff completed work
11. **APPROVED** ⭐ NEW - Resolution approved
12. REOPENED - Reopened for more work
13. CLOSED - Closed after rating (terminal)

### Task Statuses (14 total)
1. CREATED - Initial task creation
2. **POOL (IN_POOL)** ⭐ NEW - Available in task pool
3. CLAIMED - Staff claimed from pool
4. **DEPT_ASSIGNED** ⭐ NEW - Assigned to department
5. ASSIGNED - Assigned to specific staff
6. IN_PROGRESS - Staff working on task
7. **SUPPORT_REQUESTED** ⭐ NEW - Collaboration requested
8. **COLLAB_ASSIGNED** ⭐ NEW - Collaborators assigned
9. BLOCKED - Blocked by dependency
10. REVIEW - Submitted for review
11. CHANGES_REQUESTED - Manager requests changes
12. COMPLETED - Manager approved (terminal)
13. CANCELLED - Task cancelled (terminal)
14. CLOSED - Task closed/archived (terminal)

---

## 🎯 Key Concepts Added

### Help/Support Workflow (Tickets)
When a staff member encounters a complex ticket that requires assistance:
1. Staff clicks "Request Help" → **HELP_REQUESTED**
2. Manager reviews and assigns a helper from the same department
3. Status changes to **SUPPORT_ASSIGNED**
4. Both primary staff and helper can work on the ticket
5. Primary staff retains ownership and is responsible for resolution
6. SLA timer continues during help request

### Collaboration Workflow (Tasks)
When a staff member needs help to complete a task:
1. Staff clicks "Request Support" → **SUPPORT_REQUESTED**
2. Manager/Lead reviews and assigns collaborator(s)
3. Status changes to **COLLAB_ASSIGNED**
4. Collaborators can update their portion of progress
5. Primary staff retains ownership and submits for review
6. Progress from all collaborators is aggregated

### Department Assignment (Tasks)
Alternative to team assignment:
1. Manager assigns task to a department → **DEPT_ASSIGNED**
2. Department members can view and select task
3. When a member picks the task → **ASSIGNED** to that person

---

## 📋 Alignment with help-workflows.html

All statuses and transitions now match the Mermaid workflow diagrams in `app/help-workflows.html`:
- ✅ Ticket workflow diagram (lines 350-382)
- ✅ Task workflow diagram (lines 743-774)

---

## 🔍 What Was NOT Changed

- API endpoint definitions (preserved existing structure)
- Data models (already flexible for new statuses)
- Mock data (will need updates separately)
- Frontend components (will need updates separately)
- Database migrations (backend team responsibility)
- Plans in `docs/plans/` (implementation details, not spec-level)

---

## 📚 Reference Documents

All workflow documentation is now synchronized:
- **Primary**: `docs/WORKFLOW_ANALYSIS.md` - Complete workflow analysis
- **Specs**: `docs/specs/02-ticket-management.md`, `03-task-management.md` - Detailed specs
- **Visual**: `app/help-workflows.html` - Interactive workflow diagrams
- **Index**: `docs/specs/00-index.md` - Feature overview

---

## ✅ Verification Checklist

- [x] All statuses from help-workflows.html are documented
- [x] Status transition diagrams are complete
- [x] User stories added for new workflows
- [x] Status definitions tables created
- [x] Workflow steps numbered and detailed
- [x] Role permissions clarified
- [x] Query parameters updated
- [x] Cross-references verified

---

## 🎯 Next Steps

### For Backend Team:
1. Add new status values to status enums in database
2. Update validation rules for status transitions
3. Implement help request and collaborator assignment endpoints
4. Add notification triggers for new statuses

### For Frontend Team:
1. Update TypeScript types/enums with new statuses
2. Add UI for "Request Help" button in ticket detail
3. Add UI for "Request Support" button in task detail
4. Add UI for helper/collaborator assignment (manager view)
5. Update status badges to show new statuses with appropriate colors
6. Add filters for new statuses in list views
7. Update mock data to include examples of new statuses

### For Testing Team:
1. Create test cases for help request workflow (tickets)
2. Create test cases for collaboration workflow (tasks)
3. Create test cases for department assignment (tasks)
4. Verify status transitions work correctly
5. Test notification delivery for new statuses

---

**Document Status**: ✅ Complete  
**Review Date**: March 26, 2026  
**Approved By**: Pending backend/frontend team review
