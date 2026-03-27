# API Reference - Quick Guide

## 🔑 Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response 200:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "staff",
    "department": { ... }
  }
}
```

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer {accessToken}
```

---

## 🎫 Tickets API

### List Tickets
```http
GET /api/tickets?status=in_progress&priority=high&page=1&limit=20
Authorization: Bearer {accessToken}

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "ticketNumber": "TKT-20240324-0001",
      "title": "Server issue in Lab",
      "description": "...",
      "status": "in_progress",
      "priority": "high",
      "category": "technical",
      "createdBy": { ... },
      "assignedTo": { ... },
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

### Create Ticket
```http
POST /api/tickets
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Printer not working in ER",
  "description": "The main printer in Emergency Room is not responding",
  "priority": "high",
  "category": "technical",
  "departmentId": "uuid"
}

Response 201:
{
  "id": "uuid",
  "ticketNumber": "TKT-20240324-0002",
  "title": "Printer not working in ER",
  "status": "submitted",
  "priority": "high",
  ...
}
```

### Get Ticket Detail
```http
GET /api/tickets/{ticketId}
Authorization: Bearer {accessToken}

Response 200:
{
  "id": "uuid",
  "ticketNumber": "TKT-20240324-0001",
  "title": "...",
  "description": "...",
  "status": "in_progress",
  "priority": "high",
  "createdBy": {
    "id": "uuid",
    "fullName": "John Doe",
    "avatar": "..."
  },
  "assignedTo": {
    "id": "uuid",
    "fullName": "Jane Smith"
  },
  "comments": [ ... ],
  "attachments": [ ... ],
  "activityLogs": [ ... ]
}
```

### Update Ticket Status
```http
PATCH /api/tickets/{ticketId}/status
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "status": "resolved",
  "comment": "Issue fixed by replacing toner cartridge"
}

Response 200: { updated ticket }
```

### Assign Ticket
```http
PATCH /api/tickets/{ticketId}/assign
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "assigneeId": "uuid"
}

Response 200: { updated ticket }
```

### Add Comment
```http
POST /api/tickets/{ticketId}/comments
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "content": "I've checked the printer and found the issue",
  "parentCommentId": "uuid" // optional, for threaded replies
}

Response 201:
{
  "id": "uuid",
  "content": "...",
  "user": { ... },
  "createdAt": "2024-03-24T12:00:00Z"
}
```

### Upload Attachment
```http
POST /api/tickets/{ticketId}/attachments
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

file: [binary file data]

Response 201:
{
  "id": "uuid",
  "fileName": "screenshot.png",
  "fileUrl": "https://s3.amazonaws.com/...",
  "fileSize": 1048576,
  "mimeType": "image/png"
}
```

---

## 📋 Tasks API

### List Tasks
```http
GET /api/tasks?status=in_progress&assignedTo=me&page=1&limit=20
Authorization: Bearer {accessToken}

Query Parameters:
- status: created|assigned|in_progress|review|completed|cancelled
- priority: low|medium|high|critical
- assignedTo: me|{userId}|unassigned
- teamId: {teamId}
- page: number
- limit: number
- sortBy: createdAt|deadline|priority
- sortOrder: asc|desc

Response 200:
{
  "data": [ ... ],
  "pagination": { ... }
}
```

### Create Task
```http
POST /api/tasks
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Update patient records system",
  "description": "Migrate old records to new format",
  "priority": "medium",
  "status": "created",
  "deadline": "2024-04-01T23:59:59Z",
  "estimatedHours": 16,
  "tags": ["migration", "database", "urgent"],
  "assignedTo": "uuid", // optional
  "teamId": "uuid", // optional
  "checklist": [
    { "title": "Backup old data", "displayOrder": 1 },
    { "title": "Test migration script", "displayOrder": 2 },
    { "title": "Run migration", "displayOrder": 3 }
  ]
}

Response 201: { created task }
```

### Get Task Detail
```http
GET /api/tasks/{taskId}
Authorization: Bearer {accessToken}

Response 200:
{
  "id": "uuid",
  "taskNumber": "TSK-20240324-0001",
  "title": "...",
  "description": "...",
  "status": "in_progress",
  "priority": "medium",
  "progress": 65,
  "deadline": "2024-04-01T23:59:59Z",
  "estimatedHours": 16,
  "actualHours": 10.5,
  "tags": ["migration", "database"],
  "createdBy": { ... },
  "assignedTo": { ... },
  "checklist": [
    {
      "id": "uuid",
      "title": "Backup old data",
      "isCompleted": true,
      "completedAt": "2024-03-24T10:00:00Z"
    },
    ...
  ],
  "comments": [ ... ],
  "workLogs": [ ... ]
}
```

### Update Task Progress
```http
PATCH /api/tasks/{taskId}/progress
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "progress": 75,
  "status": "in_progress",
  "comment": "Completed data backup and migration script testing"
}

