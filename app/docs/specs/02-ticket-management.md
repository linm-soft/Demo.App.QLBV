# Feature Spec: Support Ticket Management

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: TICKET-002  
**Priority**: Critical  
**Status**: Phase 1 Complete - Phase 2 In Progress  
**Last Updated**: March 26, 2026

---

## ⚠️ IMPLEMENTATION STATUS

**Phase 1 (Basic CRUD & Detail View):** ✅ COMPLETED (March 26, 2026)
- ✅ List tickets with filtering and pagination
- ✅ Create/Edit tickets via forms
- ✅ **Full-page ticket detail view** (`/tickets/:id`)
- ✅ Assign tickets to staff
- ✅ SLA monitoring with visual countdown
- ✅ File upload UI (backend integration pending)
- ✅ **Tab-based interface** for Chat/Comments/Activity/Attachments
- ✅ **Component reuse pattern** (EditTicketForm, AssignTicketModal shared)

**Phase 2 (Triage Workflow):** 🔄 IN PROGRESS
- Triage modal implementation
- Status transitions
- Priority adjustment

**Phases 3-6:** ⬜ PENDING
- Help request system
- Comments & attachments backend integration
- Real-time updates (WebSocket/MQTT)
- Rating system

**Implementation Plans:**
- List View: [FEAT-001-tickets-list.md](../plans/FEAT-001-tickets-list.md)
- Detail View: [FEAT-005-ticket-detail.md](../plans/FEAT-005-ticket-detail.md) ✅

---

## 🔔 AI Implementation Notes

**IMPORTANT - HTML Reference Files:**
- Primary: `app/tickets-list.html` - Main tickets list view
- Secondary: `app/ticket-detail.html` - Detailed ticket view
- Styling: `app/css/styles.css` - All CSS variables and component styles

**Mock Data Requirements:**
- Create in: `src/mocks/tickets.mock.ts`
- Must include: Various statuses (NEW, SUBMITTED, IN_PROGRESS, RESOLVED, CLOSED)
- Must include: Different priorities (CRITICAL, HIGH, MEDIUM, LOW)
- Must include: SLA scenarios (safe, warning, danger, breached)
- Must include: Assigned/unassigned tickets
- Use realistic Vietnamese names and medical department contexts

**Visual Consistency Checklist:**
- ✅ Match table layout from HTML prototype
- ✅ Match status badge colors and styling
- ✅ Match priority indicators and icons
- ✅ Match SLA countdown display format
- ✅ Match avatar display for assignees
- ✅ Match action button placement and behavior

---

## 📋 Overview

Hệ thống quản lý support tickets hoàn chỉnh cho môi trường y khoa. Cho phép users submit yêu cầu hỗ trợ, được triage, assign, xử lý và theo dõi với SLA tracking.

**Key Capabilities:**
- Submit tickets với priority và category
- Triage workflow (Accept/Reject/Pending)
- Smart assignment (Manual/Auto-routing)
- Status tracking với real-time updates
- Comments & collaboration
- File attachments
- SLA monitoring
- Rating & feedback

---

## 👤 User Stories

### US-TICKET-001: Submit Ticket
**As a** end user hoặc staff  
**I want to** submit support ticket  
**So that** vấn đề của tôi được resolve kịp thời

**Acceptance Criteria:**
- ✅ User chọn category (Technical/Administrative/Clinical/Other)
- ✅ User nhập title và description
- ✅ User chọn priority (sẽ được Manager re-evaluate)
- ✅ User có thể attach files/images
- ✅ System tự động generate ticket number (TKT-YYYYMMDD-XXXX)
- ✅ User nhận notification khi ticket được assigned
- ✅ Status ban đầu là SUBMITTED

### US-TICKET-002: Triage Ticket (Manager/Admin)
**As a** Manager hoặc Admin  
**I want to** review và triage incoming tickets  
**So that** tickets được prioritize và route đúng

**Acceptance Criteria:**
- ✅ Manager xem danh sách tickets SUBMITTED
- ✅ Manager đánh giá và adjust priority nếu cần
- ✅ Manager có thể Accept/Reject/Request more info
- ✅ Nếu Accept: ticket chuyển sang TRIAGED, ready for assignment
- ✅ Nếu Reject: cần provide lý do, ticket đóng
- ✅ Nếu Pending: request thông tin từ user

### US-TICKET-003: Assign Ticket
**As a** Manager hoặc System  
**I want to** assign ticket cho staff phù hợp  
**So that** ticket được xử lý bởi người có skills phù hợp

**Acceptance Criteria:**
- ✅ Manager có thể manually assign cho specific staff
- ✅ System suggest candidates dựa trên workload, skills, availability
- ✅ Staff nhận push notification khi được assign
- ✅ Status chuyển sang ASSIGNED
- ✅ SLA timer bắt đầu đếm

### US-TICKET-004: Work on Ticket (Staff)
**As a** assigned staff  
**I want to** update progress và communicate về ticket  
**So that** requester biết status và ticket được resolve

**Acceptance Criteria:**
- ✅ Staff click "Start Working" → status IN_PROGRESS
- ✅ Staff có thể add comments/notes
- ✅ Staff có thể upload files/screenshots
- ✅ Staff có thể request help nếu cần
- ✅ Staff có thể request reassignment nếu cần
- ✅ Staff có thể mark blocked với lý do
- ✅ Staff mark "Resolved" khi hoàn thành
- ✅ All updates trigger notifications

### US-TICKET-004a: Request Help (Staff)
**As a** assigned staff  
**I want to** request help từ đồng nghiệp  
**So that** có thể giải quyết ticket phức tạp với sự hỗ trợ

**Acceptance Criteria:**
- ✅ Staff click "Request Help" từ ticket detail
- ✅ Staff mô tả phần nào cần hỗ trợ
- ✅ Staff suggest helper nếu có
- ✅ Status chuyển sang HELP_REQUESTED
- ✅ Manager nhận notification ngay lập tức
- ✅ Ticket vẫn thuộc ownership của staff chính
- ✅ SLA timer tiếp tục chạy

