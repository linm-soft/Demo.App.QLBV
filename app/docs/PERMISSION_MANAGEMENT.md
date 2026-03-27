# Permission Management System

## 📋 Overview

This document describes the role-based permission system used throughout the QLCV application for managing access control to Tickets and Tasks.

## 🔐 User Roles

The system defines three primary user roles:

### 1. **Admin** (`UserRole.Admin`)
- **Full system access** - can perform any action
- Can manage all tickets and tasks across all departments
- Can approve, reject, cancel, and reassign anything
- Equivalent to Manager permissions plus system configuration

### 2. **Manager** (`UserRole.Manager`)
- **Department or team-level management**
- Can triage, assign, and approve tickets/tasks
- Can assign collaborators and helpers
- Can reassign work to other staff
- Can cancel tasks in their scope
- Can view all tickets/tasks in their department

### 3. **Staff** (`UserRole.Staff`)
- **Individual contributor**
- Can work on assigned tickets/tasks
- Can update progress and add comments
- Can request help/support when blocked
- Can submit work for review
- Limited to viewing own assignments (unless owner)

### Demo Accounts

Available in login page for testing:

| Username | Password | Role | Department |
|----------|----------|------|------------|
| `admin` | `admin123` | Admin | Quản trị |
| `manager` | `manager123` | Manager | Hành chính |
| `manager2` | `manager123` | Manager | Kho |
| `staff` | `staff123` | Staff | Kỹ thuật |

---

## 🎫 Ticket Permissions

### Implementation

**Hook:** `useTicketPermissions(ticket, currentUser)`  
**Component:** `TicketActions` (uses the hook automatically)  
**Location:** `src/web/src/hooks/useTicketPermissions.ts`

### Permission Matrix

| Action | Admin | Manager | Owner (Creator) | Assignee | Staff (Other) |
|--------|-------|---------|-----------------|----------|---------------|
| **View** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Edit** | ✅ | ✅ | ✅ (not closed) | ❌ | ❌ |
| **Triage** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Assign** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Resolve** | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Close** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Request Help** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Assign Helper** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Reopen** | ✅ | ✅ | ✅ | ❌ | ❌ |

### Workflow-Based Permissions

Ticket permissions are **status-dependent**:

#### Status: **SUBMITTED** / **PENDING**
- **Triage** (Manager/Admin) - Accept, reject, or request more info
- **Edit** (Owner/Manager/Admin) - Can modify details

#### Status: **TRIAGED** (Approved)
- **Assign** (Manager/Admin) - Assign to staff member
- **Edit** (Owner/Manager/Admin)

#### Status: **ASSIGNED** / **IN_PROGRESS**
- **Assign** (Manager/Admin) - Can reassign
- **Resolve** (Assignee/Manager/Admin) - Mark as resolved
- **Request Help** (Assignee) - Request support from team
- **Edit** (Owner/Manager/Admin)

#### Status: **HELP_REQUESTED**
- **Assign Helper** (Manager/Admin) - Assign support staff
- **Edit** (Owner/Manager/Admin)

#### Status: **RESOLVED** / **APPROVED**
- **Close** (Manager/Admin) - Final closure after verification
- **Reopen** (Owner/Manager/Admin) - If issue persists

#### Status: **CLOSED**
- **Reopen** (Owner/Manager/Admin) - Can reopen if needed
- **Edit** ❌ - Closed tickets cannot be edited

#### Status: **REJECTED**
- **Edit** ❌ - Rejected tickets cannot be edited
- Terminal state

### Code Example

```typescript
// In any component
import { useTicketPermissions } from '@/hooks/useTicketPermissions';
import { useAppSelector } from '@/store/hooks';

const MyComponent = ({ ticket }) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const permissions = useTicketPermissions(ticket, currentUser);

  return (
    <>
      {permissions.canEdit && (
        <Button onClick={handleEdit}>Sửa</Button>
      )}
      {permissions.canAssign && (
        <Button onClick={handleAssign}>Gán</Button>
      )}
      {permissions.canResolve && (
        <Button onClick={handleResolve}>Giải quyết</Button>
      )}
    </>
  );
};
```

---

## 📋 Task Permissions

### Implementation

**Hook:** `useTaskPermissions(task, currentUser)`  
**Component:** `TaskActions` (uses the hook automatically)  
**Location:** `src/web/src/hooks/useTaskPermissions.ts`

### Permission Matrix

