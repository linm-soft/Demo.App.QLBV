# Implementation Plan: Tickets List Feature

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-001  
**Priority:** High  
**Status:** 🔄 Phase 3 Complete - Phase 4 Next  
**Started:** 2026-03-25  
**Phase 1 Completed:** 2026-03-26 (Basic CRUD)
**Phase 2 Completed:** 2026-03-26 (Triage Workflow)
**Phase 3 Completed:** 2026-03-26 (Help Request System)
**Last Updated:** 2026-03-26  

---

## ⚠️ IMPORTANT: Feature-by-Feature Implementation Required

**Current Status:** Phase 3 (Help Request System) is complete. Now implementing **Phase 4: Status Management**.

This plan has been reorganized to implement complete features one at a time, following the spec workflow:
1. ✅ **Phase 1: Basic List & CRUD** - COMPLETED
2. ✅ **Phase 2: Triage Workflow** - COMPLETED  
3. ✅ **Phase 3: Help Request System** - COMPLETED
4. 🔄 **Phase 4: Status Management** - NEXT
5. ⬜ **Phase 5: Comments & Attachments**
6. ⬜ **Phase 6: Rating System**

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/tickets-list.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Mock Data Guidelines:**
- Create mock data in separate files: `src/mocks/tickets.mock.ts`
- Mock data should match the structure and variety shown in HTML demos
- Include realistic Vietnamese names, departments, and scenarios
- Maintain consistency with data models in `src/models/`

**Verification Status:** ✅ Verified against `app/tickets-list.html` - CSS Updated 2026-03-26

**CSS Alignment Status:** ✅ All styling matched to HTML demo:
- Statistics cards spacing, fonts, and colors updated
- Page layout and background colors corrected
- Form inputs (Input, Select, TextArea) styling matched
- Button sizing and spacing aligned
- Border radius consistently using `var(--radius-xl)` for cards
- File upload area styling updated
- All color variables corrected (removed incorrect `--color-*` prefixes)

---

## 📋 Overview

Complete Support Ticket Management System following the workflow in [02-ticket-management.md](../specs/02-ticket-management.md).

### Phase 1 - Basic List & CRUD ✅ COMPLETED
- ✅ Statistics cards, filters, table, pagination
- ✅ Create/Edit/View slideouts
- ✅ Basic assignment modal
- ✅ SLA badges and status indicators

### Phase 2 - Complete Workflow 🔄 IN PROGRESS
- 🔄 Triage workflow (Accept/Reject/Pending)
- ⬜ Help request system
- ⬜ Status transitions with validations
- ⬜ Comments system
- ⬜ Attachments management
- ⬜ Rating & feedback

---

## 🎯 Acceptance Criteria by Phase

### Phase 1: Basic CRUD ✅ COMPLETED
- [x] List tickets with filtering and pagination
- [x] Create new tickets
- [x] Edit existing tickets  
- [x] View ticket details
- [x] Assign tickets to users
- [x] SLA status display

### Phase 2: Triage Workflow ✅ COMPLETED
- [x] Manager can view SUBMITTED tickets
- [x] Manager can Accept ticket (→ TRIAGED)
- [x] Manager can Reject ticket with reason (→ REJECTED)
- [x] Manager can Request more info (→ PENDING)
- [x] Manager can adjust priority during triage
- [x] User receives notification of triage decision
- [x] Rejected tickets show rejection reason

### Phase 3: Help Request System ✅ COMPLETED
- [x] Staff can request help (→ HELP_REQUESTED)
- [x] Manager can assign helper (→ SUPPORT_ASSIGNED)
- [x] Multiple helpers can be assigned
- [x] Helpers can view and comment on ticket
- [x] Primary assignee retains ownership
- [x] Activity log tracks help requests

### Phase 4: Status Management ⬜ NOT STARTED
- [ ] Valid status transitions enforced
- [ ] Staff can start work (ASSIGNED → IN_PROGRESS)
- [ ] Staff can mark blocked with reason
- [ ] Staff can mark resolved with solution
- [ ] Manager/User can approve resolution (→ APPROVED)
- [ ] Manager/User can reopen ticket (→ REOPENED)
- [ ] Status change notifications sent

### Phase 5: Comments & Attachments ⬜ NOT STARTED
- [ ] Add comments to tickets
- [ ] Internal vs external comments
- [ ] Upload attachments (images, files)
- [ ] View attachment preview
- [ ] Download attachments
- [ ] Comment notifications

### Phase 6: Rating System ⬜ NOT STARTED
- [ ] Rate closed tickets (1-5 stars)
- [ ] Provide feedback text
- [ ] Rating triggers final closure
- [ ] View rating in ticket history
- [ ] Staff can see their average rating

---

## 📦 Components by Phase

---

## PHASE 1: BASIC LIST & CRUD ✅ COMPLETED

All Phase 1 components completed and tested.

### 1. **TicketStatsCards** ✅ COMPLETED (25 min)
**Path:** `src/pages/TicketsListPage/components/TicketStatsCards/`

### 2. **TicketFilters** ✅ COMPLETED (20 min)  
**Path:** `src/pages/TicketsListPage/components/TicketFilters/`

### 3. **TicketTable** ✅ COMPLETED (3 hours)
**Path:** `src/pages/TicketsListPage/components/TicketTable/`
Includes: TicketTableRow, responsive cards, sorting

### 4. **SLABadge** ✅ COMPLETED (15 min)
**Path:** `src/components/common/SLABadge/`

### 5. **CreateTicketForm** ✅ COMPLETED (2 hours)
**Path:** `src/pages/TicketsListPage/components/CreateTicketForm/`

### 6. **EditTicketForm** ✅ COMPLETED (1.5 hours)
**Path:** `src/pages/TicketsListPage/components/EditTicketForm/`

### 7. **TicketDetailSlideout** ✅ COMPLETED (2 hours)
**Path:** `src/pages/TicketsListPage/components/TicketDetailSlideout/`
**Note:** Basic version completed. Needs enhancement for Phase 5 (comments/attachments).

### 8. **AssignTicketModal** ✅ COMPLETED (Bonus) - MOVED TO SHARED
**Path:** `src/components/tickets/AssignTicketModal/`
**Note:** Moved to shared location for reuse across pages (TicketsListPage, TicketDetailPage)

### 9. **FileUploadArea** ✅ COMPLETED (Bonus)
**Path:** `src/components/common/FileUploadArea/`
**Note:** UI ready, backend integration pending.

### 10. **Pagination** ✅ COMPLETED (1 hour)
**Path:** `src/components/common/Pagination/`

### 11. **Modal** ✅ COMPLETED (Bonus)
**Path:** `src/components/common/Modal/`

### 12. **Checkbox** ✅ COMPLETED (Bonus)
**Path:** `src/components/common/Checkbox/`

**Phase 1 Total:** 12 components, ~15 hours actual time

---

## PHASE 2: TRIAGE WORKFLOW ✅ COMPLETED

All Phase 2 components completed and tested.

### 13. **TriageTicketModal** ✅ COMPLETED (2 hours) - MOVED TO SHARED
**Path:** `src/components/tickets/TriageTicketModal/`
**Note:** Moved to shared location for reuse across pages (TicketsListPage, TicketDetailPage)  
**Priority:** HIGH
**Props:**
```typescript
interface TriageTicketModalProps {
  ticketId: UUID;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
```
**Features:**
- Display ticket summary (title, description, creator, priority)
- Three action buttons: Accept, Reject, Request Info
- Priority adjustment dropdown (Critical/High/Medium/Low)
- Reason textarea (required for Reject and Request Info)
- Form validation
- Connects to Redux `triageTicket` thunk

**Redux Actions Needed:**
```typescript
// Added to ticketsSlice.ts ✅
export const triageTicket = createAsyncThunk(
  'tickets/triageTicket',
  async ({ 
    ticketId, 
    action, // 'accept' | 'reject' | 'request_info'
    priority, 
    reason 
  }: TriageRequest) => {
    const response = await ticketService.triageTicket(ticketId, action, priority, reason);
    return response;
  }
);
```

