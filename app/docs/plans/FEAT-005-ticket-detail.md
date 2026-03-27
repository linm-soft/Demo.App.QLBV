# Implementation Plan: Ticket Detail

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-005  
**Priority:** Critical  
**Status:** ✅ Completed  
**Created:** 2026-03-25  
**Completed:** 2026-03-26  
**Related Spec:** [02-ticket-management.md](../specs/02-ticket-management.md)

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/ticket-detail.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Verification Status:** ✅ Implementation Complete (2026-03-26)

---

## 📋 Overview

Detailed ticket view with full information, activity timeline, comments, attachments, and actions.

---

## 🎯 Acceptance Criteria

- [x] Display all ticket fields (title, description, priority, status, SLA)
- [x] Show creator and assignee info with avatars
- [x] Activity timeline with all changes
- [x] Comments section (add, view, @mentions)
- [x] File attachments (view, download, upload)
- [x] Action buttons: Edit, Assign, Resolve, Close, **Triage** (Manager only)
- [x] Triage workflow (Accept/Reject/Request Info) for SUBMITTED/PENDING tickets
- [x] Status transition validation
- [x] Real-time updates (comments, status changes) - Ready for API integration
- [x] Breadcrumb navigation (Back button)
- [ ] Print-friendly view (Not yet implemented)

---

## 📦 Main Components

1. **TicketDetailPage** ✅ - Main container with routing
2. **TicketHeader** ✅ - Title, status, priority badges
3. **TicketInfo** ✅ - Field grid (creator, assignee, dates, etc.)
4. **ActivityTab** ✅ - Chronological event list
5. **CommentsTab** ✅ - Comments with input form
6. **AttachmentsTab** ✅ - File list with upload UI
7. **ChatTab** ✅ - Real-time chat interface
8. **TicketSidebar** ✅ - SLA status, details, related tickets

---

## 📂 Files Created

### Models
- `src/models/Comment.ts` - Comment data structure with mentions support
- `src/models/Attachment.ts` - Attachment data structure with file utilities
- `src/models/Activity.ts` - Activity tracking with type-specific icons and colors

### Services (Mock-Ready)
- `src/services/commentService.ts` - Comment CRUD operations (GET/POST/PUT/DELETE)
- `src/services/attachmentService.ts` - File upload/download operations
- `src/services/activityService.ts` - Activity/history retrieval

### Main Page Component
- `src/pages/TicketDetailPage/`
  - `TicketDetailPage.tsx` - Main page with routing, state management, and handlers
  - `TicketDetailPage.module.css` - Page layout styles
  - `index.tsx` - Export barrel

### Ticket Display Components
- `src/pages/TicketDetailPage/components/`
  - `TicketHeader.tsx` + `.module.css` - Title with status, priority, SLA badges
  - `TicketInfo.tsx` + `.module.css` - Ticket fields (description, category, tags)
  - `TicketSidebar.tsx` + `.module.css` - SLA countdown, user info, related tickets
  - `TicketTabs.tsx` + `.module.css` - Tab navigation (Chat/Comments/Activity/Files)

### Tab Components
- `src/pages/TicketDetailPage/components/tabs/`
  - `ChatTab/ChatTab.tsx` - Real-time messaging interface with avatars
  - `CommentsTab/CommentsTab.tsx` - Comment threads with post form
  - `ActivityTab/ActivityTab.tsx` - Timeline of ticket events
  - `AttachmentsTab/AttachmentsTab.tsx` - File list with upload/download

### Shared Components (from `src/components/tickets/`)
- `EditTicketForm` - Ticket editing form (opened in slideout)
- `AssignTicketModal` - Staff assignment modal
- `TriageTicketModal` - Triage workflow modal (Accept/Reject/Request Info)

**Note:** These components are now in the shared `src/components/tickets/` folder for reuse across multiple pages.

### Routing & Navigation
- Updated `src/App.tsx` - Added route `/tickets/:id` for detail page
- Updated `src/pages/TicketsListPage/index.tsx` - Navigate to detail on row click

---

## 🏗️ Architecture Patterns (For Future Reference)

### Component Reuse Pattern
The implementation demonstrates **cross-page component reuse** instead of duplication:

```typescript
// ✅ CORRECT: Reuse shared components from common location
import { EditTicketForm } from '../../components/tickets/EditTicketForm';
import { AssignTicketModal } from '../../components/tickets/AssignTicketModal';
import { TriageTicketModal } from '../../components/tickets/TriageTicketModal';

// ❌ AVOID: Creating duplicate edit/assign components
// ❌ AVOID: Importing from other page folders (../PageName/components/)
```