Response 200: { updated task }
```

### Assign Task
```http
PATCH /api/tasks/{taskId}/assign
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "assigneeId": "uuid",
  "reason": "John has more experience with database migrations"
}

Response 200: { updated task }
```

### Self-Pick Task (from pool)
```http
POST /api/tasks/{taskId}/claim
Authorization: Bearer {accessToken}

Response 200: { updated task with status "claimed" or "assigned" }
```

### Update Checklist Item
```http
PATCH /api/tasks/{taskId}/checklist/{checklistItemId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "isCompleted": true
}

Response 200: { updated checklist item }
```

### Log Work Hours
```http
POST /api/tasks/{taskId}/work-logs
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "hours": 4.5,
  "date": "2024-03-24",
  "description": "Database migration and testing"
}

Response 201: { created work log }
```

### Submit for Review
```http
PATCH /api/tasks/{taskId}/submit-review
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "comment": "Task completed, ready for review"
}

Response 200: { task with status "review" }
```

### Review Task (Manager/Lead)
```http
POST /api/tasks/{taskId}/review
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "action": "approve", // or "request_changes" or "reject"
  "comment": "Great work! Approved.",
  "rating": 5 // optional, 1-5 stars
}

Response 200: { updated task }
```

---

## 👥 Users API

### List Users
```http
GET /api/users?role=staff&departmentId=uuid&page=1&limit=50
Authorization: Bearer {accessToken}

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "avatar": "https://...",
      "role": "staff",
      "department": { ... },
      "isActive": true
    }
  ],
  "pagination": { ... }
}
```

### Get User Profile
```http
GET /api/users/{userId}
Authorization: Bearer {accessToken}

Response 200:
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "avatar": "https://...",
  "phone": "+84901234567",
  "role": "staff",
  "department": {
    "id": "uuid",
    "name": "IT Department"
  },
  "teams": [ ... ],
  "stats": {
    "totalTickets": 45,
    "completedTasks": 32,
    "avgRating": 4.5
  }
}
```

### Update Profile
```http
PATCH /api/users/{userId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fullName": "John Doe Jr.",
  "phone": "+84901234568",
  "avatar": "https://..."
}

Response 200: { updated user }
```

### Save FCM Token (Mobile)
```http
POST /api/users/fcm-token
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "token": "firebase-fcm-token-here",
  "platform": "ios" // or "android"
}

Response 200: { success: true }
```

---

## 🔔 Notifications API

### List Notifications
```http
GET /api/notifications?isRead=false&page=1&limit=20
Authorization: Bearer {accessToken}

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "type": "assignment",
      "title": "New ticket assigned",
      "message": "Ticket TKT-20240324-0001 has been assigned to you",
      "entityType": "ticket",
      "entityId": "uuid",
      "isRead": false,
      "createdAt": "2024-03-24T10:30:00Z"
    }
  ],
  "unreadCount": 8,
  "pagination": { ... }
}
```

### Mark as Read
```http
PATCH /api/notifications/{notificationId}/read
Authorization: Bearer {accessToken}

Response 200: { updated notification }
```

### Mark All as Read
```http
PATCH /api/notifications/read-all
Authorization: Bearer {accessToken}

Response 200: { success: true, count: 8 }
```

---

## 📊 Dashboard & Reports API

### Get Dashboard Stats
```http
GET /api/dashboard/stats
Authorization: Bearer {accessToken}

Response 200:
{
  "tickets": {
    "total": 150,
    "submitted": 12,
    "inProgress": 35,
    "resolved": 90,
    "closed": 103
  },
  "tasks": {
    "total": 80,
    "assigned": 15,
    "inProgress": 25,
    "completed": 40
  },
  "myWorkload": {
    "openTickets": 5,
    "openTasks": 3,
    "overdueItems": 1
  },
  "teamPerformance": {
    "avgResolutionTime": "4.5 hours",
    "completionRate": 85.5,
    "satisfactionRating": 4.3
  }
}
```

### Get Reports
```http
GET /api/reports/tickets?startDate=2024-03-01&endDate=2024-03-31&departmentId=uuid
Authorization: Bearer {accessToken}