**API Method Needed:**
```typescript
// Added to ticketService.ts ✅
async triageTicket(
  ticketId: string, 
  action: 'accept' | 'reject' | 'request_info',
  priority?: string,
  reason?: string
): Promise<Ticket> {
  return apiClient.patch<Ticket>(`/tickets/${ticketId}/triage`, {
    action,
    priority,
    reason
  });
}
```

**Status:** ✅ COMPLETED  
**Estimated:** 2 hours  
**Actual:** 2 hours

---

### 14. **StatusBadge Component** ✅ COMPLETED (30 min)
**Path:** `src/components/common/StatusBadge/`  
**Priority:** HIGH

**Added complete status badge component with:**
- All new status labels (SUBMITTED, PENDING, TRIAGED, REJECTED, ASSIGNED, etc.)
- Color scheme for each status
- Compact mode support
- Consistent styling with SLABadge

**Status:** ✅ COMPLETED  
**Estimated:** 30 minutes
**Actual:** 30 minutes

---

### 15. **Ticket Utilities** ✅ COMPLETED (30 min)
**Path:** `src/utils/ticketUtils.ts`  
**Priority:** HIGH

**Created shared utility functions:**
- `getStatusLabel()` - Get Vietnamese labels for all statuses
- `getStatusClassName()` - Get CSS class names
- `VALID_STATUS_TRANSITIONS` - Status workflow validation map
- `isValidStatusTransition()` - Validate status changes

**Status:** ✅ COMPLETED  
**Estimated:** 30 minutes
**Actual:** 30 minutes

---

### 16. **TicketDetailSlideout - Triage Actions** ✅ COMPLETED (1 hour)
**Path:** Updated `src/pages/TicketsListPage/components/TicketDetailSlideout/`  
**Priority:** MEDIUM

**Added triage action integration:**
- "Phân Loại" button for managers
- Show button only when status is SUBMITTED or PENDING
- Connected to TriageTicketModal
- Updated to use new StatusBadge component
- Removed duplicate getStatusLabel function (now uses utility)

**Status:** ✅ COMPLETED  
**Estimated:** 1 hour  
**Actual:** 1 hour

---

**Phase 2 Total:** 4 components/enhancements, ~3.5 hours estimated, ~3.5 hours actual

---

## PHASE 3: HELP REQUEST SYSTEM ✅ COMPLETED

All Phase 3 components completed and tested.

### 16. **RequestHelpModal** ✅ COMPLETED (2 hours)
**Path:** `src/pages/TicketsListPage/components/RequestHelpModal/`  
**Priority:** MEDIUM

**Features Implemented:**
- Modal for staff to request help on IN_PROGRESS tickets
- Text area for describing help needed
- Form validation and error handling
- Connected to Redux `requestHelp` thunk
- Updates ticket status to HELP_REQUESTED

**Status:** ✅ COMPLETED  
**Estimated:** 2 hours  
**Actual:** 2 hours

---

### 17. **AssignHelperModal** ✅ COMPLETED (2.5 hours)
**Path:** `src/pages/TicketsListPage/components/AssignHelperModal/`  
**Priority:** MEDIUM

**Features Implemented:**
- Manager can assign multiple helpers to ticket
- User search/filter by name, department, or skills
- Shows currently assigned helpers with remove option
- Prevents assigning primary assignee as helper
- Connected to Redux `assignHelper` and `removeHelper` thunks

**Status:** ✅ COMPLETED  
**Estimated:** 2.5 hours  
**Actual:** 2.5 hours

---

### 18. **TicketHelpersDisplay** ✅ COMPLETED (1.5 hours)
**Path:** `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketHelpersDisplay.tsx`  
**Priority:** LOW

**Features Implemented:**
- Displays list of assigned helpers with avatars
- Shows help request description and timestamp
- Manager can remove helpers with confirmation
- Responsive design for mobile/tablet

**Status:** ✅ COMPLETED  
**Estimated:** 1.5 hours  
**Actual:** 1.5 hours

---

### 19. **TicketDetailSlideout - Help Request Actions** ✅ COMPLETED (1 hour)  
**Path:** Updated `src/pages/TicketsListPage/components/TicketDetailSlideout/`  
**Priority:** MEDIUM

**Updates Made:**
- Added "Yêu Cầu Hỗ Trợ" button for staff (shows when status = IN_PROGRESS)
- Added "Chỉ Định Hỗ Trợ" button for managers (shows when status = HELP_REQUESTED)
- Integrated TicketHelpersDisplay component
- Connected all modals and handlers
- Updated imports for new Redux thunks (requestHelp, assignHelper, removeHelper)

**Status:** ✅ COMPLETED  
**Estimated:** 1 hour  
**Actual:** 1 hour

---

**Phase 3 Total:** 4 components/enhancements, ~7 hours estimated, ~7 hours actual

**Mock Data Added:**
- **TKT-HELP-001**: Ticket với HELP_REQUESTED status - Cài đặt mạng (chờ assign helper)
- **TKT-HELP-002**: Ticket với SUPPORT_ASSIGNED status - Bảo trì điều hòa (2 helpers)
- **TKT-HELP-003**: Ticket với HELP_REQUESTED status - Nâng cấp server (chờ assign)
- **TKT-HELP-004**: Ticket với SUPPORT_ASSIGNED status (Emergency) - Sửa thông gió (2 helpers)
- **TKT-HELP-005**: Ticket với HELP_REQUESTED status - Lắp camera (chờ 2-3 helpers)
- **TKT-HELP-006**: Ticket với SUPPORT_ASSIGNED status - Bảo trì máy phát (1 helper)
- **TKT-HELP-007**: Ticket với SUPPORT_ASSIGNED status - Di chuyển thiết bị (3 helpers)

**Các trường hợp test:**
- ✅ Help request chờ assignment (HELP_REQUESTED)
- ✅ Help đã được assigned với 1 helper
- ✅ Help đã được assigned với 2 helpers
- ✅ Help đã được assigned với 3+ helpers
- ✅ Help request khẩn cấp (Priority: Emergency)
- ✅ Help request các mức độ ưu tiên khác nhau
- ✅ Các department khác nhau (IT, Kỹ thuật, Cơ sở)
- ✅ Help descriptions chi tiết và ngắn gọn

**Redux & Services Updated:**
- `ticketsSlice.ts`: Added `requestHelp`, `assignHelper`, `removeHelper` thunks  
- `ticketService.ts`: Added `requestHelp()`, `assignHelper()`, `removeHelper()` methods
- All methods support both mock and API modes

**Model Updates:**
- `Ticket.ts`: Added `helpRequestDescription`, `helpRequestedAt`, `helpers[]` fields
- Added `TicketHelper` interface with assignment tracking

---

## PHASE 4: STATUS MANAGEMENT ⬜ NOT STARTED

### 20. **UpdateStatusModal** ⬜ NOT STARTED
**Path:** `src/pages/TicketsListPage/components/RequestHelpModal/`  
**Priority:** MEDIUM
**Props:**
```typescript
interface RequestHelpModalProps {
  ticketId: UUID;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
```
**Features:**
- Display current ticket info
- Textarea: Describe what help is needed
- Optional: Suggest a helper (user autocomplete)
- Submit button
- Connects to Redux `requestHelp` thunk

**Redux Actions Needed:**
```typescript
export const requestHelp = createAsyncThunk(
  'tickets/requestHelp',
  async ({ ticketId, description, suggestedHelperId }: RequestHelpData) => {
    const response = await ticketService.requestHelp(ticketId, description, suggestedHelperId);
    return response;
  }
);
```

