# Feature Spec: Notifications System

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: NOTIF-007  
**Priority**: High  
**Status**: Ready for Implementation (FCM & MQTT already implemented)  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Multi-channel notification system hỗ trợ Real-time Push (FCM), Email, và In-app alerts. Integration với MQTT cho real-time updates (đã implemented).

**Key Capabilities:**
- Push notifications (FCM) - Already implemented
- Real-time updates (MQTT)
- Email notifications (SMTP)
- In-app notification center
- SMS alerts (Twilio - optional, critical only)
- User preferences & Do Not Disturb mode
- Notification history & read status

---

## 👤 User Stories

### US-NOTIF-001: Receive Push Notifications
**As a** Mobile user  
**I want to** receive push notifications  
**So that** I stay informed even when app closed

**Acceptance Criteria:**
- ✅ FCM integration functional (already implemented)
- ✅ Notifications show: title, body, icon
- ✅ Tap notification → deep link to relevant screen
- ✅ Badges show unread count
- ✅ Sound & vibration (user configurable)
- ✅ Grouped by type (tickets, tasks, mentions, etc.)

### US-NOTIF-002: Manage Notification Preferences
**As a** User  
**I want to** control which notifications I receive  
**So that** I'm not overwhelmed

**Acceptance Criteria:**
- ✅ Enable/disable per notification type:
  - Ticket assignments
  - Task updates
  - @Mentions
  - SLA warnings
  - Approvals
  - Comments
- ✅ Choose channels per type (Push/Email/SMS)
- ✅ Set Do Not Disturb hours
- ✅ Mute specific tickets/tasks
- ✅ Save preferences immediately

### US-NOTIF-003: View Notification Center
**As a** User  
**I want to** see all my notifications in one place  
**So that** I don't miss important updates

**Acceptance Criteria:**
- ✅ Bell icon với unread count badge
- ✅ Dropdown shows recent notifications (last 20)
- ✅ Mark individual as read
- ✅ Mark all as read
- ✅ Click notification → go to entity
- ✅ Filter: All/Unread/Mentions
- ✅ Real-time updates (new notifications appear)

---

## 🔔 Notification Types

### System Notifications

| Type | Trigger | Channels | Priority |
|------|---------|----------|----------|
| **TICKET_ASSIGNED** | Ticket assigned to you | Push, In-app | High |
| **TASK_ASSIGNED** | Task assigned to you | Push, In-app, Email | High |
| **STATUS_CHANGED** | Item status updated | Push, In-app | Medium |
| **COMMENT_ADDED** | New comment on your item | Push, In-app | Medium |
| **MENTION** | You were mentioned (@user) | Push, In-app, Email | High |
| **APPROVAL_NEEDED** | Task awaiting your approval | Push, In-app, Email | High |
| **SLA_WARNING** | SLA entering Warning zone | Push, In-app | High |
| **SLA_DANGER** | SLA entering Danger zone | Push, In-app, Email | Critical |
| **SLA_BREACH** | SLA breached | Push, In-app, Email, SMS | Critical |
| **TASK_COMPLETED** | Your task approved/completed | Push, In-app | Medium |
| **REASSIGNED** | Item reassigned to someone else | Push, In-app | Medium |
| **DEADLINE_APPROACHING** | Deadline in 24h/4h/1h | Push, In-app | High |

---

## 💾 Data Model

```typescript
interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  
  // Content
  title: string;
  message: string;
  icon: string;
  
  // Entity reference
  entityType: 'TICKET' | 'TASK' | 'COMMENT' | 'USER';
  entityId: string;
  actionUrl: string;         // Deep link URL
  
  // Status
  read: boolean;
  readAt: DateTime | null;
  delivered: boolean;
  deliveredAt: DateTime | null;
  
  // Audit
  createdAt: DateTime;
  expiresAt: DateTime;      // Auto-delete old notifications
}

interface UserNotificationPreferences {
  userId: string;
  
  // Per-type preferences
  preferences: {
    [key in NotificationType]: {
      push: boolean;
      email: boolean;
      sms: boolean;
      inApp: boolean;
    }
  };
  
  // Global settings
  doNotDisturb: boolean;
  dndStartHour: number;      // 22 (10 PM)
  dndEndHour: number;        // 8 (8 AM)
  
  // Muted items
  mutedTickets: string[];
  mutedTasks: string[];
  
  updatedAt: DateTime;
}
```

