# Implementation Plan: Settings & Preferences

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-014  
**Priority:** Medium  
**Status:** 📝 Not Started  
**Created:** 2026-03-25  
**Related Spec:** [13-settings.md](../specs/13-settings.md)

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/settings.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Mock Data Guidelines:**
- Create mock data in separate files: `src/mocks/settings.mock.ts`
- Mock data should match the structure and variety shown in HTML demos
- Include realistic Vietnamese names, departments, and scenarios
- Maintain consistency with data models in `src/models/`

**Verification Status:** ⬜ Not yet verified

---

## 📋 Overview

User settings interface for profile, notifications, display, security, and privacy preferences.

---

## 🎯 Acceptance Criteria

- [ ] Tabbed interface: Profile, Notifications, Display, Security, Privacy
- [ ] Profile tab: Name, email, phone, bio, avatar upload
- [ ] Email change requires verification
- [ ] Change password form (current, new, confirm)
- [ ] Notification preferences per type (push, email, SMS)
- [ ] Do Not Disturb hours
- [ ] Display settings: Theme, font size, density, language, date format
- [ ] Theme preview in real-time
- [ ] Privacy: Profile visibility, opt-out options
- [ ] Data export (GDPR compliance)
- [ ] Save button + success notification
- [ ] Changes apply immediately
- [ ] System settings tab (Admin only)

---

## 📦 Main Components

1. **SettingsPage** - Main container with tabs
2. **ProfileTab** - Profile settings
3. **AvatarUpload** - Image upload component
4. **ChangePasswordForm** - Password change
5. **NotificationsTab** - Notification preferences
6. **NotificationTypeToggle** - Per-type settings
7. **DisplayTab** - Display preferences
8. **ThemeSelector** - Theme picker with preview
9. **SecurityTab** - Security settings
10. **PrivacyTab** - Privacy controls
11. **SystemSettingsTab** - Admin system config (separate)

---

## ⏱️ Time Estimate: **12 hours**

---

## � Implementation Steps

### Phase 1: UI Components (7 hours)
- [ ] Create SettingsPage with tabs
- [ ] Create ProfileTab component
- [ ] Create AvatarUpload component
- [ ] Create ChangePasswordForm component
- [ ] Create NotificationsTab component
- [ ] Create NotificationTypeToggle component
- [ ] Create DisplayTab component
- [ ] Create ThemeSelector component with preview
- [ ] Create SecurityTab component
- [ ] Create PrivacyTab component
- [ ] Create SystemSettingsTab (Admin only)
- [ ] Test responsive layout

### Phase 2: Interactive Features (3 hours)
- [ ] Implement avatar upload with preview
- [ ] Implement theme preview in real-time
- [ ] Add form validation
- [ ] Test theme switching
- [ ] Test all settings save

### Phase 3: API Integration ⭐ (2 hours)
- [ ] Integrate `GET /api/settings/me` for user settings
- [ ] Integrate `PUT /api/settings/me` for settings updates
- [ ] Integrate `POST /api/settings/change-password` for password change
- [ ] Integrate `POST /api/settings/avatar` for avatar upload
- [ ] Integrate `GET /api/settings/export-data` for data export
- [ ] Integrate `GET /api/settings/system` for system settings (Admin)
- [ ] Integrate `PUT /api/settings/system` for system updates (Admin)
- [ ] Add loading states for all API calls
- [ ] Add error handling (password mismatch, etc.)
- [ ] Test with real API endpoints
- [ ] Replace mock data with API data
- [ ] Implement immediate theme application
- [ ] Handle email verification flow

---

## �🔌 API Endpoints

- `GET /api/settings/me`
- `PUT /api/settings/me`
- `POST /api/settings/change-password`
- `POST /api/settings/avatar`
- `GET /api/settings/export-data`
- `GET /api/settings/system` (Admin)
- `PUT /api/settings/system` (Admin)

---

## 🎯 Business Rules

- Email change requires verification
- Password must meet complexity requirements
- Avatar max 5MB
- DND overridden for critical notifications
