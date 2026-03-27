# Feature Spec: User Management

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: USER-012  
**Priority**: Medium  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Complete user lifecycle management system for Admins and Managers. Includes user CRUD operations, role assignment, department management, skills tracking, and capacity planning.

**Key Capabilities:**
- User CRUD (Create, Read, Update, Delete/Deactivate)
- Role and permission management
- Department and team assignment
- Skills and expertise tracking
- Workload and capacity management
- Bulk user operations
- User profile management
- Access audit trails

---

## 👤 User Stories

### US-USER-001: View All Users (Admin/Manager)
**As an** Admin or Manager  
**I want to** view all users in the system  
**So that** I can manage the team

**Acceptance Criteria:**
- ✅ Table view with: name, email, role, department, status
- ✅ Filter by: role, department, status (active/inactive)
- ✅ Sort by: name, email, role, join date, last login
- ✅ Search by: name, email, username
- ✅ Pagination (20 users per page)
- ✅ Quick actions: edit, deactivate, view profile
- ✅ Bulk selection for bulk operations

### US-USER-002: Create New User
**As an** Admin  
**I want to** create new user accounts  
**So that** new employees can access the system

**Acceptance Criteria:**
- ✅ Form fields: name, email, username, role, department
- ✅ Role options: Admin, Manager, Staff
- ✅ Auto-generate temporary password
- ✅ Option: send welcome email with credentials
- ✅ Set initial status: inactive (requires activation)
- ✅ Validation: unique email and username
- ✅ Success message + redirect to user profile

### US-USER-003: Edit User Details
**As an** Admin/Manager  
**I want to** update user information  
**So that** records stay current

**Acceptance Criteria:**
- ✅ Edit fields: name, email, role, department, skills
- ✅ Cannot edit: username (immutable)
- ✅ Role change: confirmation dialog (security-sensitive)
- ✅ Audit log: all changes tracked
- ✅ Validation: email format, required fields
- ✅ Success notification

### US-USER-004: Deactivate/Reactivate User
**As an** Admin  
**I want to** deactivate users who leave  
**So that** they cannot access the system

**Acceptance Criteria:**
- ✅ Deactivate button with confirmation
- ✅ Deactivation effects:
  - User cannot log in
  - All active sessions terminated
  - Assigned tasks reassigned to manager
  - User hidden from assignment lists
- ✅ Reactivation: restore access, re-enable login
- ✅ Audit log: deactivation/reactivation events
- ✅ Soft delete (no data deletion)

### US-USER-005: Manage Roles & Permissions
**As an** Admin  
**I want to** assign roles and permissions  
**So that** users have appropriate access

**Acceptance Criteria:**
- ✅ Three roles: Admin, Manager, Staff
- ✅ Role change: immediate effect (next request)
- ✅ Manager additional fields: manages department/team
- ✅ Permission matrix visible
- ✅ Audit trail for role changes
- ✅ Cannot demote last admin (safeguard)

### US-USER-006: Track User Skills
**As a** Manager  
**I want** to document user skills  
**So that** I can assign tasks appropriately

**Acceptance Criteria:**
- ✅ Skills library: predefined + custom skills
- ✅ Skill proficiency: Beginner, Intermediate, Expert
- ✅ Add/remove skills per user
- ✅ Skill-based filtering for task assignment
- ✅ Auto-suggestions based on completed tasks
- ✅ Skills visible on user profile

### US-USER-007: View User Profile
**As any** User  
**I want to** view user profiles  
**So that** I learn about team members

**Acceptance Criteria:**
- ✅ Profile sections:
  - Basic info (name, role, department, email)
  - Skills and expertise
  - Current workload (active tasks/tickets)
  - Statistics (completion rate, SLA compliance)
  - Recent activity
- ✅ Edit own profile: bio, avatar, contact info
- ✅ Privacy settings: hide certain info from non-managers

---

## 💾 Data Model

