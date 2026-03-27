# Feature Index - Medical Task Management System

**Last Updated**: March 25, 2026  
**Version**: 2.0.0

---

## 📑 Complete Feature List

### Core Features

| ID | Feature | Priority | Status | Spec File |
|----|---------|----------|--------|-----------|
| 01 | React UI Architecture | Critical | 🚧 IN PROGRESS | [01-react-ui-architecture.md](./01-react-ui-architecture.md) |
| 02 | Migration Rules (HTML to React) | Critical | ✅ COMPLETE | [02-migration-rules.md](./02-migration-rules.md) |
| 02 | Support Ticket Management | Critical | ✅ COMPLETE | [02-ticket-management.md](./02-ticket-management.md) |
| 03 | Task Assignment & Management | Critical | ✅ COMPLETE | [03-task-management.md](./03-task-management.md) |
| 03a | Task Detail Page | Critical | ✅ COMPLETE | [03a-task-detail.md](./03a-task-detail.md) |
| 04 | Task Pool (Self-Pick) | High | ✅ COMPLETE | [04-task-pool.md](./04-task-pool.md) |
| 05 | SLA Management & Escalation | Critical | ✅ COMPLETE | [05-sla-management.md](./05-sla-management.md) |
| 06 | Dashboard & Statistics | High | ✅ COMPLETE | [06-dashboard.md](./06-dashboard.md) |
| 07 | Notifications System | High | ✅ COMPLETE | [07-notifications.md](./07-notifications.md) |
| 08 | Authentication & Authorization | Critical | ✅ COMPLETE | [08-authentication.md](./08-authentication.md) |
| 09 | Approval Workflow | High | ✅ COMPLETE | [09-approvals-workflow.md](./09-approvals-workflow.md) |
| 10 | History & Audit Trail | Medium | ✅ COMPLETE | [10-history-audit.md](./10-history-audit.md) |
| 11 | Personal Statistics | Medium | ✅ COMPLETE | [11-personal-statistics.md](./11-personal-statistics.md) |
| 12 | User Management | Medium | ✅ COMPLETE | [12-user-management.md](./12-user-management.md) |
| 13 | Settings & Preferences | Medium | ✅ COMPLETE | [13-settings.md](./13-settings.md) |
| 14 | Help & Documentation | Medium | ✅ COMPLETE | [14-help-documentation.md](./14-help-documentation.md) |
| 15 | Reports & Analytics | High | ✅ COMPLETE | [reports/](./reports/) |

> **Note**: Chat (MQTT+FCM) đã được implement. All core specs complete!

---

## 🎯 Feature Categories

> **Note**: Authentication (Login/Register) và Messaging (MQTT + FCM) đã được implement sẵn. Specs này focus vào business logic và workflow của các features chính.

### 1. Ticket Management
- Create, view, update tickets
- Ticket triage & assignment
- Status transitions
- Priority-based routing
- SLA tracking
- Chat & comments
- File attachments

### 3. Task Management
- Create, view, update tasks
- Task list + Kanban board with dual views
- Task detail page with multi-tab interface
- 3 assignment strategies (Direct, Pool, Team)
- Progress tracking (0-100%)
- Interactive subtasks & checklists
- Team communication (comments with @mentions)
- File attachments management
- Complete activity timeline
- Time logging
- Review & approval workflow

### 4. SLA & Escalation
- SLA configuration by priority
- Real-time SLA monitoring
- Automated escalation alerts
- Manager reassignment approval (NO auto-reassign)
- Candidate suggestions
- SLA reports

### 5. Collaboration
- Real-time chat (MQTT) - Already implemented
- Thread-based comments
- @mentions
- File sharing
- Read receipts
- **Real-time Messaging**: MQTT + FCM (đã có sẵn)
- **Thread Comments**: Threaded discussions trên tickets/tasks
- **@Mentions**: Tag users trong comments
- **File Sharing**: Upload/download attachments
- **Activity Tracking**: Timeline của changes

