# Feature Spec: Task Detail Page

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: TASK-003a  
**Priority**: Critical  
**Status**: ✅ Implemented (Pending: Assignment strategy display & collaborators)  
**Last Updated**: March 27, 2026  
**Parent Spec**: [03-task-management.md](03-task-management.md)

---

## 🔔 AI Implementation Notes

**IMPORTANT - HTML Reference Files:**
- Primary: `app/task-detail.html` (if exists) or `app/ticket-detail.html` (similar pattern)
- Styling: `app/css/styles.css` - All CSS variables and component styles

**Related Specs to Read FIRST:**
Before implementing Task Detail, you MUST read these related specs for full context:
- **[03-task-management.md](03-task-management.md)** - Parent spec with task workflows and business logic
- **[02-ticket-management.md](02-ticket-management.md)** - Similar detail page pattern for reference
- **[10-history-audit.md](10-history-audit.md)** - Activity logging requirements
- **[07-notifications.md](07-notifications.md)** - Comment and @mention notifications

**Mock Data Requirements:**
- Create in: `src/mocks/taskDetail.mock.ts`
- Must include: Complete task with all fields populated
- Must include: Comments with @mentions, replies, and various authors
- Must include: File attachments with different file types (PDF, images, Figma, etc.)
- Must include: Activity timeline with all activity types
- Must include: Subtasks with mixed completion states
- Must include: Time logs with actual vs estimated hours
- Use realistic Vietnamese names and medical department contexts

**Visual Consistency Checklist:**
- ✅ Match tab navigation design
- ✅ Match comment thread layout
- ✅ Match attachment card design
- ✅ Match activity timeline markers
- ✅ Match progress tracking UI
- ✅ Match checklist interaction patterns

---

## 📋 Overview

**⚠️ CRITICAL References:**
- **[WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md)** - Complete task workflow with all steps and status transitions
- **[03-task-management.md](03-task-management.md)** - Parent spec with task workflows and business logic

Task Detail page hiển thị đầy đủ thông tin về một task với multi-tab interface, interactive checklist management, team communication, và complete activity tracking. Page này là trung tâm của task execution workflow.

**Key Capabilities:**
- Multi-tab interface (Overview, Comments, Attachments, Activity)
- Interactive subtask/checklist management (add, edit, delete, toggle complete)
- Real-time progress tracking with slider
- Team communication via comments with @mentions
- File attachment upload/download
- Complete activity timeline
- SLA status monitoring
- Action buttons based on task status and user role

---

## 🎯 Page Structure

### Layout
**Two-Column Grid Layout:**
```
┌────────────────────────┬──────────────┐
│   Main Column (1fr)    │ Sidebar (350px)│
├────────────────────────┼──────────────┤
│ 1. Task Info Card      │ 1. SLA Card  │
│ 2. Tabs Card:          │ 2. Details   │
│    - Checklist         │ 3. Progress  │
│    - Comments          │ 4. Related   │
│    - Files             │              │
│    - Activity          │              │
└────────────────────────┴──────────────┘
```

### Header Section
**Always Visible at Top:**
- Back button + Breadcrumb (Tasks > Task ID)
- Task ID (e.g., TSK-20260326-0001)
- Priority badge (Critical/High/Medium/Low) with colors
- Status badge (Created/Assigned/In Progress/Review/Completed)
- Task title as H1
- Action button (e.g., "Gửi yêu cầu xem xét" when progress ≥ 90%)

---

## 📦 Main Column

### 1. Task Info Card
**Card with header "Thông Tin Task":**

**Content Structure:**

1. **Tiêu đề** (Title Field):
   - Label: "Tiêu đề"
   - Value: Task title in large font (1.125rem)
   - Font-weight: 600
   - Color: gray-900

2. **Mô tả** (Description Field):
   - Label: "Mô tả"
   - Value: Full description with preserved whitespace
   - Line height: 1.6
   - Pre-wrap whitespace handling
   - Color: gray-700

3. **Info Grid** (2 columns):
   - **Column 1 - Danh mục** (Category):
     - Label: "Danh mục"
     - Value: Badge with folder icon + category name
     - Badge color: info (blue)
     - Display "N/A" if no category
   
   - **Column 2 - Phòng ban** (Department):
     - Label: "Phòng ban"
     - Value: Badge with building icon + department name
     - Badge color: secondary (purple)
     - Display "N/A" if no department