**API Method Needed:**
```typescript
async requestHelp(ticketId: string, description: string, suggestedHelperId?: string): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/request-help`, {
    description,
    suggestedHelperId
  });
}
```

**Status:** ⬜ Not Started  
**Estimated:** 2 hours

---

### 17. **AssignHelperModal** ⬜ NOT STARTED
**Path:** `src/pages/TicketsListPage/components/AssignHelperModal/`  
**Priority:** MEDIUM
**Props:**
```typescript
interface AssignHelperModalProps {
  ticketId: UUID;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
```
**Features:**
- Display ticket info and help request description
- User search/select dropdown (filtered by department)
- Can assign multiple helpers
- List currently assigned helpers with remove option
- Submit button
- Connects to Redux `assignHelper` thunk

**Redux Actions Needed:**
```typescript
export const assignHelper = createAsyncThunk(
  'tickets/assignHelper',
  async ({ ticketId, helperId }: { ticketId: UUID; helperId: UUID }) => {
    const response = await ticketService.assignHelper(ticketId, helperId);
    return response;
  }
);

export const removeHelper = createAsyncThunk(
  'tickets/removeHelper',
  async ({ ticketId, helperId }: { ticketId: UUID; helperId: UUID }) => {
    const response = await ticketService.removeHelper(ticketId, helperId);
    return response;
  }
);
```

**API Methods Needed:**
```typescript
async assignHelper(ticketId: string, helperId: string): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/assign-helper`, { helperId });
}

async removeHelper(ticketId: string, helperId: string): Promise<Ticket> {
  return apiClient.delete<Ticket>(`/tickets/${ticketId}/helpers/${helperId}`);
}
```

**Status:** ⬜ Not Started  
**Estimated:** 2.5 hours

---

### 18. **TicketHelpersDisplay** ⬜ NOT STARTED
**Path:** `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketHelpersDisplay.tsx`  
**Priority:** LOW

**Features:**
- Display list of assigned helpers with avatars
- Show primary assignee vs helpers
- Allow manager to remove helpers
- Show help request description

**Status:** ⬜ Not Started  
**Estimated:** 1.5 hours

---

### 19. **TicketDetailSlideout - Help Request Actions** ⬜ NOT STARTED  
**Path:** Update `src/pages/TicketsListPage/components/TicketDetailSlideout/`  
**Priority:** MEDIUM

**Add action buttons:**
- Staff (primary assignee): "Request Help" button when status is IN_PROGRESS
- Manager: "Assign Helper" button when status is HELP_REQUESTED
- Display helpers list using TicketHelpersDisplay

**Status:** ⬜ Not Started  
**Estimated:** 1 hour  
**Dependencies:** RequestHelpModal, AssignHelperModal, TicketHelpersDisplay

---

**Phase 3 Total:** 4 components/enhancements, ~7 hours estimated

---

## PHASE 4: STATUS MANAGEMENT ⬜ NOT STARTED

### 20. **UpdateStatusModal** ⬜ NOT STARTED
**Path:** `src/pages/TicketsListPage/components/UpdateStatusModal/`  
**Priority:** HIGH
**Props:**
```typescript
interface UpdateStatusModalProps {
  ticketId: UUID;
  currentStatus: TicketStatus;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
```
**Features:**
- Show current status
- Dropdown with valid next statuses (based on workflow rules)
- Comment/reason textarea (required for some transitions)
- Solution description textarea (required for RESOLVED status)
- Validation of status transitions
- Connects to Redux `updateTicketStatus` thunk

**Valid Transitions Map:**
```typescript
const validTransitions: Record<TicketStatus, TicketStatus[]> = {
  SUBMITTED: [TRIAGED, REJECTED, PENDING],
  PENDING: [TRIAGED],
  TRIAGED: [ASSIGNED],
  ASSIGNED: [IN_PROGRESS],
  IN_PROGRESS: [BLOCKED, HELP_REQUESTED, RESOLVED],
  HELP_REQUESTED: [SUPPORT_ASSIGNED],
  SUPPORT_ASSIGNED: [IN_PROGRESS],
  BLOCKED: [IN_PROGRESS],
  RESOLVED: [APPROVED, REOPENED],
  APPROVED: [CLOSED], // After rating
  REOPENED: [IN_PROGRESS],
  CLOSED: [], // Final state
  REJECTED: [], // Final state
};
```

**Redux Actions Needed:**
```typescript
export const updateTicketStatus = createAsyncThunk(
  'tickets/updateStatus',
  async ({ 
    ticketId, 
    status, 
    comment, 
    solution 
  }: UpdateStatusRequest) => {
    const response = await ticketService.updateTicketStatus(ticketId, status, comment, solution);
    return response;
  }
);
```

**API Method Already Exists** but needs enhancement:
```typescript
async updateTicketStatus(
  ticketId: string, 
  status: string, 
  comment?: string,
  solution?: string
): Promise<Ticket> {
  return apiClient.patch<Ticket>(`/tickets/${ticketId}/status`, {
    status,
    comment,
    solution
  });
}
```

**Status:** ⬜ Not Started  
**Estimated:** 2.5 hours

---

### 21. **TicketDetailSlideout - Status Actions** ⬜ NOT STARTED
**Path:** Update `src/pages/TicketsListPage/components/TicketDetailSlideout/`  
**Priority:** HIGH

**Add dynamic action buttons based on:**
- User role (Staff vs Manager)
- Current ticket status
- User relationship to ticket (primary assignee, helper, manager, creator)

**Examples:**
- ASSIGNED + isPrimaryAssignee → "Start Working" (→ IN_PROGRESS)
- IN_PROGRESS + isPrimaryAssignee → "Mark Blocked", "Mark Resolved"
- RESOLVED + isManager → "Approve", "Reopen"
- APPROVED + isCreator → Show rating prompt

**Status:** ⬜ Not Started  
**Estimated:** 2 hours  
**Dependencies:** UpdateStatusModal

---

**Phase 4 Total:** 2 components/enhancements, ~4.5 hours estimated

---

## PHASE 5: COMMENTS & ATTACHMENTS ⬜ NOT STARTED

### 22. **TicketCommentsSection** ⬜ NOT STARTED
**Path:** `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketCommentsSection.tsx`  
**Priority:** HIGH
**Props:**
```typescript
interface TicketCommentsSectionProps {
  ticketId: UUID;
  comments: TicketComment[];
  onAddComment: (content: string, isInternal: boolean) => void;
}
```
**Features:**
- Display list of comments with user avatar, name, timestamp
- Distinguish internal vs external comments (styling difference)
- Add comment form (textarea + submit)
- Internal/External toggle (for staff/managers only)
- Real-time comment addition
- Expand/collapse long comments

**Redux Actions Needed:**
```typescript
export const addTicketComment = createAsyncThunk(
  'tickets/addComment',
  async ({ ticketId, content, isInternal }: AddCommentRequest) => {
    const response = await ticketService.addComment(ticketId, content, isInternal);
    return response;
  }
);

export const fetchTicketComments = createAsyncThunk(
  'tickets/fetchComments',
  async (ticketId: UUID) => {
    const response = await ticketService.getComments(ticketId);
    return response;
  }
);
```

**API Methods Needed:**
```typescript
async addComment(ticketId: string, content: string, isInternal: boolean): Promise<TicketComment> {
  return apiClient.post<TicketComment>(`/tickets/${ticketId}/comments`, {
    content,
    isInternal
  });
}

async getComments(ticketId: string): Promise<TicketComment[]> {
  return apiClient.get<TicketComment[]>(`/tickets/${ticketId}/comments`);
}
```

**Status:** ⬜ Not Started  
**Estimated:** 2.5 hours

---

### 23. **TicketAttachmentsSection** ⬜ NOT STARTED
**Path:** `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketAttachmentsSection.tsx`  
**Priority:** MEDIUM
**Props:**
```typescript
interface TicketAttachmentsSectionProps {
  ticketId: UUID;
  attachments: TicketAttachment[];
  onUpload: (files: File[]) => void;
  onDelete: (attachmentId: UUID) => void;
}
```
**Features:**
- Display grid of attachments (thumbnails for images, icons for files)
- Click to view/download
- Image preview modal
- File size and type info
- Upload button (uses FileUploadArea)
- Delete attachment (with confirmation)

**Redux Actions Needed:**
```typescript
export const uploadTicketAttachment = createAsyncThunk(
  'tickets/uploadAttachment',
  async ({ ticketId, file }: { ticketId: UUID; file: File }) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await ticketService.uploadAttachment(ticketId, formData);
    return response;
  }
);

export const deleteTicketAttachment = createAsyncThunk(
  'tickets/deleteAttachment',
  async ({ ticketId, attachmentId }: { ticketId: UUID; attachmentId: UUID }) => {
    await ticketService.deleteAttachment(ticketId, attachmentId);
    return attachmentId;
  }
);
```

**API Methods Needed:**
```typescript
async uploadAttachment(ticketId: string, formData: FormData): Promise<TicketAttachment> {
  return apiClient.post<TicketAttachment>(`/tickets/${ticketId}/attachments`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

async deleteAttachment(ticketId: string, attachmentId: string): Promise<void> {
  return apiClient.delete<void>(`/tickets/${ticketId}/attachments/${attachmentId}`);
}

async downloadAttachment(ticketId: string, attachmentId: string): Promise<Blob> {
  return apiClient.get<Blob>(`/tickets/${ticketId}/attachments/${attachmentId}/download`, {
    responseType: 'blob'
  });
}
```

**Status:** ⬜ Not Started  
**Estimated:** 3 hours

---

### 24. **ImagePreviewModal** ⬜ NOT STARTED
**Path:** `src/components/common/ImagePreviewModal/`  
**Priority:** LOW

**Features:**
- Full-screen image viewer
- Previous/Next navigation for multiple images
- Zoom in/out
- Download button
- Close button

**Status:** ⬜ Not Started  
**Estimated:** 1.5 hours

---

### 25. **TicketDetailSlideout - Comments & Attachments Integration** ⬜ NOT STARTED
**Path:** Update `src/pages/TicketsListPage/components/TicketDetailSlideout/`  
**Priority:** HIGH

**Replace placeholders with:**
- TicketCommentsSection component
- TicketAttachmentsSection component
- Load comments and attachments when opening slideout

**Status:** ⬜ Not Started  
**Estimated:** 1 hour  
**Dependencies:** TicketCommentsSection, TicketAttachmentsSection

---

**Phase 5 Total:** 4 components/enhancements, ~8 hours estimated

---

## PHASE 6: RATING SYSTEM ⬜ NOT STARTED

### 26. **TicketRatingModal** ⬜ NOT STARTED
**Path:** `src/pages/TicketsListPage/components/TicketRatingModal/`  
**Priority:** MEDIUM
**Props:**
```typescript
interface TicketRatingModalProps {
  ticketId: UUID;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
```
**Features:**
- Display ticket summary (number, title, assignee)
- 5-star rating selector (required)
- Feedback textarea (optional)
- Submit button
- Thank you message after submission
- Connects to Redux `rateTicket` thunk

**Redux Actions Needed:**
```typescript
export const rateTicket = createAsyncThunk(
  'tickets/rateTicket',
  async ({ ticketId, rating, feedback }: RateTicketRequest) => {
    const response = await ticketService.rateTicket(ticketId, rating, feedback);
    return response;
  }
);
```

**API Method Needed:**
```typescript
async rateTicket(ticketId: string, rating: number, feedback?: string): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/rate`, {
    rating,
    feedback
  });
}
```

**Status:** ⬜ Not Started  
**Estimated:** 2 hours

---

### 27. **StarRating Component** ⬜ NOT STARTED
**Path:** `src/components/common/StarRating/`  
**Priority:** LOW

**Features:**
- Interactive star selector (hover preview)
- Display-only mode for showing existing ratings
- Half-star support
- Customizable size and color

**Status:** ⬜ Not Started  
**Estimated:** 1 hour

---

### 28. **TicketDetailSlideout - Rating Display & Prompt** ⬜ NOT STARTED
**Path:** Update `src/pages/TicketsListPage/components/TicketDetailSlideout/`  
**Priority:** MEDIUM

**Add features:**
- Show rating and feedback if ticket is rated
- Prompt creator to rate when status changes to APPROVED
- Auto-open TicketRatingModal for APPROVED tickets (if not rated yet)
- Display rating in activity timeline

**Status:** ⬜ Not Started  
**Estimated:** 1.5 hours  
**Dependencies:** TicketRatingModal, StarRating

---

**Phase 6 Total:** 3 components/enhancements, ~4.5 hours estimated

---

## 📦 Summary: Component Status

### Completed (Phase 1 & 2): 16 components ✅
- **Phase 1:** TicketStatsCards, TicketFilters, TicketTable, TicketTableRow, SLABadge, CreateTicketForm, EditTicketForm, TicketDetailSlideout (basic), AssignTicketModal, FileUploadArea, Pagination, Modal, Checkbox
- **Phase 2:** TriageTicketModal, StatusBadge, Ticket Utilities, TicketDetailSlideout (triage integration)

### To Implement: 13 new components/enhancements ⬜
- **Phase 3:** RequestHelpModal, AssignHelperModal, HelpersDisplay, Help actions  
- **Phase 4:** UpdateStatusModal, Status actions
- **Phase 5:** CommentsSection, AttachmentsSection, ImagePreviewModal, Integration
- **Phase 6:** RatingModal, StarRating, Rating integration

**Total Components:** 29 components
**Total Estimated Time:** ~26.5 hours remaining

---

### 4. **TicketTableRow** ⬜ Not Started
**Path:** `src/pages/TicketsListPage/components/TicketTable/TicketTableRow.tsx`  
**Props:**
```typescript
interface TicketTableRowProps {
  ticket: Ticket;
  onView: (id: UUID) => void;
  onEdit: (id: UUID) => void;
  onAssign: (id: UUID) => void;
}
```
**Features:**
- Displays single ticket row
- Click handler for detail view
- Conditional action buttons

**Status:** ⬜ Not Started  
**Estimated:** 1 hour  
**Actual:** ___ minutes

---

### 5. **SLABadge** ✅ COMPLETED
**Path:** `src/components/common/SLABadge/`  
**Props:**
```typescript
interface SLABadgeProps {
  status: 'danger' | 'warning' | 'safe' | 'breached';
  timeRemaining: string;
}
```
**Features:**
- Color-coded badge (red=danger, yellow=warning, green=safe, dark=breached)
- Displays time remaining
- Pulse animation for danger status
- Helper functions (formatSLATime, getSLAStatus)

**Status:** ✅ COMPLETED  
**Estimated:** 30 minutes  
**Actual:** 15 minutes

---

### 6. **CreateTicketForm** ✅ COMPLETED
**Path:** `src/pages/TicketsListPage/components/CreateTicketForm/`  
**Props:**
```typescript
interface CreateTicketFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}
```
**Features:**
- Title input (required)
- Description textarea (required)
- Priority select (required)
- Type select (required)
- Department select
- Location input
- File upload area (drag & drop + click)
- Urgent notification checkbox
- Form validation
- Redux-connected (form state in UI slice)
- Submit dispatches createTicket async thunk

**Fields:**
- `title`: string (required)
- `description`: string (required)
- `priority`: enum (required)
- `type`: enum (required)
- `departmentId`: UUID
- `location`: string
- `files`: File[]
- `urgent`: boolean

**Status:** ⬜ Not Started  
**Estimated:** 2 hours  
**Actual:** ___ minutes

---

### 7. **EditTicketForm** ✅ COMPLETED - MOVED TO SHARED
**Path:** `src/components/tickets/EditTicketForm/`
**Note:** Moved to shared location for reuse across pages (TicketsListPage, TicketDetailPage)  
**Props:**
```typescript
interface EditTicketFormProps {
  ticketId: UUID;
  onSuccess: () => void;
  onCancel: () => void;
}
```
**Features:**
- Same fields as CreateTicketForm
- Pre-filled with existing ticket data
- Fetches ticket data on mount
- Updates ticket on submit
- Redux-connected (form state in UI slice)

**Status:** ⬜ Not Started  
**Estimated:** 1.5 hours  
**Actual:** ___ minutes

---

### 8. **TicketDetailSlideout** ⬜ Not Started
**Path:** `src/pages/TicketsListPage/components/TicketDetailSlideout/`  
**Props:**
```typescript
interface TicketDetailSlideoutProps {
  ticketId: UUID;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}