### US-TICKET-004b: Assign Helper (Manager)
**As a** Manager  
**I want to** assign helper để hỗ trợ staff  
**So that** ticket được resolve hiệu quả hơn

**Acceptance Criteria:**
- ✅ Manager xem help request details
- ✅ Manager chọn helper từ same department
- ✅ Manager có thể assign nhiều helpers
- ✅ Status chuyển sang SUPPORT_ASSIGNED
- ✅ Helper nhận notification với context đầy đủ
- ✅ Helper có thể view/comment ticket
- ✅ Helper không thay đổi được status (chỉ primary staff)
- ✅ Primary staff vẫn là người chịu trách nhiệm chính

### US-TICKET-005: Resolve & Close Ticket
**As a** Manager hoặc Requester  
**I want to** verify resolution và close ticket  
**So that** ticket lifecycle hoàn tất

**Acceptance Criteria:**
- ✅ Staff mark ticket as RESOLVED với solution description
- ✅ Status chuyển sang RESOLVED
- ✅ Manager hoặc Requester review resolution
- ✅ Có thể Approve (→APPROVED) hoặc Reopen (→IN_PROGRESS)
- ✅ Khi Approve: Status → APPROVED
- ✅ Requester rate service (1-5 stars) và optional comment
- ✅ After rating: Status → CLOSED
- ✅ Ticket đóng, SLA timer stop
- ✅ All participants nhận notification

---

## 🔄 Workflow & Status Flow

### Status Definitions

| Status | Description | Next Actions |
|--------|-------------|--------------|
| **SUBMITTED** | Ticket mới được tạo | Triage → TRIAGED/REJECTED/PENDING |
| **PENDING** | Cần thêm thông tin | User cung cấp info → TRIAGED |
| **TRIAGED** | Đã được review, approved | Assign → ASSIGNED |
| **REJECTED** | Không accept ticket | Final state |
| **ASSIGNED** | Đã giao cho staff | Start work → IN_PROGRESS |
| **IN_PROGRESS** | Staff đang xử lý | Request Help → HELP_REQUESTED, Blocked → BLOCKED, Resolve → RESOLVED |
| **HELP_REQUESTED** | Staff yêu cầu hỗ trợ | Manager assign helper → SUPPORT_ASSIGNED |
| **SUPPORT_ASSIGNED** | Helper đã được gán | Continue work → IN_PROGRESS |
| **BLOCKED** | Bị chặn bởi dependency | Unblock → IN_PROGRESS |
| **RESOLVED** | Staff đã hoàn thành | Approve → APPROVED, Reopen → REOPENED |
| **APPROVED** | Manager/User approved | User rating → CLOSED |
| **REOPENED** | Requester not satisfied | Continue → IN_PROGRESS |
| **CLOSED** | Hoàn tất sau rating | Final state |

### Workflow Diagram
```
[User] Create Ticket
        ↓
    SUBMITTED ←─────┐
        ↓           │
   [Manager]    User provide
     Triage     more info
        ↓           │
    ┌───┴────┐  PENDING
    ↓        ↓
TRIAGED   REJECTED
    ↓        (End)
[Assign]
    ↓
ASSIGNED
    ↓
[Staff Start]
    ↓
IN_PROGRESS ←─── REOPENED
    ↓   ↑            ↑
    │   └─ BLOCKED   │
    │                │
    ├→ HELP_REQUESTED│
    │       ↓        │
    │  SUPPORT_ASSIGNED
    │       ↓        │
    └───────┘        │
    │                │
    ↓ [Staff Done]   │
    ↓                │
 RESOLVED            │
    ↓                │
 APPROVED            │
    ↓                │
  Rating             │
    ↓                │
  CLOSED ─── or ────┘
   (End)
```

---

## 🔌 API Endpoints

### GET /api/tickets
**Description:** List tickets với filters

**Query Parameters:**
```
status: submitted|pending|triaged|rejected|assigned|in_progress|help_requested|support_assigned|blocked|resolved|approved|reopened|closed
priority: low|medium|high|critical
category: technical|administrative|clinical|other
assignedTo: {userId}|me|unassigned
departmentId: {uuid}
createdBy: {userId}|me
slaStatus: safe|warning|danger|breached
dateFrom: ISO date
dateTo: ISO date
page: number (default: 1)
limit: number (default: 20)
sortBy: createdAt|priority|deadline (default: createdAt)
sortOrder: asc|desc (default: desc)
```

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "ticketNumber": "TKT-20240324-0001",
      "title": "Printer not working in ER",
      "description": "...",
      "status": "in_progress",
      "priority": "high",
      "category": "technical",
      "createdBy": {
        "id": "uuid",
        "fullName": "Dr. Sarah Johnson",
        "avatar": "https://..."
      },
      "assignedTo": {
        "id": "uuid",
        "fullName": "John Doe",
        "avatar": "https://..."
      },
      "department": {
        "id": "uuid",
        "name": "IT Support"
      },
      "sla": {
        "responseDeadline": "2024-03-24T10:35:00Z",
        "resolveDeadline": "2024-03-24T12:30:00Z",
        "status": "warning",
        "remainingMinutes": 45
      },
      "createdAt": "2024-03-24T10:30:00Z",
      "updatedAt": "2024-03-24T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### POST /api/tickets
**Description:** Create new ticket

**Request:**
```json
{
  "title": "Printer not working in ER",
  "description": "The main printer in Emergency Room stopped responding. Need urgent fix.",
  "priority": "high",
  "category": "technical",
  "departmentId": "uuid",
  "attachments": ["file-id-1", "file-id-2"]
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "ticketNumber": "TKT-20240324-0002",
  "title": "Printer not working in ER",
  "status": "submitted",
  "priority": "high",
  "category": "technical",
  "createdBy": { ... },
  "createdAt": "2024-03-24T10:30:00Z"
}
```