```typescript
interface User {
  id: string;
  username: string;  // Immutable
  email: string;
  name: string;
  avatar: string | null;
  
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  department: string;
  team: string | null;
  managerId: string | null;  // For staff, points to manager
  
  isActive: boolean;
  isLocked: boolean;
  
  skills: UserSkill[];
  capacity: number;  // Max concurrent tasks
  currentWorkload: number;  // Active tasks
  
  phone: string | null;
  bio: string | null;
  
  createdAt: DateTime;
  updatedAt: DateTime;
  lastLoginAt: DateTime | null;
  deactivatedAt: DateTime | null;
}

interface UserSkill {
  skillId: string;
  skillName: string;
  proficiency: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  addedAt: DateTime;
  verifiedBy: string | null;
}

interface Role {
  id: string;
  name: 'ADMIN' | 'MANAGER' | 'STAFF';
  permissions: Permission[];
}

interface Permission {
  resource: string;  // 'tickets', 'tasks', 'users', 'reports'
  actions: string[];  // ['create', 'read', 'update', 'delete']
}
```

---

## 🎨 UI Components

### Users Management Page (`users.html`)

```
┌──────────────────────────────────────────────────────────┐
│  👥 Quản Lý Nhân Viên                  [🔔] [👤]         │
├──────────────────────────────────────────────────────────┤
│  [➕ Add User] [📥 Export] [⚙️ Bulk Actions]            │
│                                                           │
│  Filter: [All Roles ▼] [All Departments ▼] [🔍 Search]  │
│  ☐ Show inactive users                                   │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ ☐ Name          Email           Role      Status    │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ☐ Đinh Bộ Lĩnh  dinh@ex.com    Staff     🟢 Active │ │
│  │   IT Support • 8 tasks • Last login: 10m ago       │ │
│  │   [👁️ View] [✏️ Edit] [⚙️ More]                     │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ☐ Nguyễn Văn A  nguyen@ex.com  Manager   🟢 Active │ │
│  │   Administration • 5 tasks • Last login: 1h ago    │ │
│  │   [👁️ View] [✏️ Edit] [⚙️ More]                     │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ☐ Trần Thị B    tran@ex.com    Staff     🔴 Away   │ │
│  │   Clinical • On leave • Last login: 2d ago         │ │
│  │   [👁️ View] [✏️ Edit] [⚙️ More]                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Showing 3 of 42 users | [1] 2 3 ... 5                  │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints

### GET /api/users
List all users (Admin/Manager only)

**Query Parameters:**
- `role` (admin|manager|staff)
- `department` (string)
- `status` (active|inactive)
- `search` (string)
- `page`, `limit`

**Response:**
```json
{
  "users": [
    {
      "id": "usr_123",
      "name": "Đinh Bộ Lĩnh",
      "email": "dinh@example.com",
      "role": "STAFF",
      "department": "IT Support",
      "isActive": true,
      "currentWorkload": 8,
      "lastLoginAt": "2026-03-25T14:50:00Z"
    }
  ],
  "total": 42,
  "page": 1
}
```

### POST /api/users
Create new user (Admin only)

**Request:**
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "username": "newuser",
  "role": "STAFF",
  "department": "IT Support",
  "sendWelcomeEmail": true
}
```

### PUT /api/users/:id
Update user details

**Request:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "MANAGER",
  "department": "Administration"
}
```

### POST /api/users/:id/deactivate
Deactivate user

### POST /api/users/:id/reactivate
Reactivate user

---

## 🎯 Business Rules

### BR-USER-001: Role Hierarchy
- Admin: Full access (all features)
- Manager: Team management, view all team data
- Staff: Own tickets/tasks only

### BR-USER-002: Deactivation
- Cannot deactivate last active admin
- Deactivated user: assigned tasks → manager
- Deactivation != deletion (soft delete)

### BR-USER-003: Email
- Must be unique
- Valid email format
- Verification email sent on creation

### BR-USER-004: Skills
- Max 20 skills per user
- Skills used for task assignment suggestions

---

## 📚 Related Specs
- [08-authentication.md](./08-authentication.md) - User login/authentication
- [03-task-management.md](./03-task-management.md) - Task assignment based on skills
- [13-settings.md](./13-settings.md) - User profile settings

---

## 📝 Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-03-25 | System | Initial spec created from HTML analysis |
