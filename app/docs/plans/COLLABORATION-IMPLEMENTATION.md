# Collaborators Feature Implementation Summary

**Feature ID**: COLLABORATION-001  
**Status**: 🟡 Core Infrastructure Complete - Integration Pending  
**Date**: March 27, 2026  **Related Spec**: [03-task-management.md](../specs/03-task-management.md) - US-TASK-005a, US-TASK-005b

---

## ✅ Completed Implementation

### 1. **Task Model Updates** ✅
**File**: `src/models/Task.ts`

Added new interfaces and enums:
```typescript
// New Collaborator interface
export interface Collaborator {
  id: UUID;
  userId: UUID;
  userName: string;
  userAvatar?: string;
  role: 'support' | 'reviewer' | 'contributor';
  effortPercentage: number;
  assignedAt: string;
  assignedBy: UUID;
  status: 'active' | 'completed' | 'removed';
}

// New SupportRequest interface
export interface SupportRequest {
  description: string;
  requestedAt: string;
  requestedBy: UUID;
  suggestedCollaborators?: UUID[];
  effortPercentage?: number;
  reason: string;
}

// Updated Task interface with collaboration fields
export interface Task extends Timestamps {
  // ... existing fields
  
  // NEW - Collaboration fields
  collaborators?: Collaborator[];
  supportRequest?: SupportRequest;
  supportRequestedAt?: string;
}

// Updated TaskStatus enum
export enum TaskStatus {
  Created = 'created',
  Assigned = 'assigned',
  InProgress = 'in_progress',
  SupportRequested = 'support_requested',     // NEW
  CollabAssigned = 'collab_assigned',         // NEW
  UnderReview = 'under_review',
  Completed = 'completed',
}
```

### 2. **RequestSupportModal Component** ✅
**Files**: 
- `src/pages/TaskDetailPage/components/RequestSupportModal.tsx` (180 lines)
- `src/pages/TaskDetailPage/components/RequestSupportModal.module.css` (280 lines)

**Features**:
- ✅ Form để staff yêu cầu hỗ trợ từ manager/lead
- ✅ Mô tả công việc cần hỗ trợ (textarea, required)
- ✅ Lý do cần hỗ trợ (textarea, required)
- ✅ Slider để estimate effort % cho collaborator (10-50%)
- ✅ Info box hiển thị task title và instructions
- ✅ Warning box về quy trình sau khi submit
- ✅ Loading state khi đang submit
- ✅ Validation: không cho submit nếu fields trống
- ✅ Responsive design (mobile-optimized)

**UI/UX**:
- Modal overlay với backdrop blur
- Fade-in và slide-in animations
- Blue info box với icon
- Yellow warning box với bullet points
- Effort % slider với real-time display
- Help text: "Bạn vẫn là người chịu trách nhiệm chính (X%)"

### 3. **AssignCollaboratorModal Component** ✅
**Files**:
- `src/pages/TaskDetailPage/components/AssignCollaboratorModal.tsx` (230 lines)
- `src/pages/TaskDetailPage/components/AssignCollaboratorModal.module.css` (310 lines)

**Features**:
- ✅ List available staff members với details:
  - Avatar màu tự động
  - Tên staff
  - Skills badges (max 3 hiển thị)
  - Current workload (X tasks đang làm)
- ✅ Multi-select staff (click để toggle)
- ✅ Dropdown chọn role: Support / Contributor / Reviewer
- ✅ Input effort percentage
- ✅ Auto-calculate effort phân chia đều cho các collaborators
- ✅ Selected summary: "Đã chọn X collaborator(s) - mỗi người ~Y% effort"
- ✅ Hiển thị support request details nếu có
- ✅ Mock staff data với 4 members
- ✅ Loading state khi đang assign
- ✅ Responsive design

**UI/UX**:
- Staff cards với hover và selected states
- Checkboxes với animation
- Grid layout cho role và effort inputs
- Green selected summary box
- Blue info box hiển thị support request context

---

## 🔄 Integration Status

### ⏳ Pending Integration

#### A. TaskDetailPage Integration
**What needs to be done**:
1. Import modal components vào TaskDetailPage
2. Add state management cho modals:
   ```typescript
   const [supportModalOpen, setSupportModalOpen] = useState(false);
   const [collaboratorModalOpen, setCollaboratorModalOpen] = useState(false);
   ```
