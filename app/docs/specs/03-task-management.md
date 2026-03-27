# Feature Spec: Task Assignment & Management

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: TASK-003  
**Priority**: Critical  
**Status**: In Progress (Assignment strategies implemented in UI)  
**Last Updated**: March 27, 2026

---

## 🚦 Implementation Status

**Current Implementation (March 27, 2026):**

### ✅ Completed Features:
- ✅ Basic task creation with all required fields
- ✅ Assignment strategy selection (Direct/Pool/Department)
- ✅ Conditional UI for assignment options
- ✅ Task detail page with two-column layout
- ✅ Interactive checklist management
- ✅ Comments, Attachments, Activity tabs
- ✅ Progress tracking with slider
- ✅ SLA status display
- ✅ Mock data for development
- ✅ **Task Pool Page** (NEW - March 27, 2026):
  - Browse available tasks in pool
  - Filter by priority, skills, deadline
  - Search by keywords
  - Sort by priority, deadline, estimate, newest
  - Task cards with full details (skills, SLA, time in pool)
  - Claim task with one click
  - Navigate to task detail for more info

### ⚠️ Simplified Status Flow (Current):
The current implementation uses a **simplified status flow** for MVP:
```
CREATED → ASSIGNED → IN_PROGRESS → UNDER_REVIEW → COMPLETED
```

Status enum in code:
- `Created` - Task created, not yet assigned
- `Assigned` - Task assigned to someone
- `InProgress` - Being worked on
- `UnderReview` - Submitted for review
- `Completed` - Approved and done

### 🎯 Target Status Flow (From WORKFLOW_ANALYSIS.md):
The **complete workflow** includes additional states:
```
CREATED → POOL/CLAIMED → DEPT_ASSIGNED → ASSIGNED → 
IN_PROGRESS → SUPPORT_REQUESTED → COLLAB_ASSIGNED → 
BLOCKED → REVIEW → CHANGES_REQUESTED → COMPLETED → CLOSED
```

### ⏳ Pending Implementation:
- 🔄 **Pool Assignment Features** (Partially Complete):
  - ✅ Staff browsing available tasks in pool (TaskPoolPage implemented)
  - ✅ Claim task functionality (claimTask thunk in Redux)
  - ⏳ Manager claim approval workflow (needs backend + UI)
- ⏳ **Department Assignment Features**:
  - Department member task list
  - Member self-picking from department tasks
  - Department workload distribution
- ⏳ **Collaboration Support**:
  - Support request workflow (Step 4a)
  - Collaborator assignment (Step 4b)
  - Multi-assignee management
  - Collaborator tracking fields in Task model
- ⏳ **Advanced Status Management**:
  - SUPPORT_REQUESTED status
  - COLLAB_ASSIGNED status
  - BLOCKED status with blocker tracking
  - CHANGES_REQUESTED status
  - CANCELLED and CLOSED states
- ⏳ **Reassignment Workflow**:
  - Reassignment request by staff
  - Manager approval for reassignment
  - Reassignment reason logging
- ⏳ **Claim Approval**:
  - Manager review of pool task claims
  - Approve/reject claim decisions

### 📝 Task Model - Pending Fields:
Additional fields needed for full workflow:
```typescript
// For department assignment
assignToDepartmentId?: UUID;
assignToDepartmentName?: string;

// For collaboration support
collaborators?: Collaborator[];
supportRequestedAt?: DateTime;
supportRequest?: {
  description: string;
  suggestedCollaborators?: UUID[];
  effortPercentage?: number;
};

// For claim workflow
claimedBy?: UUID;
claimedAt?: DateTime;
claimStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';

// For blocking
blockedBy?: string[]; // Task IDs
blockingReason?: string;
blockedAt?: DateTime;
```

**Note:** The UI form currently supports selecting assignment strategies, but backend API integration and database schema updates are required to fully implement the complete workflow.

---

## 🔔 AI Implementation Notes

**IMPORTANT - HTML Reference Files:**
- Primary: `app/tasks-list.html` - Main tasks list + Kanban view
- Styling: `app/css/styles.css` - All CSS variables and component styles

**Mock Data Requirements:**
- Create in: `src/mocks/tasks.mock.ts`
- Must include: Various statuses (NOT_STARTED, IN_PROGRESS, UNDER_REVIEW, COMPLETED, ARCHIVED)
- Must include: Different assignment types (Direct, Pool, Team)
- Must include: Progress percentages (0-100%)
- Must include: Subtasks and checklist items
- Must include: Time tracking data (estimated vs actual)
- Use realistic Vietnamese names and medical department contexts