### 6. Notifications & Real-time Updates
- **Push Notifications**: FCM (đã có sẵn) - Mobile push
- **Real-time Messaging**: MQTT - Real-time updates for status changes
- **Email Notifications**: SMTP - Scheduled & triggered
- **In-app Notifications**: Bell icon notification center
- Team performance metrics
- Custom reports
- Export to PDF/Excel

### 8. Administration
- User management
- Department & team management
- Role & permission management
- SLA configuration
- System settings
- Audit logs

---

## 📱 Platform Coverage

### Web App (React + TypeScript)
- ✅ Full-featured desktop/tablet interface
- ✅ Desktop/Tablet responsive interface
- ✅ Real-time updates via MQTT
- ✅ Messaging via MQTT (đã có sẵn)
- ✅ Data tables, Charts, Kanban boards
- ✅ Report generation & export
- ✅ Advanced filters & search

### Mobile App - Android (React Native)
- ✅ Native mobile UX
- ✅ Offline mode & sync
- ✅ Camera & Voice notes
- ✅ Push notifications (FCM - đã có sẵn)
- ✅ Messaging (MQTT - đã có sẵn)
- ✅ Biometric login (đã có sẵn)

### Mobile App - iOS (React Native)
- ✅ Native iOS UX
- ✅ Offline mode & sync
- ✅ Camera & Voice notes
- ✅ Push notifications (APNs via FCM - đã có sẵn)
- ✅ Messaging (MQTT - đã có sẵn)
- ✅ Face ID / Touch ID (đã có sẵn)
### Backend API (C# ASP.NET Core 8)
- ✅ RESTful API endpoints
- ✅ Clean Architecture (4 layers)
- ✅ Entity Framework Core + PostgreSQL
- ✅ MQTT for real-time messaging (đã có sẵn)
- ✅ Background jobs (Hangfire) for SLA monitoring
- ✅ JWT authentication (đã có sẵn)
---

## 🗂️ Menu Structure

### Web App Navigation

```
┌─ Main Navigation (Sidebar)
│
├─ 📊 Dashboard
│  └─ Overview, Stats, Recent Activity
│
├─ 🎫 Tickets
│  ├─ All Tickets (List/Kanban/Calendar)
│  ├─ My Tickets
│  ├─ Create Ticket
│  └─ Filter & Search
│
├─ 📋 Tasks
│  ├─ All Tasks (List/Board)
│  ├─ My Tasks
│  ├─ Create Task
│  └─ Filter & Search
│
├─ 🏊 Task Pool
│  └─ Available Tasks (Self-pick)
│
├─ 👥 Team
│  ├─ Team Members
│  ├─ Workload Distribution
│  └─ Performance Metrics
│
├─ 📊 Reports (Manager/Admin)
│  ├─ Ticket Reports
│  ├─ Task Reports
│  ├─ SLA Compliance
│  ├─ Team Performance
│  └─ Custom Reports
│
├─ 👨‍💼 Manager Dashboard (Manager only)
│  ├─ SLA Alerts
│  ├─ Reassignment Queue
│  ├─ Approval Queue
│  └─ Team Overview
│
├─ ⚙️ Settings
│  ├─ Profile
│  ├─ Preferences
│  ├─ Notifications
│  ├─ Department Config (Admin)
│  ├─ SLA Rules (Admin)
│  └─ User Management (Admin)
│
└─ 🔔 Notifications (Icon in header)
   └─ Notification Center
```

### Mobile App Navigation (Bottom Tabs)

