# Phân Tích Chi Tiết Workflows - QLCV Y Khoa

**Ngày tạo**: 26/03/2026  
**Mục đích**: Phân tích chi tiết 2 workflows chính của hệ thống, bao gồm steps và roles

---

## 📊 WORKFLOW 1: SUPPORT TICKET MANAGEMENT

### Tổng quan
Workflow quản lý yêu cầu hỗ trợ từ khi tạo đến khi hoàn thành và đánh giá.

### Chi tiết các bước

| Step | Tên bước | Roles tham gia | Hành động | Trạng thái | Thời gian SLA |
|------|----------|----------------|-----------|------------|---------------|
| 1 | **Ticket Creation** | End User | - Tạo ticket mới<br>- Nhập tiêu đề, mô tả<br>- Chọn priority (Low/Medium/High/Critical)<br>- Chọn category (Kỹ thuật/Hành chính/Lâm sàng)<br>- Upload file đính kèm | `SUBMITTED` | - |
| 2 | **Ticket Triage** | Admin/Manager | - Xem xét ticket<br>- Đánh giá mức độ phù hợp<br>- Quyết định: Accept/Pending/Reject<br>- Nếu Pending: yêu cầu thêm thông tin<br>- Nếu Reject: đóng với lý do | `TRIAGED` / `PENDING` / `REJECTED` | Response: 5 phút (Critical), 30 phút (High), 2h (Medium), 8h (Low) |
| 3 | **Assignment** | Admin/Manager | - Chọn team/cá nhân phù hợp<br>- Gán ticket<br>- System gửi push notification | `ASSIGNED` | - |
| 4 | **Work in Progress** | Staff | - Nhận notification<br>- Bắt đầu xử lý<br>- Cập nhật tiến độ<br>- Chat/comment trao đổi<br>- Upload kết quả/hình ảnh<br>- Nếu cần hỗ trợ: request help<br>- Nếu blocked: báo manager | `IN_PROGRESS` / `BLOCKED` | Resolve: 2h (Critical), 4h (High), 24h (Medium), 3 ngày (Low) |
| 4a | **Request Help** (Optional) | Staff | - Staff yêu cầu hỗ trợ từ đồng nghiệp<br>- Mô tả vấn đề cần support<br>- Manager nhận notification | `HELP_REQUESTED` | - |
| 4b | **Support Assignment** (Optional) | Manager | - Manager xem xét yêu cầu<br>- Chọn helper từ cùng department<br>- Assign helper vào ticket<br>- Helper nhận notification | `SUPPORT_ASSIGNED` | - |
| 5 | **Resolution** | Staff | - Hoàn thành xử lý (có thể với sự hỗ trợ)<br>- Mô tả giải pháp<br>- Đánh dấu resolved<br>- Thông báo user/manager | `RESOLVED` | - |
| 6 | **Review & Approval** | Manager/End User | - Xác nhận kết quả<br>- Quyết định: Approve/Reopen<br>- Nếu Approved: đánh giá 1-5 sao<br>- Nếu Reopen: về lại step 4 | `APPROVED` / `REOPENED` | - |
| 7 | **Closure** | System | - Tự động đóng ticket<br>- Lưu vào lịch sử<br>- Cập nhật KPI | `CLOSED` | - |

### Status Definitions (Tickets)

| Status | Mô tả | Trigger | Next State(s) |
|--------|-------|---------|---------------|
| **SUBMITTED** | Ticket mới được tạo, chưa review | User tạo ticket | TRIAGED, PENDING, REJECTED |
| **PENDING** | Chờ thêm thông tin từ user | Manager request info | TRIAGED (sau khi có info) |
| **TRIAGED** | Đã được manager review và approve | Manager accept | ASSIGNED |
| **REJECTED** | Ticket bị từ chối | Manager reject | (Terminal) |
| **ASSIGNED** | Đã gán cho staff, chưa bắt đầu | Manager assign | IN_PROGRESS |
| **IN_PROGRESS** | Staff đang xử lý | Staff start work | HELP_REQUESTED, BLOCKED, RESOLVED |
| **HELP_REQUESTED** | Staff yêu cầu hỗ trợ | Staff request help | SUPPORT_ASSIGNED, IN_PROGRESS |
| **SUPPORT_ASSIGNED** | Helper đã được assign | Manager assign helper | IN_PROGRESS |
| **BLOCKED** | Bị chặn bởi vấn đề/dependency | Staff mark blocked | IN_PROGRESS (khi unblock) |
| **RESOLVED** | Staff đã hoàn thành | Staff complete work | APPROVED, REOPENED |
| **APPROVED** | Manager/User approved giải pháp | Manager/User approve | CLOSED (sau rating) |
| **REOPENED** | User không hài lòng, cần làm lại | User reopen | IN_PROGRESS |
| **CLOSED** | Hoàn tất, đã rate và đóng | System close after rating | (Terminal) |