**Visual Consistency Checklist:**
- ✅ Match Kanban board column layout
- ✅ Match task card design and information density
- ✅ Match drag-and-drop visual feedback
- ✅ Match progress bar styling
- ✅ Match list view table structure

---

## 📋 Overview

**⚠️ CRITICAL: Read [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md) first for complete task workflow documentation including all steps, status transitions, roles matrix, and SLA rules.**

Hệ thống quản lý task assignment với 3 chiến lược phân công linh hoạt: Direct Assignment, Task Pool (self-pick), và Team Assignment. Hỗ trợ theo dõi tiến độ, subtasks, time tracking, và approval workflow.

**Key Capabilities:**
- Tạo tasks với dependencies và priorities
- 3 assignment strategies (Direct, Pool, Team)
- Progress tracking với percentage (0-100%)
- Subtasks & checklist items
- Time logging & estimates
- Review & approval workflow
- SLA tracking cho tasks
- Real-time status updates

---

## 👤 User Stories

### US-TASK-001: Create Task
**As a** Manager hoặc Team Lead  
**I want to** create new task với chi tiết đầy đủ  
**So that** work được organize và track properly

**Acceptance Criteria:**
- ✅ Điền title, description rõ ràng
- ✅ Chọn priority (Critical/High/Medium/Low)
- ✅ Set estimated hours
- ✅ Set due date/deadline
- ✅ Chọn category/department
- ✅ Chọn assignment strategy (Direct/Pool/Team)
- ✅ Có thể add tags/labels
- ✅ Có thể add checklist items
- ✅ Có thể link dependencies (blocked by/blocks)
- ✅ System generate task ID (TSK-YYYYMMDD-XXXX)

### US-TASK-002: Direct Assignment
**As a** Manager  
**I want to** assign task trực tiếp cho specific staff  
**So that** người phù hợp nhất làm việc đó

**Acceptance Criteria:**
- ✅ System suggest candidates dựa trên:
  - Skills matching với task requirements
  - Current workload (số tasks đang làm)
  - Availability status
  - Past performance ratings
- ✅ Manager xem suggestion list với scores
- ✅ Manager chọn assignee
- ✅ Staff nhận push notification
- ✅ Status chuyển CREATED → ASSIGNED
- ✅ SLA timer bắt đầu

### US-TASK-003: Pool Assignment (Self-Pick)
**As a** Manager  
**I want to** đưa task vào pool để staff tự chọn  
**So that** staff có autonomy và chọn task phù hợp skill

**Acceptance Criteria:**
- ✅ Task được publish vào Task Pool
- ✅ Status: CREATED (in pool)
- ✅ Staff filter pool by skills, priority, deadline, department
- ✅ Staff xem task details trước khi claim
- ✅ Staff click "Claim Task"
- ✅ System verify staff eligibility (skills, capacity)
- ✅ Nếu OK: assign task, status → ASSIGNED
- ✅ Nếu pool task unclaimed sau X hours → escalate to Manager

### US-TASK-004: Team Assignment
**As a** Manager  
**I want to** assign task cho entire team  
**So that** team tự coordinate và distribute work

**Acceptance Criteria:**
- ✅ Select target team
- ✅ Task assigned to team (not specific person)
- ✅ Status: ASSIGNED (Team)
- ✅ All team members see task trong "Team Tasks"
- ✅ Team Lead hoặc members tự volunteer
- ✅ Khi có người accept: specific assignment
- ✅ Team có thể split task into subtasks for multiple people

### US-TASK-005: Work on Task
**As a** assigned staff  
**I want to** update progress và track work  
**So that** mọi người theo dõi được status

**Acceptance Criteria:**
- ✅ Click "Start Working" → status IN_PROGRESS
- ✅ Update progress percentage (0-100%)
- ✅ Check off checklist items
- ✅ Log time worked (manual entry hoặc timer)
- ✅ Add comments/notes
- ✅ Upload files/screenshots
- ✅ Request collaboration support nếu cần
- ✅ Mark blockers/issues
- ✅ Add subtasks nếu cần
- ✅ All updates trigger real-time notifications
- ✅ SLA status visible (safe/warning/danger/breach)

### US-TASK-005a: Request Collaboration Support (Staff)
**As a** assigned staff  
**I want to** request collaboration từ team member  
**So that** có thể hoàn thành task phức tạp với sự hỗ trợ

