# Implementation Plan: SLA Alerts

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-009  
**Priority:** High  
**Status:** ✅ Completed  
**Created:** 2026-03-25  
**Completed:** 2026-03-27  
**Related Spec:** [05-sla-management.md](../specs/05-sla-management.md)

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/sla-alerts.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Mock Data Guidelines:**
- Create mock data in separate files: `src/mocks/slaAlerts.mock.ts`
- Mock data should match the structure and variety shown in HTML demos
- Include realistic Vietnamese names, departments, and scenarios
- Maintain consistency with data models in `src/models/`

**Verification Status:** ✅ Completed - All components implemented

---

## 📋 Overview

SLA monitoring dashboard showing at-risk and breached items with escalation actions.

---

## 🎯 Acceptance Criteria

- [x] Summary cards: Total alerts, Danger, Warning, Breached
- [x] Alert list with severity indicators
- [x] Filter: Severity, type (ticket/task), department
- [x] Sort: Time remaining, priority, created date
- [x] Alert details: Item info, assignee, SLA status, countdown
- [x] Action buttons: Reassign, Escalate, View Detail
- [x] Reassignment form with candidate suggestions
- [x] Escalation workflow triggers
- [x] Real-time countdown updates
- [x] Color-coded severity (red/orange/yellow)
- [ ] Notification when new alert appears
- [ ] Export alerts to CSV

---

## 📦 Main Components

1. **SLAAlertsPage** - Main container
2. **AlertsStatsCards** - Summary metrics
3. **AlertsFilters** - Filter bar
4. **AlertsList** - List of alerts
5. **AlertCard** - Individual alert with countdown
6. **ReassignModal** - Reassignment form
7. **CandidateSuggestions** - Suggested assignees
8. **EscalateModal** - Escalation confirmation
9. **CountdownTimer** - Real-time countdown component

---

## ⏱️ Time Estimate: **10 hours**

---

## � Implementation Steps

### Phase 1: UI Components (6 hours) - ✅ COMPLETED
- [x] Create SLAAlertsPage layout
- [x] Create AlertsStatsCards component
- [x] Create AlertsFilters component
- [x] Create AlertsList component (integrated in page)
- [x] Create AlertCard component with countdown
- [x] Create CountdownTimer component
- [x] Create ReassignModal component
- [x] Create CandidateSuggestions component (integrated in modal)
- [x] Create EscalateModal component
- [x] Test responsive layout

### Phase 2: Real-time Updates (2 hours) - ✅ COMPLETED
- [x] Setup countdown timer logic with setInterval
- [x] Implement real-time countdown updates
- [x] Handle alert severity updates based on time
- [x] Update Redux state every second via updateCountdowns action
- [ ] Setup MQTT for SLA alerts (future enhancement)
- [ ] Add browser notifications (future enhancement)
- [ ] Add sound notifications (optional)

### Phase 3: API Integration ⭐ (2 hours) - ⏳ PENDING
- [x] Create service layer `slaAlertService.ts` with mock implementation
- [x] Setup Redux slice `slaAlertsSlice.ts` with async thunks
- [x] Integrate alert list via Redux thunk
- [x] Integrate stats via Redux thunk
- [x] Integrate reassignment via Redux thunk
- [x] Integrate escalation via Redux thunk
- [x] Integrate candidate suggestions via Redux thunk
- [x] Add loading states for all API calls
- [x] Add error handling in Redux slice
- [ ] Replace mock data with real API endpoints (when backend is ready)
- [ ] Test with real API endpoints
- [ ] Verify MQTT real-time alerts work with API data
- [ ] Test countdown synchronization with server time
- [ ] Integrate `GET /api/sla/stats` for statistics
- [ ] Integrate `POST /api/tickets/:id/reassign` for ticket reassignment
- [ ] Integrate `POST /api/tasks/:id/reassign` for task reassignment
- [ ] Integrate `POST /api/sla/:id/escalate` for escalation
- [ ] Integrate `GET /api/users/candidates` for suggestions
- [ ] Add loading states for all API calls
- [ ] Add error handling and retry logic
- [ ] Test with real API endpoints
- [ ] Replace mock data with API data
- [ ] Verify MQTT real-time alerts work with API data
- [ ] Test countdown synchronization with server time

---

## �🔌 API Endpoints

- `GET /api/sla/alerts`
- `GET /api/sla/stats`
- `POST /api/tickets/:id/reassign`
- `POST /api/tasks/:id/reassign`
- `POST /api/sla/:id/escalate`
- `GET /api/users/candidates` (for suggestions)

---

## 🎯 Business Rules

- Danger = 0-10% time remaining
- Warning = 10-25% time remaining
- Breached = Past deadline
- Auto-refresh every 1 minute
- Sound notification for critical breaches (optional)