### Roles & Responsibilities Matrix

| Role | Creation | Triage | Assignment | Work | Resolution | Review |
|------|----------|--------|------------|------|------------|---------|
| **End User** | ✅ Tạo ticket<br>✅ Cung cấp thông tin | ⚠️ Cung cấp thêm info nếu cần | ❌ | ❌ | ❌ | ✅ Review kết quả<br>✅ Đánh giá chất lượng |
| **Staff** | ✅ Tạo ticket | ❌ | ❌ | ✅ Xử lý ticket<br>✅ Cập nhật tiến độ<br>✅ Chat/comment<br>⚠️ Báo blocked | ✅ Đánh dấu resolved<br>✅ Mô tả giải pháp | ⚠️ Xem feedback |
| **Team Lead** | ✅ Tạo ticket | ✅ Triage<br>⚠️ Phê duyệt reject | ✅ Gán cho team<br>⚠️ Reassign | ⚠️ Hỗ trợ khi blocked | ⚠️ Review tiến độ | ✅ Review chất lượng<br>⚠️ Reopen nếu cần |
| **Manager/Admin** | ✅ Tạo ticket | ✅ Triage<br>✅ Accept/Reject | ✅ Gán cho bất kỳ ai<br>✅ Reassign | ⚠️ Monitor<br>⚠️ Giải quyết blocked | ⚠️ Review tiến độ | ✅ Final approval<br>✅ Reopen nếu cần |

**Chú thích:**
- ✅ = Được phép thực hiện
- ❌ = Không được phép
- ⚠️ = Được phép trong điều kiện đặc biệt

### Escalation Rules

| Priority | Response Time | Resolve Time | Action khi breach SLA |
|----------|---------------|--------------|------------------------|
| **CRITICAL** | 5 phút | 2 giờ | - SMS/Call alert Manager ngay<br>- Sau 2h: Alert Manager + Director<br>- Suggest reassignment (cần approval) |
| **HIGH** | 30 phút | 4 giờ | - Email alert Team Lead sau 30 phút<br>- Sau 4h: Alert Manager + Suggest reassignment |
| **MEDIUM** | 2 giờ | 24 giờ | - Notification Manager sau 2h<br>- Sau 24h: Manager review required |
| **LOW** | 8 giờ | 3 ngày | - Email reminder sau 8h<br>- Sau 3 ngày: Escalate lên Manager |

---

## 📋 WORKFLOW 2: TASK ASSIGNMENT & MANAGEMENT

### Tổng quan
Workflow giao việc và quản lý tiến độ công việc, hỗ trợ 3 chiến lược giao việc.

### Chi tiết các bước

