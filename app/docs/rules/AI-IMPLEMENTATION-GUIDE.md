# AI Implementation Guide

**Last Updated:** March 27, 2026  
**Purpose:** Standardized guidelines for AI agents implementing any feature in this project

---

## 🎯 Overview

This guide ensures consistency and quality when AI agents implement features in this codebase. All implementations must follow these standards for:
- Code quality and maintainability
- Visual consistency with designs
- Documentation updates
- Testing and verification

**MANDATORY:** Before starting ANY implementation, read this guide in full.

---

## 📋 Pre-Implementation Checklist

Before starting any feature implementation, AI agents **MUST**:

### 1. ✅ Read Feature Specification
- **Location:** `docs/specs/` folder - Feature specifications and requirements
- **Location:** `docs/plans/` folder - Detailed implementation plans
- **Read both:** Spec defines WHAT to build, plan defines HOW to build it
- **Understand requirements:** All acceptance criteria, user stories, technical constraints

**⚠️ CRITICAL - Read Related Specs:**

Many features have dependencies and related contexts. **BEFORE implementing any feature**, you MUST:

1. **Check the spec header** for "Related Specs to Read FIRST" section
2. **Read ALL listed related specs** to understand full context
3. **Understand cross-feature dependencies** (e.g., Task Detail uses patterns from Ticket Detail)
4. **Check parent specs** if implementing a sub-feature (e.g., 03a-task-detail.md → 03-task-management.md)

**Why This Matters:**
- ❌ **Common mistake:** Implementing Task Detail without reading Ticket Detail patterns → inconsistent UX
- ❌ **Common mistake:** Not reading parent spec → missing business logic and workflows
- ❌ **Common mistake:** Ignoring notification spec → missing @mention functionality
- ✅ **Correct approach:** Read all related specs → consistent implementation with full context

**Example Workflow:**
```
Task: Implement Task Detail Page
Step 1: Read docs/specs/03a-task-detail.md
Step 2: See "Related Specs to Read FIRST" section
Step 3: Read all listed specs:
  - 03-task-management.md (parent spec with workflows)
  - 02-ticket-management.md (similar pattern reference)
  - 10-history-audit.md (activity logging requirements)
  - 07-notifications.md (comment notifications)
Step 4: Now start implementation with full context
```

### 2. ✅ Reference Design Files (if applicable)
- **Location:** `app/` folder contains HTML prototypes (design reference)
- **Find matching file:** Each feature may have a corresponding `.html` file
- **Study the structure:** Understand layout, components, and interactions
- **Visual fidelity:** Implementation must match design pixel-perfect

### 3. ✅ Study CSS Styling
- **Location:** `app/css/styles.css` - Master stylesheet with all design tokens
- **Contains:** CSS variables, component styles, responsive breakpoints
- **Match exactly:** Colors, spacing, typography, shadows, animations
- **Never guess:** Always reference the source CSS variables

**Key CSS Variables to Reference:**
```css
/* Colors */
--primary-color
--success-color
--warning-color
--danger-color

/* Spacing */
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg

/* Typography */
--font-family
--font-size-*

/* Shadows */
--shadow, --shadow-lg

/* Borders */
--radius-*, --border-color
```

### 4. ✅ Understand Data Structure
- Review existing TypeScript interfaces in `src/models/`
- Note field names, data types, and relationships
- Check Redux store structure in `src/store/slices/`
- Understand data flow and state management

### 5. ✅ Plan Mock Data
- Mock data should be created in **separate files**: `src/mocks/[feature].mock.ts`
- Must cover **all scenarios** and edge cases
- Include **realistic Vietnamese names** for users (e.g., Nguyễn Văn A, Trần Thị B)
- Use **medical department contexts** (e.g., Khoa Nội, Khoa Ngoại)
- Ensure test data supports ALL features being implemented

### 6. ✅ Review Related Code
- Search for similar implementations in the codebase
- Understand existing patterns and conventions
- Identify reusable components and utilities
- Note any architectural decisions or constraints

---

## � MANDATORY: Documentation Update Rule

**⚠️ CRITICAL: This is NOT optional - documentation MUST be updated after every implementation.**