4. **Tags** (Conditional - only if tags exist):
   - Label: "Tags"
   - Display: Flex row with gap
   - Each tag: Gray badge (background: gray-200, color: gray-700)
   - Font-size: 0.75rem
   - Padding: 0.25rem 0.75rem
   - Rounded corners

**Field Label Styling:**
- Font-weight: 600
- Color: gray-700
- Margin-bottom: 0.5rem
- Font-size: 0.875rem

### 2. Tabs Card
**Tab Navigation:**
- Checklist tab (default)
- Comments tab
- Files tab
- Activity tab

**Tab Content Area:**
Each tab renders its specific content (see sections below)

---

## 🗂️ Tab 1: Checklist

### Interactive Subtask Management
**Always Visible Section:**

**Section Header:**
- "Checklist" title with tasks icon
- Progress counter: "(X/Y completed)" - updates dynamically

**Checklist Items** (if subtasks exist):
Each subtask displays as interactive row:
- **Checkbox**: Click to toggle completed state
  - ✅ Checked: Subtask marked complete
  - ☐ Unchecked: Subtask still todo
  - Disabled when editing another item
  
- **Subtask Title**: Text label
  - Strikethrough + opacity 0.6 when completed
  - Word-wrap for long titles
  
- **Action Buttons** (visible on hover):
  - 🖊️ Edit icon: Enter inline edit mode
  - 🗑️ Delete icon: Remove subtask (with confirmation)

**Editing Mode** (when edit icon clicked):
- Row gets blue border highlight
- Checkbox disabled
- Title becomes text input (auto-focused)
- Action buttons change to:
  - ✅ Save button (green): Save changes
  - ❌ Cancel button (gray): Discard changes
- **Keyboard shortcuts**:
  - Enter: Save changes
  - Escape: Cancel editing

**Add New Subtask Form** (always at bottom):
- Text input with placeholder "Thêm subtask mới..."
- "Thêm" button (disabled if input empty)
- Dashed border style to indicate addable area
- **Keyboard shortcut**: Enter to add

**Empty State** (if no subtasks):
- Icon: fa-tasks (large, gray)
- Message: "Chưa có subtask nào. Thêm mới để bắt đầu!"
- Still shows add form below

**State Management:**
- All subtask changes dispatch updateTask thunk
- Optimistic updates for immediate feedback
- Subtasks stored in task.subtasks array
- Each subtask has: id, title, completed (boolean)

---

## 💬 Tab 2: Comments

### Comment Thread Display

**Comment List** (scrollable, max-height 500px):
Each comment shows:
- **Avatar**: Colored circle with initials
  - Color generated from author name hash
  - 2-letter initials (first + last name)
  
- **Comment Header**:
  - Author name (bold)
  - Timestamp (relative format: "2h ago", using date-fns)
  
- **Comment Content**:
  - Plain text with preserved line breaks
  - @mentions highlighted in blue
  - URLs auto-linkified (future enhancement)
  
- **Action Buttons**:
  - 💬 Reply: Open reply form (future enhancement)
  - ✏️ Edit: Edit own comments only (future enhancement)

**Scroll Behavior:**
- Auto-scroll to bottom when new comment added
- Infinite scroll/pagination for old comments (future)

### New Comment Form
**Always at bottom (sticky):**
- Large textarea (3-4 rows, expandable)
- Avatar of current user
- Placeholder: "Viết comment..."
- Character counter (future enhancement)
- Formatting toolbar (future enhancement)

**Features:**
- @mention support: Type @ to trigger user autocomplete
- Hint text: "@ để mention người dùng"
- "Gửi Comment" button
  - Disabled if textarea empty
  - Shows loading spinner when submitting

**Submission:**
- POST comment to API
- Optimistic update (add to list immediately)
- Scroll to show new comment
- Clear textarea after success
- Show error toast on failure

**Empty State** (no comments yet):
- Icon: fa-comments (large, gray)
- Message: "Chưa có comment nào"

---

## 📎 Tab 3: Attachments