| Step | Tên bước | Roles tham gia | Hành động | Trạng thái | Thời gian |
|------|----------|----------------|-----------|------------|-----------|
| 1 | **Task Creation** | Manager/Admin | - Tạo task mới<br>- Nhập: title, description, deadline<br>- Set priority<br>- Tạo checklist con (subtasks)<br>- Thêm tags/labels | `CREATED` | - |
| 2a | **Direct Assignment** | Manager/Admin | - Chọn assignee cụ thể<br>- System gửi notification<br>- Task vào danh sách assignee | `ASSIGNED` | - |
| 2b | **Task Pool** | System | - Task đăng lên pool công khai<br>- Staff có thể xem và chọn<br>- First-come-first-serve hoặc cần approval | `POOL` (or `IN_POOL`) | - |
| 2b.1 | **Self-Pick** | Staff | - Browse task pool<br>- Xem chi tiết task<br>- Chọn task phù hợp<br>- Claim task | `CLAIMED` | - |
| 2b.2 | **Claim Approval** | Manager/Lead | - Xem xét claim request<br>- Approve hoặc Reject<br>- Nếu approved: Staff nhận task<br>- Nếu rejected: Task về pool | `ASSIGNED` / `POOL` | - |
| 2c | **Department Assignment** | Manager/Lead | - Gán cho department<br>- Department members xem task<br>- Members có thể pick task | `DEPT_ASSIGNED` | - |
| 3 | **Reassignment** | Manager/Lead | - Chọn assignee mới<br>- Nhập lý do reassign<br>- Thông báo cả 2 bên (old + new)<br>- Log vào history | `REASSIGNED` → `ASSIGNED` | - |
| 4 | **Execution** | Staff | - Bắt đầu thực hiện<br>- Update % progress (0-100%)<br>- Check-off subtasks<br>- Log working hours<br>- Chat/collaborate<br>- Upload files/hình ảnh<br>- Nếu cần hỗ trợ: request support<br>- Nếu gặp khó khăn: đánh dấu Blocked | `IN_PROGRESS` / `BLOCKED` | - |
| 4a | **Request Collaboration** (Optional) | Staff | - Staff yêu cầu hỗ trợ từ team member<br>- Mô tả phần việc cần support<br>- Manager/Lead nhận notification | `SUPPORT_REQUESTED` | - |
| 4b | **Collaborator Assignment** (Optional) | Manager/Lead | - Manager xem xét yêu cầu<br>- Chọn collaborator phù hợp<br>- Assign collaborator vào task<br>- Collaborator nhận notification | `COLLAB_ASSIGNED` | - |
| 5 | **Ready for Review** | Staff | - Hoàn thành 100%<br>- Đánh dấu "Ready for Review"<br>- Tổng hợp kết quả<br>- Notification manager | `REVIEW` | - |
| 6 | **Review & Approval** | Manager/Lead | - Review kết quả<br>- Quyết định:<br>&nbsp;&nbsp;• Approve → COMPLETED<br>&nbsp;&nbsp;• Request Changes → IN_PROGRESS<br>&nbsp;&nbsp;• Reject → Reassign | `COMPLETED` / `CHANGES_REQUESTED` / `FAILED` | - |
| 7 | **Completion** | System | - Task đóng<br>- Ghi nhận vào báo cáo<br>- Cập nhật KPI<br>- Archive | `COMPLETED` | - |

### Status Definitions (Tasks)

| Status | Mô tả | Trigger | Next State(s) |
|--------|-------|---------|---------------|
| **CREATED** | Task mới tạo, chưa assign | Manager tạo task | ASSIGNED, POOL, DEPT_ASSIGNED |
| **POOL** (or **IN_POOL**) | Task trong pool chờ claim | Manager chọn pool strategy | CLAIMED |
| **CLAIMED** | Staff đã claim, chờ approval | Staff claim từ pool | ASSIGNED (approved) |
| **DEPT_ASSIGNED** | Assigned to department | Manager assign to dept | ASSIGNED (member pick) |
| **ASSIGNED** | Đã gán cho staff cụ thể | Manager assign hoặc approved claim | IN_PROGRESS |
| **IN_PROGRESS** | Staff đang làm việc | Staff start work | SUPPORT_REQUESTED, BLOCKED, REVIEW |
| **SUPPORT_REQUESTED** | Staff yêu cầu collaborator | Staff request support | COLLAB_ASSIGNED, IN_PROGRESS |
| **COLLAB_ASSIGNED** | Collaborator đã được assign | Manager assign collaborator | IN_PROGRESS |
| **BLOCKED** | Bị block bởi dependency | Staff mark blocked | IN_PROGRESS (khi unblock) |
| **REVIEW** | Chờ manager review | Staff submit for review | COMPLETED, CHANGES_REQUESTED |
| **CHANGES_REQUESTED** | Manager yêu cầu sửa | Manager request changes | IN_PROGRESS |
| **COMPLETED** | Manager approved, hoàn thành | Manager approve | CLOSED |
| **CANCELLED** | Task bị hủy | Manager cancel | (Terminal) |
| **CLOSED** | Đã đóng, archived | System close | (Terminal) |