```
**Features:**
- Displays all ticket information
- Shows creator, assignee, timestamps
- Displays priority, status, SLA
- Shows description and attachments
- Activity timeline/history
- Edit button (opens edit slideout)
- Assign button (for managers)
- Fetches ticket detail on open

**Status:** ⬜ Not Started  
**Estimated:** 2 hours  
**Actual:** ___ minutes

---

### 9. **FileUploadArea** ⬜ Not Started
**Path:** `src/components/common/FileUploadArea/`  
**Props:**
```typescript
interface FileUploadAreaProps {
  value: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
}
```
**Features:**
- Drag and drop support
- Click to upload
- File list display
- Remove file button
- File size/type validation
- Preview for images

**Status:** ⬜ Not Started  
**Estimated:** 1.5 hours  
**Actual:** ___ minutes

---

### 10. **Pagination** ✅ COMPLETED
**Path:** `src/components/common/Pagination/`  
**Props:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount?: number;
  pageSize?: number;
}
```
**Features:**
- Previous/Next buttons
- Page number buttons (show 1, 2, 3, ... last)
- Ellipsis for many pages
- Disabled state for edges
- Shows "Showing X-Y of Z items"
- Responsive (hides text labels on mobile)

**Status:** ✅ COMPLETED  
**Estimated:** 1 hour  
**Actual:** 25 minutes