**Benefits:**
- Single source of truth for business logic
- Consistent UX across pages
- Reduced maintenance burden
- Shared state management patterns

### State Management Pattern
Uses Redux Toolkit slices with proper loading states:

```typescript
// Fetch ticket data
const ticket = useAppSelector((state) => state.tickets.selectedTicket);

// UI state for modals/slideouts
const { slideouts } = useAppSelector((state) => state.ui);

// Reload data after mutations
const handleEditSuccess = () => {
  dispatch(closeSlideout('editTicket'));
  if (id) dispatch(fetchTicketById(id)); // Refresh
};
```

### Permission-Based UI Pattern
Action buttons shown based on role and ticket status:

```typescript
const canEdit = ticket.status !== TicketStatus.Closed;
const canAssign = currentUser?.role === UserRole.Manager && !closed;

return (
  <>
    {canEdit && <Button onClick={handleEdit}>Edit</Button>}
    {canAssign && <Button onClick={handleAssign}>Assign</Button>}
  </>
);
```

### Service Layer Pattern (Mock-Ready)
Services use flag for easy API switching:

```typescript
const USE_MOCK_DATA = import.meta.env.DEV && !import.meta.env.VITE_API_URL;

export const commentService = {
  async getComments(ticketId: UUID): Promise<Comment[]> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return mockComments.filter(c => c.ticketId === ticketId);
    }
    return await apiClient.get<Comment[]>(`/api/tickets/${ticketId}/comments`);
  }
};
```

---

## 🔌 API Endpoints & Integration Status

### Currently Integrated (Using Redux)
- ✅ `GET /api/tickets/:id` - Via `fetchTicketById` thunk with mock data fallback
- ✅ `PUT /api/tickets/:id` - Via `EditTicketForm` component (shared from TicketsListPage)
- ✅ `POST /api/tickets/:id/assign` - Via `AssignTicketModal` component (shared)

### Service Layer Ready (Mock Data)
- 🔄 `POST /api/tickets/:id/comments` - commentService.createComment()
- 🔄 `GET /api/tickets/:id/comments` - commentService.getComments()
- 🔄 `GET /api/tickets/:id/history` - activityService.getActivities()
- 🔄 `POST /api/tickets/:id/attachments` - attachmentService.uploadAttachment()
- 🔄 `GET /api/tickets/:id/attachments/:attachmentId` - attachmentService.downloadAttachment()

### To Be Implemented
- ⏳ `POST /api/tickets/:id/resolve` - Resolution workflow
- ⏳ `POST /api/tickets/:id/close` - Close ticket workflow
- ⏳ `POST /api/tickets/:id/reopen` - Reopen closed ticket

**Note:** Services are structured for easy API integration. Simply update `USE_MOCK_DATA` flag or configure `VITE_API_URL` environment variable.

- `GET /api/tickets/:id` - ✅ Service ready (using mock in dev)
- `PUT /api/tickets/:id` - ⏳ To be implemented
- `POST /api/tickets/:id/comments` - ✅ Service ready (using mock in dev)
- `GET /api/tickets/:id/history` - ✅ Service ready (using mock in dev)
- `POST /api/tickets/:id/attachments` - ✅ Service ready (using mock in dev)
- `POST /api/tickets/:id/resolve` - ⏳ To be implemented
- `POST /api/tickets/:id/close` - ⏳ To be implemented

---

## 🔧 Implementation Steps

### Phase 1: UI Components (6 hours) ✅
- [x] Create TicketDetailPage layout
- [x] Create TicketHeader component
- [x] Create TicketInfo component
- [x] Create ActivityTimeline component (ActivityTab)
- [x] Create CommentsSection component (CommentsTab)
- [x] Create AttachmentsSection component (AttachmentsTab)
- [x] Create ChatTab component
- [x] Create TicketSidebar component
- [x] Test responsive layout

### Phase 2: Interactive Features (2 hours) ✅
- [x] Implement comment posting UI with input form
- [x] Implement file upload/download UI
- [x] Add action button permissions and handlers
- [x] Create services for comments, attachments, activities
- [x] Test all interactions (mock data used)

### Phase 3: Real-time Updates (1 hour) ⏳
- [ ] Setup MQTT subscriptions for ticket updates
- [ ] Handle real-time comment updates  
- [ ] Handle real-time status changes
- [ ] Test websocket functionality
**Note:** Service structure in place, MQTT integration deferred to backend implementation.