### Roles & Responsibilities Matrix

| Role | Creation | Assignment | Claim/Pick | Reassign | Execution | Review/Approve |
|------|----------|------------|------------|----------|-----------|----------------|
| **End User** | ❌ | ❌ | ❌ | ❌ | ⚠️ View own tasks<br>⚠️ Update progress | ❌ |
| **Staff** | ❌ | ❌ | ✅ Pick from pool<br>✅ Claim task | ❌ | ✅ Update progress<br>✅ Check subtasks<br>✅ Log hours<br>✅ Chat/collaborate<br>✅ Upload files<br>✅ Submit for review | ⚠️ View feedback only |
| **Team Lead** | ⚠️ Create team tasks | ✅ Assign to team<br>⚠️ Reassign team tasks | ⚠️ Approve claims | ✅ Reassign team tasks | ⚠️ Monitor team<br>⚠️ Unblock issues | ✅ Review team tasks<br>✅ Approve/Request changes |
| **Manager/Admin** | ✅ Create all tasks<br>✅ Set priorities<br>✅ Define subtasks | ✅ Assign to anyone<br>✅ Team assignment<br>✅ Pool assignment | ✅ Approve all claims | ✅ Reassign any task | ⚠️ Monitor all<br>✅ Resolve blocked<br>⚠️ View reports | ✅ Review any task<br>✅ Final approval<br>✅ Reject and reassign |

**Chú thích:**
- ✅ = Được phép thực hiện
- ❌ = Không được phép
- ⚠️ = Được phép trong điều kiện đặc biệt hoặc giới hạn phạm vi

### Assignment Strategies Comparison

| Strategy | Ưu điểm | Nhược điểm | Use case |
|----------|---------|------------|----------|
| **Direct Assignment** | - Nhanh chóng<br>- Kiểm soát tốt<br>- Ensure đúng người | - Manager phải biết capacity<br>- Có thể overload staff | - Urgent tasks<br>- Tasks cần chuyên môn cao<br>- Tasks nhạy cảm |
| **Task Pool (Self-Pick)** | - Staff chọn theo năng lực<br>- Tự chủ cao<br>- Cân bằng workload tự nhiên | - Tasks khó có thể không ai nhận<br>- Cần monitor pool | - Standard tasks<br>- Flexible deadline<br>- Multiple qualified staff |
| **Team Assignment** | - Đồng đội phân chia linh hoạt<br>- Share knowledge<br>- Collaboration tốt | - Cần team lead monitor<br>- Có thể mất thời gian sắp xếp | - Team projects<br>- Cross-functional tasks<br>- Training juniors |

### Progress Tracking

```
Progress: 0% → 25% → 50% → 75% → 100% → REVIEW → COMPLETED
          ↓      ↓      ↓      ↓      ↓
        [Auto reminders nếu no update > 4h]
```

**Tracking Elements:**
1. **Progress Percentage**: Staff tự cập nhật (0-100%)
2. **Subtasks Completion**: Check-off từng item trong checklist
3. **Time Logs**: Ghi nhận giờ làm thực tế
4. **Comments/Updates**: Chat thread để báo cáo tiến độ
5. **File Attachments**: Upload kết quả trung gian

---

## 🔄 So Sánh 2 Workflows

| Tiêu chí | Support Tickets | Tasks |
|----------|-----------------|-------|
| **Mục đích** | Giải quyết vấn đề, hỗ trợ | Thực hiện công việc theo kế hoạch |
| **Người khởi tạo** | End User, Staff, Manager | Manager, Admin |
| **Ai thực hiện** | Staff (được assign) | Staff (assign hoặc self-pick) |
| **Approval process** | Manager/User review sau resolve | Manager review sau completion |
| **SLA tracking** | ✅ Strict SLA by priority | ⚠️ Deadline-based, không strict SLA |
| **Reassignment** | Manager decision, cần lý do | Manager/Lead decision, flexible |
| **Phản hồi** | User rate 1-5 sao | Manager approve/reject/request changes |
| **Escalation** | Auto-escalate khi breach SLA | Manual escalate khi blocked |