---

## 🔄 Redux Integration

### Current State Structure (Phase 1)
```typescript
// ticketsSlice state
{
  items: Ticket[];
  selectedTicket: Ticket | null;
  filters: TicketFilters;
  loading: boolean;
  error: string | null;
  stats: { total, submitted, inProgress, resolved, closed };
  pagination: { page, pageSize, totalCount };
}
```

### Missing Redux Actions (To Add)

**Phase 2: Triage** 
- [ ] `triageTicket(ticketId, action, priority, reason)` - Triage ticket workflow

**Phase 3: Help Request**
- [ ] `requestHelp(ticketId, description, suggestedHelperId)` - Request help
- [ ] `assignHelper(ticketId, helperId)` - Assign helper
- [ ] `removeHelper(ticketId, helperId)` - Remove helper

**Phase 4: Status Management**
- [ ] `updateTicketStatus(ticketId, status, comment, solution)` - Update status with validation

**Phase 5: Comments & Attachments**
- [ ] `addTicketComment(ticketId, content, isInternal)` - Add comment
- [ ] `fetchTicketComments(ticketId)` - Get comments list
- [ ] `uploadTicketAttachment(ticketId, file)` - Upload attachment
- [ ] `deleteTicketAttachment(ticketId, attachmentId)` - Delete attachment
- [ ] `downloadTicketAttachment(ticketId, attachmentId)` - Download attachment

**Phase 6: Rating**
- [ ] `rateTicket(ticketId, rating, feedback)` - Rate closed ticket

### Currently Implemented Actions ✅
- ✅ `fetchTickets(filters)` - Fetch paginated tickets
- ✅ `fetchTicketById(id)` - Fetch single ticket
- ✅ `createTicket(data)` - Create new ticket
- ✅ `updateTicket(id, data)` - Update ticket
- ✅ `deleteTicket(id)` - Delete ticket
- ✅ `fetchTicketStats()` - Fetch statistics
- ✅ `assignTicket(ticketId, userId)` - Assign ticket
- ✅ `setFilters(filters)` - Update filters
- ✅ `setPage(page)` - Update pagination

---

## 🗄️ Data Model Updates Required

### Current Ticket Model (Incomplete)
```typescript
interface Ticket {
  id: UUID;
  title: string;
  description: string;
  priority: 'emergency' | 'high' | 'medium' | 'low';
  status: 'new' | 'in_progress' | 'resolved' | 'closed'; // ❌ Missing statuses
  departmentId: UUID;
  departmentName: string;
  assigneeId: UUID | null;
  assigneeName: string | null;
  createdById: UUID;
  createdByName: string;
  dueDate: Date;
  sla: SLAInfo;
  tags: string[];
  attachmentCount: number; // ❌ Should be attachments: Attachment[]
  commentCount: number; // ❌ Should be comments: Comment[]
  createdAt: Date;
  updatedAt: Date;
}
```

### Updated Ticket Model (Required for Full Workflow)
```typescript
export interface Ticket extends Timestamps {
  // Basic Info
  id: UUID;
  ticketNumber: string; // ⚠️ ADD: "TKT-YYYYMMDD-XXXX"
  title: string;
  description: string;
  
  // Classification
  priority: TicketPriority;
  status: TicketStatus; // ⚠️ UPDATE: Add all statuses
  category: TicketCategory; // ⚠️ ADD: technical/administrative/clinical/other
  
  // Assignment
  departmentId: UUID;
  departmentName: string;
  assigneeId: UUID | null;
  assigneeName: string | null;
  assignedAt: Date | null; // ⚠️ ADD
  helpers: TicketHelper[]; // ⚠️ ADD: Array of helpers
  
  // Creator Info
  createdById: UUID;
  createdByName: string;
  
  // Lifecycle Timestamps
  submittedAt: Date; // ⚠️ ADD
  triagedAt: Date | null; // ⚠️ ADD
  startedAt: Date | null; // ⚠️ ADD: When work began
  resolvedAt: Date | null; // ⚠️ ADD
  resolvedById: UUID | null; // ⚠️ ADD
  approvedAt: Date | null; // ⚠️ ADD
  closedAt: Date | null; // ⚠️ ADD
  closedById: UUID | null; // ⚠️ ADD
  
  // SLA
  dueDate: Date;
  sla: SLAInfo;
  
  // Triage Info
  rejectionReason: string | null; // ⚠️ ADD
  pendingReason: string | null; // ⚠️ ADD
  helpRequestDescription: string | null; // ⚠️ ADD
  
  // Resolution
  solution: string | null; // ⚠️ ADD: Solution description
  
  // Rating
  rating: TicketRating | null; // ⚠️ ADD
  
  // Related Data
  tags: string[];
  comments: TicketComment[]; // ⚠️ CHANGE from commentCount
  attachments: TicketAttachment[]; // ⚠️ CHANGE from attachmentCount
  activityLogs: ActivityLog[]; // ⚠️ ADD
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export enum TicketStatus {
  SUBMITTED = 'submitted',       // ⚠️ ADD: New ticket submitted
  PENDING = 'pending',           // ⚠️ ADD: Waiting for more info
  TRIAGED = 'triaged',           // ⚠️ ADD: Approved by manager
  REJECTED = 'rejected',         // ⚠️ ADD: Rejected by manager
  ASSIGNED = 'assigned',         // ⚠️ ADD: Assigned to staff
  IN_PROGRESS = 'in_progress',   // ✅ EXISTS
  HELP_REQUESTED = 'help_requested', // ⚠️ ADD: Staff requested help
  SUPPORT_ASSIGNED = 'support_assigned', // ⚠️ ADD: Helper assigned
  BLOCKED = 'blocked',           // ⚠️ ADD: Ticket is blocked
  RESOLVED = 'resolved',         // ✅ EXISTS
  APPROVED = 'approved',         // ⚠️ ADD: Resolution approved
  REOPENED = 'reopened',         // ⚠️ ADD: Reopened after resolved
  CLOSED = 'closed',             // ✅ EXISTS
}

export enum TicketCategory { // ⚠️ ADD
  TECHNICAL = 'technical',
  ADMINISTRATIVE = 'administrative',
  CLINICAL = 'clinical',
  OTHER = 'other',
}

export interface TicketHelper { // ⚠️ ADD
  userId: UUID;
  userName: string;
  userAvatar: string;
  assignedAt: Date;
  assignedBy: UUID;
}

export interface TicketComment { // ⚠️ ADD
  id: UUID;
  ticketId: UUID;
  userId: UUID;
  userName: string;
  userAvatar: string;
  content: string;
  isInternal: boolean; // Only visible to staff/managers
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketAttachment { // ⚠️ ADD
  id: UUID;
  ticketId: UUID;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedById: UUID;
  uploadedByName: string;
  createdAt: Date;
}

export interface ActivityLog { // ⚠️ ADD
  id: UUID;
  action: string; // 'created', 'assigned', 'status_changed', 'commented', etc.
  performedById: UUID;
  performedByName: string;
  details: string;
  timestamp: Date;
}

export interface TicketRating { // ⚠️ ADD
  rating: number; // 1-5
  feedback: string | null;
  ratedById: UUID;
  ratedByName: string;
  ratedAt: Date;
}
```