### GET /api/tickets/{ticketId}
**Description:** Get ticket details

**Response 200:**
```json
{
  "id": "uuid",
  "ticketNumber": "TKT-20240324-0001",
  "title": "Printer not working in ER",
  "description": "...",
  "status": "in_progress",
  "priority": "high",
  "category": "technical",
  "createdBy": { ... },
  "assignedTo": { ... },
  "department": { ... },
  "sla": {
    "responseDeadline": "2024-03-24T10:35:00Z",
    "resolveDeadline": "2024-03-24T12:30:00Z",
    "status": "warning",
    "remainingMinutes": 45,
    "responseTime": 8,
    "breached": false
  },
  "comments": [
    {
      "id": "uuid",
      "content": "Checking the printer now",
      "user": { ... },
      "createdAt": "2024-03-24T10:45:00Z"
    }
  ],
  "attachments": [
    {
      "id": "uuid",
      "fileName": "error-screenshot.png",
      "fileUrl": "https://s3...",
      "mimeType": "image/png",
      "fileSize": 245000,
      "uploadedBy": { ... }
    }
  ],
  "activityLogs": [
    {
      "action": "status_changed",
      "from": "submitted",
      "to": "assigned",
      "performedBy": { ... },
      "timestamp": "2024-03-24T10:32:00Z"
    }
  ],
  "rating": null,
  "createdAt": "2024-03-24T10:30:00Z",
  "updatedAt": "2024-03-24T11:00:00Z"
}
```

### PATCH /api/tickets/{ticketId}/triage
**Description:** Triage ticket (Manager/Admin only)

**Request:**
```json
{
  "action": "accept",
  "priority": "critical",
  "reason": "This affects patient care, elevating to critical"
}
```

**Actions:** `accept`, `reject`, `request_info`

**Response 200:**
```json
{
  "id": "uuid",
  "status": "triaged",
  "priority": "critical",
  "message": "Ticket triaged successfully"
}
```

### PATCH /api/tickets/{ticketId}/assign
**Description:** Assign ticket to staff

**Request:**
```json
{
  "assigneeId": "uuid",
  "note": "John has experience with printer issues"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "status": "assigned",
  "assignedTo": { ... },
  "message": "Ticket assigned successfully"
}
```

### PATCH /api/tickets/{ticketId}/status
**Description:** Update ticket status

**Request:**
```json
{
  "status": "in_progress",
  "comment": "Starting to investigate the issue"
}
```

**Valid transitions:**
- ASSIGNED → IN_PROGRESS
- IN_PROGRESS → BLOCKED, RESOLVED
- BLOCKED → IN_PROGRESS
- RESOLVED → CLOSED, REOPENED
- REOPENED → IN_PROGRESS

**Response 200:**
```json
{
  "id": "uuid",
  "status": "in_progress",
  "message": "Status updated successfully"
}
```

### POST /api/tickets/{ticketId}/comments
**Description:** Add comment to ticket

**Request:**
```json
{
  "content": "I've identified the issue - toner cartridge needs replacement",
  "isInternal": false
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "content": "...",
  "user": { ... },
  "isInternal": false,
  "createdAt": "2024-03-24T10:50:00Z"
}
```

### POST /api/tickets/{ticketId}/attachments
**Description:** Upload attachment

**Request:** `multipart/form-data`
```
file: [binary]
```

**Response 201:**
```json
{
  "id": "uuid",
  "fileName": "replacement-photo.jpg",
  "fileUrl": "https://s3...",
  "fileSize": 512000,
  "mimeType": "image/jpeg"
}
```

### POST /api/tickets/{ticketId}/rate
**Description:** Rate ticket resolution (Requester only)

**Request:**
```json
{
  "rating": 5,
  "feedback": "Excellent and fast service!"
}
```

**Response 200:**
```json
{
  "message": "Thank you for your feedback",
  "rating": 5
}
```

---

## 🏗️ BFF Implementation (C# ASP.NET Core)

### TicketsController.cs
```csharp
[ApiController]
[Route("api/tickets")]
[Authorize]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;
    private readonly INotificationService _notificationService;
    private readonly ILogger<TicketsController> _logger;

    [HttpGet]
    public async Task<ActionResult> GetTickets([FromQuery] TicketQueryParameters query)
    {
        var result = await _ticketService.GetTicketsAsync(query);
        return Ok(result);
    }

    [HttpGet("{ticketId}")]
    public async Task<ActionResult<TicketDetailDto>> GetTicket(Guid ticketId)
    {
        var ticket = await _ticketService.GetTicketByIdAsync(ticketId);
        
        if (ticket == null)
            return NotFound(new { message = "Ticket not found" });
            
        return Ok(ticket);
    }

    [HttpPost]
    public async Task<ActionResult<CreatedTicketDto>> CreateTicket(
        [FromBody] CreateTicketRequest request)
    {
        var userId = User.GetUserId();
        var ticket = await _ticketService.CreateTicketAsync(request, userId);
        
        // Notify managers
        await _notificationService.NotifyNewTicketAsync(ticket);
        
        return CreatedAtAction(
            nameof(GetTicket),
            new { ticketId = ticket.Id },
            ticket
        );
    }

    [HttpPatch("{ticketId}/triage")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult> TriageTicket(
        Guid ticketId,
        [FromBody] TriageRequest request)
    {
        var userId = User.GetUserId();
        
        try
        {
            var result = await _ticketService.TriageTicketAsync(
                ticketId,
                request.Action,
                request.Priority,
                request.Reason,
                userId
            );
            
            await _notificationService.NotifyTicketTriagedAsync(result);
            
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPatch("{ticketId}/assign")]
    [Authorize(Roles = "Admin,Manager,TeamLead")]
    public async Task<ActionResult> AssignTicket(
        Guid ticketId,
        [FromBody] AssignTicketRequest request)
    {
        var userId = User.GetUserId();
        
        try
        {
            var result = await _ticketService.AssignTicketAsync(
                ticketId,
                request.AssigneeId,
                request.Note,
                userId
            );
            
            await _notificationService.NotifyTicketAssignedAsync(result);
            
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPatch("{ticketId}/status")]
    public async Task<ActionResult> UpdateStatus(
        Guid ticketId,
        [FromBody] UpdateStatusRequest request)
    {
        var userId = User.GetUserId();
        
        try
        {
            var result = await _ticketService.UpdateStatusAsync(
                ticketId,
                request.Status,
                request.Comment,
                userId
            );
            
            await _notificationService.NotifyStatusChangedAsync(result);
            
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{ticketId}/comments")]
    public async Task<ActionResult> AddComment(
        Guid ticketId,
        [FromBody] AddCommentRequest request)
    {
        var userId = User.GetUserId();
        
        var comment = await _ticketService.AddCommentAsync(
            ticketId,
            request.Content,
            request.IsInternal,
            userId
        );
        
        await _notificationService.NotifyNewCommentAsync(ticketId, comment);
        
        return CreatedAtAction(
            nameof(GetTicket),
            new { ticketId },
            comment
        );
    }

    [HttpPost("{ticketId}/rate")]
    public async Task<ActionResult> RateTicket(
        Guid ticketId,
        [FromBody] RateTicketRequest request)
    {
        var userId = User.GetUserId();
        
        try
        {
            await _ticketService.RateTicketAsync(
                ticketId,
                request.Rating,
                request.Feedback,
                userId
            );
            
            return Ok(new { message = "Thank you for your feedback" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
```