---

## 👥 Phân Tích Roles Chi Tiết

### 1. End User
**Quyền hạn:**
- ✅ Tạo support tickets
- ✅ View own tickets/tasks
- ✅ Comment trên tickets
- ✅ Cung cấp thông tin bổ sung
- ✅ Review và rate tickets đã resolved

**Không được:**
- ❌ Không tạo tasks
- ❌ Không assign
- ❌ Không approve

**Workflow involvement:**
- **Tickets**: Bước 1 (Create), Bước 2 (cung cấp info khi Pending), Bước 6 (Review)
- **Tasks**: Không tham gia (trừ khi được assign task để cung cấp info)

---

### 2. Staff
**Quyền hạn:**
- ✅ Tạo support tickets (cho chính mình hoặc user khác)
- ✅ Nhận tasks được assign
- ✅ Claim tasks từ pool
- ✅ Update progress tasks
- ✅ Complete tasks
- ✅ Chat/collaborate
- ✅ Upload work results

**Không được:**
- ❌ Không tạo tasks
- ❌ Không assign tasks
- ❌ Không reassign
- ❌ Không approve

**Workflow involvement:**
- **Tickets**: Bước 1 (Create), Bước 4-5 (Work & Resolve)
- **Tasks**: Bước 2b (Pick from pool), Bước 4-5 (Execute & Submit)

---

### 3. Team Lead
**Quyền hạn:**
- ✅ Staff permissions +
- ✅ Tạo tasks cho team
- ✅ Assign tasks cho team members
- ✅ Approve claims từ team members
- ✅ Reassign tasks trong team
- ✅ Review & approve team tasks
- ✅ Triage tickets liên quan team
- ✅ View team reports

**Giới hạn:**
- ⚠️ Chỉ quản lý trong phạm vi team
- ⚠️ Không assign ngoài team (chỉ khi có permission đặc biệt)

**Workflow involvement:**
- **Tickets**: Bước 2 (Triage team tickets), Bước 3 (Assign to team), Bước 6 (Review)
- **Tasks**: Bước 1 (Create team tasks), Bước 2a/2c (Assign), Bước 2b.2 (Approve claims), Bước 3 (Reassign), Bước 6 (Review)

---

### 4. Manager/Admin
**Quyền hạn:**
- ✅ Full system access
- ✅ Tạo tasks/tickets
- ✅ Assign/reassign bất kỳ ai
- ✅ Triage all tickets
- ✅ Review & approve all tasks
- ✅ Manage users & teams
- ✅ View all reports
- ✅ Configure workflows
- ✅ Resolve escalations

**Workflow involvement:**
- **Tickets**: Tất cả các bước (đặc biệt Bước 2 Triage, Bước 3 Assignment, Bước 6 Review)
- **Tasks**: Tất cả các bước (đặc biệt Bước 1 Creation, Bước 3 Reassignment, Bước 6 Review)

---

## 🎯 Key Decision Points

### Trong Ticket Workflow

| Decision Point | Người quyết định | Options | Ảnh hưởng |
|----------------|------------------|---------|-----------|
| **Triage Decision** | Admin/Manager | Accept / Pending / Reject | - Accept: chuyển tiếp workflow<br>- Pending: chờ thêm info<br>- Reject: đóng ticket |
| **Assignment Target** | Admin/Manager | Individual / Team / External | - Individual: gán trực tiếp<br>- Team: team tự phân chia<br>- External: escalate ra ngoài |
| **Reassignment** | Manager | Keep / Reassign | - Keep: tiếp tục<br>- Reassign: chọn staff mới |
| **Resolution Review** | Manager/User | Approve / Reopen | - Approve: đóng ticket<br>- Reopen: làm lại |

### Trong Task Workflow