**Acceptance Criteria:**
- ✅ Staff click "Request Support" từ task detail
- ✅ Staff mô tả phần việc cần collaborator hỗ trợ
- ✅ Staff có thể suggest collaborator nếu có
- ✅ Staff estimate effort % cho collaborator (e.g., 30% of task)
- ✅ Status chuyển sang SUPPORT_REQUESTED
- ✅ Manager/Lead nhận notification ngay lập tức
- ✅ Task vẫn thuộc ownership của staff chính
- ✅ Progress tracking giữ nguyên

### US-TASK-005b: Assign Collaborator (Manager/Lead)
**As a** Manager hoặc Team Lead  
**I want to** assign collaborator để hỗ trợ staff  
**So that** task được complete hiệu quả hơn

**Acceptance Criteria:**
- ✅ Manager xem support request details
- ✅ Manager chọn collaborator phù hợp
- ✅ Manager có thể assign nhiều collaborators
- ✅ Manager allocate effort % cho từng collaborator
- ✅ Status chuyển sang COLLAB_ASSIGNED
- ✅ Collaborators nhận notification với context đầy đủ
- ✅ Collaborators có thể view/comment task
- ✅ Collaborators update progress trong phần của mình
- ✅ Primary staff vẫn là người chịu trách nhiệm chính và submit for review
- ✅ All progress được aggregate lại

### US-TASK-006: Complete & Submit for Review
**As a** assigned staff  
**I want to** submit completed task for review  
**So that** work được verify trước khi close

**Acceptance Criteria:**
- ✅ Progress = 100%
- ✅ All checklist items completed
- ✅ Click "Submit for Review"
- ✅ Status → REVIEW
- ✅ Add completion notes/summary
- ✅ Manager/Reviewer nhận notification
- ✅ Task locked from further updates (chỉ comments)

### US-TASK-007: Review & Approve
**As a** Manager hoặc Reviewer  
**I want to** review completed task  
**So that** quality được đảm bảo

**Acceptance Criteria:**
- ✅ View task details, completion notes, attachments
- ✅ View time logged vs estimated
- ✅ Có thể Approve hoặc Request Changes
- ✅ **If Approve**: Status → COMPLETED, task closed
- ✅ **If Request Changes**: Status → IN_PROGRESS, specify changes needed
- ✅ Rate quality (1-5 stars)
- ✅ Staff nhận notification kết quả review

---

## 🔄 Workflow & Status Flow

### Complete Workflow Steps

**Reference:** [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md) - Complete task workflow documentation

| Step | Tên bước | Roles | Hành động | Trạng thái |
|------|----------|-------|-----------|------------|
| **1** | **Task Creation** | Manager/Admin | - Tạo task mới<br>- Nhập: title, description, deadline<br>- Set priority<br>- Tạo checklist con<br>- Thêm tags/labels | CREATED |
| **2a** | **Direct Assignment** | Manager/Admin | - Chọn assignee cụ thể<br>- System gửi notification<br>- Task vào danh sách assignee | ASSIGNED |
| **2b** | **Task Pool** | System | - Task đăng lên pool công khai<br>- Staff có thể xem và chọn | POOL |
| **2b.1** | **Self-Pick** | Staff | - Browse task pool<br>- Xem chi tiết task<br>- Chọn task phù hợp<br>- Claim task | CLAIMED |
| **2b.2** | **Claim Approval** | Manager/Lead | - Xem xét claim request<br>- Approve hoặc Reject<br>- Nếu approved: Staff nhận task<br>- Nếu rejected: Task về pool | ASSIGNED / POOL |
| **2c** | **Department Assignment** | Manager/Lead | - Gán cho department<br>- Department members xem task<br>- Members có thể pick task | DEPT_ASSIGNED → ASSIGNED |
| **3** | **Reassignment** | Manager/Lead | - Chọn assignee mới<br>- Nhập lý do reassign<br>- Thông báo cả 2 bên<br>- Log vào history | REASSIGNED → ASSIGNED |
| **4** | **Execution** | Staff | - Bắt đầu thực hiện<br>- Update % progress<br>- Check-off subtasks<br>- Log working hours<br>- Chat/collaborate<br>- Upload files | IN_PROGRESS |
| **4a** | **Request Collaboration** | Staff | - Staff yêu cầu hỗ trợ<br>- Mô tả phần việc cần support<br>- Manager/Lead nhận notification | SUPPORT_REQUESTED |
| **4b** | **Collaborator Assignment** | Manager/Lead | - Manager xem xét yêu cầu<br>- Chọn collaborator phù hợp<br>- Assign collaborator vào task<br>- Collaborator nhận notification | COLLAB_ASSIGNED |
| **5** | **Ready for Review** | Staff | - Hoàn thành 100%<br>- Đánh dấu "Ready for Review"<br>- Tổng hợp kết quả<br>- Notification manager | REVIEW |
| **6** | **Review & Approval** | Manager/Lead | - Review kết quả<br>- Quyết định:<br>&nbsp;&nbsp;• Approve → COMPLETED<br>&nbsp;&nbsp;• Request Changes → IN_PROGRESS<br>&nbsp;&nbsp;• Reject → Reassign | COMPLETED / CHANGES_REQUESTED |
| **7** | **Completion** | System | - Task đóng<br>- Ghi nhận vào báo cáo<br>- Cập nhật KPI<br>- Archive | CLOSED |