### Upload Section
**Always at top:**
- Hidden file input (multiple files supported)
- "Tải file lên" button with upload icon
- Info hint: "Hỗ trợ tất cả các loại file. Tối đa 10MB mỗi file."
- Dashed border container

**Upload Behavior:**
- Click button opens file picker
- Support multiple file selection
- Show upload progress bar per file (future)
- Add to list on success
- Show error toast if file too large

### Attachments List

**Display Mode**: Grid or list of file cards

Each attachment card shows:
- **File Icon**: Large icon based on file type
  - 🖼️ Images: fa-file-image (green)
  - 📄 PDF: fa-file-pdf (red)
  - 📘 Word: fa-file-word (blue)
  - 📊 Excel: fa-file-excel (green)
  - 📊 PowerPoint: fa-file-powerpoint (orange)
  - 🗜️ Archives: fa-file-archive (gray)
  - 🎬 Videos: fa-file-video (purple)
  - 🎵 Audio: fa-file-audio (teal)
  - 🎨 Figma: fa-pen-ruler (purple)
  - 📄 Generic: fa-file (gray)

- **File Info**:
  - File name (truncated with ellipsis if too long)
  - File size (formatted: B, KB, MB, GB)
  - Uploaded by (user name)
  - Upload time (relative: "2h ago")

- **Action Buttons**:
  - ⬇️ Download: Download file
  - 🗑️ Delete: Remove attachment (with confirmation)

**Card Styling:**
- Hover effect: slight elevation, border highlight
- Icon color matches file type
- Clean, modern card design

**Empty State** (no attachments):
- Icon: fa-paperclip (large, gray)
- Message: "Chưa có file đính kèm"

---

## 📊 Tab 4: Activity

### Activity Timeline

**Display**: Vertical timeline with markers

Each activity item shows:
- **Timeline Marker**: Colored circle with icon
  - Icon based on activity type
  - Color based on activity type
  - Connected by vertical line

- **Activity Content**:
  - Actor name (bold) + action description
  - Example: "Nguyễn Văn A đã cập nhật tiến độ lên 60%"
  - Timestamp with smart formatting:
    - Today: "HH:mm"
    - Yesterday: "Hôm qua lúc HH:mm"
    - Older: "dd/MM/yyyy HH:mm"

**Activity Types & Colors:**
- 🟢 Created (green, fa-plus-circle)
- 🔵 Assigned (blue, fa-user-tag)
- 🟣 Status Changed (purple, fa-exchange-alt)
- 🔷 Progress Updated (cyan, fa-chart-line)
- 🟠 Priority Changed (orange, fa-flag)
- 🟣 Comment Added (indigo, fa-comment)
- 🟡 Attachment Added (pink, fa-paperclip)
- 🟠 Due Date Changed (orange, fa-calendar)
- 🟢 Subtask Completed (green, fa-check-square)

**Timeline Features:**
- Chronological order (newest first)
- Infinite scroll for older activities (future)
- Filter by activity type (future enhancement)
- Export timeline (future enhancement)

**Empty State** (no activities):
- Icon: fa-history (large, gray)
- Message: "Chưa có hoạt động nào"

---

## � Right Sidebar

### 1. SLA Status Card
**Conditional Display** (only if slaRemaining exists and status !== completed):

**Card Content:**
- **Header**: "Trạng thái SLA" with clock icon
- **Time Display**: Large countdown (e.g., "2h 30m")
- **Label**: "Thời gian còn lại"
- **SLA Badge**: Color-coded status
  - 🟢 Safe: > 4 hours remaining
  - 🟡 Warning: 1-4 hours remaining
  - 🔴 Danger: < 1 hour remaining

### 2. Details Card
**Always Visible:**

**Card Content:**
- **Header**: "Details" with info icon

**Assignment Information:**
- **Chiến lược phân công**: Badge showing assignment strategy
  - Direct Assignment (Chỉ định người): Blue badge
  - Pool Assignment (Pool/Chờ nhận): Purple badge
  - Department Assignment (Phòng ban): Green badge
- **Person Fields** (with avatars):
  - Người tạo: Avatar + name
  - Người thực hiện: Avatar + name (or "Chưa giao" if not assigned)
  - Collaborators (conditional - if support assigned):
    - List of helper avatars + names
    - Max 3 shown, "+ X more" for additional
    - Small tag: "Đang hỗ trợ"
