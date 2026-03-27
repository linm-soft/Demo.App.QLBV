# Implementation Plan: User Management

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-013  
**Priority:** Medium  
**Status:** 📝 Not Started  
**Created:** 2026-03-25  
**Related Spec:** [12-user-management.md](../specs/12-user-management.md)

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/users.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Mock Data Guidelines:**
- Create mock data in separate files: `src/mocks/users.mock.ts`
- Mock data should match the structure and variety shown in HTML demos
- Include realistic Vietnamese names, departments, and scenarios
- Maintain consistency with data models in `src/models/`

**Verification Status:** ⬜ Not yet verified

---

## 📋 Overview

User management system for Admins to create, edit, deactivate users and manage roles/permissions.

---

## 🎯 Acceptance Criteria

- [ ] Users table: Name, email, role, department, status, last login
- [ ] Filter: Role, department, status (active/inactive)
- [ ] Search: Name, email, username
- [ ] Sort columns
- [ ] Pagination
- [ ] Create user button opens form
- [ ] Create user form: Name, email, username, role, department
- [ ] Auto-generate temporary password
- [ ] Send welcome email option
- [ ] Edit user modal (pre-filled)
- [ ] Deactivate user with confirmation
- [ ] Reassign tasks when deactivating
- [ ] Reactivate user option
- [ ] View user profile (detail page)
- [ ] Bulk operations: Deactivate, export
- [ ] Role change confirmation

---

## 📦 Main Components

1. **UsersPage** - Main container
2. **UsersFilters** - Filter bar
3. **UsersTable** - Users data table
4. **UserRow** - Table row with actions
5. **CreateUserModal** - User creation form
6. **EditUserModal** - User edit form
7. **UserProfilePage** - Detailed user view
8. **DeactivateModal** - Deactivation confirmation
9. **RoleChangeModal** - Role change warning
10. **BulkActionsBar** - Bulk operations

---

## ⏱️ Time Estimate: **12 hours**

---

## � Implementation Steps

### Phase 1: UI Components (7 hours)
- [ ] Create UsersPage layout
- [ ] Create UsersFilters component
- [ ] Create UsersTable component
- [ ] Create UserRow component with actions
- [ ] Create CreateUserModal component
- [ ] Create EditUserModal component
- [ ] Create UserProfilePage component
- [ ] Create DeactivateModal component
- [ ] Create RoleChangeModal component
- [ ] Create BulkActionsBar component
- [ ] Test responsive layout

### Phase 2: Forms & Validation (3 hours)
- [ ] Implement create user form with validation
- [ ] Implement edit user form
- [ ] Add email validation
- [ ] Add password generation
- [ ] Test form submissions

### Phase 3: API Integration ⭐ (2 hours)
- [ ] Integrate `GET /api/users` for user list
- [ ] Integrate `POST /api/users` for user creation
- [ ] Integrate `PUT /api/users/:id` for user updates
- [ ] Integrate `POST /api/users/:id/deactivate` for deactivation
- [ ] Integrate `POST /api/users/:id/reactivate` for reactivation
- [ ] Integrate `GET /api/users/:id` for user details
- [ ] Add loading states for all API calls
- [ ] Add error handling (duplicate email, etc.)
- [ ] Test with real API endpoints
- [ ] Replace mock data with API data
- [ ] Implement optimistic updates
- [ ] Handle business rule validation

---

## �🔌 API Endpoints

- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `POST /api/users/:id/deactivate`
- `POST /api/users/:id/reactivate`
- `GET /api/users/:id`

---

## 🎯 Business Rules

- Email must be unique
- Cannot deactivate last admin
- Role change requires confirmation
- Deactivated user tasks reassigned to manager