3. Add handlers:
   ```typescript
   const handleRequestSupport = async (request) => {
     // Call API hoặc Redux action
     // Update task status to SupportRequested
   };
   
   const handleAssignCollaborator = async (collaborators) => {
     // Call API hoặc Redux action  
     // Update task with collaborators
     // Change status to CollabAssigned
   };
   ```
4. Add buttons để mở modals:
   - "Yêu cầu hỗ trợ" button (visible khi status = InProgress)
   - "Chỉ định Collaborator" button (visible khi status = SupportRequested, role = Manager/Lead)
5. Display collaborators list trong Details Card sidebar
6. Update status badges để support new statuses

#### B. Redux Integration
**What needs to be done**:
1. Create Redux actions:
   ```typescript
   // tasksSlice.ts
   export const requestSupport = createAsyncThunk(...);
   export const assignCollaborators = createAsyncThunk(...);
   ```
2. Update reducers để handle collaboration state changes
3. API service methods:
   ```typescript
   // taskService.ts
   requestSupport(taskId, supportRequest)
   assignCollaborators(taskId, collaborators)
   ```

#### C. Mock Data Updates
**What needs to be done**:
1. Add sample tasks with collaborators để demo feature
2. Add tasks with supportRequest data
3. Update một số tasks với status = SupportRequested hoặc CollabAssigned

#### D. UI Display Components
**What needs to be added to TaskDetailPage**:
1. Collaborators list section trong Details Card:
   ```tsx
   {selectedTask.collaborators && selectedTask.collaborators.length > 0 && (
     <div className={styles.collaboratorsSection}>
       <div className={styles.sectionLabel}>Collaborators</div>
       {selectedTask.collaborators.map(collab => (
         <div key={collab.id} className={styles.collaborator}>
           <div className={styles.avatar}>{collab.userAvatar}</div>
           <div className={styles.collabInfo}>
             <span>{collab.userName}</span>
             <span>{collab.role} • {collab.effortPercentage}%</span>
           </div>
         </div>
       ))}
     </div>
   )}
   ```

2. Support request info box (khi status = SupportRequested):
   ```tsx
   {selectedTask.status === TaskStatus.SupportRequested && (
     <div className={styles.supportRequestBanner}>
       <i className="fas fa-clock"></i>
       <span>Đang chờ Manager chỉ định collaborator...</span>
     </div>
   )}
   ```

---

## 📋 Implementation Checklist

### Core Features ✅
- [x] Collaborator interface defined
- [x] SupportRequest interface defined  
- [x] TaskStatus enum updated (SupportRequested, CollabAssigned)
- [x] Task model updated with collaboration fields
- [x] RequestSupportModal component created
- [x] AssignCollaboratorModal component created
- [x] Modal CSS with responsive design
- [x] Form validation
- [x] Loading states

### Integration Tasks ⏳
- [ ] Import modals into TaskDetailPage
- [ ] Add modal state management
- [ ] Create request support handler
- [ ] Create assign collaborator handler
- [ ] Add "Yêu cầu hỗ trợ" button (staff view, InProgress status)
- [ ] Add "Chỉ định Collaborator" button (manager view, SupportRequested status)
- [ ] Display collaborators list in sidebar
- [ ] Add support request status banner
- [ ] Update status badge colors for new statuses
- [ ] Add Redux actions (requestSupport, assignCollaborators)
- [ ] Add API service methods
- [ ] Update mock data with sample collaborators
- [ ] Test complete workflow

### Testing ⏳
- [ ] Unit tests for modal components
- [ ] Integration tests for workflow
- [ ] E2E test: Staff request → Manager assign → Complete
- [ ] Test role permissions (staff can request, only manager can assign)
- [ ] Test edge cases (multiple collaborators, percentage limits)

---

## 🎯 User Stories Coverage

### US-TASK-005a: Request Collaboration Support (Staff)
**Status**: 🟡 Component Ready - Integration Pending

✅ **Completed**:
- Staff có thể mở modal "Request Support"
- Staff mô tả phần việc cần hỗ trợ
- Staff nhập lý do cần hỗ trợ
- Staff estimate effort % cho collaborator
- UI validation và feedback

⏳ **Pending**:
- Integration vào TaskDetailPage
- Status transition to SupportRequested
- Notification to Manager/Lead
- Permission check (only assignee can request)