| Decision Point | Người quyết định | Options | Ảnh hưởng |
|----------------|------------------|---------|-----------|
| **Assignment Strategy** | Manager/Admin | Direct / Pool / Team | - Direct: gán ngay<br>- Pool: đợi staff pick<br>- Team: team assignment |
| **Claim Approval** | Manager/Lead | Approve / Reject | - Approve: staff nhận task<br>- Reject: task về pool |
| **Reassignment Decision** | Manager/Lead | Keep / Reassign | - Keep: giữ nguyên<br>- Reassign: chọn người mới |
| **Work Review** | Manager/Lead | Approve / Request Changes / Reject | - Approve: hoàn thành<br>- Changes: sửa lại<br>- Reject: reassign |

---

## 📈 Status Transition Rules

### Ticket Status Transitions

```
SUBMITTED ──────────→ TRIAGED ──────────→ ASSIGNED ──────────→ IN_PROGRESS ──────────→ RESOLVED ──────────→ APPROVED ──────────→ CLOSED
    │                    │                    │                     │       ↑              │                  │
    │                    │                    │                     │       │              │                  │
    ↓                    ↓                    ↓                     ↓       │              ↓                  │
REJECTED            PENDING            REASSIGNED      HELP_REQUESTED  BLOCKED        REOPENED              │
    │                    │                    │                     │       │              │                  │
    │                    │                    └──→ ASSIGNED         │       └──→ IN_PROGRESS └──→ IN_PROGRESS  │
    │                    └──→ TRIAGED                               ↓                                         │
    │                                                         SUPPORT_ASSIGNED                                │
    │                                                                │                                         │
    │                                                                └──→ IN_PROGRESS                         │
    │                                                                                                         │
    └──────────────────────────────────────────────────────────────────────────────────────────────────────→ END
```

**Allowed Transitions:**
- `SUBMITTED` → `TRIAGED`, `PENDING`, `REJECTED`
- `PENDING` → `TRIAGED`, `REJECTED`
- `TRIAGED` → `ASSIGNED`
- `ASSIGNED` → `IN_PROGRESS`, `REASSIGNED`
- `REASSIGNED` → `ASSIGNED`
- `IN_PROGRESS` → `HELP_REQUESTED`, `BLOCKED`, `RESOLVED`, `REASSIGNED`
- `HELP_REQUESTED` → `SUPPORT_ASSIGNED`, `IN_PROGRESS`
- `SUPPORT_ASSIGNED` → `IN_PROGRESS`
- `BLOCKED` → `IN_PROGRESS`, `REASSIGNED`
- `RESOLVED` → `APPROVED`, `REOPENED`
- `REOPENED` → `IN_PROGRESS`
- `APPROVED` → `CLOSED`

### Task Status Transitions

```
CREATED ──────────→ ASSIGNED ──────────→ IN_PROGRESS ──────────→ REVIEW ──────────→ COMPLETED
   │                   │       ↑              │       ↑              │                     │
   │                   │       │              │       │              │                     │
   ↓                   ↓       │              ↓       │              ↓                     │
CANCELLED      IN_POOL/POOL   │         SUPPORT_REQUESTED    CHANGES_REQUESTED      │
   │              │            │              │       │              │                     │
   │              └──→ CLAIMED │              ↓       │              └──→ IN_PROGRESS     │
   │                   │       │       COLLAB_ASSIGNED│                                   │
   │                   │       │              │       │                                   │
   │                   └───────┘              └───────┘                                   │
   │                                                                                       │
   │              DEPT_ASSIGNED                                                           │
   │                   │                                                                   │
   │                   └──→ ASSIGNED                                                      │
   │                                                                                       │
   │                   BLOCKED                                                            │
   │                   │   ↑                                                              │
   │                   └───┘ (from/to IN_PROGRESS)                                       │
   │                                                                                       │
   └───────────────────────────────────────────────────────────────────────────────────→ END
```