---

## 📄 Main Page Component

### TicketsListPage Structure

```typescript
const TicketsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, filters, pagination, stats } = useAppSelector(state => state.tickets);
  const { slideouts } = useAppSelector(state => state.ui);
  const { isMobile } = useResponsive();
  
  // Fetch tickets on mount and when filters/page change
  useEffect(() => {
    dispatch(fetchTickets(filters));
    dispatch(fetchTicketStats());
  }, [dispatch, filters, pagination.page]);
  
  // Handlers
  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };
  
  const handleCreateClick = () => {
    dispatch(openSlideout('createTicket'));
  };
  
  const handleView = (id) => {
    dispatch(fetchTicketById(id));
    dispatch(openSlideout('ticketDetail'));
  };
  
  const handleEdit = (id) => {
    dispatch(fetchTicketById(id));
    dispatch(openSlideout('editTicket'));
  };
  
  // ... more handlers
  
  return (
    <>
      {/* Header */}
      <PageHeader title="Quản Lý Phiếu Yêu Cầu" />
      
      {/* Stats */}
      <TicketStatsCards stats={stats} loading={loading} />
      
      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <TicketFilters filters={filters} onChange={handleFilterChange} />
          <Button onClick={handleCreateClick}>
            <i className="fas fa-plus" /> Tạo Ticket Mới
          </Button>
        </CardHeader>
        
        {/* Table */}
        <TicketTable 
          tickets={items}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onAssign={handleAssign}
        />
        
        {/* Pagination */}
        <CardFooter>
          <Pagination 
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.totalCount / pagination.pageSize)}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </CardFooter>
      </Card>
      
      {/* Slideouts */}
      <Slideout 
        isOpen={slideouts.createTicket}
        onClose={() => dispatch(closeSlideout('createTicket'))}
        title="Tạo Ticket Mới"
        width={isMobile ? '100%' : '600px'}
      >
        <CreateTicketForm 
          onSuccess={() => {
            dispatch(closeSlideout('createTicket'));
            dispatch(fetchTickets(filters));
          }}
          onCancel={() => dispatch(closeSlideout('createTicket'))}
        />
      </Slideout>
      
      {/* Edit & Detail Slideouts */}
      {/* ... similar pattern */}
    </>
  );
};
```

---

## 🎨 Styling Requirements

### Responsive Breakpoints
- **Desktop (>1024px):** Full table, 5-column stats
- **Tablet (681-1024px):** Full table, 3-column stats
- **Mobile (<681px):** Card view instead of table, 2-column stats

### Colors & Variants