Response 200:
{
  "summary": {
    "totalTickets": 120,
    "avgResolutionTime": "6.2 hours",
    "slaCompliance": 92.5,
    "avgRating": 4.4
  },
  "byStatus": { ... },
  "byPriority": { ... },
  "byCategory": { ... },
  "timelineData": [ ... ]
}
```

---

## 🔍 Search API

### Global Search
```http
GET /api/search?q=printer&type=tickets,tasks&page=1&limit=20
Authorization: Bearer {accessToken}

Query Parameters:
- q: search query
- type: tickets|tasks|users (comma-separated)
- filters: JSON stringified filters

Response 200:
{
  "tickets": [
    {
      "id": "uuid",
      "type": "ticket",
      "title": "Printer not working...",
      "highlights": {
        "title": "<em>Printer</em> not working...",
        "description": "The <em>printer</em> in..."
      },
      "score": 0.95
    }
  ],
  "tasks": [ ... ],
  "totalResults": 15
}
```

---

## 🏢 Departments & Teams API

### List Departments
```http
GET /api/departments
Authorization: Bearer {accessToken}

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "name": "IT Department",
      "description": "...",
      "manager": { ... },
      "memberCount": 12
    }
  ]
}
```

### List Teams
```http
GET /api/teams?departmentId=uuid
Authorization: Bearer {accessToken}

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "name": "Infrastructure Team",
      "department": { ... },
      "lead": { ... },
      "members": [ ... ]
    }
  ]
}
```

---

## 📁 Files API

### Upload File
```http
POST /api/files/upload
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

file: [binary file data]
entityType: ticket|task|comment
entityId: uuid

Response 201:
{
  "id": "uuid",
  "fileName": "document.pdf",
  "fileUrl": "https://s3.amazonaws.com/...",
  "fileSize": 2097152,
  "mimeType": "application/pdf",
  "uploadedBy": { ... },
  "createdAt": "2024-03-24T10:30:00Z"
}
```

### Get Presigned URL (for direct S3 upload)
```http
POST /api/files/presigned-url
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fileName": "screenshot.png",
  "fileType": "image/png",
  "fileSize": 1048576
}

Response 200:
{
  "uploadUrl": "https://s3.amazonaws.com/...",
  "fileUrl": "https://s3.amazonaws.com/...",
  "expiresIn": 3600
}
```

---

## 🔧 WebSocket Events

### Client → Server

#### Join Room
```javascript
socket.emit('join', { userId: 'uuid' });
```

#### Subscribe to Entity Updates
```javascript
socket.emit('subscribe', { 
  entityType: 'ticket', 
  entityId: 'uuid' 
});
```

### Server → Client

#### Ticket Updated
```javascript
socket.on('ticket:updated', (data) => {
  // data: { ticketId, ticket, previousStatus, newStatus }
});
```

#### Task Updated
```javascript
socket.on('task:updated', (data) => {
  // data: { taskId, task, updateType }
});
```

#### New Assignment
```javascript
socket.on('assignment:new', (data) => {
  // data: { type, entityId, entity }
});
```

#### New Comment
```javascript
socket.on('comment:new', (data) => {
  // data: { entityType, entityId, comment, user }
});
```

#### New Message (Chat)
```javascript
socket.on('message:new', (data) => {
  // data: { message, sender }
});
```

---

## 🚨 Error Responses

### Standard Error Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## 📝 Request Headers

### Required Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Optional Headers
```
X-Request-ID: unique-request-id
X-Client-Version: 1.0.0
X-Client-Platform: web|ios|android
Accept-Language: vi|en
```

---

## 🔐 Rate Limiting

Default limits:
- **Authenticated**: 100 requests per 15 minutes
- **Unauthenticated**: 20 requests per 15 minutes

Response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1711272000
```

When rate limit exceeded (429):
```json
{
  "statusCode": 429,
  "message": "Too many requests, please try again later",
  "retryAfter": 300
}
```

---

## 📱 Mobile-specific Endpoints

### Check App Version
```http
GET /api/mobile/version-check?platform=ios&version=1.0.0
Authorization: Bearer {accessToken}

Response 200:
{
  "isLatest": false,
  "latestVersion": "1.1.0",
  "updateRequired": false,
  "updateUrl": "https://apps.apple.com/..."
}
```

### Sync Offline Queue
```http
POST /api/mobile/sync
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "actions": [
    {
      "type": "create_ticket",
      "data": { ... },
      "timestamp": 1711200000000
    },
    {
      "type": "update_task",
      "data": { ... },
      "timestamp": 1711200300000
    }
  ]
}

Response 200:
{
  "processed": 2,
  "failed": 0,
  "results": [ ... ]
}
```

---

## 🚨 SLA & Escalation API

