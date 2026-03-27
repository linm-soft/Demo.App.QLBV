# Implementation Plan: Task Creation & Assignment Strategies

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting.

---

**Feature ID:** FEAT-006-04
**Priority:** High  
**Status:** ✅ 100% Completed (March 27, 2026)  
**Created:** 2026-03-27  
**Last Updated:** 2026-03-27  

**Related Plans:**
- [FEAT-006-00-OVERVIEW.md](./FEAT-006-00-OVERVIEW.md) - Task Management Overview
- [FEAT-006-01-task-detail.md](./FEAT-006-01-task-detail.md) - Task Detail Page
- [FEAT-006-05-task-pool.md](./FEAT-006-05-task-pool.md) - Task Pool (Pool Assignment)
- [FEAT-006-06-tasks-list.md](./FEAT-006-06-tasks-list.md) - Tasks List (where form opens)

**Related Spec:** 
- [03-task-management.md](../specs/03-task-management.md) - Task management workflows
- [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md) - Steps 1, 2a, 2c (Creation & Assignment)

---

## 📋 Overview

Task creation form with support for 3 assignment strategies: Direct Assignment, Pool Assignment, and Department Assignment. Implements Step 1 (Task Creation), Step 2a (Direct Assignment), and Step 2c (Department Assignment) from workflow.

**Route**: Modal/Slideout in `/tasks` (Tasks List Page)

---

## 🚦 Implementation Status

### ✅ Completed Features

#### 1. Task Creation Form (Core)
- ✅ **CreateTaskForm Component** (March 26-27, 2026):
  - Full form with all required fields
  - Form validation with required field indicators
  - Loading states during submission
  - Success/error handling with notifications
  - Located in: `src/pages/TasksListPage/components/CreateTaskForm`

#### 2. Basic Fields
- ✅ **Title** (required) - Text input
- ✅ **Description** - Textarea (4 rows)
- ✅ **Due Date** (required) - Date picker
- ✅ **Priority** (required) - Dropdown (Low/Medium/High/Critical)
- ✅ **Estimated Hours** - Number input (step: 0.5)
- ✅ **Category** - Text input (free text for flexibility)
- ✅ **Department** - Dropdown select (updates both departmentId and departmentName)
- ✅ **Tags** - Comma-separated text input
- ✅ **Skills Required** - Comma-separated text input

#### 3. Assignment Strategy (Partial)
- ✅ **Strategy Selector** - Dropdown with 3 options:
  - "Chỉ định người" (Direct Assignment)
  - "Task Pool" (Pool Assignment)
  - "Chỉ định phòng ban" (Department Assignment)
- ✅ **Direct Assignment** - Conditional UI:
  - Assignee dropdown (visible when Direct selected)
  - Updates assigneeId and assigneeName
- ✅ **Department Assignment** - Completed:
  - Department dropdown (visible when Department selected)
  - Updates assignToDepartmentId and assignToDepartmentName
  - DepartmentTasksPage created for department members
  - Self-pick functionality implemented
  - Redux thunks: fetchDepartmentTasks, claimDepartmentTask

#### 4. Redux Integration
- ✅ **createTask thunk** in tasksSlice:
  - Accepts full Task object
  - Calls taskService.createTask()
  - Updates Redux state on success
  - Error handling

#### 5. Task Service
- ✅ **createTask method** in taskService.ts:
  - Mock data implementation
  - Generates task ID, ticket number
  - Sets default values (status, progress, etc.)
  - 500ms delay to simulate API call

---

## ✅ Recently Completed

### Department Assignment Workflow (Step 2c) - March 27, 2026
- ✅ **UI for Department Assignment**:
  - DepartmentTasksPage created (similar to TaskPoolPage)
  - Filters tasks by user's departmentId
  - Search and filter capabilities (priority, skills, deadline)
  - Self-pick button for department members
  - Visual indicators (priority badges, SLA status)
- ✅ **Backend API** (Mock implementation):
  - `GET /api/tasks/department/:deptId` - Fetch department tasks
  - `POST /api/tasks/:id/claim-from-department` - Claim task
