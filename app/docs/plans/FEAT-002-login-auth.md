# Implementation Plan: Login & Authentication

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-002  
**Priority:** Critical  
**Status:** ✅ Phase 1 Complete (Core Authentication)  
**Created:** 2026-03-25  
**Completed:** 2026-03-26 (Phase 1)
**Related Spec:** [08-authentication.md](../specs/08-authentication.md)

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/login.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Verification Status:** ✅ Phase 1 Verified - Core login and auth working

---

## 📋 Overview

Implement authentication screens and flows including login, password reset, and session management. Backend authentication already exists - this is frontend integration only.

**Phase 1 (✅ COMPLETED):**
- ✅ Login page with username/password
- ✅ Mock authentication service with test accounts
- ✅ Session management (localStorage)
- ✅ Route guards for protected pages
- ✅ Auto-redirect after login based on role
- ✅ Role-based access control (Manager/Staff/Admin)
- ✅ Logout functionality
- ✅ Session persistence across page refresh

**Phase 2 (⬜ PENDING):**
- ⬜ Remember me functionality (30-day session)
- ⬜ Forgot password flow
- ⬜ Password reset page
- ⬜ Real backend API integration (currently using mocks)
- ⬜ Token refresh mechanism
- ⬜ Account lockout after failed attempts

**Scope:**
- Login page with credentials
- Session management (JWT storage when real backend connected)
- Route guards for protected pages
- Auto-redirect after login based on role

---

## 🎯 Acceptance Criteria

### Phase 1 (✅ Completed):
- [x] Login form with username and password fields
- [x] Submit credentials to auth service (currently mock)
- [x] Store auth token/user securely (localStorage)
- [x] Redirect to appropriate page after login (role-based)
- [x] Show validation errors for invalid credentials
- [x] Protected routes redirect to login if not authenticated
- [x] Logout clears token and redirects to login
- [x] Session persists across page refreshes
- [x] Role-based UI elements (triage button for managers)
- [x] Quick login buttons for testing (4 test accounts)

### Phase 2 (⬜ Pending):
- [ ] Remember me checkbox works (30-day session)
- [ ] Submit to real backend `/api/auth/login`
- [ ] Store JWT token securely (httpOnly cookie)
- [ ] Account lockout after 5 failed attempts (handled by backend)
- [ ] Forgot password link opens reset flow
- [ ] Password reset email sent successfully
- [ ] Reset password page validates token
- [ ] New password meets complexity requirements
- [ ] Auto-refresh token before expiry

---

## 📦 Components to Create

### Phase 1 Components (✅ COMPLETED):

### 1. **LoginPage** ✅ COMPLETED
**Path:** `src/pages/LoginPage/`  
**Status:** ✅ Updated and integrated with Redux auth
**Features:**
- ✅ Login form (username, password)
- ✅ Quick login buttons for testing (4 accounts)
- ✅ Submit handler with Redux dispatch
- ✅ Error display (toast notifications)
- ✅ Loading state
- ✅ Redirect logic (navigates to /tickets after login)
- ✅ Integration with auth service

**Files:**
- `LoginPage.tsx` - Updated with auth integration
- `LoginPage.module.css` - Updated with error/hint styles
- `index.ts` - Export

### 2. **ProtectedRoute** ✅ COMPLETED
**Path:** `src/components/auth/ProtectedRoute.tsx`  
**Status:** ✅ Created and integrated
**Features:**
- ✅ Check authentication status from Redux
- ✅ Redirect to login if not authenticated
- ✅ Store intended destination for post-login redirect
- ✅ Role-based access control (allowedRoles prop)

### 3. **Auth Redux Slice** ✅ COMPLETED
**Path:** `src/store/slices/authSlice.ts`
**Status:** ✅ Created with full authentication state
**Features:**
- ✅ Login async thunk
- ✅ Logout async thunk
- ✅ User state management
- ✅ LocalStorage persistence
- ✅ Auto-load persisted auth on app start
- ✅ Error handling

