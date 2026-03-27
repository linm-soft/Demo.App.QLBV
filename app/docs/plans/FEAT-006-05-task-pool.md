# Implementation Plan: Task Pool & Self-Pick

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-006-05 (Previously FEAT-007)
**Priority:** High  
**Status:** ✅ Core Completed (Enhancement Pending)  
**Created:** 2026-03-25  
**Completed:** 2026-03-27  

**Related Plans:**
- [FEAT-006-00-OVERVIEW.md](./FEAT-006-00-OVERVIEW.md) - Task Management Overview
- [FEAT-006-01-task-detail.md](./FEAT-006-01-task-detail.md) - Task Detail Page
- [FEAT-006-04-task-creation.md](./FEAT-006-04-task-creation.md) - Task Creation (Pool Assignment)
- [FEAT-006-06-tasks-list.md](./FEAT-006-06-tasks-list.md) - Tasks List

**Related Spec:** 
- [04-task-pool.md](../specs/04-task-pool.md) - Task pool specification
- [03-task-management.md](../specs/03-task-management.md) - Task management workflows
- [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md) - Steps 2b & 2b.1 (Pool Assignment & Self-Pick)

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/task-pool.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Verification Status:** ✅ Core features verified and tested

---

## ✅ Implementation Summary

**Implemented:** March 27, 2026

### Features Completed:
- ✅ **TaskPoolPage** - Full React component at `/task-pool` route
- ✅ **Grid layout** - Responsive auto-fill grid (min 380px cards)
- ✅ **Filters**:
  - Priority filter (All/Critical/High/Medium/Low)
  - Skills filter (All/IT Support/Networking/Database/Hardware)
  - Deadline filter (All/Today/Week/Month)
  - Sort options (Priority/Deadline/Estimate/Newest)
- ✅ **Search** - Keywords across title, description, skills
- ✅ **Task cards** - Complete info display:
  - Task ID, title, priority badge
  - Description (truncated)
  - Skills badges
  - Metrics: deadline, estimate, SLA status, time in pool
  - Creator info with timestamp
- ✅ **Claim functionality** - One-click claim with Redux
- ✅ **Empty state** - Clear message when no tasks
- ✅ **Responsive design** - Mobile, tablet, desktop layouts
- ✅ **Info banner** - Dynamic task count display

### Files Created:
```
src/pages/TaskPoolPage/
├── TaskPoolPage.tsx        (390 lines)
├── TaskPoolPage.module.css (290 lines)
└── index.ts
```

### Build Status:
```
✓ 647.75 KB (201.21 KB gzipped) [+16 KB from mock data]
✓ CSS: 131.80 kB (22.22 KB gzipped)
✓ 0 TypeScript errors
✓ Build time: 15.93s
✓ Mock data: 15 tasks, 600+ lines
```

### Components Created:
```
src/pages/TaskPoolPage/
├── TaskPoolPage.tsx        (415 lines - with modal integration)
├── TaskPoolPage.module.css (290 lines)
└── index.ts

src/components/task/
├── ClaimTaskModal.tsx       (210 lines - NEW)
├── ClaimTaskModal.module.css (245 lines - NEW)
└── index.ts                  (NEW)
```

---

## 📋 Overviewmodal confirmation)
- [ ] Eligibility check (skills, capacity, availability) ⏳ Pending
- [ ] Error message if ineligible ⏳ Pending
- [x] Claimed task removed from pool immediately ✅ (via Redux)
- [ ] Real-time updates when tasks added/claimed ⏳ Pending (WebSocket)
- [x] Empty state when no tasks available ✅
- [x] **Claim confirmation modal** ✅ NEW - March 27, 2026
## 🎯 Acceptance Criteria

- [x] Grid/list view of available tasks ✅
- [x] Filter: Skills, priority, department, deadline ✅ (3/4 - department pending)
- [x] Sort: Newest, deadline, priority, estimate ✅
- [x] Search by keywords ✅
- [ ] Recommended tasks highlighted (skills match) ⏳ Pending
- [x] Task cards show: title, skills needed, estimate, deadline, priority ✅
- [x] "Claim Task" button with validation ✅ (basic validation)
- [ ] Eligibility check (skills, capacity, availability) ⏳ Pending
- [ ] Error message if ineligible ⏳ Pending
- [x] Claimed task removed from pool immediately ✅ (via Redux)
- [ ] Real-time updates when tasks added/claimed ⏳ Pending (WebSocket)
- [x] Empty state when no tasks available ✅

---

## 📦 Main Components

1. **TaskPoolPage** - Main container
2. **PoolFilters** - Filter and sort bar
3. **TaskPoolGrid** - Grid of available tasks
4. **PoolTaskCard** - Individual task card
5. **ClaimTaskModal** - Confirmation with task details
6. **SkillsMatchBadge** - Skills matching indicator
7. **EligibilityCheck** - Validation logic

---

## ⏱️ Time Estimate: **8 hours**

---

## 🔧 Implementation Steps

### Phase 1: UI Components ✅ COMPLETED (5 hours)
- [x] Create TaskPoolPage layout ✅
- [x] Create PoolFilters component ✅ (integrated in page)
- [x] Create PoolTaskCard component ✅ (integrated in page)
- [x] Create ClaimConfirmModal component ✅ **NEW: March 27, 2026**
- [x] Test responsive layout ✅