### TicketService.cs (Core Logic)
```csharp
public class TicketService : ITicketService
{
    private readonly ApplicationDbContext _context;
    private readonly ISlaService _slaService;
    private readonly IMapper _mapper;

    public async Task<TicketDetailDto> CreateTicketAsync(
        CreateTicketRequest request,
        Guid userId)
    {
        var ticketNumber = await GenerateTicketNumberAsync();
        
        var ticket = new Ticket
        {
            Id = Guid.NewGuid(),
            TicketNumber = ticketNumber,
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            Category = request.Category,
            Status = TicketStatus.Submitted,
            CreatedById = userId,
            DepartmentId = request.DepartmentId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tickets.Add(ticket);
        
        // Add attachments if any
        if (request.Attachments?.Any() == true)
        {
            foreach (var attachmentId in request.Attachments)
            {
                ticket.Attachments.Add(new TicketAttachment
                {
                    TicketId = ticket.Id,
                    FileId = attachmentId
                });
            }
        }

        await _context.SaveChangesAsync();
        
        return _mapper.Map<TicketDetailDto>(ticket);
    }

    public async Task<TicketDetailDto> TriageTicketAsync(
        Guid ticketId,
        string action,
        string newPriority,
        string reason,
        Guid managerId)
    {
        var ticket = await _context.Tickets
            .Include(t => t.CreatedBy)
            .FirstOrDefaultAsync(t => t.Id == ticketId);

        if (ticket == null)
            throw new NotFoundException("Ticket not found");

        if (ticket.Status != TicketStatus.Submitted && 
            ticket.Status != TicketStatus.Pending)
            throw new InvalidOperationException("Ticket cannot be triaged in current status");

        switch (action.ToLower())
        {
            case "accept":
                ticket.Status = TicketStatus.Triaged;
                ticket.Priority = Enum.Parse<TicketPriority>(newPriority, true);
                
                // Start SLA timer
                await _slaService.StartSlaTrackingAsync(ticket.Id);
                break;

            case "reject":
                ticket.Status = TicketStatus.Rejected;
                ticket.RejectionReason = reason;
                ticket.ClosedAt = DateTime.UtcNow;
                ticket.ClosedById = managerId;
                break;

            case "request_info":
                ticket.Status = TicketStatus.Pending;
                ticket.PendingReason = reason;
                break;

            default:
                throw new InvalidOperationException("Invalid triage action");
        }

        // Log activity
        ticket.ActivityLogs.Add(new ActivityLog
        {
            Action = "triaged",
            PerformedById = managerId,
            Details = $"Action: {action}, Reason: {reason}",
            Timestamp = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
        
        return _mapper.Map<TicketDetailDto>(ticket);
    }

    public async Task<TicketDetailDto> AssignTicketAsync(
        Guid ticketId,
        Guid assigneeId,
        string note,
        Guid assignedById)
    {
        var ticket = await _context.Tickets
            .Include(t => t.AssignedTo)
            .FirstOrDefaultAsync(t => t.Id == ticketId);

        if (ticket == null)
            throw new NotFoundException("Ticket not found");

        if (ticket.Status != TicketStatus.Triaged && 
            ticket.Status != TicketStatus.Assigned)
            throw new InvalidOperationException("Ticket cannot be assigned in current status");

        var oldAssigneeId = ticket.AssignedToId;
        
        ticket.AssignedToId = assigneeId;
        ticket.Status = TicketStatus.Assigned;
        ticket.AssignedAt = DateTime.UtcNow;

        // Log activity
        ticket.ActivityLogs.Add(new ActivityLog
        {
            Action = oldAssigneeId.HasValue ? "reassigned" : "assigned",
            PerformedById = assignedById,
            Details = $"Assigned to {assigneeId}. Note: {note}",
            Timestamp = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
        
        return _mapper.Map<TicketDetailDto>(ticket);
    }

    public async Task<TicketDetailDto> UpdateStatusAsync(
        Guid ticketId,
        string newStatus,
        string comment,
        Guid userId)
    {
        var ticket = await _context.Tickets.FindAsync(ticketId);

        if (ticket == null)
            throw new NotFoundException("Ticket not found");

        // Validate status transition
        if (!IsValidStatusTransition(ticket.Status, newStatus))
            throw new InvalidOperationException($"Cannot transition from {ticket.Status} to {newStatus}");

        var oldStatus = ticket.Status;
        ticket.Status = Enum.Parse<TicketStatus>(newStatus, true);

        // Handle specific status changes
        switch (ticket.Status)
        {
            case TicketStatus.InProgress:
                if (!ticket.StartedAt.HasValue)
                    ticket.StartedAt = DateTime.UtcNow;
                break;

            case TicketStatus.Resolved:
                ticket.ResolvedAt = DateTime.UtcNow;
                ticket.ResolvedById = userId;
                await _slaService.StopSlaTrackingAsync(ticket.Id);
                break;

            case TicketStatus.Closed:
                ticket.ClosedAt = DateTime.UtcNow;
                ticket.ClosedById = userId;
                break;
        }

        // Log activity
        ticket.ActivityLogs.Add(new ActivityLog
        {
            Action = "status_changed",
            PerformedById = userId,
            Details = $"Status: {oldStatus} → {newStatus}. Comment: {comment}",
            Timestamp = DateTime.UtcNow
        });

        // Add comment if provided
        if (!string.IsNullOrWhiteSpace(comment))
        {
            ticket.Comments.Add(new TicketComment
            {
                TicketId = ticket.Id,
                Content = comment,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            });
        }

        await _context.SaveChangesAsync();
        
        return _mapper.Map<TicketDetailDto>(ticket);
    }

    private bool IsValidStatusTransition(TicketStatus from, string to)
    {
        var validTransitions = new Dictionary<TicketStatus, string[]>
        {
            [TicketStatus.Assigned] = new[] { "in_progress" },
            [TicketStatus.InProgress] = new[] { "blocked", "resolved" },
            [TicketStatus.Blocked] = new[] { "in_progress" },
            [TicketStatus.Resolved] = new[] { "closed", "reopened" },
            [TicketStatus.Reopened] = new[] { "in_progress" }
        };

        return validTransitions.ContainsKey(from) && 
               validTransitions[from].Contains(to.ToLower());
    }

    private async Task<string> GenerateTicketNumberAsync()
    {
        var today = DateTime.UtcNow.Date;
        var prefix = $"TKT-{today:yyyyMMdd}";
        
        var count = await _context.Tickets
            .Where(t => t.TicketNumber.StartsWith(prefix))
            .CountAsync();

        return $"{prefix}-{(count + 1):D4}";
    }
}
```