### 4. **Auth Service** ✅ COMPLETED
**Path:** `src/services/authService.ts`
**Status:** ✅ Created with mock data
**Features:**
- ✅ Mock authentication (4 test accounts)
- ✅ Role-based helper functions
- ✅ Ready for backend integration (USE_MOCK_DATA flag)

**Test Accounts:**
- `admin` / `admin123` (Admin)
- `manager` / `manager123` (Manager)
- `manager2` / `manager123` (Manager 2)
- `staff` / `staff123` (Staff)

---

### Phase 2 Components (⬜ PENDING):

### 5. **ForgotPasswordPage** ⬜ NOT STARTED
**Path:** `src/pages/ForgotPasswordPage/`  
**Features:**
- Email input field
- Submit to `/api/auth/forgot-password`
- Success message display
- Return to login link

### 6. **ResetPasswordPage** ⬜ NOT STARTED
**Path:** `src/pages/ResetPasswordPage/`  
**Features:**
- Token validation from URL
- New password input
- Confirm password input
- Password strength indicator
- Submit to `/api/auth/reset-password`
- Success redirect to login

---

## 🔌 API Integration

### Phase 1 Status (✅ Mock Implementation):
Currently using **mock authentication** for development and testing.

**Implemented (Mock):**
- ✅ Login with username/password → Returns mock user and token
- ✅ Logout → Clears localStorage
- ✅ Get current user → Returns from localStorage
- ✅ Role-based access helpers

**Mock Service Configuration:**
```typescript
// In authService.ts
const USE_MOCK_DATA = import.meta.env.DEV && !import.meta.env.VITE_API_URL;
```

### Phase 2 (⬜ Real Backend Integration):
When `VITE_API_URL` is configured, service will call:

**Endpoints:**
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - End session
- `POST /api/auth/forgot-password` - Send reset email
- `POST /api/auth/reset-password` - Reset with token
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user

---

## 📦 Redux Slices

### authSlice ✅ COMPLETED
**Location:** `src/store/slices/authSlice.ts`

**State:**
```typescript
{
  user: User | null,           // ✅ Implemented
  isAuthenticated: boolean,    // ✅ Implemented
  loading: boolean,            // ✅ Implemented
  error: string | null         // ✅ Implemented
}
```

**Async Thunks Implemented:**
- ✅ `login(credentials)` - Authenticate user
- ✅ `logout()` - Clear session
- ✅ `getCurrentUser()` - Fetch user info
- ⬜ `forgotPassword(email)` - Phase 2
- ⬜ `resetPassword(token, newPassword)` - Phase 2
- ⬜ `refreshToken()` - Phase 2

**Additional Features:**
- ✅ LocalStorage persistence (token + user)
- ✅ Auto-load on app start
- ✅ Error state management
- ✅ Loading states

---

## ⏱️ Time Estimate

### Phase 1 (✅ COMPLETED):
| Component | Estimated | Actual | Status |
|-----------|-----------|--------|--------|
| LoginPage Update | 2 hours | 1 hour | ✅ Done |
| authSlice | 1.5 hours | 1.5 hours | ✅ Done |
| authService (Mock) | 1 hour | 1 hour | ✅ Done |
| ProtectedRoute | 1 hour | 0.5 hours | ✅ Done |
| Integration & Testing | 1.5 hours | 1 hour | ✅ Done |
| **Phase 1 Total** | **7 hours** | **5 hours** | **✅ Complete** |

### Phase 2 (⬜ PENDING):
| Component | Estimated |
|-----------|-----------|
| ForgotPasswordPage | 1 hour |
| ResetPasswordPage | 1 hour |
| Backend Integration | 2 hours |
| Token Refresh | 1 hour |
| Remember Me | 0.5 hours |
| Testing | 1 hour |
| **Phase 2 Total** | **6.5 hours** |

**Grand Total:** 13.5 hours (5 completed, 6.5 remaining)

---

## ✅ Testing Checklist

### Phase 1 (✅ Ready for Testing):
- [x] Successful login redirects to tickets page
- [x] Failed login shows error message (toast)
- [x] Quick login buttons work for all 4 test accounts
- [x] Logout clears session and redirects to login
- [x] Protected routes redirect to login when not authenticated
- [x] Session persists across page refresh
- [x] User name and role display correctly in sidebar
- [x] Role-based UI elements work (triage button for managers)
- [x] Staff cannot see manager-only features
- [x] Login page shows helpful test account info