### US-TASK-005b: Assign Collaborator (Manager/Lead)
**Status**: 🟡 Component Ready - Integration Pending

✅ **Completed**:
- Manager có thể xem list staff available
- Manager chọn collaborator(s)
- Manager assign role (support/contributor/reviewer)
- Manager allocate effort percentage
- UI hiển thị support request context

⏳ **Pending**:
- Integration vào TaskDetailPage
- Status transition to CollabAssigned
- Notification to collaborators
- Permission check (only manager/lead)
- Update task progress tracking with collaborators

---

## 🚀 Next Steps

### Priority 1: Basic Integration
1. Import modals vào TaskDetailPage
2. Add button "Yêu cầu hỗ trợ" cho staff khi task InProgress
3. Add button "Chỉ định Collaborator" cho manager khi SupportRequested
4. Implement handlers với console.log để test flow
5. Display collaborators list trong sidebar

### Priority 2: Redux & API
1. Create Redux thunks
2. Update task service với API methods
3. Handle loading và error states
4. Update task list khi có changes

### Priority 3: Enhancements
1. Add real-time notifications
2. Add activity log entries for collaboration events
3. Add collaborator removal feature
4. Add effort percentage editing
5. Add collaborator status tracking (active/completed)

---

## 📁 Files Created

```
src/models/Task.ts                                          (UPDATED - +40 lines)
src/pages/TaskDetailPage/components/
├── RequestSupportModal.tsx                                 (NEW - 180 lines)
├── RequestSupportModal.module.css                          (NEW - 280 lines)
├── AssignCollaboratorModal.tsx                             (NEW - 230 lines)
└── AssignCollaboratorModal.module.css                      (NEW - 310 lines)
```

**Total**: 4 new files, 1000+ lines of code

---

## 🔌 API Endpoints Needed

Backend needs to implement:

```http
# Request support
POST /api/tasks/:id/request-support
Body: {
  description: string,
  reason: string,
  effortPercentage: number,
  suggestedCollaborators?: UUID[]
}

# Assign collaborators
POST /api/tasks/:id/assign-collaborators  
Body: {
  collaborators: [{
    userId: UUID,
    role: 'support' | 'contributor' | 'reviewer',
    effortPercentage: number
  }]
}

# Remove collaborator
DELETE /api/tasks/:id/collaborators/:collaboratorId

# Update collaborator
PATCH /api/tasks/:id/collaborators/:collaboratorId
Body: {
  effortPercentage?: number,
  status?: 'active' | 'completed' | 'removed'
}
```

---

## 💡 Technical Notes

### State Management Pattern
```typescript
// In TaskDetailPage
const [supportModalOpen, setSupportModalOpen] = useState(false);
const [collaboratorModalOpen, setCollaboratorModalOpen] = useState(false);

const handleRequestSupport = async (request: SupportRequestData) => {
  await dispatch(requestSupport({ taskId: id!, request }));
  // Status automatically changes to SupportRequested
  // Manager receives notification
};

const handleAssignCollaborator = async (collaborators: CollaboratorData[]) => {
  await dispatch(assignCollaborators({ taskId: id!, collaborators }));
  // Status changes to CollabAssigned
  // Collaborators receive notifications
  // Task owner notified
};
```

### Permission Logic
```typescript
const canRequestSupport = 
  selectedTask.status === TaskStatus.InProgress &&
  currentUser.id === selectedTask.assigneeId &&
  !selectedTask.supportRequest;

const canAssignCollaborator =
  selectedTask.status === TaskStatus.SupportRequested &&
  (currentUser.role === 'manager' || currentUser.role === 'lead');
```

---

## ✅ Definition of Done

Collaboration feature will be considered complete when:
- [ ] All modal components integrated into TaskDetailPage
- [ ] Redux actions and reducers implemented
- [ ] API endpoints working with backend
- [ ] Mock data includes collaboration examples
- [ ] Collaborators displayed in UI
- [ ] Status transitions working correctly
- [ ] Notifications implemented
- [ ] Permissions enforced
- [ ] Activity log tracks collaboration events
- [ ] Unit tests passing
- [ ] E2E workflow tested
- [ ] Documentation updated
- [ ] User acceptance testing passed

---

**Summary**: Core collaboration infrastructure (models, modals, UI components) is 100% complete. Integration work (connecting to Redux, API, and TaskDetailPage) is next step. Estimate 2-4 hours for full integration and testing.