### Status Definitions

| Status | Description | Trigger | Next Possible States |
|--------|-------------|---------|---------------------|
| **CREATED** | Task mới tạo, chưa assign | Manager tạo task | ASSIGNED, POOL, DEPT_ASSIGNED, CANCELLED |
| **POOL** | Task trong pool, chờ claim | Manager chọn pool strategy | CLAIMED |
| **CLAIMED** | Staff đã claim, chờ approval | Staff claim từ pool | ASSIGNED (approved), POOL (rejected) |
| **DEPT_ASSIGNED** | Assigned to department | Manager assign to dept | ASSIGNED (member pick) |
| **ASSIGNED** | Đã assign, chưa start | Manager assign hoặc approved claim | IN_PROGRESS, CANCELLED |
| **IN_PROGRESS** | Đang làm việc | Staff start work | SUPPORT_REQUESTED, BLOCKED, REVIEW, CANCELLED |
| **SUPPORT_REQUESTED** | Staff yêu cầu collaborator | Staff request support | COLLAB_ASSIGNED, IN_PROGRESS |
| **COLLAB_ASSIGNED** | Collaborator đã được assign | Manager assign collaborator | IN_PROGRESS |
| **BLOCKED** | Bị block bởi dependencies | Staff mark blocked | IN_PROGRESS (khi unblock) |
| **REVIEW** | Chờ review/approval | Staff submit for review | COMPLETED, CHANGES_REQUESTED |
| **CHANGES_REQUESTED** | Manager yêu cầu sửa | Manager request changes | IN_PROGRESS |
| **COMPLETED** | Hoàn thành approved | Manager approve | CLOSED |
| **CANCELLED** | Bị hủy | Manager cancel | (Terminal state) |
| **CLOSED** | Đã đóng, archived | System close | (Terminal state) |

### Assignment Strategy Flow

```
┌─────────────────────────────────────────────────────┐
│  Step 1: Manager Creates Task                        │
│  - Input: Title, Description, Priority, Deadline    │
│  - Status: CREATED                                   │
└────────────────────┬────────────────────────────────┘
                     │
              ┌──────▼────────┐
              │ Step 2: Choose│
              │    Strategy   │
              └──────┬────────┘
                     │
    ┌────────────────┼────────────────────┐
    │                │                    │
┌───▼─────────┐  ┌──▼─────────┐  ┌──────▼──────────┐
│ 2a: DIRECT  │  │ 2b: POOL   │  │ 2c: DEPARTMENT  │
│ Assignment  │  │ Self-Pick  │  │   Assignment    │
└───┬─────────┘  └──┬─────────┘  └──────┬──────────┘
    │               │                    │
    │ Manager       │ Staff browses      │ Dept members
    │ picks staff   │ pool & claims      │ see task & pick
    │               │      ↓             │
    │               │ Manager approves   │
    │               │ or rejects claim   │
    │               │                    │
    └───────────────┴────────────────────┘
                    │
             ┌──────▼────────┐
             │   ASSIGNED    │
             │  to Person    │
             └──────┬────────┘
                    │
             ┌──────▼────────────┐
             │ Step 4: Execution │
             │   IN_PROGRESS     │
             └──────┬────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
  ┌─────▼──────┐         ┌─────▼──────┐
  │ 4a: Request│         │ Progress   │
  │   Support  │         │  Updates   │
  └─────┬──────┘         └─────┬──────┘
        │                      │
  ┌─────▼──────┐               │
  │4b: Manager │               │
  │   Assigns  │               │
  │Collaborator│               │
  └─────┬──────┘               │
        │                      │
        └──────────┬───────────┘
                   │
            ┌──────▼────────┐
            │ Step 5: Submit│
            │ for REVIEW    │
            └──────┬────────┘
                   │
            ┌──────▼────────────────┐
            │ Step 6: Manager Review│
            └──────┬────────────────┘
                   │
     ┌─────────────┼─────────────┐
     │             │             │
 ┌───▼───┐  ┌─────▼──────┐  ┌──▼────┐
 │Approve│  │  Request   │  │Reject │
 │       │  │  Changes   │  │       │
 └───┬───┘  └─────┬──────┘  └──┬────┘
     │            │            │
     │            └─→ Back to  │
     │               Step 4    │
     │                         │
 ┌───▼─────────┐      ┌────────▼──────┐
 │ COMPLETED   │      │  Reassign to  │
 │             │      │  another staff│
 └───┬─────────┘      └───────────────┘
     │
 ┌───▼─────┐
 │ CLOSED  │
 │(Archive)│
 └─────────┘
```