---

## 🔌 API Endpoints

```http
# Notification CRUD
GET    /api/notifications                     # Get user's notifications (paginated)
GET    /api/notifications/unread-count        # Get unread count
PUT    /api/notifications/:id/read            # Mark as read
PUT    /api/notifications/mark-all-read       # Mark all as read
DELETE /api/notifications/:id                 # Delete notification

# Preferences
GET    /api/notifications/preferences         # Get user preferences
PUT    /api/notifications/preferences         # Update preferences
POST   /api/notifications/mute/:entityType/:entityId   # Mute entity
DELETE /api/notifications/unmute/:entityType/:entityId # Unmute

# Device Tokens (FCM)
POST   /api/notifications/devices/register    # Register FCM token
DELETE /api/notifications/devices/:token       # Unregister token

# Test
POST   /api/notifications/test                # Send test notification
```

---

## 🎨 UI Components

### Notification Bell Icon
```tsx
<NotificationBell
  unreadCount={5}
  onClick={openNotificationCenter}
  pulseAnimation={hasHighPriority}  // Pulse for critical
/>
```

### Notification Center Dropdown
```tsx
<NotificationCenter>
  <Header>
    <Title>Notifications (5 unread)</Title>
    <MarkAllReadButton />
  </Header>
  
  <Filters>
    <Tab active>All</Tab>
    <Tab>Unread</Tab>
    <Tab>Mentions</Tab>
  </Filters>
  
  <NotificationList>
    <NotificationItem
      priority="high"
      read={false}
      icon="🎫"
      title="New ticket assigned"
      message="TKT-001: Printer ER broken"
      time="5 min ago"
      onClick={navigateToTicket}
    />
    {/* More notifications */}
  </NotificationList>
  
  <Footer>
    <ViewAllLink to="/notifications" />
  </Footer>
</NotificationCenter>
```

### Preferences UI
```tsx
<PreferencesPanel>
  <Section title="Notification Channels">
    <Toggle label="Push Notifications" checked={true} />
    <Toggle label="Email Notifications" checked={true} />
    <Toggle label="SMS Alerts (Critical only)" checked={false} />
  </Section>
  
  <Section title="Notification Types">
    <PreferenceRow
      type="Ticket Assignments"
      channels={['Push', 'Email']}
      enabled={true}
    />
    {/* More types */}
  </Section>
  
  <Section title="Do Not Disturb">
    <Toggle label="Enable DND" checked={true} />
    <TimePicker label="From" value="22:00" />
    <TimePicker label="Until" value="08:00" />
  </Section>
</PreferencesPanel>
```

---

## 🔄 Notification Flow

```
┌──────────────┐
│ Event Occurs │
│ (e.g., Task  │
│  assigned)   │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Notification     │
│ Service          │
└──────┬───────────┘
       │
       │ Check user preferences
       ├─────────────┬─────────────┬──────────────┐
       ▼             ▼             ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│   FCM    │  │  Email   │  │  In-App  │  │   SMS    │
│  (Push)  │  │  (SMTP)  │  │  (MQTT)  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
       │             │             │              │
       └─────────────┴─────────────┴──────────────┘
                      │
                      ▼
              ┌───────────────┐
              │  User Devices │
              └───────────────┘
```

---

## 🎯 Business Rules

### BR-NOTIF-001: DND Override
**Rule**: Critical notifications (SLA BREACH, Emergency) bypass Do Not Disturb mode.

### BR-NOTIF-002: Deduplication
**Rule**: Duplicate notifications within 5 minutes merged into one.

### BR-NOTIF-003: Retention
**Rule**: Notifications older than 30 days auto-deleted (except unread critical).

### BR-NOTIF-004: Rate Limiting
**Rule**: Max 100 notifications per user per day. Beyond that, batch into digest.