**Allowed Transitions:**
- `CREATED` → `ASSIGNED`, `IN_POOL`, `DEPT_ASSIGNED`, `CANCELLED`
- `IN_POOL` (or `POOL`) → `CLAIMED`
- `CLAIMED` → `ASSIGNED`
- `DEPT_ASSIGNED` → `ASSIGNED`
- `ASSIGNED` → `IN_PROGRESS`, `REASSIGNED`
- `REASSIGNED` → `ASSIGNED`
- `IN_PROGRESS` → `SUPPORT_REQUESTED`, `BLOCKED`, `REVIEW`, `REASSIGNED`
- `SUPPORT_REQUESTED` → `COLLAB_ASSIGNED`, `IN_PROGRESS`
- `COLLAB_ASSIGNED` → `IN_PROGRESS`
- `BLOCKED` → `IN_PROGRESS`, `REASSIGNED`
- `REVIEW` → `COMPLETED`, `CHANGES_REQUESTED`, `FAILED`
- `CHANGES_REQUESTED` → `IN_PROGRESS`
- `FAILED` → `REASSIGNED`
- `CHANGES_REQUESTED` → `IN_PROGRESS`
- `FAILED` → `REASSIGNED`

---

## 🔔 Notification Rules

### Ticket Workflow Notifications

| Event | Recipients | Channel | Timing |
|-------|-----------|---------|--------|
| Ticket Created | Admin/Manager | Push + Email | Immediate |
| Ticket Assigned | Assignee | Push + Email | Immediate |
| Status Changed | Creator + Assignee | Push | Immediate |
| Comment Added | All participants | Push | Immediate |
| SLA Warning (80%) | Assignee | Push + SMS | Real-time |
| SLA Breach | Assignee + Manager | Push + SMS + Email | Immediate |
| Resolved | Creator | Push + Email | Immediate |
| Approved/Closed | Assignee | Push | Immediate |

### Task Workflow Notifications

| Event | Recipients | Channel | Timing |
|-------|-----------|---------|--------|
| Task Created & Assigned | Assignee | Push + Email | Immediate |
| Task Added to Pool | All staff (filtered by skills) | Push | Immediate |
| Task Claimed | Manager/Lead | Push | Immediate |
| Claim Approved | Claimer | Push + Email | Immediate |
| Reassigned | Old + New assignee | Push + Email | Immediate |
| Progress Updated | Manager/Lead | Push (if milestone) | Real-time |
| Blocked | Manager/Lead | Push + Email | Immediate |
| Ready for Review | Manager/Lead | Push + Email | Immediate |
| Review Result | Assignee | Push + Email | Immediate |
| Completed | Manager + Assignee | Push | Immediate |

---

## 📊 Metrics & KPIs

### Ticket Metrics
- **Average Response Time** (by priority)
- **Average Resolution Time** (by priority)
- **SLA Compliance Rate** (%)
- **Tickets Created vs. Closed** (trend)
- **Customer Satisfaction** (average rating)
- **Reopen Rate** (%)
- **Escalation Rate** (%)

### Task Metrics
- **Tasks Completed vs. Pending**
- **On-time Completion Rate** (%)
- **Average Task Duration** (by type)
- **Tasks per Staff** (workload distribution)
- **Quality Score** (approval rate)
- **Reassignment Rate** (%)
- **Blocked Time** (average)

### Staff Performance
- **Tasks Completed** (count & trend)
- **Average Completion Time**
- **Quality Score** (approval rate without changes)
- **SLA Compliance** (for tickets)
- **Customer Rating** (for tickets)
- **Collaboration Score** (comments, helps)

---

## 🚨 Exception Handling

### Ticket Exceptions

| Exception | Detection | Action | Role responsible |
|-----------|-----------|--------|------------------|
| **No response > SLA** | Auto-detect | Alert Manager + Suggest reassign | Manager decides |
| **Blocked > 2h (Critical)** | Auto-detect | Manager intervention required | Manager |
| **Stuck in Pending > 24h** | Auto-detect | Auto-notify creator + Manager | Manager |
| **Multiple reopens (>2)** | Auto-detect | Flag for manager review | Manager |

### Task Exceptions