### Assignment Strategies Comparison

| Strategy | How it works | When to use | Ưu điểm | Nhược điểm |
|----------|-------------|-------------|---------|------------|
| **Direct Assignment** | Manager chọn người cụ thể khi tạo task | - Urgent tasks<br>- Tasks cần chuyên môn cao<br>- Tasks nhạy cảm | - Nhanh chóng<br>- Kiểm soát tốt<br>- Ensure đúng người | - Manager phải biết capacity<br>- Có thể overload staff |
| **Pool (Self-Pick)** | Task vào pool công khai, staff tự claim | - Standard tasks<br>- Flexible deadline<br>- Multiple qualified staff | - Staff chọn theo năng lực<br>- Tự chủ cao<br>- Cân bằng workload | - Tasks khó không ai nhận<br>- Cần monitor pool<br>- Claim approval needed |
| **Department Assignment** | Task gán cho phòng ban, members tự pick | - Team projects<br>- Cross-functional tasks<br>- Training juniors | - Linh hoạt phân chia<br>- Share knowledge<br>- Collaboration tốt | - Cần dept lead monitor<br>- Thời gian sắp xếp |

---

## 🎯 Business Rules

### BR-TASK-001: Assignment Eligibility
**Rule**: Staff chỉ được assign/claim task nếu:
- Có required skills match với task
- Current workload < max capacity (configurable, e.g., 10 tasks)
- Status = Available (not on leave/sick)
- Department match hoặc cross-department permission

### BR-TASK-002: SLA Inheritance
**Rule**: Tasks inherit SLA rules based on priority:
- **Critical**: Response 5min, Resolution 2 hours
- **High**: Response 30min, Resolution 4 hours
- **Medium**: Response 2 hours, Resolution 24 hours
- **Low**: Response 8 hours, Resolution 3 days

### BR-TASK-003: Progress Logic
**Rule**: Progress percentage rules:
- Manual update by staff (0-100%)
- Auto-calculate option: (completed checklists / total checklists) * 100
- Progress ≥ 100% required before Submit for Review
- Blockers prevent progress from increasing

### BR-TASK-004: Time Tracking
**Rule**: Time logging required:
- Log actual hours worked
- Compare vs estimated hours
- Alert if actual > 150% of estimate
- Time logs immutable once submitted

### BR-TASK-005: Subtask Rules
**Rule**: Subtasks behavior:
- Parent task cannot be COMPLETED until all subtasks COMPLETED
- Subtasks inherit parent priority (can adjust lower, not higher)
- Subtasks share parent SLA deadline
- Subtask progress contributes to parent progress

### BR-TASK-006: Reassignment Rules
**Rule**: Reassignment permissions:
- Staff can request reassignment (needs Manager approval)
- Manager can reassign anytime
- Reassignment resets SLA timer if approved
- Comments required explaining reason

### BR-TASK-007: Cancellation Rules
**Rule**: Task cancellation:
- Only Manager/Admin can cancel
- Must provide cancellation reason
- Cancelled tasks archived, không tính vào metrics
- Cannot cancel if status = COMPLETED/CLOSED

---

## 💾 Data Model

### Task Entity