```
┌─ Bottom Tab Navigation
│
├─ 🏠 Home
│  ├─ Quick Stats
│  ├─ Quick Actions
│  └─ Recent Activity
│
├─ 🎫 Tickets
│  ├─ My Tickets
│  ├─ All Tickets
│  └─ Create (FAB)
│
├─ 📋 Tasks
│  ├─ My Tasks
│  ├─ Task Pool
│  └─ Create (FAB)
│
└─ 👤 Profile
   ├─ My Info
   ├─ Performance Stats
   ├─ Settings
   ├─ Notifications
   └─ Logout

┌─ Additional Screens
│
├─ 🔔 Notifications (Header icon)
├─ 🔍 Search (Header icon)
├─ 📷 Camera (From create ticket/task)
└─ 📂 File Picker
```

---

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Secondary**: #7c3aed (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)
- **Dark**: #1f2937
- **Light**: #f9fafb

### Priority Colors
- 🔴 **Critical**: #ef4444
- 🟠 **High**: #f59e0b
- 🟡 **Medium**: #fbbf24
- 🟢 **Low**: #10b981

### Status Colors
- **Submitted**: #3b82f6 (Blue)
- **Assigned**: #8b5cf6 (Purple)
- **In Progress**: #f59e0b (Amber)
- **Resolved**: #10b981 (Green)
- **Closed**: #6b7280 (Gray)
- **Blocked**: #ef4444 (Red)

### Typography
- **Heading**: Segoe UI, San Francisco (iOS), Roboto (Android)
- **Body**: Same as heading
- **Monospace**: Courier New (for ticket/task numbers)

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

---

## 🔄 Workflow Summary

### Support Ticket Workflow
```
SUBMITTED → TRIAGED → ASSIGNED → IN_PROGRESS → RESOLVED → APPROVED → CLOSED
     ↓          ↓          ↓            ↓   ↑       ↓          ↓
   REJECTED  PENDING   REASSIGNED      │   │   REOPENED    RATING
                                       │   │
                               HELP_REQUESTED
                                       ↓
                               SUPPORT_ASSIGNED
                                       │
                                   BLOCKED
```

**Key Statuses:**
- **HELP_REQUESTED**: Staff requests assistance from colleagues
- **SUPPORT_ASSIGNED**: Helper assigned to support primary staff
- **APPROVED**: Resolution approved (before user rating)

### Task Workflow
```
CREATED → ASSIGNED → IN_PROGRESS → REVIEW → COMPLETED → CLOSED
    ↓        ↓   ↑        ↓   ↑        ↓
    │     POOL  │        │   │    CHANGES_REQUESTED
    │        ↓  │        │   │
    │    CLAIMED│        │   │
    │            ↓       │   │
    │    DEPT_ASSIGNED  │   │
    │                   │   │
    │         SUPPORT_REQUESTED
    │                   ↓
    │          COLLAB_ASSIGNED
    │                   ↓
    ↓                BLOCKED
CANCELLED
```

**Key Statuses:**
- **POOL** (IN_POOL): Task available for self-claiming
- **DEPT_ASSIGNED**: Assigned to department for member selection
- **SUPPORT_REQUESTED**: Staff requests collaborator help
- **COLLAB_ASSIGNED**: Collaborators assigned to help with task

---

## 📊 Key Metrics Tracked

### Ticket Metrics
- Total tickets by status
- Average resolution time
- SLA compliance rate (%)
- User satisfaction rating (1-5 stars)
- Response time by priority
- Tickets by department/category
- Reopen rate

### Task Metrics
- Total tasks by status
- Completion rate (%)
- On-time completion rate
- Average task duration
- Tasks completed per user
- Workload distribution
- Review approval rate

### SLA Metrics
- Compliance rate by priority
- Breach count
- At-risk tickets/tasks
- Average time to first response
- Average time to resolution
- Escalation frequency

### Team Metrics
- Individual performance scores
- Team velocity
- Quality ratings (1-5 stars)
- Availability
- Expertise match rate

---

## 🔐 Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Role-based access control (RBAC)
- ✅ Password hashing (bcrypt)
- ✅ API rate limiting
- ✅ Input validation & sanitization
- ✅ SQL injection prevention (ORM)
- ✅ XSS protection
- ✅ HTTPS only
- ✅ Secure file uploads
- ✅ Audit logging
- ✅ Data encryption at rest & in transit