| Action | Admin | Manager | Owner (Creator) | Assignee | Collaborator | Staff (Other) |
|--------|-------|---------|-----------------|----------|--------------|---------------|
| **View** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Edit** | ✅ | ✅ | ✅ (not done) | ❌ | ❌ | ❌ |
| **Start** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Update Progress** | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **Request Support** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Assign Collaborator** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Mark Blocked** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Unblock** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Submit for Review** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Approve** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Request Changes** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Reassign** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Cancel** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Claim (Pool)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Workflow-Based Permissions

Task permissions are **status-dependent**:

#### Status: **CREATED** (In Pool)
- **Claim** (Anyone) - Staff can claim tasks from pool
- **Edit** (Owner/Manager/Admin)
- **Cancel** (Manager/Admin)

#### Status: **ASSIGNED**
- **Start** (Assignee) - Begin work
- **Edit** (Owner/Manager/Admin)
- **Reassign** (Manager/Admin)
- **Cancel** (Manager/Admin)

#### Status: **IN_PROGRESS**
- **Update Progress** (Assignee/Collaborator)
- **Request Support** (Assignee) - Ask for collaboration
- **Mark Blocked** (Assignee) - Flag blockers
- **Submit for Review** (Assignee, when progress=100%)
- **Edit** (Owner/Manager/Admin)
- **Reassign** (Manager/Admin)
- **Cancel** (Manager/Admin)

#### Status: **SUPPORT_REQUESTED**
- **Assign Collaborator** (Manager/Admin) - Assign helper
- **Edit** (Owner/Manager/Admin)
- **Cancel** (Manager/Admin)

#### Status: **BLOCKED**
- **Unblock** (Assignee/Manager/Admin) - Remove blocker
- **Edit** (Owner/Manager/Admin)
- **Reassign** (Manager/Admin)
- **Cancel** (Manager/Admin)

#### Status: **UNDER_REVIEW**
- **Approve** (Manager/Admin) - Accept completed work
- **Request Changes** (Manager/Admin) - Send back for revision
- **Reassign** ❌ - Cannot reassign during review
- **Cancel** ❌ - Cannot cancel during review

#### Status: **COMPLETED** / **CANCELLED**
- **Edit** ❌ - Terminal states, cannot edit
- **Reassign** ❌
- **Cancel** ❌
- Read-only

### Code Example

```typescript
// In TaskDetailPage or any component
import { useTaskPermissions } from '@/hooks/useTaskPermissions';
import { useAppSelector } from '@/store/hooks';

const MyTaskComponent = ({ task }) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const permissions = useTaskPermissions(task, currentUser);

  return (
    <>
      {permissions.canStart && (
        <Button onClick={handleStart}>Bắt đầu</Button>
      )}
      {permissions.canRequestSupport && (
        <Button onClick={handleRequestSupport}>Yêu cầu hỗ trợ</Button>
      )}
      {permissions.canApprove && (
        <Button onClick={handleApprove}>Duyệt</Button>
      )}
      {permissions.isAssignee && <p>Bạn là người thực hiện task này</p>}
      {permissions.isManager && <p>Bạn có quyền quản lý</p>}
    </>
  );
};
```

---

## 🏗️ Architecture

### Permission Hook Pattern

Both `useTicketPermissions` and `useTaskPermissions` follow the same pattern:

```typescript
export interface <Entity>Permissions {
  // Action permissions (boolean flags)
  canView: boolean;
  canEdit: boolean;
  ...
  
  // Identity flags (for custom logic)
  isOwner: boolean;
  isAssignee: boolean;
  isManager: boolean;
  ...
}

export function use<Entity>Permissions(
  entity: Entity | null,
  currentUser: User | null
): <Entity>Permissions {
  return useMemo(() => {
    // Calculate permissions based on:
    // 1. User role
    // 2. Entity ownership
    // 3. Assignee status
    // 4. Current entity status
    // 5. Business rules
    
    return {
      canView: ...,
      canEdit: ...,
      ...
    };
  }, [entity, currentUser]);
}
```

### Benefits

1. **Centralized Logic** - All permission rules in one place
2. **Type-Safe** - TypeScript ensures correct permission checks
3. **Testable** - Easy to unit test permission logic
4. **Reusable** - Use in any component that needs permissions
5. **Performance** - `useMemo` prevents unnecessary recalculations
6. **Maintainable** - Change rules in one place, affects all components

### Usage in Components

Components using permission-based actions:

**Tickets:**
- `TicketActions` - Main action button component
- `TicketDetailPage` - Detail view actions
- `TicketsListPage` - List row actions

**Tasks:**
- `TaskActions` - Main action button component (sidebar)
- `TaskDetailPage` - Detail view with sidebar actions
- `TaskPoolPage` - Pool claim actions

---

## 🔄 Workflow Integration

### Ticket Workflow States