### BR-NOTIF-005: Delivery Priority
**Rule**: Critical → send immediately. High → within 1 min. Medium/Low → batch every 5 min.

---

## 📧 Email Templates

### Assignment Email
```
Subject: [QLCV] New Ticket Assigned: TKT-001

Hi Đinh Bộ Lĩnh,

A new ticket has been assigned to you:

Ticket ID: TKT-001
Title: Printer ER broken
Priority: 🔴 CRITICAL
SLA Deadline: 2 hours (03/25/2026 12:00 PM)

Description:
The printer in Emergency Room (Room 205) is not functioning...

[View Ticket] [Start Working]

---
Hospital Task Management System
```

### SLA Breach Alert
```
Subject: [URGENT] SLA BREACH: TKT-001

⚠️ ATTENTION REQUIRED

Ticket TKT-001 has BREACHED its SLA deadline by 30 minutes.

Current Status: IN_PROGRESS
Assigned To: Đinh Bộ Lĩnh
Manager: Please review and take action.

[View Details] [Reassign]
```

---

## 📊 Metrics

### Notification Metrics
- Total notifications sent (by type)
- Delivery success rate (%)
- Average delivery time
- Read rate (%)
- Engagement rate (click-through)

### Channel Performance
- FCM delivery rate
- Email delivery rate
- SMS delivery rate
- In-app notification views

### User Engagement
- Average time to read
- Most engaged notification types
- DND usage statistics
- Muted items count

---

## 🧪 Test Scenarios

### TS-NOTIF-001: Push Notification Flow
1. Task assigned to user A
2. System creates notification record
3. Check user A preferences → Push enabled
4. Send FCM push to user A's devices
5. User A's mobile receives push
6. User taps notification
7. App opens directly to task detail screen
8. Notification marked as read

### TS-NOTIF-002: DND Mode
1. User enables DND 22:00-08:00
2. Task assigned at 23:00 (during DND)
3. Medium priority notification → queued, not sent
4. Critical SLA breach at 23:30
5. Critical notification → bypasses DND, sent immediately
6. At 08:00, queued notifications delivered

### TS-NOTIF-003: Multi-Channel Delivery
1. User has Push, Email enabled for Assignments
2. Ticket assigned
3. System sends:
   - FCM push (immediate)
   - Email (within 1 min)
   - In-app notification (MQTT real-time)
4. All channels deliver successfully
5. User reads in-app → all marked as read

---

## 🚀 Implementation Notes

### FCM Integration (Already Done)
- Firebase project configured
- Device tokens stored in database
- Push sending service operational

### Email Service
```typescript
interface EmailService {
  sendTemplatedEmail(
    to: string,
    template: EmailTemplate,
    data: any
  ): Promise<void>;
}

// Usage
await emailService.sendTemplatedEmail(
  user.email,
  'TASK_ASSIGNED',
  { task, assignee, deadline }
);
```

### MQTT for In-App
```typescript
// Server-side
await Clients.User(userId).SendAsync(
  "ReceiveNotification",
  notificationDto
);

// Client-side
connection.on("ReceiveNotification", (notification) => {
  // Update UI, show toast, increment badge
  addToNotificationCenter(notification);
  showToast(notification.title, notification.message);
});
```

---

## ✅ Acceptance Criteria

**Definition of Done:**
- [ ] FCM push notifications functional
- [ ] Email notifications sending correctly
- [ ] In-app notification center working
- [ ] SMS integration (optional) configured
- [ ] User preferences UI complete
- [ ] DND mode respected
- [ ] Deep linking working (push → app screen)
- [ ] Notification history paginated
- [ ] Mark as read/unread functional
- [ ] Real-time updates via MQTT
- [ ] Performance: Deliver 10,000 notifications < 10 seconds
- [ ] All email templates reviewed
- [ ] Mobile push tested on iOS & Android

---

**Related Specs:**
- [02-ticket-management.md](./02-ticket-management.md)
- [03-task-management.md](./03-task-management.md)
- [05-sla-management.md](./05-sla-management.md)
- [08-chat-collaboration.md](./08-chat-collaboration.md)