---

## 💻 Web App (React + TypeScript)

### Tickets List Page
```typescript
// features/tickets/TicketsPage.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTicketsApi } from '@/api/endpoints/tickets';
import { TicketsList } from '@/components/tickets/TicketsList';
import { TicketsFilters } from '@/components/tickets/TicketsFilters';
import { CreateTicketButton } from '@/components/tickets/CreateTicketButton';

export const TicketsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedTo: '',
    page: 1,
    limit: 20
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => getTicketsApi(filters)
  });

  return (
    <div className="tickets-page">
      <div className="page-header">
        <h1>Support Tickets</h1>
        <CreateTicketButton />
      </div>

      <TicketsFilters filters={filters} onChange={setFilters} />

      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading tickets</div>}
      {data && (
        <TicketsList 
          tickets={data.data}
          pagination={data.pagination}
          onPageChange={(page) => setFilters(f => ({ ...f, page }))}
        />
      )}
    </div>
  );
};
```

### Ticket Detail Page
```typescript
// features/tickets/TicketDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTicketApi, 
  updateTicketStatusApi, 
  addCommentApi 
} from '@/api/endpoints/tickets';
import { TicketHeader } from '@/components/tickets/TicketHeader';
import { TicketInfo } from '@/components/tickets/TicketInfo';
import { TicketComments } from '@/components/tickets/TicketComments';
import { TicketActions } from '@/components/tickets/TicketActions';

export const TicketDetailPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const queryClient = useQueryClient();

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicketApi(ticketId!)
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: { status: string; comment: string }) =>
      updateTicketStatusApi(ticketId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
    }
  });

  const addCommentMutation = useMutation({
    mutationFn: (content: string) =>
      addCommentApi(ticketId!, { content, isInternal: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="ticket-detail-page">
      <TicketHeader ticket={ticket} />
      
      <div className="ticket-content">
        <div className="main-column">
          <TicketInfo ticket={ticket} />
          <TicketComments 
            comments={ticket.comments}
            onAddComment={(content) => addCommentMutation.mutate(content)}
          />
        </div>

        <div className="sidebar-column">
          <TicketActions 
            ticket={ticket}
            onUpdateStatus={(status, comment) => 
              updateStatusMutation.mutate({ status, comment })
            }
          />
        </div>
      </div>
    </div>
  );
};
```

### Ticket Card Component
```typescript
// components/tickets/TicketCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from '@/types/ticket.types';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SlaIndicator } from '@/components/common/SlaIndicator';

interface Props {
  ticket: Ticket;
}

export const TicketCard: React.FC<Props> = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="ticket-card"
      onClick={() => navigate(`/tickets/${ticket.id}`)}
    >
      <div className="ticket-card-header">
        <span className="ticket-number">{ticket.ticketNumber}</span>
        <SlaIndicator status={ticket.sla.status} />
      </div>

      <h3 className="ticket-title">{ticket.title}</h3>

      <div className="ticket-meta">
        <PriorityBadge priority={ticket.priority} />
        <StatusBadge status={ticket.status} />
      </div>

      <div className="ticket-assignee">
        {ticket.assignedTo ? (
          <>
            <img src={ticket.assignedTo.avatar} alt="" />
            <span>{ticket.assignedTo.fullName}</span>
          </>
        ) : (
          <span className="unassigned">Unassigned</span>
        )}
      </div>

      <div className="ticket-footer">
        <span className="created-date">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
        <span className="sla-time">
          {ticket.sla.remainingMinutes > 0 
            ? `${ticket.sla.remainingMinutes}m remaining`
            : 'Breached'}
        </span>
      </div>
    </div>
  );
};
```

### 🎨 UI Implementation Details

#### Component Reuse Pattern