### Phase 2 (⬜ Pending):
- [ ] Remember me persists session for 30 days
- [ ] Account locks after 5 failures
- [ ] Forgot password sends email
- [ ] Reset password link works
- [ ] Invalid reset token shows error
- [ ] Token refreshes automatically
- [ ] Post-login redirect returns to intended page
- [ ] Backend API integration works

---

## 📝 Notes

### Phase 1 Implementation (✅ Complete):
- ✅ Mock authentication service created for development/testing
- ✅ 4 test accounts available (Admin, Manager, Manager2, Staff)
- ✅ LocalStorage used for session persistence (temporary)
- ✅ Protected routes integrated throughout app
- ✅ Role-based UI features working (e.g., triage button)
- ✅ Quick login buttons for easy testing
- ✅ Toast notifications for login feedback
- ✅ Logout functionality integrated in AppLayout

### Phase 2 Plan (⬜ Pending):
- ⬜ Switch to real backend API when available (set `VITE_API_URL`)
- ⬜ Implement axios interceptors for automatic token refresh
- ⬜ Store JWT in httpOnly cookie (more secure than localStorage)
- ⬜ Add forgot password and reset password flows
- ⬜ Implement remember me with extended session
- ⬜ Add CAPTCHA after 3 failed attempts (optional)

### Files Created/Updated:
**New (4 files):**
- `src/store/slices/authSlice.ts` - Auth state management
- `src/services/authService.ts` - Auth service with mock data
- `src/components/auth/ProtectedRoute.tsx` - Route protection
- `docs/LOGIN_TESTING_GUIDE.md` - Testing documentation

**Updated (6 files):**
- `src/store/store.ts` - Added auth reducer
- `src/App.tsx` - Protected routes
- `src/pages/LoginPage/LoginPage.tsx` - Auth integration
- `src/pages/LoginPage/LoginPage.module.css` - Updated styles
- `src/components/layout/AppLayout/AppLayout.tsx` - Logout & user display
- `src/pages/TicketsListPage/components/TicketDetailSlideout/TicketDetailSlideout.tsx` - Role-based features

### Test Accounts:
```
Username: admin     | Password: admin123   | Role: Admin
Username: manager   | Password: manager123 | Role: Manager
Username: manager2  | Password: manager123 | Role: Manager
Username: staff     | Password: staff123   | Role: Staff
```

### Related Documentation:
- See [LOGIN_TESTING_GUIDE.md](../LOGIN_TESTING_GUIDE.md) for detailed testing instructions
- Backend API spec: [08-authentication.md](../specs/08-authentication.md)

---

## 📊 Summary

**Current Status:** ✅ **Phase 1 Complete** (Core Authentication - 5 hours)

### What's Working Now:
✅ Full login/logout functionality  
✅ Mock authentication with 4 test accounts  
✅ Session persistence (survives page refresh)  
✅ Protected routes (redirects to login when not authenticated)  
✅ Role-based access control (Manager vs. Staff vs. Admin)  
✅ Role-based UI elements (triage button visible only for managers)  
✅ Quick login for easy testing  
✅ User display in sidebar with correct role  

### What's Next (Phase 2):
⬜ Forgot password flow  
⬜ Password reset functionality  
⬜ Real backend API integration  
⬜ Token refresh mechanism  
⬜ Remember me checkbox  
⬜ Account lockout after failures  

### How to Test:
1. Start app: `yarn dev`
2. Click "Quản lý" quick login button
3. Navigate to "Phiếu yêu cầu" (Tickets)
4. Open any ticket → Verify "Phân Loại" button appears (manager only)
5. Logout and login as "Nhân viên" (Staff)
6. Open same ticket → Verify "Phân Loại" button is hidden

**Completion:** Phase 1 100% | Overall 50% (Phase 2 remaining)  
**Last Updated:** March 26, 2026