- **Department** (if department assignment):
  - Phòng ban thực hiện: Department name with building icon
- **Divider Line**

**Date Fields**:
  - Ngày tạo: Formatted timestamp (dd MMM, yyyy HH:mm)
  - Cập nhật lần cuối: Formatted timestamp
  - Hạn hoàn thành: Formatted timestamp (due date)
- **Divider Line**

**Time Tracking Fields**:
  - Ước tính: X giờ (estimated hours)
  - Thực tế: X giờ (actual hours)
    - Color: Red if actual > estimated
    - Color: Green if actual ≤ estimated

**Avatar Style:**
- 28px circle
- Auto-generated initials from name
- Primary color background
- White text

### 3. Progress Card
**Conditional Display** (only if status !== completed):

**Card Content:**
- **Header**: "Tiến Độ" with chart icon
- **Progress Display**: Current percentage (e.g., "45%")
- **Progress Slider**: Range input (0-100%)
- **Quick Actions**:
  - "-5%" button
  - "Cập nhật" button (primary)
  - "+5%" button

**Behavior:**
- Slider updates progress value
- Quick buttons adjust by 5%
- "Cập nhật" dispatches updateTask thunk
- Optimistic UI update

### 4. Related Tasks Card
**Always Visible:**

**Card Content:**
- **Header**: "Tasks Liên Quan" with link icon
- **Task List** (if exists):
  - Each task: Badge with ID + title
  - Clickable to navigate to related task
- **Empty State** (no related tasks):
  - Icon: fa-link (gray)
  - Message: "Chưa có task liên quan"

**Future Enhancement:**
- Add related task button
- Remove relationship button
- Filter by relationship type

---

## �🎬 Actions Based on Status & Role

### Status: CREATED (Not Assigned)
**Manager/Creator Actions:**
- ✏️ Edit Task
- 👤 Assign to User
- 🗑️ Delete Task
- 📌 Move to Pool

### Status: ASSIGNED (Not Started)
**Assignee Actions:**
- ▶️ Start Work (changes status to IN_PROGRESS)
- 🔄 Request Reassignment

**Manager Actions:**
- 🔄 Reassign
- ✏️ Edit Task

### Status: IN_PROGRESS
**Assignee Actions:**
- 📊 Update Progress (via slider in sidebar)
- ⏱️ Log Time (future enhancement)
- ✅ Check-off Subtasks (in Checklist tab)
- 💬 Add Comments
- 📎 Upload Attachments
- 🆘 Request Support (opens support request form)
  - Select: Request additional help
  - Describe what support is needed
  - Suggest collaborator (optional)
  - Status changes to SUPPORT_REQUESTED
- 🚀 Submit for Review (if progress >= 90%)
  - Button appears when progress ≥ 90%
  - Status changes to REVIEW
- 🚫 Mark as Blocked
  - Provide reason for blocking
  - Identify blocking dependencies

**Manager Actions:**
- 👁️ Monitor progress
- 💬 Add comments
- 🔄 Reassign
- 🤝 Assign Collaborator (if support requested)
  - View support request details
  - Select team member to help
  - Allocate effort % for collaborator
  - Status changes to COLLAB_ASSIGNED

**Collaborators** (if assigned as helper):
- 💬 View task details and comment
- ✅ Update their portion of work
- 📎 Upload their deliverables
- Cannot submit for review (only primary assignee can)

### Status: SUPPORT_REQUESTED
**Manager/Lead Actions:**
- 🤝 Assign Collaborator
  - Review support request
  - Select qualified helper
  - Changes status to COLLAB_ASSIGNED
- ↩️ Reject Support Request
  - Provide reason
  - Returns to IN_PROGRESS

**Assignee Actions:**
- ✏️ Edit support request details
- ❌ Cancel support request (return to IN_PROGRESS)
- 💬 Add comments to clarify needs

### Status: COLLAB_ASSIGNED
**All collaborators visible in Details Card sidebar.**

**Primary Assignee Actions:**
- Same as IN_PROGRESS
- Coordinate with collaborators via comments
- Submit for review when all work complete

**Collaborators Actions:**
- View full task context
- Update progress in comments
- Upload files
- Notify when their part is done

**Manager Actions:**
- Monitor collaboration
- Add/remove collaborators if needed

### Status: UNDER_REVIEW
**Reviewer Actions:**
- ✅ Approve (changes status to COMPLETED)
- 🔙 Request Changes (back to IN_PROGRESS)
- 💬 Add review comments

**Assignee Actions:**
- 💬 Respond to review comments

### Status: COMPLETED
**Manager Actions:**
- 🔄 Reopen (within 7 days)
- ⭐ Rate Quality
- 💬 Add completion notes

**All Users:**
- 👁️ View only (read-only mode)
- 💬 Add comments (for reference)

---

## 🔧 Technical Implementation

### Component Structure
```
TaskDetailPage/
├── TaskDetailPage.tsx (main container)
├── TaskDetailPage.module.css
└── Uses shared components from src/components/shared/:
    ├── CommentsTab - Generic comments for any entity type
    ├── AttachmentsTab - Generic file management
    └── ActivityTab - Generic activity timeline

Shared Components (src/components/shared/):
├── CommentsTab/
│   ├── CommentsTab.tsx
│   ├── CommentsTab.module.css
│   └── index.ts
├── AttachmentsTab/
│   ├── AttachmentsTab.tsx
│   ├── AttachmentsTab.module.css
│   └── index.ts
└── ActivityTab/
    ├── ActivityTab.tsx
    ├── ActivityTab.module.css
    └── index.ts
```

**Note**: TaskDetailPage uses shared components instead of page-specific tabs. This allows code reuse with TicketDetailPage and future entity detail pages.

### State Management

**Redux Store** (`tasksSlice`):
```typescript
{
  selectedTask: Task | null,
  loading: boolean,
  error: string | null,
  comments: Comment[],
  attachments: Attachment[],
  activities: Activity[]
}
```

**Thunks:**
- `fetchTaskById(taskId)` - Load task details
- `updateTask(taskId, updates)` - Update task fields
- `updateProgress(taskId, progress)` - Update progress
- `updateStatus(taskId, status)` - Change status
- `addComment(taskId, comment)` - Post new comment
- `uploadAttachment(taskId, file)` - Upload file
- `deleteAttachment(taskId, attachmentId)` - Remove file
- `toggleSubtask(taskId, subtaskId)` - Toggle complete
- `addSubtask(taskId, title)` - Add new subtask
- `updateSubtask(taskId, subtaskId, updates)` - Edit subtask
- `deleteSubtask(taskId, subtaskId)` - Remove subtask

### Shared Components Integration

**Why Shared Components?**
- ✅ **Code Reusability**: Single source of truth for Comments/Attachments/Activity UI
- ✅ **Consistency**: Same UX patterns across Tickets, Tasks, and future entities
- ✅ **Maintainability**: Bug fixes and features benefit all entity types
- ✅ **Reduced Duplication**: ~60% less code compared to page-specific components

**CommentsTab Props:**
```typescript
<CommentsTab
  entityId={taskId}
  entityType="task"
  comments={comments}
  onAddComment={handleAddComment}
  onEditComment={handleEditComment}
  onDeleteComment={handleDeleteComment}
/>
```

**AttachmentsTab Props:**
```typescript
<AttachmentsTab
  entityId={taskId}
  entityType="task"
  attachments={attachments}
  onUpload={handleUpload}
  onDownload={handleDownload}
  onDelete={handleDelete}
/>
```

**ActivityTab Props:**
```typescript
<ActivityTab
  entityId={taskId}
  entityType="task"
  activities={activities}
/>
```

**See Also**: [Shared Components Documentation](../implementation/SHARED-COMPONENTS-tabs.md) for full API reference and usage examples.

### API Endpoints

```typescript
GET    /api/tasks/:id                  - Get task details
PUT    /api/tasks/:id                  - Update task
PATCH  /api/tasks/:id/progress        - Update progress
PATCH  /api/tasks/:id/status          - Change status
GET    /api/tasks/:id/comments        - Get comments
POST   /api/tasks/:id/comments        - Add comment
GET    /api/tasks/:id/attachments     - Get attachments
POST   /api/tasks/:id/attachments     - Upload file
DELETE /api/tasks/:id/attachments/:id - Delete file
GET    /api/tasks/:id/activities      - Get activity timeline
PATCH  /api/tasks/:id/subtasks        - Update subtasks array
```