**TicketsListPage & TicketDetailPage Shared Components:**
- `EditTicketForm`: Shared modal form for editing ticket properties (title, description, priority, category, tags)
- `AssignTicketModal`: Shared modal for assigning tickets to users
- Both components imported from `TicketsListPage` into `TicketDetailPage` to avoid duplication

**Implementation:**
```typescript
// In TicketDetailPage.tsx
import { EditTicketForm } from '../TicketsListPage/EditTicketForm';
import { AssignTicketModal } from '../TicketsListPage/AssignTicketModal';

// Handler functions
const handleEdit = () => {
  dispatch(uiActions.openSlideout({
    id: 'edit-ticket',
    title: 'Edit Ticket',
    component: 'EditTicketForm',
    width: 'medium'
  }));
};

const handleAssign = () => {
  dispatch(uiActions.openModal({
    id: 'assign-ticket',
    title: 'Assign Ticket',
    component: 'AssignTicketModal'
  }));
};

const handleEditSuccess = () => {
  dispatch(uiActions.closeSlideout('edit-ticket'));
  // Refresh ticket data
};

const handleAssignSuccess = () => {
  dispatch(uiActions.closeModal('assign-ticket'));
  // Refresh ticket data
};
```

#### TicketDetailPage Component Structure

**Main Page Component:**
- Location: `src/pages/TicketDetailPage/TicketDetailPage.tsx`
- Purpose: Full-page view with tabs, sidebar, and action handlers
- State Management: Uses Redux slices (tickets, ui, auth)
- Routing: React Router with `useParams()` to get ticket ID from URL `/tickets/:id`

**Child Components:**
1. **TicketHeader**: Displays ticket number, status badge, priority badge, SLA countdown
   - Styled with `TicketHeader.module.css`
   - Shows formatted SLA time remaining

2. **TicketInfo**: Shows ticket details in grid layout
   - Title, description, category, department, tags
   - Category and department rendered as badges
   - Tags displayed as chip array

3. **TicketTabs**: Tab navigation container with content switching
   - Tabs: Chat, Comments, Activity, Attachments
   - State: `const [activeTab, setActiveTab] = useState('chat')`
   - Renders appropriate tab component based on `activeTab`

4. **TicketSidebar**: Right sidebar with contextual information
   - SLA countdown with visual progress bar
   - Requestor and assignee user cards with avatars
   - Related tickets list with clickable links
   - Calculates SLA percentage: `(remainingMinutes / totalMinutes) * 100`

**Tab Components (in subdirectories):**
- `tabs/ChatTab`: Real-time messaging interface (mock messages for now)
- `tabs/CommentsTab`: Comment threads with post form
- `tabs/ActivityTab`: Timeline of ticket events with icons and colors
- `tabs/AttachmentsTab`: File list with upload/download UI

#### Permission-Based Action Buttons

**Logic Pattern:**
```typescript
const canEdit = user?.role === UserRole.ADMIN || 
                user?.role === UserRole.MANAGER ||
                ticket.assignedToId === user?.id;

const canAssign = user?.role === UserRole.ADMIN || 
                  user?.role === UserRole.MANAGER;

const canResolve = (user?.role === UserRole.ADMIN || 
                    user?.role === UserRole.MANAGER ||
                    ticket.assignedToId === user?.id) &&
                   (ticket.status === TicketStatus.IN_PROGRESS || 
                    ticket.status === TicketStatus.PENDING);

const canClose = user?.role === UserRole.ADMIN || 
                 user?.role === UserRole.MANAGER;
```

**Action Buttons Rendered:**
- Edit: Shown if `canEdit === true`
- Assign: Shown if `canAssign === true`
- Resolve: Shown if `canResolve === true`
- Close: Shown if `canClose === true`
- Print: Always shown for all users

#### Service Layer Architecture

**Pattern:**
All services use environment-based mock data switching:
```typescript
const USE_MOCK_DATA = import.meta.env.DEV && !import.meta.env.VITE_API_URL;

if (USE_MOCK_DATA) {
  return mockData;
}
return await apiClient.get(endpoint);
```

**Services Implemented:**

1. **commentService.ts**:
   - `getComments(ticketId)`: Fetch all comments for a ticket
   - `createComment(ticketId, data)`: Post new comment
   - `updateComment(ticketId, commentId, data)`: Edit existing comment
   - `deleteComment(ticketId, commentId)`: Remove comment
   - Mock data includes user info, timestamps, mentions

2. **attachmentService.ts**:
   - `getAttachments(ticketId)`: List all files
   - `uploadAttachment(ticketId, file)`: Upload with multipart form data
   - `downloadAttachment(ticketId, attachmentId)`: Returns Blob
   - `deleteAttachment(ticketId, attachmentId)`: Remove file
   - Helper functions: `getFileTypeFromMime()`, `getFileIcon()`, `formatFileSize()`

3. **activityService.ts**:
   - `getActivities(ticketId)`: Retrieve activity timeline
   - `generateMockActivities()`: Creates realistic event history
   - Helper functions: `getActivityIcon()`, `getActivityColor()` for UI styling
   - Activity types: created, assigned, status_changed, priority_changed, comment_added, etc.

**Models:**
- `Comment.ts`: Interface with mentions support, CreateCommentRequest, UpdateCommentRequest
- `Attachment.ts`: Interface with file metadata, helpers for icon/size display
- `Activity.ts`: Interface with ActivityType enum, helpers for timeline rendering

#### Tab Implementation Details

**Chat Tab:**
- Mock real-time messages with avatar colors
- Message history display (scrollable)
- Input form with submit handler
- Future: WebSocket/MQTT integration for live updates

**Comments Tab:**
- Comment list with `formatTimeAgo()` helper
- Textarea for new comments
- Submit button calls `createComment()` service
- Future: Edit/delete actions for own comments