### When to Update Documentation

**IMMEDIATELY after completing ANY of the following:**
- ✅ Completing a full feature phase
- ✅ Completing a set of components
- ✅ Adding new files to the codebase
- ✅ Modifying existing functionality
- ✅ Fixing bugs that affect documented behavior

### What Documentation to Update

1. **Feature Plan Documents** (`docs/plans/FEAT-XXX-*.md`)
   - **Choose the correct status:**
     - ✅ **Completed** - ONLY when 100% done, no pending items whatsoever
     - ⏳ **Partially Complete** - When feature works but has pending items (API integration, etc.)
     - 🔄 **In Progress** - When actively working on it
   - **If using ⏳ Partially Complete, you MUST:**
     - Add detailed "Pending Items" section listing everything not done
     - Explain WHY each item is pending (e.g., "awaiting backend API")
     - Specify what needs to happen to mark as ✅ Completed
   - Add "Implementation Summary" section
   - List all files created/modified
   - Update time tracking
   - Mark components as completed
   - Add verification notes

2. **Update Logs** (if applicable)
   - Add entry to relevant update log files
   - Note what was changed and why

3. **Testing Documentation**
   - Update test scenarios if test data was added
   - Document new mock accounts or test data

### Enforcement Checklist

**Before marking a task as "done", verify:**
- [ ] Feature plan document updated with **CORRECT** completion status
  - [ ] If ✅ Completed: Verify ALL work is 100% done, no pending items
  - [ ] If ⏳ Partially Complete: Detailed "Pending Items" section added with blockers