---

## 📈 Performance Targets

### API Response Times
- Authentication: < 200ms
- List endpoints: < 300ms
- Detail endpoints: < 200ms
- Create/Update: < 500ms
- File upload: < 2s (10MB)

### Web App
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

### Mobile App
- App launch: < 2s
- Screen transition: < 300ms
- Offline sync: Background process
- Push notification: < 1s delivery

---

## 🚀 Deployment Checklist

### Pre-deployment
- ✅ All unit tests passing
- ✅ Integration tests passing
- ✅ E2E tests passing
- ✅ Security audit completed
- ✅ Performance testing done
- ✅ Database migrations ready
- ✅ Environment variables configured
- ✅ SSL certificates installed

### Post-deployment
- ✅ Health check endpoint responding
- ✅ Database connections working
- ✅ Redis cache operational
- ✅ Background jobs running
- ✅ Push notifications working
- ✅ Email notifications working
- ✅ File uploads working
- ✅ Real-time updates working

---

## 📚 Documentation Files

### Main Documentation
- [README.md](../README.md) - Project overview
- [WORKFLOW_DESIGN.md](../WORKFLOW_DESIGN.md) - Workflow specifications
- [WORKFLOW_DIAGRAMS.md](../WORKFLOW_DIAGRAMS.md) - Visual workflows
- [IMPLEMENTATION_GUIDE.md](../IMPLEMENTATION_GUIDE.md) - Implementation details
- [SCREENS_DESIGN.md](../SCREENS_DESIGN.md) - Screen designs
- [API_REFERENCE.md](../API_REFERENCE.md) - API documentation
- [CSHARP_EXAMPLES.md](../CSHARP_EXAMPLES.md) - C# code examples
- [ENV_CONFIGURATION.md](../ENV_CONFIGURATION.md) - Environment setup

### Demo
- [demo.html](../../demo.html) - Interactive demo page

### Specifications (This Folder)
- Feature specs (this folder)
- Reports specs (reports/ subfolder)

---

## 🎯 Implementation Phases

### Phase 1: MVP (2-3 months)
- ✅ Authentication & user management
- ✅ Ticket management (create, list, detail, status)
- ✅ Task management (create, assign direct, progress)
- ✅ Basic notifications
- ✅ File uploads
- ✅ Mobile app basics

### Phase 2: Enhancement (1-2 months)
- ✅ Task Pool (self-pick)
- ✅ SLA monitoring & escalation
- ✅ Manager dashboard
- ✅ Reassignment approval workflow
- ✅ Advanced filters & search
- ✅ Offline mode (mobile)
- ✅ Reports & analytics

### Phase 3: Advanced (1-2 months)
- ✅ Custom workflows
- ✅ Advanced analytics & insights
- ✅ Integration APIs
- ✅ Voice notes
- ✅ QR code scanning
- ✅ Advanced reporting
- ✅ Mobile widgets

---

## 🔗 Quick Links to Feature Specs

### Main Features (Focus Areas)
1. [Ticket Management](./02-ticket-management.md) - Support ticket workflow
2. [Task Management](./03-task-management.md) - Task assignment & tracking
3. [Task Pool](./04-task-pool.md) - Self-pick available tasks
4. [SLA Management](./05-sla-management.md) - SLA monitoring & escalation
5. [Dashboard](./06-dashboard.md) - Statistics & overview
6. [Notifications](./07-notifications.md) - Multi-channel notifications
7. [File Management](./09-file-management.md) - Upload & attachment handling
8. [User & Team Management](./10-user-team-management.md) - Organization structure
9. [Reports & Analytics](./reports/) - Performance & compliance reports
10. [Search & Filters](./12-search-filters.md) - Global search & filtering

---

**Maintained by**: Development Team  
**Contact**: dev@hospital.com  
**Version Control**: Git Repository