**Activity Tab:**
- Timeline layout with vertical line connector
- `getActivityIcon()` maps activity types to FontAwesome icons
- `getActivityColor()` applies semantic colors (blue, green, orange, red)
- Chronological display (newest first)

**Attachments Tab:**
- File list with icons based on MIME type
- Upload button triggers hidden `<input type="file" ref={fileInputRef} />`
- Download/Delete actions per file
- File type detection and icon mapping

#### Navigation Pattern

**From List to Detail:**
```typescript
// In TicketsListPage/index.tsx
const handleView = (id: UUID) => {
  navigate(`/tickets/${id}`);
};

// Renders as:
<button onClick={() => handleView(ticket.id)}>View</button>
```

**Route Configuration:**
```typescript
// In App.tsx
<Route path="tickets/:id" element={<TicketDetailPage />} />
```

**Back Navigation:**
```typescript
// In TicketDetailPage.tsx
const navigate = useNavigate();
const handleBack = () => {
  navigate('/tickets');
};
```

#### Implementation Best Practices

1. **Component Reuse**: Always check if similar functionality exists in another page before creating new components
2. **Permission Checks**: Gate all action buttons with role/status validation
3. **Mock Data Support**: Use environment flag to enable frontend development without backend
4. **Tab State Management**: Use local state for tab switching, not Redux (avoid unnecessary global state)
5. **Service Layer**: Centralize API calls in service files for testability and mock data switching
6. **CSS Modules**: Scope styles per component with `.module.css` files
7. **Type Safety**: Define TypeScript interfaces for all models (Comment, Attachment, Activity)
8. **Helper Functions**: Extract utility functions (formatTimeAgo, getFileIcon) for reuse
9. **Error Handling**: Wrap API calls in try-catch blocks, show error states in UI
10. **Loading States**: Display loading indicators during API requests

#### Future Enhancements

- Real-time updates via WebSocket/MQTT for Chat tab
- Resolve/Close workflow modals with comment/solution fields
- Print-friendly view CSS
- Attachment preview (images, PDFs)
- Comment editing and deletion UI
- Rich text editor for comments (markdown or WYSIWYG)
- File drag-and-drop upload
- Activity filtering (show only status changes, only comments, etc.)

---

## 📱 Mobile App (React Native)

### Tickets List Screen
```typescript
// screens/tickets/TicketsListScreen.tsx
import React, { useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getTicketsApi } from '@/api/endpoints/tickets';
import { TicketCard } from '@/components/tickets/TicketCard';
import { FAB } from '@/components/common/FAB';

export const TicketsListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['tickets', { status: 'all' }],
    queryFn: () => getTicketsApi({ limit: 50 })
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.data || []}
        renderItem={({ item }) => (
          <TicketCard
            ticket={item}
            onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No tickets found</Text>
          </View>
        }
      />

      <FAB
        icon="plus"
        onPress={() => navigation.navigate('CreateTicket')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});
```

### Ticket Detail Screen  
```typescript
// screens/tickets/TicketDetailScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getTicketApi } from '@/api/endpoints/tickets';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ActionSheet } from '@/components/common/ActionSheet';

export const TicketDetailScreen = ({ route, navigation }) => {
  const { ticketId } = route.params;
  const [showActions, setShowActions] = useState(false);

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicketApi(ticketId)
  });

  if (isLoading) return <View><Text>Loading...</Text></View>;
  if (!ticket) return <View><Text>Ticket not found</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
          <TouchableOpacity onPress={() => setShowActions(true)}>
            <Text>Actions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badges}>
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>{ticket.title}</Text>
          <Text style={styles.description}>{ticket.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assigned To</Text>
          {ticket.assignedTo ? (
            <View style={styles.assignee}>
              <Image source={{ uri: ticket.assignedTo.avatar }} style={styles.avatar} />
              <Text>{ticket.assignedTo.fullName}</Text>
            </View>
          ) : (
            <Text style={styles.unassigned}>Unassigned</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comments ({ticket.comments.length})</Text>
          {ticket.comments.map(comment => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentUser}>{comment.user.fullName}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <Text style={styles.commentTime}>
                {new Date(comment.createdAt).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <ActionSheet
        visible={showActions}
        onClose={() => setShowActions(false)}
        actions={[
          { label: 'Start Working', onPress: () => {/* Update status */} },
          { label: 'Add Comment', onPress: () => navigation.navigate('AddComment', { ticketId }) },
          { label: 'Attach File', onPress: () => {/* Open file picker */} },
          { label: 'Take Photo', onPress: () => navigation.navigate('Camera', { ticketId }) }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  ticketNumber: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    padding: 16
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333'
  },
  assignee: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  unassigned: {
    color: '#999',
    fontStyle: 'italic'
  },
  comment: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  commentUser: {
    fontWeight: '600',
    marginBottom: 4
  },
  commentContent: {
    marginBottom: 4
  },
  commentTime: {
    fontSize: 12,
    color: '#999'
  }
});
```

---

## 🗄️ Database Schema

### Tickets Table
```sql
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    
    created_by_id UUID REFERENCES users(id),
    assigned_to_id UUID REFERENCES users(id),
    department_id UUID REFERENCES departments(id),
    
    assigned_at TIMESTAMP,
    started_at TIMESTAMP,
    resolved_at TIMESTAMP,
    resolved_by_id UUID REFERENCES users(id),
    closed_at TIMESTAMP,
    closed_by_id UUID REFERENCES users(id),
    
    rejection_reason TEXT,
    pending_reason TEXT,
    
    rating INT CHECK (rating >= 1 AND rating <= 5),
    rating_feedback TEXT,
    rated_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to_id);
CREATE INDEX idx_tickets_created_by ON tickets(created_by_id);
CREATE INDEX idx_tickets_department ON tickets(department_id);
CREATE INDEX idx_tickets_created_at ON tickets(created_at DESC);
```

### Ticket Comments Table
```sql
CREATE TABLE ticket_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ticket_comments_ticket ON ticket_comments(ticket_id);
CREATE INDEX idx_ticket_comments_created_at ON ticket_comments(created_at);
```