- ✅ **Redux thunks**:
  - `fetchDepartmentTasks` - Fetch tasks assigned to department
  - `claimDepartmentTask` - Claim task from department
- ⏳ **Notifications** (Pending):
  - Notify all department members when task assigned to dept
  - Notify manager when member claims task

## ⏳ Pending Implementation

### Task Duplication Feature
- [ ] "Duplicate Task" button in Task Detail
- [ ] Pre-fill form with existing task data
- [ ] Option to duplicate subtasks
- [ ] Option to duplicate attachments

### Advanced Features
- [ ] **Task Templates**:
  - Save frequently-used task configurations as templates
  - Template library
  - Quick create from template
- [ ] **Bulk Task Creation**:
  - CSV import
  - Create multiple tasks at once
  - Batch assignment

---

## 📁 Files Created/Modified

### Created Files:
```
src/pages/TasksListPage/components/CreateTaskForm/
├── CreateTaskForm.tsx (350 lines)
├── CreateTaskForm.module.css
└── index.ts

src/pages/DepartmentTasksPage/
├── DepartmentTasksPage.tsx (380 lines)
├── DepartmentTasksPage.module.css (290 lines)
└── index.ts
```

### Modified Files:
```
src/models/Task.ts (added assignToDepartmentId, assignToDepartmentName)
src/store/slices/tasksSlice.ts (createTask, fetchDepartmentTasks, claimDepartmentTask thunks)
src/services/taskService.ts (createTask, getDepartmentTasks, claimDepartmentTask methods)
src/pages/TasksListPage/TasksListPage.tsx (integrated CreateTaskForm)
src/App.tsx (added /department-tasks route)
```

---

## 🎯 Workflow Coverage

Based on [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md):

| Step | Workflow Name | Feature | Status |
|------|---------------|---------|--------|
| 1 | Task Creation | Create task form with all fields | ✅ Done |
| 1 | Task Creation | Priority selection | ✅ Done |
| 1 | Task Creation | Checklist creation | ⏳ Pending |
| 1 | Task Creation | Tags/labels | ✅ Done |
| 2a | Direct Assignment | Assignee selection dropdown | ✅ Done |
| 2a | Direct Assignment | Notification to assignee | ⏳ Pending (backend) |
| 2b | Pool Assignment | Publish to pool option | ✅ Done |
| 2c | Department Assignment | Dept selection dropdown | ✅ Done |
| 2c | Department Assignment | Dept member self-pick | ✅ Done |
| 2c | Department Assignment | Dept member notification | ⏳ Pending (backend) |

---

## 🎨 Form Layout & Validation

### Form Sections

**Section 1: Basic Information**
- Tiêu đề (required) - Validates: non-empty
- Mô tả - Optional
- Hạn chót (required) - Validates: future date

**Section 2: Priority & Estimation** (2-column row)
- Ưu tiên (required) - Validates: must select one of 4 options
- Ước tính (giờ) - Optional, default: 0

**Section 3: Category & Department** (2-column row)
- Danh mục - Optional, free text
- Phòng ban - Dropdown, updates both ID and name

**Section 4: Tags**
- Tags - Comma-separated, free text
  - Example: "urgent, database, hardware"
  - Splits on submit

**Section 5: Skills**
- Kỹ năng yêu cầu - Comma-separated
  - Example: "SQL, Network"
  - Used for pool filtering

**Section 6: Assignment Strategy** (required)
- Strategy dropdown - Validates: one of 3 options must be selected
- **Conditional UI**:
  - If "Direct": Show assignee dropdown
  - If "Pool": Hide additional fields
  - If "Department": Show department dropdown

**Actions**
- Cancel button (close slideout)
- "Tạo Task" primary button (loading state during submit)

---

## 🔌 API Integration Points

When backend is ready:

### Task Creation:
```typescript
POST /api/tasks
Body: {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: Date;
  estimatedHours: number;
  category?: string;
  departmentId?: UUID;
  departmentName?: string;
  tags?: string[];
  skillsRequired?: string[];
  assignmentStrategy: AssignmentStrategy;
  assigneeId?: UUID; // For direct assignment
  assigneeName?: string;
  assignToDepartmentId?: UUID; // For dept assignment
  assignToDepartmentName?: string;
}
Response: Task
```