- [ ] All created/modified files listed in documentation
- [ ] Time tracking updated
- [ ] Acceptance criteria appropriately marked:
  - [ ] [x] for fully completed items
  - [ ] [~] for partially completed items (with note explaining what's pending)
  - [ ] [ ] for not started items
- [ ] If mock data was created/updated, documented with examples
- [ ] If authentication changes were made, test accounts documented
- [ ] If feature depends on external systems (API, MQTT), clearly documented as pending

### Example Commit Pattern

```
✅ Implementation Phase 1: Basic CRUD
✅ Documentation Updated: FEAT-001-tickets-list.md
```

**AI agents:** Add a reminder in your summary that says "Documentation updated: [file path]" to confirm this step was completed.

---

## 📐 Implementation Standards

### General Code Quality

1. **TypeScript Best Practices**
   - Use proper type annotations (no `any` types)
   - Define interfaces for all data structures
   - Use enums for fixed value sets
   - Leverage type inference where appropriate

2. **Component Architecture**
   - Keep components focused and single-purpose
   - Extract reusable logic into custom hooks
   - Use proper React patterns (hooks, context, memo)
   - Follow established folder structure
   - **⚠️ CRITICAL: Component File Organization**
     - **NEVER** define components inline within page files
     - **ALWAYS** create separate component files following the location rules below:
     
     **Component Location Rules:**
     
     - **Page-Specific Components:** Components used ONLY by one page
       - Location: `pages/[PageName]/components/`
       - Example: Form modals, page-specific filters, page-specific layouts
       ```
       pages/
         TicketsListPage/
           index.tsx
           TicketsListPage.tsx
           components/
             CreateTicketForm/    (only used in TicketsListPage)
             TicketFilters/       (only used in TicketsListPage)
       ```
     
     - **Shared/Reusable Components:** Components used by multiple pages/features
       - Location: `src/components/[domain]/`
       - Example: TicketActions, TicketCard, shared modals
       ```
       src/
         components/
           tickets/
             TicketActions/       (used across multiple pages)
             TicketCard/          (used across multiple pages)
           common/
             Button/
             Modal/
       ```
     
     - **When to move components:**
       - ✅ Component is used in 2+ pages → Move to `src/components/[domain]/`
       - ✅ Component is planned to be reused → Move to `src/components/[domain]/`
       - ⏳ Component is only used in 1 page → Keep in `pages/[PageName]/components/`
     
     - Benefits: Better modularity, reusability, testability, maintainability, and code organization

3. **State Management**
   - Use Redux for global application state
   - Use local state for component-specific state
   - Follow Redux Toolkit patterns (slices, thunks)
   - Avoid prop drilling - use context or Redux

4. **Error Handling**
   - Implement try-catch blocks for async operations
   - Display user-friendly error messages
   - Log errors appropriately for debugging
   - Handle edge cases gracefully

5. **Code Modularization** ⚠️ **CRITICAL**
   - **File size limits:** Component > 300 lines → Refactor into modules
   - **Structure:** Split complex pages into: `utils/`, `hooks/`, `components/`, `types/`
   - **Extract logic:** Move handlers to custom hooks (e.g., `useFeatureManager()`)
   - **Extract UI:** Split into feature components (max 150 lines each)
   - **Example:** TaskDetailPage: 817 lines → 170 lines + 32 modular files
   - **Reference:** [REFACTOR-001-task-detail-modularization.md](../plans/REFACTOR-001-task-detail-modularization.md)

6. **Component Reusability**
   - **Check first:** Is this used in 2+ places? → Create in `src/components/[domain]/`
   - **Common patterns:** Button, Modal, Card → `src/components/common/`
   - **Page-specific:** Only 1 place → Keep in `pages/[PageName]/components/`
   - **Generic naming:** ✅ `DataCard` ❌ `TicketDetailCard`
   - **Props-driven:** Pass data as props, not hardcoded
   - **Example:** ChatTab extracted from 2 pages (300 lines → 150 lines, 50% reduction)

---

### Visual Consistency Requirements (for UI features)

When implementing UI features with design references, ensure:

1. **Layout Fidelity**
   - Match grid systems and spacing
   - Match component positioning
   - Match responsive breakpoints (mobile, tablet, desktop)

2. **Component Styling**
   - Badge colors must match design (status, priority, SLA)
   - Button styles must match (primary, secondary, danger)
   - Card designs must match (shadows, borders, padding)
   - Icons must match (Font Awesome classes)

3. **Interactive Behaviors**
   - Hover effects must match
   - Click interactions must match
   - Loading states must match
   - Error states must match

4. **Typography**
   - Font sizes must match
   - Font weights must match
   - Line heights must match
   - Text colors must match

5. **Responsive Design**
   - Mobile views must match HTML mobile behavior
   - Breakpoints: <681px (mobile), 681-1024px (tablet), >1024px (desktop)
   - Tables convert to cards on mobile (if shown in HTML)

---

## 🗂️ Mock Data Guidelines

### File Structure
```
src/mocks/
├── tickets.mock.ts       # Ticket data
├── tasks.mock.ts         # Task data
├── users.mock.ts         # User data
├── departments.mock.ts   # Department data
├── auth.mock.ts          # Auth test credentials
└── [feature].mock.ts     # Feature-specific data
```

### Data Requirements

**Each mock file should include:**

1. **Variety of States**
   - Cover all possible statuses
   - Include edge cases (expired, locked, pending)
   - Mix of assigned/unassigned items

2. **Realistic Content**
   - Vietnamese names: Nguyễn Văn A, Trần Thị B, Lê Văn C
   - Medical departments: Khoa Cấp cứu, Khoa Nội, Khoa Ngoại, IT Support
   - Realistic titles and descriptions
   - Appropriate timestamps (recent, old, future)

3. **SLA Scenarios**
   - Safe (>25% time remaining) - Green
   - Warning (10-25% remaining) - Yellow
   - Danger (<10% remaining) - Red, pulsing
   - Breached (negative time) - Dark gray

4. **Type Safety**
   - Use TypeScript interfaces from `src/models/`
   - Export typed constants
   - Use enums for statuses, priorities

**Example Mock File Structure:**
```typescript
import { Ticket, TicketStatus, TicketPriority } from '../models/Ticket';

export const mockTickets: Ticket[] = [
  {
    id: 'uuid-1',
    title: 'Sửa máy in tại phòng Cấp cứu',
    description: 'Máy in không hoạt động...',
    priority: TicketPriority.Critical,
    status: TicketStatus.InProgress,
    departmentName: 'Khoa Cấp cứu',
    assigneeName: 'Nguyễn Văn A',
    createdByName: 'Trần Thị B',
    sla: {
      remainingMinutes: 15,
      percentage: 8,
      status: 'danger',
      breached: false,
    },
    createdAt: new Date('2026-03-25T08:00:00'),
    updatedAt: new Date('2026-03-25T10:00:00'),
    // ... more fields
  },
  // ... more tickets with variety
];
```

---

## ✅ Verification Checklist

After implementation, verify:

- [ ] **Visual Match:** Side-by-side comparison with HTML looks identical
- [ ] **Responsive:** Mobile, tablet, desktop views all match
- [ ] **Data Display:** All fields frocorrectly:
  - ✅ Completed - ONLY if 100% done with zero pending items
  - ⏳ Partially Complete - If working but needs backend/external integration
  - Must include detailed pending items section if not ✅ Completed
- [ ] **Interactions:** All buttons, links, forms work as in HTML
- [ ] **States:** Loading, error, empty states implemented
- [ ] **Mock Data:** Created in separate file, matches HTML variety
- [ ] **Type Safety:** All TypeScript errors resolved
- [ ] **CSS Variables:** Using values from `app/css/styles.css`
- [ ] **Plan Updated:** Status marked as completed with verification note

---

## 📝 Documentation Updates

After completing implementation:

1. **Update Plan Status (Choose Correctly):**

   **Option A - Feature 100% Complete (use ✅ Completed):**
   ```markdown
   **Status:** ✅ Completed
   **Completed:** [Date]
   **Verification Status:** ✅ Verified (with notes on what was tested)
   ```
   
   **Option B - Feature Working But Has Pending Items (use ⏳ Partially Complete):**
   ```markdown
   **Status:** ⏳ Partially Complete - UI & Mock Data Done, Backend Integration Pending
   **Completed (UI):** [Date]
   **Verification Status:** ✅ UI Verified with mock data
   
   ### ⚠️ Pending Items
   
   #### Backend API Integration
   - [ ] Replace mock calls in `xxxSlice.ts` with real API
   - [ ] Test with actual backend endpoints
   - **Blocked by:** Backend API not yet implemented
   - **Required endpoints:**
     - `GET /api/endpoint1` - Description
     - `POST /api/endpoint2` - Description
   
   #### Real-time Updates (MQTT)
   - [ ] Connect to production MQTT broker
   - [ ] Test real-time data flow
   - **Blocked by:** MQTT broker configuration pending
   - **Required topics:**
     - `topic/name` - Description
   
   #### Other Pending Work
   - [ ] Specific item with reason why pending
   ```

2. **Add Implementation Summary:**
   - List all files created/modified
   - Note any deviations from original plan
   - Document mock data location and structure
   - **If status is ⏳ Partially Complete:**
     - Clearly separate "Completed Work" vs "Pending Work"
     - Provide specific blockers and dependencies
   - List known issues or TODOs for future work

3. **Update Progress Tracking:**
   - Mark all components/tasks as completed
   - Update time tracking with actual hours spent
   - Check off all acceptance criteria
   - Note any scope changes

4. **Update Related Documentation:**
   - Update API documentation if endpoints changed
   - Update README if setup instructions changed
   - Update test documentation if new test data added

---

## 🚫 Common Mistakes to Avoid

### Critical Rules

1. **Don't** create files > 300 lines - split from the start
2. **Don't** mix logic with UI - extract to hooks
3. **Don't** copy-paste code - create shared components
4. **Don't** use components with "And" in name - split them (❌ `FormAndList` → ✅ `Form` + `List`)
5. **Don't** guess styling - reference CSS variables
6. **Don't** hardcode data in components - use props
7. **Don't** use `any` type - provide proper types
8. **Don't** mark ✅ Completed with pending items - use ⏳ Partially Complete
9. **Don't** leave console.log in production

---

## 📚 Reference: HTML Design Files

For features with HTML prototypes, reference these files:

| Feature | HTML Reference | Plan Document | Spec Document |
|---------|---------------|---------------|---------------|
| Tickets List | `app/tickets-list.html` | `docs/plans/FEAT-001-tickets-list.md` | `docs/specs/02-ticket-management.md` |
| Ticket Detail | `app/ticket-detail.html` | `docs/plans/FEAT-005-ticket-detail.md` | `docs/specs/02-ticket-management.md` |
| Login | `app/login.html` | `docs/plans/FEAT-002-login-auth.md` | `docs/specs/08-authentication.md` |
| Staff Dashboard | `app/dashboard-staff.html` | `docs/plans/FEAT-003-dashboard-staff.md` | `docs/specs/06-dashboard.md` |
| Manager Dashboard | `app/dashboard-manager.html` | `docs/plans/FEAT-004-dashboard-manager.md` | `docs/specs/06-dashboard.md` |
| Tasks List | `app/tasks-list.html` | `docs/plans/FEAT-006-tasks-list.md` | `docs/specs/03-task-management.md` |
| Task Pool | `app/task-pool.html` | `docs/plans/FEAT-007-task-pool.md` | `docs/specs/04-task-pool.md` |
| Approvals | `app/approvals.html` | `docs/plans/FEAT-008-approvals.md` | `docs/specs/09-approvals-workflow.md` |
| SLA Alerts | `app/sla-alerts.html` | `docs/plans/FEAT-009-sla-alerts.md` | `docs/specs/05-sla-management.md` |
| Reports | `app/reports.html` | `docs/plans/FEAT-010-reports.md` | `docs/specs/reports/` |
| History | `app/history.html` | `docs/plans/FEAT-011-history.md` | `docs/specs/10-history-audit.md` |
| Statistics | `app/statistics.html` | `docs/plans/FEAT-012-statistics.md` | `docs/specs/11-personal-statistics.md` |
| Users | `app/users.html` | `docs/plans/FEAT-013-users.md` | `docs/specs/12-user-management.md` |
| Settings | `app/settings.html` | `docs/plans/FEAT-014-settings.md` | `docs/specs/13-settings.md` |
| Help | `app/help.html` | `docs/plans/FEAT-015-help.md` | `docs/specs/14-help-documentation.md` |

---

## 🎓 Example: Complete Feature Implementation

**Feature:** Tickets List (FEAT-001)  
**HTML Reference:** `app/tickets-list.html`  
**Spec:** `docs/specs/02-ticket-management.md`  
**Plan:** `docs/plans/FEAT-001-tickets-list.md`

**Steps Taken:**
1. ✅ Read this AI-IMPLEMENTATION-GUIDE.md in full
2. ✅ Read feature spec to understand requirements
3. ✅ Read implementation plan for technical approach
4. ✅ Studied `app/tickets-list.html` layout (stats cards, filters, table, slideouts)
5. ✅ Referenced `app/css/styles.css` for exact colors and spacing
6. ✅ Created mock data in `src/mocks/tickets.mock.ts` with 10+ varied tickets
7. ✅ Built components matching HTML structure with proper TypeScript types
8. ✅ Tested all user interactions and edge cases
9. ✅ Verified visual consistency side-by-side with HTML
10. ✅ Updated `docs/plans/FEAT-001-tickets-list.md` with completion status

**Result:** Fully functional feature with pixel-perfect design match and comprehensive test data

---

## 📚 Additional Resources

- **Migration Rules:** `docs/IMPLEMENTATION_GUIDE.md` - Overall project migration strategy
- **TypeScript Models:** `src/web/src/models/` - All data type definitions
- **Component Library:** `src/web/src/components/common/` - Reusable UI components
- **Redux Setup:** `src/web/src/store/` - State management configuration
- **Mock Data:** `src/web/src/mocks/` - Test data for development

---

## 🔄 Continuous Improvement

This guide is a living document. If you encounter:
- Unclear instructions
- Missing information
- Better practices
- New patterns

Update this guide to help future implementations.

---

**Remember:** 
- **Quality over speed** - Take time to do it right
- **Documentation is mandatory** - Not optional
- **Test with real scenarios** - Don't just implement, verify
- **Follow existing patterns** - Consistency across the codebase
- **Ask for clarification** - If requirements are unclear, ask before implementing