### Ticket Attachments Table
```sql
CREATE TABLE ticket_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(1000) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ticket_attachments_ticket ON ticket_attachments(ticket_id);
```

### Activity Logs Table
```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    performed_by_id UUID REFERENCES users(id),
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp DESC);
```

---

## 📐 Business Rules

### BR-TICKET-001: Ticket Number Generation
- Format: TKT-YYYYMMDD-XXXX
- Sequential within each day
- Example: TKT-20240324-0001

### BR-TICKET-002: Status Transitions
**Valid transitions:**
- SUBMITTED → TRIAGED, REJECTED, PENDING
- PENDING → SUBMITTED
- TRIAGED → ASSIGNED
- ASSIGNED → IN_PROGRESS
- IN_PROGRESS → BLOCKED, RESOLVED
- BLOCKED → IN_PROGRESS
- RESOLVED → CLOSED, REOPENED
- REOPENED → IN_PROGRESS

### BR-TICKET-003: Priority Re-evaluation
- Manager có thể adjust priority during triage
- Priority thay đổi trigger SLA recalculation
- User được notify nếu priority tăng/giảm

### BR-TICKET-004: Assignment Rules
- Chỉ Manager/TeamLead có thể assign
- Không thể assign ticket REJECTED hoặc CLOSED
- Staff nhận notification khi được assign
- Reassignment requires reason

### BR-TICKET-005: Resolution & Rating
- Chỉ assigned staff có thể mark RESOLVED
- Requester hoặc Manager approve resolution
- Rating chỉ available sau khi CLOSED
- Rating scale: 1-5 stars

### BR-TICKET-006: Access Control
- Creator có thể view ticket bất kỳ lúc nào
- Assigned staff có full access
- Manager có thể view all tickets trong department
- Internal comments chỉ visible cho staff/manager

---

## 📋 API Endpoints Implementation Checklist

### Core Endpoints (Phase 1) ✅
- [x] `GET /api/tickets` - List with filters ✅ IMPLEMENTED
- [x] `POST /api/tickets` - Create ticket ✅ IMPLEMENTED
- [x] `GET /api/tickets/{id}` - Get details ✅ IMPLEMENTED
- [x] `PUT /api/tickets/{id}` - Update ticket ✅ IMPLEMENTED
- [x] `DELETE /api/tickets/{id}` - Delete ticket ✅ IMPLEMENTED
- [x] `POST /api/tickets/{id}/assign` - Assign to user ✅ IMPLEMENTED
- [x] `GET /api/tickets/stats` - Get statistics ✅ IMPLEMENTED (Mock)

### Triage Endpoints (Phase 2) 🔄
- [ ] `PATCH /api/tickets/{id}/triage` - Triage workflow ⬜ TODO
  - Actions: accept, reject, request_info
  - Body: `{ action, priority?, reason? }`
  - Response: Updated ticket with new status

### Help Request Endpoints (Phase 3) ⬜
- [ ] `POST /api/tickets/{id}/request-help` - Staff requests help ⬜ TODO
  - Body: `{ description, suggestedHelperId? }`
  - Response: Ticket with HELP_REQUESTED status
- [ ] `POST /api/tickets/{id}/assign-helper` - Manager assigns helper ⬜ TODO
  - Body: `{ helperId }`
  - Response: Ticket with SUPPORT_ASSIGNED status
- [ ] `DELETE /api/tickets/{id}/helpers/{helperId}` - Remove helper ⬜ TODO

### Status Management Endpoints (Phase 4) ⬜
- [ ] `PATCH /api/tickets/{id}/status` - Update status with validation ⬜ NEEDS ENHANCEMENT
  - Current: Basic status update exists
  - Needed: Add validation, comment, solution fields
  - Body: `{ status, comment?, solution? }`

### Comments Endpoints (Phase 5) ⬜
- [ ] `GET /api/tickets/{id}/comments` - Get all comments ⬜ TODO
- [ ] `POST /api/tickets/{id}/comments` - Add comment ⬜ TODO
  - Body: `{ content, isInternal }`

### Attachments Endpoints (Phase 5) ⬜
- [ ] `GET /api/tickets/{id}/attachments` - List attachments ⬜ TODO
- [ ] `POST /api/tickets/{id}/attachments` - Upload file ⬜ TODO
  - multipart/form-data
- [ ] `GET /api/tickets/{id}/attachments/{attachmentId}/download` - Download ⬜ TODO
- [ ] `DELETE /api/tickets/{id}/attachments/{attachmentId}` - Delete ⬜ TODO

### Rating Endpoints (Phase 6) ⬜
- [ ] `POST /api/tickets/{id}/rate` - Rate closed ticket ⬜ TODO
  - Body: `{ rating: 1-5, feedback? }`
  - Auto-closes ticket after rating

### Activity Log Endpoints (Phase 7) ⬜
- [ ] `GET /api/tickets/{id}/activity` - Get activity log ⬜ TODO

---

## 🔗 Related Features

- [Task Management](./03-task-management.md)
- [SLA Management](./05-sla-management.md)
- [Dashboard](./06-dashboard.md)
- [Notifications](./07-notifications.md)
- [File Management](./09-file-management.md)

---

**Version**: 1.1.0  
**Last Updated**: March 26, 2026  
**Status**: 🔄 Phase 1 Complete (43%) - Phase 2 In Progress

**Implementation Progress:**
- ✅ Phase 1: Basic CRUD (100%)
- 🔄 Phase 2: Triage Workflow (0%)  
- ⬜ Phase 3: Help Request System (0%)
- ⬜ Phase 4: Status Management (0%)
- ⬜ Phase 5: Comments & Attachments (0%)
- ⬜ Phase 6: Rating System (0%)

**Next Milestone:** Complete Triage Workflow (Phase 2)  
**See Implementation Plan:** [FEAT-001-tickets-list.md](../plans/FEAT-001-tickets-list.md)
