# Specification Documentation - Medical Task Management System

**Project**: Hospital Task Management System (QLCV)  
**Last Updated**: March 25, 2026  
**Version**: 1.0.0

---

## 📑 Overview

This folder contains comprehensive feature specifications for the Hospital Task Management System. Each spec follows a consistent structure with user stories, business rules, data models, API endpoints, UI components, and acceptance criteria.

---

## ✅ Completed Specifications

### Critical Features (P0)

1. **[02-ticket-management.md](./02-ticket-management.md)** - ✅ **COMPLETE**
   - Support ticket workflow (Create → Triage → Assign → Resolve → Close)
   - Priority-based routing
   - SLA tracking integration
   - Comments & attachments
   - Rating system

2. **[03-task-management.md](./03-task-management.md)** - ✅ **COMPLETE**
   - Task creation & lifecycle
   - 3 assignment strategies: Direct, Pool, Team
   - Progress tracking (0-100%)
   - Subtasks & checklists
   - Time logging
   - Review & approval workflow

3. **[04-task-pool.md](./04-task-pool.md)** - ✅ **COMPLETE**
   - Self-pick task marketplace
   - Skill-based filtering
   - Claim validation
   - Auto-escalation for unclaimed tasks
   - Pool analytics

4. **[05-sla-management.md](./05-sla-management.md)** - ✅ **COMPLETE**
   - Priority-based SLA configuration
   - Real-time monitoring (5-minute intervals)
   - 4-tier status: Safe → Warning → Danger → Breached
   - Escalation workflow dengan Manager approval
   - **NO auto-reassignment** (safety-critical)
   - Candidate suggestion algorithm

### High Priority Features (P1)

5. **[06-dashboard.md](./06-dashboard.md)** - ✅ **COMPLETE**
   - Role-based dashboards (Staff, Manager, Admin)
   - 23+ customizable widgets
   - Real-time updates via MQTT
   - Drag & drop layout
   - Performance KPIs

6. **[07-notifications.md](./07-notifications.md)** - ✅ **COMPLETE**
   - Multi-channel: Push (FCM), Email, In-app, SMS
   - User preference management
   - Do Not Disturb mode
   - Notification center
   - Critical alert overrides

7. **[reports/00-reports-index.md](./reports/00-reports-index.md)** - ✅ **INDEX COMPLETE**
   - Report catalog (12 report types)
   - Performance, Compliance, Workload reports
   - Custom report builder

---

## 📝 Pending Specifications

### Medium Priority (P2)

8. **[08-chat-collaboration.md](./08-chat-collaboration.md)** - 📝 **SPEC NEEDED**
   - Real-time chat (MQTT - already implemented)
   - Thread-based comments
   - @Mentions
   - File sharing
   - Typing indicators

9. **[09-file-management.md](./09-file-management.md)** - 📝 **SPEC NEEDED**
   - File upload/download via Azure blob storage
   - File browser & folder structure
   - Preview support (images, PDFs)
   - Version control
   - Access permissions

10. **[10-user-team-management.md](./10-user-team-management.md)** - 📝 **SPEC NEEDED**
    - User registration & profiles
    - Role & permission management (RBAC)
    - Team creation & assignment
    - Department structure
    - Skill tagging

11. **[11-mobile-app.md](./11-mobile-app.md)** - 📝 **SPEC NEEDED**
    - React Native implementation
    - Offline mode & sync
    - Camera integration
    - QR scanner
    - Biometric authentication
    - Push notifications

12. **[12-search-filters.md](./12-search-filters.md)** - 📝 **SPEC NEEDED**
    - Global search across tickets & tasks
    - Advanced filtering
    - Saved searches
    - Search suggestions
    - Recent searches

---

## 📊 Specification Structure

Each specification follows this template:

```markdown
# Feature Spec: [Feature Name]

**Feature ID**: [ID]
**Priority**: [Critical/High/Medium/Low]
**Status**: [Ready for Implementation]
**Last Updated**: [Date]

## 📋 Overview
Brief description and key capabilities

## 👤 User Stories
User stories with acceptance criteria

## 🔄 Workflow & Status Flow
Visual workflow diagrams and state transitions

## 🎯 Business Rules
Explicit business logic rules

## 💾 Data Model
TypeScript interfaces for entities

## 🔌 API Endpoints
RESTful API specifications

## 🎨 UI Components
Component specifications and layouts

## 📊 Metrics & KPIs
Performance and business metrics

## 🔔 Notifications
Notification triggers and channels

## 🧪 Test Scenarios
End-to-end test cases

## 🚀 Implementation Priority
Phased implementation plan

## 📱 Mobile Considerations
Mobile-specific requirements

## 🔐 Permissions
Role-based access control matrix

## ✅ Acceptance Criteria Summary
Definition of done checklist
```

---

## 🎯 Key Architecture Decisions