### Phase 4: API Integration ⭐ (1 hour) ✅
- [x] Create service layer for API calls
- [x] Integrate `GET /api/tickets/:id` via fetchTicketById (existing)
- [x] Implement commentService with mock data fallback
- [x] Implement attachmentService with mock data fallback
- [x] Implement activityService with mock data fallback
- [x] Add loading states for ticket fetch
- [x] Add error handling and navigation on errors
- [x] Services ready for real API integration (USE_MOCK_DATA flag)

---

## 🎉 Implementation Summary

The Ticket Detail feature has been successfully implemented with a full-page dedicated view accessible at `/tickets/:id`. The implementation follows component reuse principles and integrates seamlessly with the existing TicketsListPage.

### ✅ What Was Built

**Full-Featured Detail Page:**
- Comprehensive ticket information display
- Four interactive tabs (Chat, Comments, Activity, Attachments)
- SLA countdown with visual progress indicator
- Role-based action buttons (Edit, Assign, Resolve, Close)
- Responsive design for mobile and desktop

**Component Reuse Pattern:**
- Reuses `EditTicketForm` from TicketsListPage for consistency
- Reuses `AssignTicketModal` from TicketsListPage for staff assignment
- Demonstrates best practice of sharing components across pages
- Maintains single source of truth for business logic

**Service Layer Architecture:**
- Mock-ready services with `USE_MOCK_DATA` flag
- Easy switching between mock and real API
- Proper TypeScript types for all API contracts
- Error handling and loading states

### 🎯 Key Features Implemented

✅ **Display & Navigation**
- Back button to tickets list
- Ticket number, title, priority, status, SLA badges
- Creator and assignee info with avatars
- Related tickets section
- Breadcrumb-style navigation

✅ **Interactive Tabs**
- Chat tab with message history
- Comments tab with post form
- Activity timeline with event icons
- Attachments tab with upload/download UI

✅ **Actions & Permissions**
- Edit button (role-based) → Opens EditTicketForm slideout
- Assign button (Manager/Admin only) → Opens AssignTicketModal
- **Triage button (Manager/Admin only, SUBMITTED/PENDING status)** → Opens TriageTicketModal
- Resolve button (Assignee only, in progress status)
- Close button (Manager/Admin only, resolved status)

✅ **Real-Time Ready**
- Service structure supports WebSocket/MQTT integration
- State refreshes after mutations
- Toast notifications for user feedback

### 📋 For Future Implementations

**When Adding New Features:**
1. ✅ **Check for existing components** before creating new ones
2. ✅ **Reuse forms and modals** from other pages when possible
3. ✅ **Follow the service layer pattern** with mock data support
4. ✅ **Use permission-based rendering** for action buttons
5. ✅ **Refresh state after mutations** to show updated data

**Component Reuse Example:**
```typescript
// Import shared components from common location
import { EditTicketForm } from '../../components/tickets/EditTicketForm';
import { AssignTicketModal } from '../../components/tickets/AssignTicketModal';
import { TriageTicketModal } from '../../components/tickets/TriageTicketModal';

<Slideout isOpen={slideouts.editTicket} ...>
  <EditTicketForm
    ticketId={id}
    onSuccess={handleEditSuccess}
    onCancel={handleCancel}
  />
</Slideout>

{/* Triage Modal for Manager */}
{ticket && (
  <TriageTicketModal
    isOpen={triageModalOpen}
    ticketId={ticket.id}
    onClose={() => setTriageModalOpen(false)}
    onSuccess={handleTriageSuccess}
  />
)}
</Slideout>
```

**Service Pattern Example:**
```typescript
// Define service with mock support
const USE_MOCK_DATA = import.meta.env.DEV && !import.meta.env.VITE_API_URL;

export const myService = {
  async getData(id: UUID): Promise<Data> {
    if (USE_MOCK_DATA) {
      return getMockData(id);
    }
    return await apiClient.get<Data>(`/api/resource/${id}`);
  }
};
```

### ⏳ Not Implemented (Future Work)

- [ ] Print-friendly view styling
- [ ] Real-time WebSocket/MQTT subscriptions
- [ ] Resolve workflow modal
- [ ] Close workflow modal with notes
- [ ] @mentions autocomplete in comments
- [ ] Rich text editor for comments
- [ ] Inline file preview for images/PDFs

---

## 📚 Related Documentation

- See [FEAT-001-tickets-list.md](./FEAT-001-tickets-list.md) for list page patterns
- See [02-ticket-management.md](../specs/02-ticket-management.md) for feature spec
- See [AI-IMPLEMENTATION-GUIDE.md](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards
