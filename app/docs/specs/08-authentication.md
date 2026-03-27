# Feature Spec: Authentication & Authorization

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: AUTH-008  
**Priority**: Critical  
**Status**: Already Implemented (Backend) - Frontend Migration Needed  
**Last Updated**: March 25, 2026

---

## 🔔 AI Implementation Notes

**IMPORTANT - HTML Reference Files:**
- Primary: `app/login.html` - Login page layout and form
- Styling: `app/css/styles.css` - All CSS variables and component styles

**Mock Data Requirements:**
- Create in: `src/mocks/auth.mock.ts`
- Test users with different roles (Admin, Manager, Staff)
- Include demo credentials for testing
- Mock JWT token generation for local development

**Visual Consistency Checklist:**
- ✅ Match login form layout and styling
- ✅ Match input field design and validation states
- ✅ Match "Remember me" checkbox placement
- ✅ Match error message display
- ✅ Match loading states during authentication

**Backend Integration:**
- API endpoint: POST `/api/auth/login`
- Response includes: JWT token, user profile, permissions
- Token stored in httpOnly cookie (secure)
- Session expires after inactivity (configurable)

---

## 📋 Overview

Complete authentication and authorization system for the Medical Task Management System. Includes login, registration, password management, session handling, and role-based access control.

**Key Capabilities:**
- Email/username + password authentication
- Role-based access control (Admin, Manager, Staff)
- Session management with JWT tokens
- Password reset workflow
- Remember me functionality
- Multi-factor authentication (optional)
- Account lockout protection
- Audit logging for auth events

---

## 👤 User Stories

### US-AUTH-001: User Login
**As a** registered user  
**I want to** log in with my credentials  
**So that** I can access my workspace

**Acceptance Criteria:**
- ✅ Login form with email/username and password fields
- ✅ "Remember me" checkbox for persistent sessions
- ✅ "Forgot password?" link
- ✅ Validate credentials against backend API
- ✅ On success: redirect to role-appropriate dashboard
- ✅ On failure: show clear error message
- ✅ Limit failed attempts (5 max, 15-minute lockout)
- ✅ Store JWT token securely (httpOnly cookie)
- ✅ Log successful/failed login attempts

### US-AUTH-002: User Logout
**As a** logged-in user  
**I want to** log out securely  
**So that** my session is terminated

**Acceptance Criteria:**
- ✅ Logout button accessible from all screens
- ✅ Clear JWT token from storage
- ✅ Redirect to login page
- ✅ Backend session invalidation
- ✅ Confirmation message "You have been logged out"

### US-AUTH-003: Password Reset
**As a** user who forgot password  
**I want to** reset my password  
**So that** I can regain access

**Acceptance Criteria:**
- ✅ "Forgot Password" link on login page
- ✅ Enter email address
- ✅ Receive reset link via email (valid 1 hour)
- ✅ Click link → reset password form
- ✅ Enter new password (min 8 chars, complexity rules)
- ✅ Confirm new password (match validation)
- ✅ Success message + auto redirect to login
- ✅ Old tokens invalidated

### US-AUTH-004: Role-Based Access Control
**As a** system admin  
**I want to** enforce role-based permissions  
**So that** users only access authorized features

**Acceptance Criteria:**
- ✅ Three primary roles: Admin, Manager, Staff
- ✅ Route guards on protected pages
- ✅ UI elements hidden based on permissions
- ✅ API requests include auth token
- ✅ Backend validates permissions
- ✅ 403 Forbidden for unauthorized access
- ✅ Graceful error handling

### US-AUTH-005: Session Management
**As a** user  
**I want** my session to persist appropriately  
**So that** I'm not logged out unexpectedly

**Acceptance Criteria:**
- ✅ Default session: 8 hours
- ✅ "Remember me": 30 days
- ✅ Activity-based renewal (on API calls)
- ✅ Idle timeout warning (5 min before expiry)
- ✅ Multiple device support
- ✅ Manual session revocation from settings

---

## 🔐 Security Requirements

### SR-AUTH-001: Password Policy
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- No common passwords (check against list)
- Password history (prevent reuse of last 5)

### SR-AUTH-002: Token Security
- JWT signed with RS256
- Access token: 15 minutes expiry
- Refresh token: 8 hours / 30 days (remember me)
- httpOnly cookies (prevent XSS)
- Secure flag (HTTPS only)
- SameSite=Strict (CSRF protection)

### SR-AUTH-003: Account Protection
- Max 5 failed login attempts
- 15-minute lockout after 5 failures
- CAPTCHA after 3 failures
- Email notification on suspicious activity
- IP-based rate limiting
- Brute force detection

### SR-AUTH-004: Audit Logging
Log all auth events:
- Login success/failure (with IP, device, timestamp)
- Logout
- Password change/reset
- Account lockout/unlock
- Permission changes
- Session created/expired

---

## 🎨 UI Components