```
SUBMITTED → TRIAGED → ASSIGNED → IN_PROGRESS → RESOLVED → CLOSED
     ↓         ↑           ↓            ↓
  PENDING → (back)   HELP_REQUESTED   BLOCKED
     ↓
  REJECTED
```

### Task Workflow States

```
CREATED → ASSIGNED → IN_PROGRESS → UNDER_REVIEW → COMPLETED
  (Pool)      ↑            ↓              ↓
             ↓      SUPPORT_REQUESTED     ↓
             ↓          BLOCKED       CHANGES_REQUESTED
             ↓                              ↓
         CANCELLED ←──────────────────── (back)
```

---

## 🧪 Testing Permissions

### Test Different Roles

Login with different demo accounts to test permissions:

```bash
# Test as Admin (full access)
Username: admin
Password: admin123

# Test as Manager (department management)
Username: manager
Password: manager123

# Test as Staff (assignee only)
Username: staff
Password: staff123
```

### Test Scenarios

#### Ticket Permissions Test

1. **As Staff:**
   - Create a ticket → You are owner
   - Try to edit your own ticket → ✅ Allowed
   - Try to assign it → ❌ Not allowed (need Manager)
   - Request help on assigned ticket → ✅ Allowed

2. **As Manager:**
   - View submitted tickets → ✅ Allowed
   - Triage tickets → ✅ Allowed
   - Assign tickets → ✅ Allowed
   - Approve/close tickets → ✅ Allowed

3. **As Admin:**
   - All actions → ✅ Allowed

#### Task Permissions Test

1. **As Staff (Assignee):**
   - Start task → ✅ Allowed
   - Update progress → ✅ Allowed
   - Request support → ✅ Allowed
   - Submit for review → ✅ Allowed (when 100%)
   - Approve task → ❌ Not allowed (need Manager)

2. **As Manager:**
   - Assign collaborator → ✅ Allowed
   - Approve task → ✅ Allowed
   - Request changes → ✅ Allowed
   - Reassign task → ✅ Allowed
   - Cancel task → ✅ Allowed

3. **As Staff (Non-assignee):**
   - View task → ✅ Allowed
   - Start task → ❌ Not allowed (not assigned)
   - Update progress → ❌ Not allowed (not assigned)

---

## 📝 Best Practices

### 1. Always Check Permissions Before Actions

```typescript
// ❌ Bad - No permission check
<Button onClick={handleDelete}>Xóa</Button>

// ✅ Good - Permission-gated
{permissions.canDelete && (
  <Button onClick={handleDelete}>Xóa</Button>
)}
```

### 2. Use Permission Hooks in Components

```typescript
// ❌ Bad - Hardcoded role checks
const canEdit = user.role === 'admin' || user.role === 'manager';

// ✅ Good - Use permission hook
const permissions = useTicketPermissions(ticket, user);
const canEdit = permissions.canEdit;
```

### 3. Show Context-Appropriate Actions

```typescript
// ✅ Good - Only show actions that make sense
{permissions.canApprove && status === 'under_review' && (
  <Button onClick={handleApprove}>Duyệt</Button>
)}
```

### 4. Provide Feedback for Disabled Actions

```typescript
// ✅ Good - Explain why action is unavailable
{!permissions.canEdit && (
  <Tooltip content="Chỉ owner hoặc manager mới có thể sửa">
    <Button disabled>Sửa</Button>
  </Tooltip>
)}
```

---

## 🚀 Adding New Permissions

### Step 1: Define Permission in Hook

```typescript
// In useTicketPermissions.ts or useTaskPermissions.ts
export interface TicketPermissions {
  // ... existing permissions
  canArchive: boolean; // NEW
}

export function useTicketPermissions(...) {
  // ... existing logic
  
  // Rule N: Archive permission
  const canArchive = 
    isManager && 
    ticket.status === TicketStatus.Closed;
  
  return {
    // ... existing permissions
    canArchive,
  };
}
```

### Step 2: Use in Component

```typescript
// In TicketActions.tsx
{permissions.canArchive && (
  <Button onClick={handleArchive}>
    <i className="fas fa-archive"></i> Lưu trữ
  </Button>
)}
```

### Step 3: Update Documentation

Add the new permission to this document's permission matrix and workflow states.

---

## 📚 Related Documentation

- [Ticket Management Spec](../docs/specs/02-ticket-management.md)
- [Task Management Spec](../docs/specs/03-task-management.md)
- [Workflow Analysis](../docs/WORKFLOW_ANALYSIS.md)
- [User Management](../docs/specs/10-user-team-management.md)

---

**Last Updated:** March 27, 2026  
**Version:** 1.0.0  
**Author:** QLCV Development Team