### Get SLA Status for Ticket
```http
GET /api/tickets/{ticketId}/sla-status
Authorization: Bearer {accessToken}

Response 200:
{
  "ticketId": "uuid",
  "ticketNumber": "TKT-20240324-0001",
  "priority": "critical",
  "status": "in_progress",
  "sla": {
    "responseTime": {
      "deadlineMinutes": 5,
      "elapsedMinutes": 3,
      "percentRemaining": 40,
      "status": "warning",
      "color": "yellow",
      "dueAt": "2024-03-24T10:35:00Z",
      "breached": false
    },
    "resolveTime": {
      "deadlineMinutes": 120,
      "elapsedMinutes": 45,
      "percentRemaining": 62.5,
      "status": "safe",
      "color": "green",
      "dueAt": "2024-03-24T12:30:00Z",
      "breached": false
    }
  },
  "escalations": [
    {
      "type": "warning",
      "timestamp": "2024-03-24T10:33:00Z",
      "message": "Approaching response SLA deadline"
    }
  ]
}
```

### Get SLA Dashboard
```http
GET /api/sla/dashboard
Authorization: Bearer {accessToken}

Query Parameters:
- departmentId: UUID (optional)
- startDate: ISO date
- endDate: ISO date

Response 200:
{
  "summary": {
    "totalTickets": 150,
    "slaCompliance": 92.5,
    "breachedTickets": 11,
    "avgResponseTime": "8 minutes",
    "avgResolveTime": "3.2 hours"
  },
  "byPriority": {
    "critical": {
      "total": 20,
      "compliant": 18,
      "breached": 2,
      "complianceRate": 90
    },
    "high": {
      "total": 45,
      "compliant": 42,
      "breached": 3,
      "complianceRate": 93.3
    },
    "medium": { ... },
    "low": { ... }
  },
  "atRisk": [
    {
      "ticketId": "uuid",
      "ticketNumber": "TKT-20240324-0005",
      "priority": "critical",
      "status": "in_progress",
      "percentRemaining": 15,
      "minutesUntilBreach": 18
    }
  ],
  "recentBreaches": [
    {
      "ticketId": "uuid",
      "ticketNumber": "TKT-20240324-0002",
      "breachType": "resolve",
      "breachedAt": "2024-03-24T09:00:00Z",
      "breachDuration": "15 minutes",
      "action": "auto_reassigned"
    }
  ]
}
```

### Request Manual Reassignment
```http
POST /api/tickets/{ticketId}/request-reassignment
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "reason": "Staff unavailable due to emergency",
  "suggestedAssignee": "uuid", // optional
  "urgent": true
}

Response 200:
{
  "requestId": "uuid",
  "status": "pending_approval",
  "approver": {
    "id": "uuid",
    "fullName": "Manager Name"
  },
  "message": "Reassignment request submitted for approval"
}
```

### Manager Approve Reassignment (REQUIRED for ALL reassignments)
```http
POST /api/tickets/{ticketId}/manager-reassign
Authorization: Bearer {accessToken} (Manager role required)
Content-Type: application/json

{
  "newAssignee": "uuid",
  "reason": "SLA breach - reassigning to staff with relevant experience",
  "notifyDirector": true, // for CRITICAL tickets
  "comment": "John has handled 45 similar tickets with 4.8 rating"
}

Response 200:
{
  "status": "reassigned",
  "ticket": { updated ticket object },
  "notifications": {
    "oldAssignee": "notified",
    "newAssignee": "notified",
    "director": "notified"
  },
  "message": "Ticket reassigned successfully by Manager"
}
```

### Manager Decide to Keep Current Assignee
```http
POST /api/tickets/{ticketId}/manager-decision
Authorization: Bearer {accessToken} (Manager role required)
Content-Type: application/json

{
  "decision": "keep_current_assignee",
  "reason": "Staff is close to resolving, estimated 30 more minutes",
  "slaExtension": 60, // optional: extend SLA by 60 minutes
  "requireProgressUpdate": true // require staff to update within X minutes
}

Response 200:
{
  "status": "decision_recorded",
  "ticket": { updated ticket object },
  "message": "Manager decided to keep current assignee"
}
```