### Login Page (`login.html`)

```
┌─────────────────────────────────────────────────────┐
│  QLCV Y Khoa - Medical Task Management             │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  Email or Username                          │  │
│  │  [_________________________________]        │  │
│  │                                             │  │
│  │  Password                                   │  │
│  │  [_________________________________] [👁]  │  │
│  │                                             │  │
│  │  ☐ Remember me                             │  │
│  │                                             │  │
│  │  [        Đăng Nhập (Login)        ]      │  │
│  │                                             │  │
│  │  Forgot password?           Need help?     │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  © 2026 Medical Task Management System             │
└─────────────────────────────────────────────────────┘
```

### Password Reset Flow

1. **Request Reset**: Enter email
2. **Email Sent**: Confirmation message
3. **Reset Form**: New password + confirm
4. **Success**: Redirect to login

---

## 💾 Data Model

```typescript
interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  department: string;
  isActive: boolean;
  isLocked: boolean;
  failedLoginAttempts: number;
  lastLoginAt: DateTime | null;
  passwordChangedAt: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime;
}

interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: DateTime;
  ipAddress: string;
  userAgent: string;
  createdAt: DateTime;
}

interface AuthEvent {
  id: string;
  userId: string;
  eventType: 'LOGIN' | 'LOGOUT' | 'PASSWORD_RESET' | 'LOCKOUT';
  success: boolean;
  ipAddress: string;
  userAgent: string;
  timestamp: DateTime;
  metadata: Record<string, any>;
}
```

---

## 🔌 API Endpoints

### POST /api/auth/login
**Request:**
```json
{
  "username": "user@example.com",
  "password": "SecurePass123!",
  "rememberMe": true
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "Nguyễn Văn A",
    "role": "STAFF",
    "department": "IT Support"
  },
  "token": "eyJhbGc...",
  "refreshToken": "ref_abc...",
  "expiresIn": 28800
}
```

### POST /api/auth/logout
**Request:**
```json
{
  "token": "eyJhbGc..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### POST /api/auth/forgot-password
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

### POST /api/auth/reset-password
**Request:**
```json
{
  "token": "reset_token_xyz",
  "newPassword": "NewSecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

### POST /api/auth/refresh
**Request:**
```json
{
  "refreshToken": "ref_abc..."
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "expiresIn": 900
}
```

---

## 🎯 Business Rules

### BR-AUTH-001: Role Hierarchy
- **Admin**: Full system access (all features)
- **Manager**: Team management, approvals, reports
- **Staff**: Own tickets, tasks, limited views

### BR-AUTH-002: Session Limits
- Max 3 concurrent sessions per user
- Oldest session auto-revoked when limit reached

### BR-AUTH-003: Password Expiry
- Passwords expire after 90 days (configurable)
- Warning shown 7 days before expiry
- Force reset on first login (new users)

### BR-AUTH-004: Account Activation
- New accounts start inactive
- Admin must activate before first login
- Activation email sent with temporary password

---

## ✅ Acceptance Testing

### Test Scenario 1: Successful Login
1. Navigate to login page
2. Enter valid credentials
3. Click "Đăng Nhập"
4. ✅ Redirected to appropriate dashboard
5. ✅ User info shown in header
6. ✅ Auth token stored

### Test Scenario 2: Failed Login
1. Enter invalid credentials
2. Click "Đăng Nhập"
3. ✅ Error message displayed
4. ✅ Failed attempt logged
5. ✅ Account locked after 5 failures

### Test Scenario 3: Password Reset
1. Click "Forgot password?"
2. Enter email address
3. ✅ Confirmation message shown
4. ✅ Email received with reset link
5. Click reset link
6. Enter new password
7. ✅ Password updated successfully
8. Login with new password
9. ✅ Login successful

### Test Scenario 4: Session Expiry
1. Login successfully
2. Wait for session expiry
3. Attempt to access protected page
4. ✅ Redirected to login page
5. ✅ Warning message shown

---

## 🚀 Implementation Notes

### Frontend (React)
- Use React Router for route protection
- Create `ProtectedRoute` wrapper component
- Store auth state in Redux/Context
- Implement token refresh logic
- Handle 401/403 responses globally

### Backend (C# / .NET)
- Already implemented (per requirements)
- JWT token generation with RS256
- Password hashing with bcrypt
- SQL/Entity Framework for persistence
- Email service integration for reset emails

### Security Best Practices
- Never store passwords in plain text
- Use HTTPS only
- Implement CSRF protection
- Set secure cookie flags
- Rate limit auth endpoints
- Log all auth events
- Regular security audits

---

## 📚 Related Specs
- [06-dashboard.md](./06-dashboard.md) - User dashboards after login
- [12-user-management.md](./12-user-management.md) - User CRUD operations
- [13-settings.md](./13-settings.md) - Password change from settings

---

## 📝 Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-03-25 | System | Initial spec created from HTML analysis |