### 1. Assignment Strategies (Tasks)
Three distinct strategies to match different work patterns:
- **Direct**: Manager assigns to specific staff
- **Pool**: Staff self-pick from marketplace
- **Team**: Assigned to entire team for coordination

### 2. SLA Management Philosophy
- **No Auto-Reassignment**: Critical for medical environment safety
- **Manager Approval Required**: Human oversight mandatory
- **Escalation-First**: Alert before auto-action

### 3. Real-Time Architecture
- **MQTT**: Real-time messaging for web and mobile
- **Background Jobs**: SLA monitoring, auto-escalation

### 4. Notification Priorities
- **Critical**: Immediate delivery, bypass DND
- **High**: Within 1 minute
- **Medium/Low**: Batched every 5 minutes

---

## 📦 Technology Stack Summary

### Backend
- **C# ASP.NET Core 8**: RESTful APIs
- **PostgreSQL**: Primary database
- **MQTT (Mosquitto)**: Real-time messaging (implemented)
- **Hangfire/Quartz**: Background jobs
- **SMTP**: Email notifications

### Frontend
- **React 18 + TypeScript**: Web application
- **React Native**: Mobile apps (iOS + Android)
- **FCM (Firebase Cloud Messaging)**: Push notifications (implemented)
- **Chart.js / Recharts**: Data visualization

### Infrastructure
- **Local File Storage**: File storage
- **Redis**: Caching & session
- **Docker**: Containerization

### Infrastructure
- **Azure Blob Storage**: File storage
- **Redis**: Caching & session
- **Docker**: Containerization
- **Azure/AWS**: Cloud hosting

---

## 🚀 Implementation Roadmap

### Phase 1: Core Features (Weeks 1-4)
- [x] Ticket Management
- [x] Task Management với Direct Assignment
- [x] Basic Dashboard
- [x] User Authentication (already done)

### Phase 2: Advanced Assignment (Weeks 5-6)
- [x] Task Pool implementation
- [x] Team Assignment
- [ ] Candidate suggestion algorithm

### Phase 3: SLA & Monitoring (Weeks 7-8)
- [x] SLA configuration
- [x] Real-time SLA monitoring
- [x] Escalation workflow
- [ ] SLA reports

### Phase 4: Collaboration (Weeks 9-10)
- [ ] Chat system (MQTT integration)
- [ ] Comments & threads
- [ ] File management
- [ ] @Mentions

### Phase 5: Mobile App (Weeks 11-14)
- [ ] React Native setup
- [ ] Mobile screens (34 screens designed)
- [ ] Offline mode
- [ ] Camera & QR integration
- [ ] Biometric auth

### Phase 6: Analytics & Reports (Weeks 15-16)
- [ ] Dashboard widgets
- [ ] Report generation
- [ ] Export functionality
- [ ] Email reports

---

## 🧪 Testing Strategy

### Unit Tests
- Business logic validation
- Data model constraints
- API endpoint responses
- Notification triggers

### Integration Tests
- End-to-end workflows
- SLA monitoring accuracy
- Real-time update delivery
- Assignment algorithm validation

### Performance Tests
- 10,000 concurrent tasks
- SLA monitoring <30s for 10k items
- Dashboard load <1s
- Notification delivery <5s

### Security Tests
- Role-based access control
- API rate limiting
- Data encryption validation
- Audit log integrity

---

## 📚 Related Documentation

### Design Files
- **[demo/demo.html](../../demo/demo.html)**: System overview với workflows
- **[demo/screens-full.html](../../demo/screens-full.html)**: 34 screen mockups
  - 15 Web App screens
  - 19 Mobile App screens

### API Documentation
- OpenAPI/Swagger specs (to be generated)
- Postman collections (to be created)

### Database Schema
- Entity Relationship Diagrams (to be created)
- Migration scripts (to be organized)

---

## 👥 Stakeholders & Sign-off

### Business Owners
- [ ] Hospital Administration
- [ ] IT Department Head
- [ ] Clinical Staff Representatives

### Technical Leads
- [ ] Solutions Architect
- [ ] Backend Lead
- [ ] Frontend Lead
- [ ] Mobile Lead
- [ ] QA Lead

### Compliance & Security
- [ ] Security Officer
- [ ] HIPAA Compliance Officer
- [ ] Data Privacy Officer

---

## 📞 Contact & Support

**Project Lead**: [Name]  
**Technical Architect**: [Name]  
**Email**: project@hospital.vn  
**Slack**: #qlcv-project

---

## 📝 Change Log

### March 25, 2026
- ✅ Created comprehensive specs:
  - 03-task-management.md
  - 04-task-pool.md
  - 05-sla-management.md
  - 06-dashboard.md
  - 07-notifications.md
- ✅ Updated 00-index.md
- ✅ Created README.md
- ✅ Reviewed and validated all specs

### March 24, 2026
- ✅ Initial 02-ticket-management.md spec
- ✅ Created reports index
- ✅ Set up spec folder structure

---

**BUILD WITH LINM-SOFT** 🏥