```typescript
interface Task {
  id: string;                      // TSK-20260325-0001
  title: string;                   // Max 200 chars
  description: string;             // Rich text
  status: TaskStatus;              // Enum: CREATED, IN_POOL, ASSIGNED, etc.
  priority: Priority;              // CRITICAL, HIGH, MEDIUM, LOW
  
  // Assignment
  assignmentStrategy: 'DIRECT' | 'POOL' | 'TEAM';
  assignedTo: string | null;       // User ID (if assigned)
  assignedTeam: string | null;     // Team ID (if team assignment)
  
  // Dates & Times
  createdAt: DateTime;
  createdBy: string;               // User ID
  dueDate: DateTime;
  startedAt: DateTime | null;
  completedAt: DateTime | null;
  
  // Progress
  progressPercentage: number;      // 0-100
  estimatedHours: number;
  actualHours: number;             // Sum of time logs
  
  // SLA
  slaResponseDue: DateTime;
  slaResolutionDue: DateTime;
  slaStatus: 'SAFE' | 'WARNING' | 'DANGER' | 'BREACHED';
  slaBreachedAt: DateTime | null;
  
  // Relations
  categoryId: string;              // FK to Category
  departmentId: string;            // FK to Department
  parentTaskId: string | null;     // FK to Task (if subtask)
  dependsOn: string[];             // Array of Task IDs
  blockedBy: string[];             // Array of Task IDs currently blocking
  
  // Metadata
  tags: string[];                  // Searchable tags
  checklist: ChecklistItem[];      // Array of checklist items
  quality Rating: number | null;   // 1-5 stars dari reviewer
  
  // Audit
  updatedAt: DateTime;
  updatedBy: string;
  version: number;                 // Optimistic locking
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedAt: DateTime | null;
  completedBy: string | null;
}

interface TimeLog {
  id: string;
  taskId: string;
  userId: string;
  hours: number;
  date: Date;
  description: string;
  createdAt: DateTime;
}

interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;              // Rich text
  mentions: string[];           // Array of mentioned user IDs
  attachments: Attachment[];
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

---

## 🔌 API Endpoints

### Task CRUD

```http
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks
```

### Assignment Operations

```http
POST   /api/tasks/:id/assign-direct
POST   /api/tasks/:id/publish-to-pool
POST   /api/tasks/:id/assign-to-team
POST   /api/tasks/:id/claim              # Staff claim từ pool
POST   /api/tasks/:id/request-reassign
POST   /api/tasks/:id/approve-reassign
```

### Task Operations

```http
POST   /api/tasks/:id/start
PUT    /api/tasks/:id/progress           # Update progress %
POST   /api/tasks/:id/add-checklist
PUT    /api/tasks/:id/check-item/:itemId
POST   /api/tasks/:id/submit-review
POST   /api/tasks/:id/approve
POST   /api/tasks/:id/request-changes
POST   /api/tasks/:id/cancel
```

### Time & Comments

```http
POST   /api/tasks/:id/log-time
GET    /api/tasks/:id/time-logs
POST   /api/tasks/:id/comments
GET    /api/tasks/:id/comments
```

### Pool & Queries

```http
GET    /api/tasks/pool                   # Get available pool tasks
GET    /api/tasks/my-tasks                # Current user's assigned tasks
GET    /api/tasks/team/:teamId            # Team's tasks
GET    /api/tasks/stats                   # Task statistics
```

---

## 🎨 UI Components

### Task Creation Form

**Form Layout** (matching ticket-detail.html pattern):

**Section 1 - Basic Information:**
- **Tiêu đề** (required) - Text input with placeholder
- **Mô tả** - Textarea (4 rows) for detailed description
- **Hạn chót** (required) - Date input picker

**Section 2 - Priority & Estimation** (2-column row):
- **Ưu tiên** (required) - Dropdown:
  - Thấp (Low)
  - Trung bình (Medium)
  - Cao (High)
  - Khẩn cấp (Critical)
- **Ước tính (giờ)** - Number input (step: 0.5)

**Section 3 - Category & Department** (2-column row):
- **Danh mục** - Text input
  - Examples: IT, Database, HR, Network, etc.
  - Free text field for flexibility
- **Phòng ban** - Dropdown select:
  - Phòng IT
  - Phòng Hành Chính
  - Cấp Cứu
  - Phòng Khám
  - Hành Chính
  - Auto-updates both departmentId and departmentName

**Section 4 - Tags:**
- **Tags** - Text input with comma-separated values
  - Placeholder: "urgent, database, hardware, ... (phân cách bằng dấu phẩy)"
  - Icon hint: <i class="fas fa-tag"></i>
  - Split by comma, trimmed on submit
  - Displays as gray badges in task detail

**Section 5 - Skills:**
- **Kỹ năng yêu cầu** - Text input with comma-separated values
  - Placeholder: "SQL, Network, ... (phân cách bằng dấu phẩy)"
  - Split by comma, trimmed on submit

**Section Divider** - Visual separator

**Section 6 - Assignment Strategy** (required):
- **Phân công** - Dropdown select:
  - **Chỉ định người** (Direct Assignment)
    - Shows: Staff picker dropdown
    - Required: Select người thực hiện
    - Options: List of available staff members
  - **Chỉ định phòng ban** (Team Assignment)
    - Shows: Department picker dropdown
    - Required: Select phòng ban thực hiện
    - Options: List of departments
  - **Đưa vào danh mục chờ nhận** (Pool Assignment)
    - Shows: Info box with message
    - Message: "Task sẽ được đưa vào danh sách Công việc chờ nhận. Nhân viên có thể tự chọn nhận task này."
    - No additional fields required

**Conditional Fields:**
- **Người thực hiện** (visible when Direct Assignment selected)
  - Dropdown with staff list
  - Required field
  - Auto-updates both assigneeId and assigneeName
  
- **Phòng ban thực hiện** (visible when Team Assignment selected)
  - Dropdown with department list
  - Required field
  - Auto-updates both assignToDepartmentId and assignToDepartmentName

**Actions:**
- Cancel button (close slideout)
- "Tạo Task" primary button (with loading state)

**Validation:**
- Required fields: Tiêu đề, Ưu tiên, Hạn chót
- Date must be future date
- Estimated hours ≥ 0

### Task Detail View
**Sections:**
- Header: Task ID, Title, Status badge, Priority badge
- Info panel:
  - Assignee avatar & name
  - Created by, Created date
  - Due date, SLA status indicator
  - Progress bar (0-100%)
  - Time logged vs estimated
- Tabs:
  - **Overview**: Description, checklist, attachments
  - **Progress**: Time logs, progress updates history
  - **Comments**: Threaded comments với @mentions
  - **History**: All status changes & updates
  - **Subtasks**: List of child tasks

### Task Actions (based on status)
- CREATED: Assign, Edit, Cancel
- IN_POOL: Claim (staff view), Cancel (manager)
- ASSIGNED: Start Work, Edit, Reassign Request
- IN_PROGRESS: Update Progress, Add Time, Submit Review, Mark Blocker
- REVIEW: Approve, Request Changes
- COMPLETED: Reopen (if needed within 7 days)

### Task Pool View (Staff)
**Features:**
- Search bar
- Filters: Priority, Skills, Department, Deadline
- Sort: Newest, Oldest, Deadline, Priority
- Card grid showing:
  - Task title & ID
  - Priority & SLA status
  - Skills required (badge list)
  - Estimated hours
  - Due date
  - "Claim Task" button

### My Tasks View (Staff/Manager)
**Tabs:**
- In Progress (count badge)
- Pending Review (count)
- Completed
- All

**Kanban Board Option:**
- Columns: ASSIGNED, IN_PROGRESS, BLOCKED, REVIEW, COMPLETED
- Drag & drop to change status
- Card shows: ID, title, progress %, assignee avatar, SLA indicator

---

## 📊 Metrics & KPIs

### Task Metrics
- Total tasks created
- Tasks completed
- Average completion time
- Tasks on-time vs late
- SLA compliance rate
- Tasks in each status
- Backlog size (CREATED + IN_POOL)

### staff Performance
- Tasks completed per user
- Average task quality rating
- On-time completion rate
- Time accuracy (actual vs estimated)
- Tasks claimed from pool

### Pool Analytics
- Average time task stays in pool
- Pool claim rate
- Most popular tasks (by skills)
- Unclaimed tasks (escalations)

---

## 🔔 Notifications

### Staff Notifications
- ✉️ Task assigned to you
- ✉️ Task reassigned to you
- ✉️ Task deadline approaching (24h, 4h, 1h)
- ✉️ Task SLA at risk
- ✉️ You were mentioned in comment
- ✉️ Your task was approved
- ✉️ Your task needs changes
- ✉️ Blocked task unblocked

### Manager Notifications
- ✉️ Task submitted for review
- ✉️ Task SLA breached
- ✉️ Staff requested reassignment
- ✉️ Pool task unclaimed after threshold
- ✉️ Team task not accepted

---

## 🧪 Test Scenarios

### TS-TASK-001: Direct Assignment Happy Path
1. Manager creates task với Direct strategy
2. System suggests top 3 candidates
3. Manager selects assignee
4. Staff receives push notification
5. Staff clicks notification → opens task
6. Staff starts work, updates progress
7. Staff completes & submits for review
8. Manager approves
9. Task closed, metrics updated

### TS-TASK-002: Pool Self-Pick Flow
1. Manager creates task for Pool
2. Task appears in pool với skills filter
3. Staff filters pool by their skills
4. Staff views task details
5. Staff clicks "Claim Task"
6. System validates staff eligibility
7. Task assigned, removed from pool
8. Staff proceeds with work

### TS-TASK-003: SLA Escalation
1. Task in IN_PROGRESS approaching deadline
2. System sends warnings at 24h, 4h, 1h
3. SLA status changes: SAFE → WARNING → DANGER
4. If breached: BREACHED status, manager notified
5. Manager can reassign or add resources

### TS-TASK-004: Blocked Task
1. Task B depends on Task A
2. Task A not completed
3. Staff cannot complete Task B
4. Staff marks "Blocked by Task A"
5. When Task A completes → auto notification
6. Task B unblocked, work resumes

---

## 🚀 Implementation Priority

### Phase 1: Core Task Management (P0)
- ✅ Task CRUD operations
- ✅ Direct assignment
- ✅ Basic status flow (CREATED → IN_PROGRESS → COMPLETED)
- ✅ Progress tracking
- ✅ Time logging

### Phase 2: Assignment Strategies (P1)
- ✅ Task Pool implementation
- ✅ Team assignment
- ✅ Candidate suggestion algorithm
- ✅ Auto-routing logic

### Phase 3: Advanced Features (P2)
- ✅ Checklist & subtasks
- ✅ Dependencies & blockers
- ✅ Review & approval workflow
- ✅ Quality ratings

### Phase 4: Optimization (P3)
- ✅ Kanban board UI
- ✅ Advanced analytics
- ✅ Custom workflows
- ✅ Template tasks

---

## 📱 Mobile Considerations

### Mobile-Specific Features
- ✅ Quick claim from pool (swipe action)
- ✅ Voice-to-text for comments
- ✅ Camera integration for attachments
- ✅ Offline mode: cache assigned tasks, sync on reconnect
- ✅ Push notifications with deep links
- ✅ Quick status updates (swipe gestures)
- ✅ Time tracking timer widget

---

## 🔐 Permissions

| Action | Staff | Team Lead | Manager | Admin |
|--------|-------|-----------|---------|-------|
| Create task | ❌ | ✅ | ✅ | ✅ |
| Assign direct | ❌ | ✅ (own team) | ✅ | ✅ |
| Publish to pool | ❌ | ✅ | ✅ | ✅ |
| Claim from pool | ✅ | ✅ | ✅ | ✅ |
| Update own task | ✅ | ✅ | ✅ | ✅ |
| Reassign others | ❌ | ✅ (team) | ✅ | ✅ |
| Approve tasks | ❌ | ✅ (team) | ✅ | ✅ |
| Cancel tasks | ❌ | ❌ | ✅ | ✅ |
| View all tasks | ❌ | ✅ (team) | ✅ | ✅ |

---

## ✅ Acceptance Criteria Summary

**Definition of Done for Task Management Feature:**
- [ ] All user stories implemented and tested
- [ ] All 3 assignment strategies functional
- [ ] Progress tracking accurate
- [ ] SLA monitoring operational
- [ ] Review/approval workflow complete
- [ ] Real-time notifications working
- [ ] API endpoints tested (unit + integration)
- [ ] UI responsive on desktop + tablet
- [ ] Mobile app parity với web features
- [ ] Performance: Task list loads < 500ms
- [ ] Stress test: 1000 concurrent tasks handled
- [ ] Security: Role-based access enforced
- [ ] Audit logs capturing all changes
- [ ] User acceptance testing passed

---

**Related Specs:**
- [02-ticket-management.md](./02-ticket-management.md)
- [04-task-pool.md](./04-task-pool.md)
- [05-sla-management.md](./05-sla-management.md)
- [10-user-team-management.md](./10-user-team-management.md)
