# Feature Spec: Settings & Preferences

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: SETTINGS-013  
**Priority**: Medium  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Comprehensive user settings and system configuration interface. Allows users to customize their experience and admins to configure system-wide settings.

**Key Capabilities:**
- User profile management
- Notification preferences
- Display and theme settings
- Security settings (password, 2FA)
- Language and localization
- System configuration (Admin only)
- Data export and privacy controls

---

## 👤 User Stories

### US-SET-001: Update Profile
**As a** User  
**I want to** update my profile information  
**So that** others see accurate info about me

**Acceptance Criteria:**
- ✅ Edit fields: name, email, phone, bio, avatar
- ✅ Avatar upload: image file, max 5MB
- ✅ Email change: verification required
- ✅ Real-time validation
- ✅ Save button + success notification
- ✅ Changes reflected immediately

### US-SET-002: Change Password
**As a** User  
**I want to** change my password  
**So that** I maintain account security

**Acceptance Criteria:**
- ✅ Current password verification required
- ✅ New password: min 8 chars, complexity rules
- ✅ Confirm new password (match validation)
- ✅ Success: all sessions except current logged out
- ✅ Email notification of password change
- ✅ Error handling for incorrect current password

### US-SET-003: Notification Preferences
**As a** User  
**I want to** control which notifications I receive  
**So that** I'm not overwhelmed

**Acceptance Criteria:**
- ✅ Toggle per notification type:
  - Ticket assignments
  - Task updates
  - @Mentions
  - SLA warnings
  - Approvals
  - Comments
  - System announcements
- ✅ Choose channels: Push, Email, SMS (per type)
- ✅ Do Not Disturb hours (start/end time)
- ✅ Save preferences → take effect immediately
- ✅ Test notification button

### US-SET-004: Display Preferences
**As a** User  
**I want to** customize visual settings  
**So that** the interface suits my needs

**Acceptance Criteria:**
- ✅ Theme: Light, Dark, Auto (system)
- ✅ Color scheme: Default, High contrast, Custom
- ✅ Font size: Small, Medium, Large
- ✅ Density: Compact, Comfortable, Spacious
- ✅ Language: Vietnamese, English
- ✅ Date format: DD/MM/YYYY, MM/DD/YYYY
- ✅ Time format: 12h, 24h
- ✅ Preview changes in real-time

### US-SET-005: Privacy Controls
**As a** User  
**I want to** control my data visibility  
**So that** I maintain privacy

**Acceptance Criteria:**
- ✅ Profile visibility: Public, Team only, Private
- ✅ Show/hide: last login, activity status, statistics
- ✅ Opt out of: team comparisons, leaderboards
- ✅ Data export: download all my data (GDPR)
- ✅ Account deletion request (requires admin approval)

### US-SET-006: System Configuration (Admin)
**As an** Admin  
**I want to** configure system-wide settings  
**So that** the system operates correctly

**Acceptance Criteria:**
- ✅ General settings:
  - System name, logo, contact email
  - Business hours, timezone
  - Session timeout duration
- ✅ SLA settings:
  - Default SLA thresholds per priority
  - Escalation rules
- ✅ Email settings:
  - SMTP server config
  - Email templates
- ✅ Security settings:
  - Password policy
  - Account lockout rules
  - 2FA enforcement
- ✅ Integrations:
  - MQTT broker config
  - FCM credentials
  - External APIs

---

## 💾 Data Model

```typescript
interface UserSettings {
  userId: string;
  
  // Profile
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  avatar: string | null;
  
  // Notifications
  notifications: {
    [key: string]: {
      enabled: boolean;
      channels: ('PUSH' | 'EMAIL' | 'SMS')[];
    };
  };
  doNotDisturbStart: string | null;  // "22:00"
  doNotDisturbEnd: string | null;    // "08:00"
  
  // Display
  theme: 'LIGHT' | 'DARK' | 'AUTO';
  colorScheme: string;
  fontSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  density: 'COMPACT' | 'COMFORTABLE' | 'SPACIOUS';
  language: 'vi' | 'en';
  dateFormat: string;
  timeFormat: '12h' | '24h';
  
  // Privacy
  profileVisibility: 'PUBLIC' | 'TEAM' | 'PRIVATE';
  showLastLogin: boolean;
  showActivityStatus: boolean;
  showStatistics: boolean;
  optOutComparisons: boolean;
  
  updatedAt: DateTime;
}

interface SystemSettings {
  // General
  systemName: string;
  systemLogo: string;
  contactEmail: string;
  businessHoursStart: string;  // "08:00"
  businessHoursEnd: string;    // "17:00"
  timezone: string;
  sessionTimeoutMinutes: number;
  
  // SLA
  slaThresholds: {
    [priority: string]: {
      responseTimeMinutes: number;
      resolutionTimeHours: number;
    };
  };
  
  // Email
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;  // Encrypted
  emailFromAddress: string;
  emailFromName: string;
  
  // Security
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumber: boolean;
  passwordRequireSpecial: boolean;
  passwordExpiryDays: number;
  accountLockoutAttempts: number;
  accountLockoutDurationMinutes: number;
  require2FA: boolean;
  
  updatedAt: DateTime;
  updatedBy: string;
}
```

