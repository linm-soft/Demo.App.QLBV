# 📱 Screen Design - Mobile App & Web App

## Tổng Quan Screens

Hệ thống bao gồm **Web App** (Desktop/Tablet) và **Mobile App** (iOS + Android) với UI/UX tối ưu cho từng platform.

---

## 🌐 WEB APP SCREENS

### 1. AUTHENTICATION

#### 1.1 Login Screen
- Email/Password input
- Remember me checkbox
- Forgot password link
- Login button
- Register link (nếu có)

#### 1.2 Forgot Password
- Email input
- Reset password link gửi về email
- Back to login

---

### 2. DASHBOARD (Home)

#### 2.1 Main Dashboard
**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Header: Logo | Search | Notifications | Profile │
├──────────────┬──────────────────────────────────┤
│              │  📊 Stats Cards (4 cards)        │
│              │  ┌────┬────┬────┬────┐          │
│  Sidebar     │  │ 12 │ 8  │ 15 │ 92%│          │
│  Navigation  │  │Open│Pend│Prog│ SLA│          │
│              │  └────┴────┴────┴────┘          │
│  • Dashboard │                                   │
│  • Tickets   │  📈 Charts Section               │
│  • Tasks     │  ┌──────────┬──────────┐        │
│  • Task Pool │  │ Ticket   │  Task    │        │
│  • Reports   │  │ Status   │ Progress │        │
│  • Users     │  │ Chart    │  Chart   │        │
│  • Settings  │  └──────────┴──────────┘        │
│              │                                   │
│              │  📋 Recent Activity              │
│              │  • Ticket #123 assigned          │
│              │  • Task #456 completed           │
│              │  • SLA warning on #789           │
└──────────────┴──────────────────────────────────┘
```

**Components:**
- Statistics Cards (Total tickets, Open tasks, In Progress, SLA compliance)
- Chart widgets (Ticket status pie chart, Task timeline, Team performance)
- Recent activity feed
- Quick actions panel
- SLA warnings/alerts

---

### 3. TICKETS MODULE

#### 3.1 Tickets List View
**Features:**
- Data table với columns: Ticket #, Title, Priority, Status, Assigned To, Created Date, SLA Status
- Filter panel (Status, Priority, Department, Date range)
- Search bar (by ticket #, title, description)
- Sort options
- Bulk actions (Assign, Change status)
- Pagination
- View mode toggle (List/Kanban/Calendar)

**Status Colors:**
- 🔴 Critical
- 🟠 High  
- 🟡 Medium
- 🟢 Low

**SLA Indicators:**
- 🟢 Safe (>50% time remaining)
- 🟡 Warning (20-50%)
- 🟠 Danger (<20%)
- 🔴 Breached

**Action Buttons:**
- ➕ Create Ticket
- 🔄 Refresh
- 📊 Export
- ⚙️ Column Settings

#### 3.2 Tickets Kanban Board
**Columns:**
```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Submitted│ Assigned │In Progress│ Resolved │  Closed  │
│          │          │           │          │          │
│ [Card 1] │ [Card 3] │ [Card 5]  │ [Card 7] │ [Card 9] │
│ [Card 2] │ [Card 4] │ [Card 6]  │ [Card 8] │          │
│          │          │           │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```
- Drag & drop để change status
- Card shows: Ticket #, Title, Priority badge, Assignee avatar, SLA indicator

#### 3.3 Create Ticket Modal/Page
**Form Fields:**
- Title* (required)
- Description* (rich text editor với markdown support)
- Priority* (dropdown: Critical/High/Medium/Low)
- Category* (dropdown: Technical/Administrative/Clinical/Other)
- Department (dropdown)
- Attachments (drag & drop hoặc browse)
- Tags (multi-select)

**Actions:**
- Submit
- Save as Draft
- Cancel

#### 3.4 Ticket Detail Page
**Layout:**
```
┌─────────────────────────────────────────────┐
│ Header: Ticket #TKT-20240324-0001          │
│ Status Badge | Priority Badge | SLA Status  │
├─────────────────────────────────────────────┤
│ Main Info Panel                             │
│ • Title, Description                        │
│ • Created by, Created date                  │
│ • Assigned to, Department                   │
│ • Tags                                      │
├─────────────────────────────────────────────┤
│ Action Bar                                  │
│ [Change Status] [Assign] [Edit] [More...]  │
├─────────────────────────────────────────────┤
│ Tabs:                                       │
│ ┌─────┬─────────┬────────┬──────────┐     │
│ │Chat │Comments │Activity│Attachments│     │     
│ └─────┴─────────┴────────┴──────────┘     │
│                                              │
│ [Tab Content Area]                          │
│ • Chat: Real-time messaging (MQTT)         │
│ • Comments: Threaded discussions           │
│ • Activity: Timeline of all changes        │
│ • Attachments: File list with preview     │
└─────────────────────────────────────────────┘
```

**Right Sidebar:**
- SLA Countdown
- Status History
- Related Tickets
- Suggested Actions (nếu breach SLA)

---

### 4. TASKS MODULE

#### 4.1 Tasks List View
**Similar to Tickets List, thêm:**
- Progress bar column (%)
- Deadline column
- Subtask count (e.g., "3/5 completed")
- Estimated vs Actual hours

**Filters:**
- Status, Priority, Assigned to, Team, Deadline (Overdue/This week/This month)

#### 4.2 Task Pool (Available Tasks)
**Purpose:** Staff tự chọn tasks từ pool

**Layout:**
```
┌─────────────────────────────────────────────┐
│ 📋 Available Tasks                          │
│ Filter: [Department] [Priority] [Skills]   │
├─────────────────────────────────────────────┤
│ Task Card 1                                 │
│ Title: Update patient records system       │
│ Priority: Medium | Deadline: Mar 30        │
│ Skills: SQL, Database                       │
│ Estimated: 16 hours                         │
│ [View Details] [Claim Task]                │
├─────────────────────────────────────────────┤
│ Task Card 2                                 │
│ ...                                         │
└─────────────────────────────────────────────┘
```

#### 4.3 Create Task Form
**Fields:**
- Title*, Description*
- Priority*, Deadline*
- Estimated hours
- Assignment Strategy:
  - 🎯 Direct Assignment (chọn user)
  - 🏊 Add to Pool
  - 👥 Assign to Team
- Tags
- Checklist/Subtasks (dynamic add/remove)
- Dependencies (select other tasks)
- Attachments

#### 4.4 Task Detail Page
**Similar to Ticket Detail, thêm:**
- Progress slider (0-100%)
- Checklist with checkboxes
- Time tracking section:
  - Log hours button
  - Time logs table (Date, Hours, Description)
  - Total time spent
- Subtasks tree view
- [Submit for Review] button

**Actions:**
- Update Progress
- Check off Subtasks
- Log Working Hours
- Submit for Review
- Request Reassignment

---

### 5. TASK POOL (Staff View)

#### 5.1 Available Tasks Grid
- Card-based layout
- Each card shows:
  - Task title
  - Priority badge
  - Deadline
  - Estimated hours
  - Required skills
  - Department
  - [Claim] button
- Filters: Department, Priority, Skills, Deadline
- Sort by: Newest, Priority, Deadline, Estimated hours

---

### 6. MANAGER DASHBOARD

#### 6.1 Manager Overview
**Additional widgets:**
- Team workload distribution chart
- SLA breach alerts panel
- Reassignment suggestions
- Pending approvals count
- Team performance metrics

#### 6.2 Reassignment Suggestion Panel
**When SLA breached:**
```
┌─────────────────────────────────────────────┐
│ ⚠️ SLA Breach Alert                         │
│ Ticket: TKT-20240324-0001                   │
│ Priority: CRITICAL                          │
│ Breached by: 30 minutes                     │
├─────────────────────────────────────────────┤
│ Current Assignee:                           │
│ • Staff A (Workload: 8 tickets)            │
├─────────────────────────────────────────────┤
│ 💡 Suggested Candidates:                    │
│ 1. ⭐ John Doe - 4.8★                       │
│    Workload: 3 tickets                      │
│    Experience: 45 similar resolved          │
│    [Select]                                 │
│                                              │
│ 2. Jane Smith - 4.6★                       │
│    Workload: 2 tickets                      │
│    [Select]                                 │
├─────────────────────────────────────────────┤
│ Actions:                                    │
│ [Keep Current Assignee] [Reassign]         │
└─────────────────────────────────────────────┘
```

#### 6.3 Approval Queue
- List of tasks submitted for review
- Quick approve/reject buttons
- Request changes with comments

---

### 7. REPORTS MODULE

#### 7.1 Reports Dashboard
**Report Types:**
- Ticket Performance Report
- Task Completion Report
- Team Performance Report
- SLA Compliance Report
- User Productivity Report

**Features:**
- Date range picker
- Filter by department/team/user
- Export to PDF/Excel
- Schedule email reports

#### 7.2 SLA Compliance Report
**Visualizations:**
- Overall compliance rate (gauge chart)
- Compliance by priority (bar chart)
- Breach reasons breakdown (pie chart)
- Timeline trend (line chart)
- At-risk tickets table

---

### 8. USERS & SETTINGS

#### 8.1 Users Management
- User list table
- Add/Edit user modal
- Role assignment
- Department assignment
- Deactivate/Activate user
- Bulk import users

#### 8.2 Settings
**Tabs:**
- Profile Settings
- Notification Preferences (Email, Push, SMS)
- SLA Configuration (Admin only)
- Department & Team Management
- Category & Tag Management
- Email Templates

---

## 📱 MOBILE APP SCREENS

### 1. AUTHENTICATION

#### 1.1 Splash Screen
- App logo
- Loading indicator
- Auto-login nếu có session

#### 1.2 Login Screen
```
┌─────────────────────┐
│      [Logo]         │
│                     │
│   Medical Task      │
│    Management       │
│                     │
│  ┌───────────────┐ │
│  │ Email         │ │
│  └───────────────┘ │
│                     │
│  ┌───────────────┐ │
│  │ Password      │ │
│  └───────────────┘ │
│                     │
│  [Login Button]    │
│                     │
│  [Face ID] [Touch] │
│                     │
│  Forgot Password?  │
└─────────────────────┘
```

---

### 2. HOME / DASHBOARD

#### 2.1 Home Tab
```
┌─────────────────────┐
│ 👋 Hello, John      │
│                     │
│ Stats Cards (2x2)   │
│ ┌─────┬─────┐      │
│ │  🎫 │  📋 │      │
│ │  12 │   8 │      │
│ │ Open│Pend │      │
│ └─────┴─────┘      │
│ ┌─────┬─────┐      │
│ │  ⚠️ │  ✅ │      │
│ │   3 │  92%│      │
│ │Alert│ SLA │      │
│ └─────┴─────┘      │
│                     │
│ Quick Actions       │
│ [➕ New Ticket]    │
│ [🔍 Task Pool]     │
│                     │
│ Recent Activity     │
│ • Ticket #123...   │
│ • Task #456...     │
│ • SLA warning...   │
│                     │
└─────────────────────┘
[Tab Bar: Home|Tickets|Tasks|Profile]
```

---

### 3. TICKETS MODULE

#### 3.1 Tickets List Screen
```
┌─────────────────────┐
│ 🔍 Search...   [⚙️] │
├─────────────────────┤
│ Filters:            │
│ [All▼][Priority▼]  │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ 🔴 TKT-001      │ │
│ │ Printer not work│ │
│ │ 👤 John Doe     │ │
│ │ 🕐 5 min ago    │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 🟡 TKT-002      │ │
│ │ Update needed   │ │
│ │ 👤 Jane Smith   │ │
│ │ ⏰ 2h remaining │ │
│ └─────────────────┘ │
│                     │
│ [Load More...]      │
└─────────────────────┘
[➕ FAB Button]
```

**Swipe Actions:**
- Swipe Right: Assign
- Swipe Left: Change Status

#### 3.2 Create Ticket Screen
```
┌─────────────────────┐
│ ← Create Ticket  [✓]│
├─────────────────────┤
│ Title               │
│ ┌─────────────────┐ │
│ │                 │ │
│ └─────────────────┘ │
│                     │
│ Description         │
│ ┌─────────────────┐ │
│ │                 │ │
│ │                 │ │
│ └─────────────────┘ │
│                     │
│ Priority            │
│ [Critical▼]         │
│                     │
│ Category            │
│ [Technical▼]        │
│                     │
│ 📎 Attachments      │
│ [📷 Camera]         │
│ [🎤 Voice Note]    │
│ [📁 Files]         │
│                     │
└─────────────────────┘
```

#### 3.3 Ticket Detail Screen
```
┌─────────────────────┐
│ ← TKT-001      [⋮]  │
├─────────────────────┤
│ 🔴 Critical         │
│ Printer not working │
│                     │
│ 📝 Description      │
│ The printer in ER..│
│                     │
│ 👤 Assigned:        │
│ John Doe            │
│                     │
│ 🕐 Created:         │
│ Mar 24, 10:30 AM    │
│                     │
│ ⏰ SLA Status:      │
│ 🟡 45 min remaining │
│                     │
│ Tabs: [💬Chat][📋] │
│ ┌─────────────────┐ │
│ │ Chat messages   │ │
│ │ ...             │ │
│ └─────────────────┘ │
│ [Type message...]   │
└─────────────────────┘
[Action Bar: Assign|Status|More]
```

**Quick Actions (Bottom Sheet):**
- Change Status
- Assign to Someone
- Add Comment
- Take Photo
- Record Voice Note
- Request Reassignment

---

### 4. TASKS MODULE

#### 4.1 Task List Screen
**Similar to Tickets, thêm:**
- Progress bar on each card
- Checklist count (3/5)
- Deadline countdown

#### 4.2 Task Pool Screen
```
┌─────────────────────┐
│ 🏊 Available Tasks  │
│ [Filters ▼]         │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ 🟡 Update DB     │ │
│ │ Est: 16 hours   │ │
│ │ Deadline: Mar 30│ │
│ │ Skills: SQL, DB │ │
│ │ [Claim Task]    │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 🟠 Fix Bug      │ │
│ │ Est: 4 hours    │ │
│ │ [Claim Task]    │ │
│ └─────────────────┘ │
└─────────────────────┘
```

#### 4.3 Task Detail Screen
```
┌─────────────────────┐
│ ← TSK-456      [⋮]  │
├─────────────────────┤
│ Update patient      │
│ records system      │
│                     │
│ Progress: 65%       │
│ ▓▓▓▓▓▓▓░░░░         │
│                     │
│ ☑️ Checklist (3/5)  │
│ ✅ Backup old data  │
│ ✅ Test script      │
│ ✅ Run migration    │
│ ☐ Verify results   │
│ ☐ Update docs      │
│                     │
│ ⏱️ Time Tracking    │
│ 10.5 / 16 hours    │
│ [+ Log Hours]      │
│                     │
│ 💬 Chat            │
│ [View messages]    │
└─────────────────────┘
[Update Progress] [Submit Review]
```

---

### 5. PROFILE & SETTINGS

#### 5.1 Profile Tab
```
┌─────────────────────┐
│    [Avatar]         │
│   John Doe          │
│   Staff • IT Dept   │
│                     │
│ Stats               │
│ ┌─────┬─────┬─────┐│
│ │ 45  │ 32  │ 4.8 ││
│ │Tick │Task │Rate ││
│ └─────┴─────┴─────┘│
│                     │
│ Menu Items          │
│ ► My Tickets        │
│ ► My Tasks          │
│ ► Settings          │
│ ► Notifications     │
│ ► Help & Support    │
│ ► About             │
│ ► Logout            │
└─────────────────────┘
```

#### 5.2 Settings Screen
- Profile Information
- Change Password
- Notification Preferences
  - Push Notifications [Toggle]
  - Email Notifications [Toggle]
  - SMS Alerts [Toggle]
- Biometric Login [Toggle]
- Language (Tiếng Việt / English)
- Dark Mode [Toggle]

---

### 6. NOTIFICATIONS CENTER

#### 6.1 Notifications List
```
┌─────────────────────┐
│ 🔔 Notifications    │
│ [All▼] [Mark Read] │
├─────────────────────┤
│ ● New Assignment    │
│   Ticket TKT-001    │
│   5 min ago         │
├─────────────────────┤
│ ● SLA Warning       │
│   Task TSK-456      │
│   15 min ago        │
├─────────────────────┤
│ ○ Comment Reply     │
│   @John mentioned   │
│   1 hour ago        │
└─────────────────────┘
```

**Types:**
- Assignment (🎯)
- Status Change (🔄)
- Comment/Mention (💬)
- SLA Warning (⚠️)
- Approval Request (✅)

---

### 7. CAMERA & MEDIA

#### 7.1 Camera Screen (Native)
- Take photo
- Record video
- Add to ticket/task
- Preview before submit

#### 7.2 Voice Notes (Native)
- Record audio
- Play preview
- Attach to ticket/task

---

## 🔄 NAVIGATION FLOW

### Web App Navigation
```
Login → Dashboard
         ├─→ Tickets List → Ticket Detail → Chat/Comments
         ├─→ Tasks List → Task Detail → Update Progress
         ├─→ Task Pool → Claim Task → Task Detail
         ├─→ Reports → View Charts → Export
         └─→ Settings → Update Preferences