### Phase 2: Interactive Features ✅ COMPLETED (2 hours)
- [x] Implement claim task functionality ✅
- [x] Add skill filtering ✅
- [x] Add sort by deadline/priority ✅
- [x] Test claim workflow ✅

### Phase 3: API Integration ✅ MOCK DATA COMPLETED (March 27, 2026)
- [x] Create comprehensive mock data (15 tasks) ✅ **NEW: taskPool.mock.ts**
- [x] Integrate `GET /api/tasks/pool` for pool tasks ✅ (via Redux fetchPoolTasks with mock support)
- [x] Integrate `POST /api/tasks/:id/claim` for claiming ✅ (via Redux claimTask with mock support)
- [x] Add loading states for all API calls ✅
- [x] Add basic error handling ✅
- [ ] Test with real API endpoints ⏳ Currently using mock data (USE_MOCK_DATA = true)
- [ ] Replace mock data with API data ⏳ Ready for backend integration (change USE_MOCK_DATA to false)
- [ ] Handle concurrent claim scenarios ⏳ Needs backend optimistic locking

**Mock Data Files Created:**
- `src/mocks/taskPool.mock.ts` (600+ lines)
- `src/mocks/taskPool.mock.usage.md` (documentation)

**Mock Data Features:**
- ✅ 15 realistic Vietnamese tasks
- ✅ 4 priority levels (Critical: 2, High: 3, Medium: 5, Low: 5)
- ✅ 8+ different skills coverage
- ✅ Various deadline scenarios (2 hours → 30 days)
- ✅ Complete with subtasks, SLA, departments
- ✅ Helper functions: filter by skills, priority, deadline
- ✅ Simulate claim task functionality

---

## 🔄 Additional Enhancements Completed

### Claim Confirmation Modal (March 27, 2026):
- ✅ **Full-featured modal** with overlay and backdrop blur
- ✅ **Complete task preview**:
  - Task ID, title, priority badge
  - Full description
  - Skills required badges
  - Details grid: estimate, deadline, SLA, creator
  - Category and department badges
- ✅ **Warning box** with important notes:
  - Responsibility after claiming
  - Cannot undo action
  - Report issues to manager
- ✅ **Loading state** during claim process
- ✅ **Responsive design** - Mobile-optimized layout
- ✅ **Animation** - Smooth fade-in and slide-in effects
- ✅ **Keyboard support** - Close with ESC key (future)
- ✅ **Priority-based styling** - Button color matches task priority

### UI/UX Polish:
- ✅ **Info banner** - Gradient background with dynamic count
- ✅ **Border-left priority coloring** - Visual priority indicators
- ✅ **Hover effects** - Cards lift on hover
- ✅ **Priority-based button variants** - Critical=danger, High=warning, etc.
- ✅ **Time formatting** - "X giờ trước" for time in pool
- ✅ **SLA badges** - Color-coded status indicators
- ✅ **Skills badges** - Visual skill tags with icons
- ✅ **Empty state** - Clear "no tasks" me ⏳ To be implemented
- Current tasks < 10 (configurable) ⏳ To be implemented
- User status = Available (not on leave) ⏳ To be implemented
- First claim wins (optimistic locking) ⏳ Backend required

---

## 📝 Next Steps

### Priority 1: Eligibility Valishowing modal
2. Show validation errors in modal
3. Highlight recommended tasks (skills match ≥80%)
4. Display user capacity status
5. Check if task already claimed (concurrent claim prevention)

### Priority 2: Enhanced Modal Features ✅ COMPLETED
1. ~~Create ClaimTaskModal component~~ ✅
2. ~~Show full task details before claim~~ ✅
3. ~~Display warning message~~ ✅
4. ~~Confirm action with button~~ ✅
5. Add keyboard shortcuts (ESC to close) ⏳ Simple additi
4. Confirm action with "Yes, Claim" button

### Priority 3: Real-time Updates
1. WebSocket integration for pool updates
2. Show "Just claimed by X" notification
3. Auto-refresh pool on new task added
4. Handle concurrent claim conflicts

### Priority 4: Enhanced Filtering
1. Add department filter
2. Add "Match my skills" toggle
3. Save filter preferences
4. Quick filter presets (e.g., "Urgent", "Easy wins")

---

## 🔗 Related Documentation

- [03-task-management.md](../specs/03-task-management.md) - Parent spec
- [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md) - Step 2b workflow details
- [task-pool.html](../../app/task-pool.html) - HTML reference designask model
- ✅ **Redux integration** - Uses poolTasks state slice
- ✅ **Client-side filtering** - Instant filter updates
- ✅ **Responsive CSS Grid** - Auto-fill minmax layout
- ✅ **CSS Modules** - Scoped component styles

---

## 🔌 API Endpoints

- `GET /api/tasks/pool`
- `POST /api/tasks/:id/claim`
- `GET /api/users/me/eligibility/:taskId`

---

## 🎯 Business Rules

- Staff must have ≥80% of required skills
- Current tasks < 10 (configurable)
- User status = Available (not on leave)
- First claim wins (optimistic locking)