### Data Models

**Task Interface:**
```typescript
interface Task {
  id: UUID;
  ticketNumber: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: UUID;
  assigneeName?: string;
  creatorId: UUID;
  creatorName: string;
  category?: string;
  estimatedHours: number;
  actualHours: number;
  progress: number; // 0-100
  dueDate: string;
  slaRemaining?: number; // minutes
  subtasks?: Subtask[];
  createdAt: string;
  updatedAt: string;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Comment {
  id: UUID;
  taskId: UUID;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface Attachment {
  id: UUID;
  taskId: UUID;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

interface Activity {
  id: UUID;
  taskId: UUID;
  type: ActivityType;
  actor: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

enum ActivityType {
  CREATED = 'created',
  ASSIGNED = 'assigned',
  STATUS_CHANGED = 'status_changed',
  PROGRESS_UPDATED = 'progress_updated',
  PRIORITY_CHANGED = 'priority_changed',
  COMMENT_ADDED = 'comment_added',
  ATTACHMENT_ADDED = 'attachment_added',
  DUE_DATE_CHANGED = 'due_date_changed',
  SUBTASK_COMPLETED = 'subtask_completed',
}
```

---

## 🎨 UI/UX Guidelines

### Visual Design
- Clean, modern card-based layout
- Ample whitespace for readability
- Consistent icon usage (Font Awesome)
- Color-coded priority and status badges
- Smooth transitions and hover effects

### Responsive Design
- Mobile: Single column, stacked sections
- Tablet: 2-column grid where applicable
- Desktop: Full multi-column layout
- Tab navigation scrollable on mobile

### Accessibility
- Proper ARIA labels for all interactive elements
- Keyboard navigation support:
  - Tab through all interactive elements
  - Enter to activate buttons
  - Escape to close modals/cancel editing
- Color contrast ratios meet WCAG AA standards
- Focus indicators visible

### Performance
- Lazy load activity timeline (pagination)
- Optimize avatar/image loading
- Debounce progress slider updates
- Optimistic UI updates for better perceived performance

---

## ✅ Implementation Checklist

### Phase 1: Core Layout & Navigation
- [ ] TaskDetailPage container with routing
- [ ] Header with ID, title, badges
- [ ] Tab navigation component
- [ ] Tab content rendering

### Phase 2: Overview Tab
- [ ] Task information grid
- [ ] SLA status card
- [ ] Description display
- [ ] Progress tracking slider
- [ ] Interactive checklist (CRUD operations)

### Phase 3: Communication Tabs
- [ ] Comments tab with form
- [ ] Attachments tab with upload
- [ ] Activity tab with timeline
- [ ] Real-time updates (future)

### Phase 4: Actions & Permissions
- [ ] Role-based action buttons
- [ ] Status transition logic
- [ ] Permission checks
- [ ] Confirmation dialogs

### Phase 5: Integration & Testing
- [ ] Redux integration
- [ ] API integration
- [ ] Error handling
- [ ] Loading states
- [ ] Mock data for testing
- [ ] Unit tests
- [ ] E2E tests

---

## 📚 Related Resources

**Specs:**
- [03-task-management.md](03-task-management.md) - Parent spec
- [02-ticket-management.md](02-ticket-management.md) - Similar pattern reference
- [10-history-audit.md](10-history-audit.md) - Activity logging
- [07-notifications.md](07-notifications.md) - Comment notifications

**Implementation Plans:**
- [FEAT-006-tasks-list.md](../plans/FEAT-006-tasks-list.md) - Task list + Kanban implementation

**Design Reference:**
- `app/task-detail.html` (if exists)
- `app/ticket-detail.html` (similar pattern)
- `app/css/styles.css` - All styling variables

---

## 🔄 Change Log

**March 26, 2026** - Initial spec creation
- Extracted Task Detail spec from parent task-management.md
- Added comprehensive tab specifications
- Documented interactive checklist management
- Added technical implementation details
- Defined data models and API endpoints