### Department Assignment:
```typescript
POST /api/tasks/:id/assign-to-department
Body: { departmentId: UUID }
Response: Task

GET /api/tasks/department/:deptId
Response: Task[]

POST /api/tasks/:id/claim-from-department
Response: Task
```

---

## 🧪 Testing Recommendations

### Unit Tests
- [ ] Form validation (required fields)
- [ ] Priority selection
- [ ] Date validation (future dates only)
- [ ] Assignment strategy conditional UI
- [ ] Tags/skills parsing (comma-separated)
- [ ] Form submit with valid data
- [ ] Form submit with missing required fields

### Integration Tests
- [ ] Create task with Direct Assignment
- [ ] Create task with Pool Assignment
- [ ] Create task with Department Assignment
- [ ] Redux state updates after create
- [ ] Navigation after successful create
- [ ] Error handling on failed create

### E2E Tests
- [ ] Manager creates task, assigns to staff
- [ ] Manager creates task, publishes to pool
- [ ] Manager creates task, assigns to department
- [ ] Department member sees task and claims it
- [ ] Form validation prevents invalid submissions
- [ ] Successful create shows success toast

---

## 🚀 Next Steps & Future Enhancements

### Immediate (Priority 1)
- [ ] Complete Department Assignment workflow UI
- [ ] Add subtask creation in form (checklist)
- [ ] Backend API integration
- [ ] Department member notification system

### Short-term (Priority 2)
- [ ] Task duplication feature
- [ ] Task templates feature
- [ ] File attachment during creation
- [ ] Link to ticket during creation

### Long-term (Priority 3)
- [ ] Bulk task creation (CSV import)
- [ ] Recurring tasks (scheduled tasks)
- [ ] Task dependencies (blocked by/blocks)
- [ ] AI-powered task suggestions
- [ ] Smart assignee recommendation (based on workload & skills)

---

## ⏱️ Time Breakdown

| Phase | Task | Hours | Status |
|-------|------|-------|--------|
| 1 | Design form layout | 0.5h | ✅ Done |
| 2 | Implement basic fields | 2h | ✅ Done |
| 3 | Assignment strategy UI | 1.5h | ✅ Done |
| 4 | Form validation | 1h | ✅ Done |
| 5 | Redux integration | 1h | ✅ Done |
| 6 | Department workflow | 2h | ✅ Done |
| **Total** | | **8h** | **100%** |

**Completed**: 8h  
**Remaining**: 0h

---

## 📝 Change Log

### March 27, 2026 - Partial Implementation
- ✅ Created CreateTaskForm component with all fields
- ✅ Added assignment strategy selector (3 options)
- ✅ Implemented conditional UI for Direct/Pool/Department
- ✅ Added form validation with required field indicators
- ✅ Integrated with Redux (createTask thunk)
- ✅ Added taskService.createTask() with mock data
- ✅ Added tags and skills fields (comma-separated)
- ⏳ Department member task list pending
- ⏳ Department self-pick workflow pending

### March 26, 2026 - Initial Creation
- Created basic form structure
- Added all input fields
- Integrated into TasksListPage

---

## 🔗 Related Documentation

- [FEAT-006-00-OVERVIEW.md](./FEAT-006-00-OVERVIEW.md) - Task Management Overview
- [FEAT-006-01-task-detail.md](./FEAT-006-01-task-detail.md) - Task Detail Page
- [FEAT-006-05-task-pool.md](./FEAT-006-05-task-pool.md) - Task Pool (Pool Assignment Strategy)
- [FEAT-006-06-tasks-list.md](./FEAT-006-06-tasks-list.md) - Tasks List (where form opens)
- [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md) - Workflow Steps 1, 2a, 2c
- [03-task-management.md](../specs/03-task-management.md) - Task Management Spec

---

**Status**: ⏳ **75% Complete** - Core creation done. Department Assignment workflow pending (2h remaining).