```

### Mobile App Navigation
```
Login → Tab Navigator
         ├─→ [Home Tab]
         │    └─→ Quick Actions → Create Ticket/View Pool
         ├─→ [Tickets Tab]
         │    ├─→ List → Detail → Chat
         │    └─→ FAB → Create Ticket → Camera/Files
         ├─→ [Tasks Tab]
         │    ├─→ My Tasks → Detail → Update
         │    └─→ Task Pool → Claim → Detail
         └─→ [Profile Tab]
              ├─→ My Items
              └─→ Settings → Preferences
```

---

## 🎨 UI/UX DESIGN PATTERNS

### Web App
1. **Responsive Layout**: Desktop (1920px), Tablet (768px), Mobile Web (375px)
2. **Sidebar Navigation**: Collapsible, persistent on desktop
3. **Data Tables**: Sortable, filterable, with pagination
4. **Modals**: For quick actions (Create ticket, Assign, etc.)
5. **Toast Notifications**: For success/error messages
6. **Loading States**: Skeleton screens for content loading

### Mobile App
1. **Bottom Tab Navigation**: Home, Tickets, Tasks, Profile
2. **Floating Action Button (FAB)**: Quick create actions
3. **Swipe Gestures**: For quick actions on list items
4. **Pull to Refresh**: On all list views
5. **Bottom Sheets**: For contextual actions
6. **Inline Editing**: For progress updates
7. **Offline Indicators**: Show when offline with sync status

---

## 🎯 SCREEN PRIORITIES

### Phase 1 (MVP):
**Web:**
1. Login
2. Dashboard
3. Tickets List
4. Ticket Detail (với Chat)
5. Create Ticket
6. Tasks List
7. Task Detail
8. Simple Settings

**Mobile:**
1. Login (với Biometric)
2. Home Tab
3. Tickets List
4. Ticket Detail (với Chat)
5. Create Ticket (với Camera)
6. Tasks List
7. Task Detail
8. Profile Tab

### Phase 2 (Enhancement):
**Web:**
9. Kanban Board
10. Task Pool
11. Manager Dashboard
12. Reassignment UI
13. Reports Dashboard
14. Advanced Filters

**Mobile:**
9. Task Pool
10. Offline Mode
11. Voice Notes
12. QR Scanner
13. Advanced Notifications
14. Dark Mode

### Phase 3 (Advanced):
**Web:**
15. Advanced Reports
16. Custom Workflows
17. Analytics Dashboard
18. Integration Settings

**Mobile:**
15. Widgets (iOS/Android)
16. Shortcuts
17. Watch App (optional)
18. Location Tracking

---

## 📊 SCREEN COUNT SUMMARY

### Web App: **~25-30 screens/views**
- Auth: 2
- Dashboard: 3
- Tickets: 5
- Tasks: 6
- Task Pool: 2
- Manager: 3
- Reports: 4
- Users & Settings: 5

### Mobile App: **~20-25 screens**
- Auth: 3 (Splash, Login, Biometric)
- Home: 1
- Tickets: 4
- Tasks: 5
- Task Pool: 2
- Profile: 3
- Notifications: 2
- Camera/Media: 2

---

**Last Updated**: March 24, 2026
**Version**: 1.0.0