---

## 🎨 UI Components

### Settings Page (`settings.html`)

```
┌──────────────────────────────────────────────────────────┐
│  ⚙️ Cài Đặt                            [🔔] [👤]         │
├──────────────────────────────────────────────────────────┤
│  ┌──────────┬────────────────────────────────────────┐  │
│  │ 👤 Profile      │  Profile Information           │  │
│  │ 🔔 Notifications│                                │  │
│  │ 🎨 Display      │  ┌─────────────────────────┐  │  │
│  │ 🔐 Security     │  │ [Avatar Image]          │  │  │
│  │ 🌐 Language     │  │ [Upload New]            │  │  │
│  │ 🔒 Privacy      │  └─────────────────────────┘  │  │
│  │ 📊 System (A)   │                                │  │
│  └─────────────────│  Name:                         │  │
│                    │  [Đinh Bộ Lĩnh_____________]  │  │
│                    │                                │  │
│                    │  Email:                        │  │
│                    │  [dinh@example.com_________]  │  │
│                    │  ℹ️ Email change requires    │  │
│                    │     verification              │  │
│                    │                                │  │
│                    │  Phone:                        │  │
│                    │  [+84 901234567____________]  │  │
│                    │                                │  │
│                    │  Bio:                          │  │
│                    │  ┌──────────────────────────┐ │  │
│                    │  │ IT Support Specialist    │ │  │
│                    │  │                          │ │  │
│                    │  └──────────────────────────┘ │  │
│                    │                                │  │
│                    │  [Cancel] [Save Changes]      │  │
│                    └────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Notification Preferences Tab

```
┌──────────────────────────────────────────────────────────┐
│  Notification Preferences                                │
├──────────────────────────────────────────────────────────┤
│  Do Not Disturb Hours:                                   │
│  From: [22:00 ▼] To: [08:00 ▼]                          │
│  ☑ Enable Do Not Disturb mode during these hours        │
│                                                           │
│  ── Notification Types ──────────────────────────────── │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Ticket Assignments            [Push] [Email] [SMS]  │ │
│  │ ☑ Enable   🔔 ☑  📧 ☑  📱 ☐                       │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ Task Updates                  [Push] [Email] [SMS]  │ │
│  │ ☑ Enable   🔔 ☑  📧 ☐  📱 ☐                       │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ @Mentions                     [Push] [Email] [SMS]  │ │
│  │ ☑ Enable   🔔 ☑  📧 ☑  📱 ☐                       │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ SLA Warnings                  [Push] [Email] [SMS]  │ │
│  │ ☑ Enable   🔔 ☑  📧 ☑  📱 ☑                       │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  [🔔 Send Test Notification] [Cancel] [Save]            │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints

### GET /api/settings/me
Get current user's settings

**Response:**
```json
{
  "settings": {
    "name": "Đinh Bộ Lĩnh",
    "email": "dinh@example.com",
    "theme": "DARK",
    "language": "vi",
    "notifications": {
      "TICKET_ASSIGNED": {
        "enabled": true,
        "channels": ["PUSH", "EMAIL"]
      }
    }
  }
}
```

### PUT /api/settings/me
Update user settings

**Request:**
```json
{
  "name": "New Name",
  "theme": "LIGHT",
  "notifications": {
    "TICKET_ASSIGNED": {
      "enabled": true,
      "channels": ["PUSH"]
    }
  }
}
```

### POST /api/settings/change-password
Change password

**Request:**
```json
{
  "currentPassword": "old_pass",
  "newPassword": "new_secure_pass"
}
```

### GET /api/settings/system (Admin only)
Get system settings

### PUT /api/settings/system (Admin only)
Update system settings

---

## 🎯 Business Rules

### BR-SET-001: Email Change
- Requires verification link to new email
- Old email receives notification
- Change takes effect after verification

### BR-SET-002: Password Policy
- Min 8 characters
- Complexity enforced (configured in system settings)
- Cannot reuse last 5 passwords
- Expires after 90 days (configurable)

### BR-SET-003: Notifications
- Do Not Disturb: no notifications sent during hours
- Critical notifications: override DND (SLA breaches)
- SMS: only for critical events (to reduce costs)

### BR-SET-004: System Settings
- Only Admins can modify
- Changes logged in audit trail
- Some settings require system restart (flagged)
- Backup before saving changes

---

## 📚 Related Specs
- [08-authentication.md](./08-authentication.md) - Password change
- [07-notifications.md](./07-notifications.md) - Notification preferences
- [12-user-management.md](./12-user-management.md) - Profile management

---

## 📝 Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-03-25 | System | Initial spec created from HTML analysis |