**Priority Badges:**
- Critical: Red background (#EF4444)
- High: Orange background (#F59E0B)
- Medium: Yellow background (#FCD34D)
- Low: Green background (#10B981)

**Status Badges:**
- New: Gray (#6B7280)
- Submitted: Blue (#3B82F6)
- In Progress: Orange (#F59E0B)
- Resolved: Green (#10B981)
- Closed: Gray (#9CA3AF)

**SLA Badges:**
- Danger: Red pulsing animation
- Warning: Yellow
- Safe: Green

---

## 🔧 Implementation Steps - Organized by Phase

### ✅ Phase 1: Basic List & CRUD - COMPLETED (March 25-26, 2026)
- [x] Setup Redux slices (tickets, ui)
- [x] Create base components (Button, Input, Select, Card, etc.)
- [x] Implement TicketStatsCards
- [x] Implement TicketFilters  
- [x] Implement TicketTable with responsive cards
- [x] Implement SLABadge
- [x] Implement CreateTicketForm
- [x] Implement EditTicketForm
- [x] Implement TicketDetailSlideout (basic version)
- [x] Implement AssignTicketModal
- [x] Implement Pagination
- [x] Integrate all components in TicketsListPage
- [x] Test complete CRUD flow

**Time Spent:** 15 hours  
**Components:** 12 components  
**Status:** ✅ PRODUCTION READY

---

### 🔄 Phase 2: Triage Workflow - IN PROGRESS (Est. 3.5 hours)

**Step 1: Update Data Model** ⬜ (30 min)
- [ ] Update `Ticket.ts` model with missing statuses
- [ ] Add `TicketCategory` enum
- [ ] Add `ticketNumber` field
- [ ] Add triage-related fields (`rejectionReason`, `pendingReason`, `triagedAt`)
- [ ] Update mock data to use new statuses

**Step 2: Update Status Badge** ⬜ (30 min)
- [ ] Add UI labels for new statuses (SUBMITTED, PENDING, TRIAGED, REJECTED, ASSIGNED)
- [ ] Add color scheme for each status

**Step 3: Create Triage API Methods** ⬜ (30 min)
- [ ] Add `triageTicket()` to ticketService
- [ ] Implement mock behavior for triage actions
- [ ] Test API method with mock data

**Step 4: Create Redux Action** ⬜ (30 min)
- [ ] Add `triageTicket` async thunk to ticketsSlice
- [ ] Add reducer cases for pending/fulfilled/rejected
- [ ] Test Redux action

**Step 5: Create TriageTicketModal Component** ⬜ (1.5 hours)
- [ ] Create component structure
- [ ] Implement form with action buttons (Accept/Reject/Request Info)
- [ ] Add priority adjustment dropdown
- [ ] Add reason textarea (required for reject/request_info)
- [ ] Connect to Redux
- [ ] Add form validation
- [ ] Test component

**Step 6: Integrate Triage into TicketDetailSlideout** ⬜ (30 min)
- [ ] Add "Triage Ticket" button for managers
- [ ] Show button only when status is SUBMITTED or PENDING
- [ ] Connect to TriageTicketModal
- [ ] Test integration

**Deliverables:**
- TriageTicketModal component
- Updated Ticket model with triage statuses
- triageTicket Redux action
- Updated StatusBadge
- Integrated triage workflow

---

### ⬜ Phase 3: Help Request System (Est. 7 hours)

**Step 1: Update Data Model** ⬜ (30 min)
- [ ] Add `TicketHelper` interface
- [ ] Add `helpers[]` field to Ticket
- [ ] Add `helpRequestDescription` field
- [ ] Update mock data with helpers

**Step 2: Create Help Request API Methods** ⬜ (1 hour)
- [ ] Add `requestHelp()` to ticketService
- [ ] Add `assignHelper()` to ticketService
- [ ] Add `removeHelper()` to ticketService
- [ ] Implement mock behavior
- [ ] Test API methods

**Step 3: Create Redux Actions** ⬜ (1 hour)
- [ ] Add `requestHelp` thunk
- [ ] Add `assignHelper` thunk
- [ ] Add `removeHelper` thunk
- [ ] Test Redux actions

**Step 4: Create RequestHelpModal Component** ⬜ (1.5 hours)
- [ ] Create component structure
- [ ] Implement help description textarea
- [ ] Optional helper suggestion dropdown
- [ ] Connect to Redux
- [ ] Test component

**Step 5: Create AssignHelperModal Component** ⬜ (2 hours)
- [ ] Create component structure
- [ ] Implement user search/select
- [ ] Show currently assigned helpers
- [ ] Add remove helper functionality
- [ ] Connect to Redux
- [ ] Test component

**Step 6: Create TicketHelpersDisplay Component** ⬜ (1 hour)
- [ ] Display primary assignee vs helpers
- [ ] Show help request description
- [ ] Add remove helper button for managers
- [ ] Test component

**Step 7: Integrate into TicketDetailSlideout** ⬜ (1 hour)
- [ ] Add "Request Help" button for primary assignee
- [ ] Add "Assign Helper" button for managers
- [ ] Integrate TicketHelpersDisplay
- [ ] Test integration

**Deliverables:**
- RequestHelpModal component
- AssignHelperModal component
- TicketHelpersDisplay component
- requestHelp/assignHelper Redux actions
- Integrated help request workflow

---

### ⬜ Phase 4: Status Management (Est. 4.5 hours)

**Step 1: Define Status Transitions** ⬜ (30 min)
- [ ] Create status transition validation map
- [ ] Document valid transitions
- [ ] Create validation utility functions

**Step 2: Update Status API Method** ⬜ (30 min)
- [ ] Enhance `updateTicketStatus()` in ticketService
- [ ] Add `comment` and `solution` parameters
- [ ] Add status transition validation
- [ ] Test API method

**Step 3: Create Redux Action** ⬜ (30 min)
- [ ] Add `updateTicketStatus` thunk
- [ ] Add validation before API call
- [ ] Test Redux action

**Step 4: Create UpdateStatusModal Component** ⬜ (2 hours)
- [ ] Create component structure
- [ ] Implement status dropdown (filtered by valid transitions)
- [ ] Add comment/reason textarea
- [ ] Add solution textarea (for RESOLVED status)
- [ ] Add transition validation
- [ ] Connect to Redux
- [ ] Test component

**Step 5: Add Dynamic Action Buttons** ⬜ (1.5 hours)
- [ ] Update TicketDetailSlideout with status action buttons
- [ ] Implement role-based button visibility
- [ ] Add quick action buttons (Start Working, Mark Blocked, etc.)
- [ ] Connect to UpdateStatusModal
- [ ] Test all transitions

**Deliverables:**
- UpdateStatusModal component
- Status transition validation utilities
- updateTicketStatus Redux action
- Dynamic action buttons in detail view

---

### ⬜ Phase 5: Comments & Attachments (Est. 8 hours)

**Step 1: Update Data Models** ⬜ (30 min)
- [ ] Add `TicketComment` interface
- [ ] Add `TicketAttachment` interface
- [ ] Replace `commentCount` with `comments[]` array
- [ ] Replace `attachmentCount` with `attachments[]` array
- [ ] Update mock data

**Step 2: Create Comments API Methods** ⬜ (1 hour)
- [ ] Add `addComment()` to ticketService
- [ ] Add `getComments()` to ticketService
- [ ] Implement mock behavior
- [ ] Test API methods

**Step 3: Create Attachments API Methods** ⬜ (1 hour)
- [ ] Add `uploadAttachment()` to ticketService
- [ ] Add `deleteAttachment()` to ticketService
- [ ] Add `downloadAttachment()` to ticketService
- [ ] Implement mock behavior
- [ ] Test API methods

**Step 4: Create Redux Actions** ⬜ (1 hour)
- [ ] Add comments actions (add, fetch)
- [ ] Add attachments actions (upload, delete, download)
- [ ] Test Redux actions

**Step 5: Create TicketCommentsSection Component** ⬜ (2 hours)
- [ ] Create component structure
- [ ] Display comments list with avatars
- [ ] Add comment form
- [ ] Internal/External toggle
- [ ] Connect to Redux
- [ ] Test component

**Step 6: Create TicketAttachmentsSection Component** ⬜ (2 hours)
- [ ] Create component structure
- [ ] Display attachments grid
- [ ] Integrate FileUploadArea
- [ ] Add delete confirmation
- [ ] Connect to Redux
- [ ] Test component

**Step 7: Create ImagePreviewModal** ⬜ (1 hour)
- [ ] Full-screen image viewer
- [ ] Navigation controls
- [ ] Zoom functionality
- [ ] Test component

**Step 8: Integrate into TicketDetailSlideout** ⬜ (30 min)
- [ ] Replace comment placeholder with TicketCommentsSection
- [ ] Replace attachment placeholder with TicketAttachmentsSection
- [ ] Test integration

**Deliverables:**
- TicketCommentsSection component
- TicketAttachmentsSection component
- ImagePreviewModal component
- Comments and attachments Redux actions
- Full commenting and file management

---

### ⬜ Phase 6: Rating System (Est. 4.5 hours)

**Step 1: Update Data Model** ⬜ (30 min)
- [ ] Add `TicketRating` interface
- [ ] Add `rating` field to Ticket
- [ ] Update mock data

**Step 2: Create Rating API Method** ⬜ (30 min)
- [ ] Add `rateTicket()` to ticketService
- [ ] Implement mock behavior
- [ ] Test API method

**Step 3: Create Redux Action** ⬜ (30 min)
- [ ] Add `rateTicket` thunk
- [ ] Test Redux action

**Step 4: Create StarRating Component** ⬜ (1 hour)
- [ ] Interactive star selector
- [ ] Display-only mode
- [ ] Hover effects
- [ ] Test component

**Step 5: Create TicketRatingModal Component** ⬜ (1.5 hours)
- [ ] Create component structure
- [ ] Integrate StarRating
- [ ] Add feedback textarea
- [ ] Add thank you message
- [ ] Connect to Redux
- [ ] Test component

**Step 6: Integrate into TicketDetailSlideout** ⬜ (1 hour)
- [ ] Show rating prompt for APPROVED tickets
- [ ] Display existing rating
- [ ] Auto-open modal for unrated APPROVED tickets
- [ ] Test integration

**Deliverables:**
- TicketRatingModal component
- StarRating component
- rateTicket Redux action
- Integrated rating workflow

---

### ⬜ Phase 7: Final Integration & Testing (Est. 3 hours)

**Step 1: Activity Log Enhancement** ⬜ (1 hour)
- [ ] Add `ActivityLog` interface
- [ ] Add `activityLogs[]` to Ticket
- [ ] Update mock data with activity logs
- [ ] Display detailed activity timeline in detail view

**Step 2: Comprehensive Testing** ⬜ (1.5 hours)
- [ ] Test complete workflow from SUBMITTED to CLOSED
- [ ] Test all status transitions
- [ ] Test triage workflow
- [ ] Test help request workflow
- [ ] Test comments and attachments
- [ ] Test rating system
- [ ] Check responsive behavior
- [ ] Check error handling

**Step 3: Documentation** ⬜ (30 min)
- [ ] Update README with feature completion
- [ ] Document API endpoints
- [ ] Update component documentation
- [ ] Create troubleshooting guide

**Deliverables:**
- Complete activity log
- Full test coverage
- Updated documentation
- Production-ready feature

---

## 📊 Progress Tracking

| Phase | Components | Status | Est. Time | Actual Time | Completion |
|-------|-----------|--------|-----------|-------------|------------|
| **Phase 1: Basic CRUD** | 12 | ✅ Complete | 14.5h | 15h | 100% |
| **Phase 2: Triage** | 4 | ✅ Complete | 3.5h | 3.5h | 100% |
| **Phase 3: Help Request** | 4 | 🔄 Next | 7h | - | 0% |
| **Phase 4: Status Mgmt** | 2 | ⬜ Pending | 4.5h | - | 0% |
| **Phase 5: Comments/Files** | 4 | ⬜ Pending | 8h | - | 0% |
| **Phase 6: Rating** | 3 | ⬜ Pending | 4.5h | - | 0% |
| **Phase 7: Integration** | Testing | ⬜ Pending | 3h | - | 0% |
| **TOTAL** | **29** | **16/29** | **45h** | **18.5h** | **55%** |

### Feature Completion by User Story

| User Story | Status | Components | Priority |
|------------|--------|------------|----------|
| **US-TICKET-001: Submit Ticket** | ✅ Complete | CreateTicketForm, FileUploadArea | CRITICAL |
| **US-TICKET-002: Triage Ticket** | ✅ Complete | TriageTicketModal, StatusBadge | CRITICAL |
| **US-TICKET-003: Assign Ticket** | ✅ Complete | AssignTicketModal | CRITICAL |
| **US-TICKET-004: Work on Ticket** | ⬜ Pending | UpdateStatusModal | HIGH |
| **US-TICKET-004a: Request Help** | ⬜ Pending | RequestHelpModal | MEDIUM |
| **US-TICKET-004b: Assign Helper** | ⬜ Pending | AssignHelperModal | MEDIUM |
| **US-TICKET-005: Resolve & Close** | ⬜ Pending | UpdateStatusModal, RatingModal | HIGH |

### Phase 1 Components (Completed ✅)
- [x] TicketStatsCards ✅
- [x] TicketFilters ✅
- [x] TicketTable ✅
- [x] TicketTableRow ✅
- [x] SLABadge ✅
- [x] CreateTicketForm ✅
- [x] EditTicketForm ✅
- [x] TicketDetailSlideout ✅ (basic version with triage integration)
- [x] FileUploadArea ✅
- [x] Pagination ✅
- [x] Checkbox ✅
- [x] AssignTicketModal ✅
- [x] Modal ✅

### Phase 2 Components (Completed ✅)
- [x] TriageTicketModal ✅
- [x] StatusBadge ✅
- [x] Ticket Utilities (ticketUtils.ts) ✅
- [x] TicketDetailSlideout - Triage Integration ✅

### Next Actions (Immediate Priority)

**🎯 Start Phase 3: Help Request System**

1. **Update Ticket Model** → Add TicketHelper interface and helpers array (30 min)
2. **Create Help Request API Methods** → API methods for requesting and assigning help (1 hour)
3. **Create RequestHelpModal** → Staff can request help (1.5 hours)
4. **Create AssignHelperModal** → Manager can assign helpers (2 hours)
5. **Create TicketHelpersDisplay** → Display helpers list (1.5 hours)
6. **Integrate Help UI** → Add to detail view (1 hour)

**Estimated Time:** 7 hours  
**Blocking Issues:** None  
**Dependencies:** Phase 2 complete ✅

---

## 📝 Technical Debt & Notes

### Known Issues
- ✅ CSS module type declarations (minor TypeScript warnings, doesn't affect functionality)
- ⬜ File upload backend integration pending (UI ready)
- ⬜ Search functionality not debounced yet
- ⬜ Real-time updates via WebSocket not implemented

### Future Enhancements (Post-MVP)
- [ ] Real-time notifications via WebSocket
- [ ] Advanced search with filters
- [ ] Bulk operations (assign multiple, close multiple)
- [ ] Export tickets to Excel/PDF
- [ ] Ticket templates
- [ ] Auto-assignment based on workload
- [ ] SLA escalation rules
- [ ] Email notifications
- [ ] Mobile app parity

### API Integration Notes
- Mock data currently being used for development
- Backend endpoints documented in [02-ticket-management.md](../specs/02-ticket-management.md)
- All API methods in `ticketService.ts` have mock implementations
- Switch `USE_MOCK_DATA` flag when backend is ready

---
## 📂 Files Created/Updated

### Phase 1 Files (29 files) ✅

**Page Components:**
- `src/pages/TicketsListPage/index.tsx`
- `src/pages/TicketsListPage/TicketsListPage.module.css`

**Ticket Components:**
- `src/pages/TicketsListPage/components/TicketStatsCards/`
- `src/pages/TicketsListPage/components/TicketFilters/`
- `src/pages/TicketsListPage/components/TicketTable/` (includes TicketTableRow)
- `src/pages/TicketsListPage/components/CreateTicketForm/`
- `src/pages/TicketsListPage/components/EditTicketForm/`
- `src/pages/TicketsListPage/components/TicketDetailSlideout/`
- `src/pages/TicketsListPage/components/AssignTicketModal/`

**Common Components:**
- `src/components/common/SLABadge/`
- `src/components/common/FileUploadArea/`
- `src/components/common/Pagination/`
- `src/components/common/Modal/`
- `src/components/common/Checkbox/`

**Redux & Services:**
- `src/store/slices/ticketsSlice.ts` (Enhanced with assignTicket, fetchTicketStats)
- `src/store/slices/uiSlice.ts` (Updated slideout management)
- `src/services/ticketService.ts` (Enhanced with assignTicket, updateStatus)

**Models:**
- `src/models/Ticket.ts`

### Phase 2 Files (7 files) ✅

**New Components:**
- `src/pages/TicketsListPage/components/TriageTicketModal/` (TSX, CSS, index)
- `src/components/common/StatusBadge/` (TSX, CSS, index)

**Utilities:**
- `src/utils/ticketUtils.ts` ✅ NEW - Shared ticket utility functions

**Enhanced Files:**
- `src/models/Ticket.ts` (Added triage statuses, fields)
- `src/services/ticketService.ts` (Added triageTicket method)
- `src/store/slices/ticketsSlice.ts` (Added triageTicket thunk)
- `src/pages/TicketsListPage/components/TicketDetailSlideout/` (Added triage integration)

### Phase 3+ Files (Planned)

**New Components (Phase 2-6):**
- `src/pages/TicketsListPage/components/TriageTicketModal/`
- `src/pages/TicketsListPage/components/RequestHelpModal/`
- `src/pages/TicketsListPage/components/AssignHelperModal/`
- `src/pages/TicketsListPage/components/UpdateStatusModal/`
- `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketCommentsSection.tsx`
- `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketAttachmentsSection.tsx`
- `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketHelpersDisplay.tsx`
- `src/pages/TicketsListPage/components/TicketRatingModal/`
- `src/components/common/StarRating/`
- `src/components/common/ImagePreviewModal/`

**Enhanced Components:**
- `src/components/common/StatusBadge/` (Add new status labels)

**Service Enhancements:**
- `src/services/ticketService.ts` (Add 10+ new methods)

**Redux Enhancements:**
- `src/store/slices/ticketsSlice.ts` (Add 10+ new thunks)

**Model Enhancements:**
- `src/models/Ticket.ts` (Add complete workflow fields, interfaces for Comments, Attachments, Helpers, Rating, ActivityLog)

---

##✅ Verification Checklist

### Phase 1 (Completed) ✅
- [x] All components render without errors
- [x] Redux actions dispatch correctly
- [x] Forms validate and submit properly
- [x] Filters and pagination work
- [x] Responsive design works on mobile
- [x] No console errors in browser
- [x] TypeScript compiles (minor CSS module warnings OK)
- [x] Verified against HTML prototype

### Phase 2-6 (When Complete) ⬜
Will be updated as each phase completes.

---

## 🚀 Deployment Status

**Phase 1:** ✅ Ready for QA Testing  
**Phase 2-6:** 🔄 Development in Progress  
**Backend Integration:** ⏳ Pending (Mock data in use)  
**Production Deployment:** ⏳ After all phases complete

---

## 📌 Summary

**Current Status:** 🔄 Phase 2 Complete (55%) - Phase 3 Next  

**Completed:**
- ✅ Basic CRUD operations  
- ✅ List, filter, search functionality
- ✅ Create/Edit/View tickets
- ✅ Assign tickets
- ✅ SLA monitoring
- ✅ Pagination
- ✅ Responsive design
- ✅ Triage workflow (Accept/Reject/Request Info)
- ✅ Status badge system
- ✅ Priority adjustment during triage

**Next Steps:**
1. 🔄 **Implement Help Request System** (Phase 3 - 7 hours)
2. ⬜ **Implement Status Management** (Phase 4 - 4.5 hours)
3. ⬜ **Implement Comments & Attachments** (Phase 5 - 8 hours)
4. ⬜ **Implement Rating System** (Phase 6 - 4.5 hours)
5. ⬜ **Final Integration & Testing** (Phase 7 - 3 hours)

**Total Remaining:** ~27 hours of development

---

**Last Updated:** 2026-03-26  
**Next Milestone:** Complete Phase 3 Help Request System  
**Target:** Full workflow implementation following [02-ticket-management.md](../specs/02-ticket-management.md)