### Get Reassignment Candidates (Manager Only)
```http
GET /api/tickets/{ticketId}/reassignment-candidates
Authorization: Bearer {accessToken}

Response 200:
{
  "ticketInfo": {
    "id": "uuid",
    "ticketNumber": "TKT-20240324-0001",
    "priority": "critical",
    "category": "technical",
    "currentAssignee": {
      "id": "uuid",
      "fullName": "Current Staff",
      "stats": {
        "avgRating": 4.2,
        "currentWorkload": 8,
        "timeOnThisTicket": "2.5 hours"
      }
    },
    "slaBreach": {
      "breached": true,
      "breachType": "resolve",
      "breachedBy": "30 minutes"
    }
  },
  "suggestedCandidates": [
    {
      "id": "uuid",
      "fullName": "John Doe",
      "avatar": "https://...",
      "phone": "+84901234567",
      "department": "IT Support",
      "stats": {
        "avgRating": 4.8,
        "currentWorkload": 3,
        "similarTicketsResolved": 45,
        "avgResolutionTime": "2.5 hours"
      },
      "availability": "online",
      "matchScore": 95,
      "reason": "Highest rating and extensive experience with similar tickets"
    },
    {
      "id": "uuid",
      "fullName": "Jane Smith",
      "stats": { ... },
      "matchScore": 87,
      "reason": "Low workload and good performance"
    }
  ],
  "recommendation": {
    "topChoice": {
      "userId": "uuid",
      "fullName": "John Doe"
    },
    "reason": "Best combination of experience, availability, and performance"
  },
  "note": "Reassignment requires Manager approval. System does NOT auto-reassign."
}
```

### Get SLA Configuration
```http
GET /api/sla/config
Authorization: Bearer {accessToken}

Response 200:
{
  "priorities": {
    "critical": {
      "responseMinutes": 5,
      "resolveMinutes": 120,
      "alertMethods": ["sms", "email", "push"],
      "autoReassignEnabled": true
    },
    "high": {
      "responseMinutes": 30,
      "resolveMinutes": 240,
      "alertMethods": ["email", "push"],
      "autoReassignEnabled": false
    },
    "medium": { ... },
    "low": { ... }
  },
  "escalationRules": {
    "responseTimeEscalation": true,
    "resolveTimeEscalation": true,
    "blockedTicketEscalation": true,
    "progressUpdateRequired": 4
  },
  "warnings": {
    "warningThreshold": 50,
    "dangerThreshold": 20
  }
}
```

### Update SLA Configuration (Admin only)
```http
PATCH /api/sla/config
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "priority": "critical",
  "responseMinutes": 5,
  "resolveMinutes": 120,
  "autoReassignEnabled": true
}

Response 200:
{
  "message": "SLA configuration updated",
  "config": { updated config }
}
```

### Get Escalation History
```http
GET /api/tickets/{ticketId}/escalations
Authorization: Bearer {accessToken}

Response 200:
{
  "ticketId": "uuid",
  "escalations": [
    {
      "id": "uuid",
      "type": "sla_warning",
      "timestamp": "2024-03-24T10:20:00Z",
      "message": "Approaching response SLA deadline",
      "level": "warning",
      "actionTaken": "notification_sent"
    },
    {
      "id": "uuid",
      "type": "sla_breach",
      "timestamp": "2024-03-24T10:35:00Z",
      "message": "Response SLA breached",
      "level": "critical",
      "actionTaken": "manager_alerted"
    },
    {
      "id": "uuid",
      "type": "manager_reassignment",
      "timestamp": "2024-03-24T12:30:00Z",
      "message": "Manager reassigned due to SLA breach",
      "level": "critical",
      "actionTaken": "manually_reassigned_by_manager",
      "metadata": {
        "oldAssignee": "uuid",
        "newAssignee": "uuid",
        "managerId": "uuid",
        "reason": "SLA breach - reassigned to experienced staff"
      }
    }
  ]
}
```

### Manual SLA Override (Admin)
```http
POST /api/tickets/{ticketId}/sla-override
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "action": "extend", // or "pause" or "reset"
  "extensionMinutes": 60, // for extend action
  "reason": "Patient emergency - staff unavailable"
}

Response 200:
{
  "message": "SLA extended by 60 minutes",
  "newDeadline": "2024-03-24T13:30:00Z",
  "reason": "Patient emergency - staff unavailable"
}
```

---

## 🧪 Testing

### Postman Collection
Import the Postman collection from `/docs/postman-collection.json`

### Example cURL
```bash
# Login
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get tickets
curl -X GET "https://api.yourdomain.com/api/tickets?status=in_progress" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create ticket
curl -X POST https://api.yourdomain.com/api/tickets \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test ticket","description":"Test","priority":"medium"}'
```

---

## 📚 API Versioning

Current version: `v1`

All endpoints are prefixed with `/api` (implies v1)

Future versions will use: `/api/v2/...`

---

**Last Updated**: March 24, 2026
**API Version**: 1.0.0