| Exception | Detection | Action | Role responsible |
|-----------|-----------|--------|------------------|
| **No progress update > 4h** | Auto-detect | Reminder to assignee | Assignee |
| **No progress update > 8h** | Auto-detect | Alert Manager | Manager |
| **Blocked > 8h** | Auto-detect | Require explanation + action plan | Manager/Lead |
| **Past deadline** | Auto-detect | Alert Manager + assignee | Manager |
| **In Pool > 7 days** | Auto-detect | Review and reassign or cancel | Manager |

---

## 💡 Best Practices

### Cho End Users
1. **Tạo ticket rõ ràng**: Tiêu đề ngắn gọn, mô tả chi tiết vấn đề
2. **Chọn priority đúng**: Critical chỉ dành cho cấp cứu, hệ thống sập
3. **Đính kèm hình ảnh**: Screenshot hoặc ảnh chụp giúp staff hiểu nhanh hơn
4. **Theo dõi thường xuyên**: Check status và reply comment kịp thời

### Cho Staff
1. **Update tiến độ thường xuyên**: Ít nhất 1 lần/4h cho tasks đang làm
2. **Communicate proactively**: Báo sớm khi gặp vướng mắc
3. **Log hours accurately**: Ghi nhận giờ làm chính xác cho reporting
4. **Check subtasks**: Đánh dấu hoàn thành từng phần để manager track được

### Cho Managers/Leads
1. **Triage nhanh**: Respond trong SLA time
2. **Assign phù hợp**: Cân nhắc workload và skill của staff
3. **Monitor proactively**: Theo dõi dashboard, không chờ escalation
4. **Review công bằng**: Đánh giá dựa trên kết quả, không bias
5. **Document decisions**: Ghi rõ lý do reject/reassign

---

## 🔐 Security & Permissions

### Data Access Rules

| Role | View Tickets | View Tasks | Edit | Delete | Reports |
|------|-------------|-----------|------|--------|---------|
| **End User** | Own only | Own only | Own (pending) | ❌ | Own stats |
| **Staff** | Assigned + Own | Assigned + Own | Assigned | ❌ | Own stats |
| **Team Lead** | Team + Assigned | Team + Assigned | Team tasks | ⚠️ Team tasks | Team reports |
| **Manager/Admin** | All | All | All | ✅ | All reports |

### Audit Trail
Tất cả các hành động quan trọng được log:
- Ticket/Task created, assigned, reassigned
- Status changes
- Approvals, rejections
- SLA breaches
- Comments/updates
- File uploads

---

## 📱 Mobile App Workflow Adaptations

### Ticket Management on Mobile
1. **Quick Create**: Camera-first ticket creation với voice notes
2. **Push Notifications**: Real-time alerts cho assignments
3. **Offline Mode**: Queue updates, sync khi có mạng
4. **Swipe Actions**: Swipe để resolve, reassign, comment
5. **QR Scan**: Scan equipment tags để tạo ticket nhanh

### Task Management on Mobile
1. **Dashboard Widget**: Summary công việc hôm nay
2. **Quick Progress Update**: Slider tiến độ, check subtasks
3. **Voice Logs**: Ghi chú bằng giọng nói
4. **Location Tracking**: Auto log location cho field tasks
5. **Biometric Auth**: Face ID/Touch ID cho quick login

---

## 🎓 Training & Onboarding

### New User Onboarding Checklist
- [ ] Account setup & first login
- [ ] Dashboard tour
- [ ] Create first ticket
- [ ] Update profile & notification settings
- [ ] Review help documentation
- [ ] Complete training quiz

### New Staff Onboarding Checklist
- [ ] System overview training (1h)
- [ ] Ticket workflow walkthrough
- [ ] Task management training
- [ ] SLA and priority rules
- [ ] Practice tasks (sandbox)
- [ ] Shadowing experienced staff (1 day)
- [ ] First week: supervised assignments
- [ ] Quiz & certification

### Manager Training Topics
- Effective triaging
- Fair assignment strategies
- Performance monitoring
- Conflict resolution
- Report interpretation
- System configuration

---

## 📝 Changelog

| Date | Changes | Author |
|------|---------|--------|
| 2026-03-26 | Initial workflow analysis document created | System |

