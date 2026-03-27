# Workflow Quản Lý Công Việc Y Khoa

## 🎯 Tổng Quan
Hệ thống quản lý công việc tối ưu cho lĩnh vực y khoa với 2 workflow chính:
1. **Support Ticket Management** - Quản lý yêu cầu hỗ trợ
2. **Task Assignment & Management** - Giao việc và theo dõi tiến độ

---

## 📋 WORKFLOW 1: SUPPORT TICKET MANAGEMENT

### Các Bước Chính:
1. **Ticket Creation** (Tạo yêu cầu)
   - User submit ticket với thông tin:
     - Tiêu đề, mô tả vấn đề
     - Mức độ ưu tiên (Low/Medium/High/Critical)
     - Danh mục (Kỹ thuật/Hành chính/Lâm sàng/Khác)
     - File đính kèm (ảnh, tài liệu)
   - Tự động gán Ticket ID
   - Trạng thái: **SUBMITTED**

2. **Ticket Triage** (Phân loại)
   - Admin/Manager xem xét ticket
   - Đánh giá mức độ ưu tiên
   - Quyết định:
     - ✅ Accept → Chuyển sang Assignment
     - ⏸️ Pending → Yêu cầu thêm thông tin
     - ❌ Reject → Đóng ticket với lý do
   - Trạng thái: **TRIAGED**

3. **Assignment** (Giao việc)
   - Gán cho team/cá nhân phù hợp
   - Thông báo push notification
   - Trạng thái: **ASSIGNED**

4. **Work in Progress**
   - Staff cập nhật tiến độ
   - Chat/comment trao đổi
   - Upload kết quả/hình ảnh
   - Trạng thái: **IN_PROGRESS**

5. **Resolution** (Giải quyết)
   - Staff đánh dấu hoàn thành
   - Mô tả giải pháp
   - Trạng thái: **RESOLVED**

6. **Approval** (Phê duyệt)
   - Manager/User xác nhận
   - Đánh giá chất lượng (1-5 sao)
   - Quyết định:
     - ✅ Approve → **CLOSED**
     - 🔄 Reopen → Quay lại IN_PROGRESS

---

## 📋 WORKFLOW 2: TASK ASSIGNMENT & MANAGEMENT

### Các Bước Chính:

1. **Task Creation** (Tạo task)
   - Manager/Admin tạo task mới:
     - Tên task, mô tả chi tiết
     - Deadline, mức độ ưu tiên
     - Tag/Label (theo dự án, bộ phận)
     - Checklist con (subtasks)
   - Trạng thái: **CREATED**

2. **Assignment Strategy** (Chiến lược giao việc)
   
   **Cách 1: Direct Assignment (Giao trực tiếp)**
   - Manager chọn assignee
   - System gửi thông báo
   - Trạng thái: **ASSIGNED**

   **Cách 2: Self-Pick (Tự nhận việc)**
   - Task được đăng vào "Task Pool"
   - Staff có thể xem và tự nhận
   - First-come-first-serve hoặc cần approval
   - Trạng thái: **CLAIMED** → **ASSIGNED**

   **Cách 3: Team Assignment**
   - Gán cho nhóm (Team)
   - Thành viên trong team tự phân chia
   - Trạng thái: **TEAM_ASSIGNED**

3. **Reassignment** (Chuyển giao)
   - Trường hợp:
     - Staff bận, nghỉ phép
     - Cần kỹ năng chuyên môn khác
     - Cân bằng tải công việc
   - Yêu cầu lý do reassign
   - Thông báo cả 2 bên (old + new assignee)

4. **Execution** (Thực hiện)
   - Staff update tiến độ % (0-100%)
   - Check-off subtasks
   - Log working hours
   - Chat/collaboration với team
   - Upload files/hình ảnh kết quả
   - Trạng thái: **IN_PROGRESS**

5. **Review & Approval** (Xem xét & phê duyệt)
   - Staff đánh dấu "Ready for Review"
   - Manager/Lead review:
     - ✅ Approve → **COMPLETED**
     - 🔄 Request Changes → **IN_PROGRESS**
     - ❌ Reject → **REASSIGNED**

6. **Completion** (Hoàn thành)
   - Task đóng
   - Ghi nhận vào báo cáo
   - Trạng thái: **COMPLETED**

---

## 🔄 Các Trạng Thái (Status Flow)

### Support Ticket Statuses:
```
SUBMITTED → TRIAGED → ASSIGNED → IN_PROGRESS → RESOLVED → CLOSED
     ↓          ↓          ↓            ↓           ↓
   REJECTED  PENDING   REASSIGNED   BLOCKED    REOPENED
```

### Task Statuses:
```
CREATED → ASSIGNED → IN_PROGRESS → REVIEW → COMPLETED
    ↓        ↓            ↓          ↓
CANCELLED CLAIMED    BLOCKED   CHANGES_REQUESTED
```

---

## 💬 Chat & Collaboration Features

### Chức năng chat tích hợp:
- **Thread-based comments**: Mỗi ticket/task có discussion thread
- **@mention**: Tag người cần trao đổi
- **File sharing**: Upload ảnh, tài liệu y khoa
- **Read receipts**: Xác nhận đã đọc
- **Push notifications**: Thông báo real-time
- **History tracking**: Lưu lại toàn bộ lịch sử

---

## ⚡ Tối Ưu Hóa Cho Y Khoa

### 1. Priority Matrix (Ma trận ưu tiên)
```
CRITICAL (Đỏ)    → Cấp cứu, hệ thống sập
HIGH (Cam)       → Ảnh hưởng nhiều bệnh nhân
MEDIUM (Vàng)    → Vấn đề thường ngày
LOW (Xanh)       → Cải tiến, tối ưu
```

### 2. Auto-routing Rules (Tự động định tuyến)
- Theo department: IT, Admin, Clinical, Facility
- Theo skill: Kỹ thuật viên, Y tá, Bác sĩ, Hành chính
- Theo location: Khoa A, Khoa B, Phòng xét nghiệm

### 3. SLA (Service Level Agreement)

#### Thời gian Response & Resolve:
```
CRITICAL/URGENT: Response < 5 phút,  Resolve < 2 giờ
HIGH:            Response < 30 phút,  Resolve < 4 giờ
MEDIUM:          Response < 2 giờ,    Resolve < 24 giờ
LOW:             Response < 8 giờ,    Resolve < 3 ngày
```

#### Auto-Escalation Rules:

**Response Time Escalation:**
- **CRITICAL**: Sau 5 phút không có response → SMS/Call alert cho Manager
- **HIGH**: Sau 30 phút → Email alert cho Team Lead
- **MEDIUM**: Sau 2 giờ → Notification cho Manager
- **LOW**: Sau 8 giờ → Email reminder

**Resolve Time Escalation:**
- **CRITICAL**: Sau 2 giờ không resolve → **Alert Manager + Director** + Suggest reassignment (cần approval)
- **HIGH**: Sau 4 giờ → Alert Manager + Suggest reassignment
- **MEDIUM**: Sau 24 giờ → Manager review required
- **LOW**: Sau 3 ngày → Escalate lên Manager

**Reassignment Suggestion Logic (KHÔNG TỰ ĐỘNG):**
⚠️ **Nguyên tắc:** TUYỆT ĐỐI KHÔNG auto reassign khi đã có owner!

1. **Khi breach SLA:**
   - System tìm và đề xuất danh sách staff phù hợp:
     - Rating cao (>4.0 stars)
     - Workload thấp hơn
     - Kinh nghiệm với loại ticket tương tự
     - Online/Available status
   - Gửi notification cho **Manager** với:
     - Ticket details
     - SLA breach info
     - Danh sách candidates đề xuất
     - Current assignee performance
   - Alert **Director** (CRITICAL tickets)

2. **Manager actions:**
   - Xem xét tình huống
   - Quyết định: Keep current assignee hoặc Reassign
   - Nếu reassign: Chọn staff mới + nhập lý do
   - System thông báo cho cả 2 bên

3. **Tracking:**
   - Log tất cả SLA breaches
   - Theo dõi response time của Manager
   - Ảnh hưởng đến performance review

### 4. Escalation & Monitoring (Báo động tự động)

#### Real-time Monitoring:
- Dashboard hiển thị tickets sắp breach SLA (warning khi còn 20% thời gian)
- Color coding:
  - 🟢 Green: An toàn (>50% thời gian còn lại)
  - 🟡 Yellow: Cảnh báo (20-50% thời gian còn lại)
  - 🟠 Orange: Nguy hiểm (<20% thời gian còn lại)
  - 🔴 Red: Đã breach SLA

#### Escalation Actions:
1. **Quá Response Time SLA:**
   - Notification push ngay lập tức
   - Email/SMS alert (tùy mức priority)
   - Tăng priority display trên dashboard
   - Alert Manager/Team Lead

2. **Quá Resolve Time SLA:**
   - **CRITICAL**: Alert Manager + Director + Hiển thị suggested candidates cho reassignment
   - **HIGH**: Alert Manager + Suggest reassignment options
   - **MEDIUM/LOW**: Manager review + quyết định continue/reassign
   - **KHÔNG BAO GIỞ tự động reassign** - Luôn cần Manager approval
   - Log vào performance review của staff

3. **Blocked Status:**
   - Blocked > 2h (CRITICAL) → Manager intervention required
   - Blocked > 8h (HIGH) → Auto escalate
   - Blocked > 24h (MEDIUM/LOW) → Require explanation + action plan

4. **No Progress Update:**
   - IN_PROGRESS nhưng không có update > 4h → Reminder notification
   - Không response reminder > 8h → Alert Manager
   - Auto add comment: "System reminder: Please update progress"

---

## 📊 Dashboard & Reports

### Metrics cần theo dõi:
1. **Ticket Metrics**
   - Số lượng ticket theo status
   - Thời gian xử lý trung bình
   - Tỷ lệ đóng đúng SLA
   - Satisfaction rating

2. **Task Metrics**
   - Tasks completed vs. pending
   - Productivity by user/team
   - Deadline compliance rate
   - Workload distribution

3. **Team Performance**
   - Average resolution time
   - Quality score (rating)
   - Tasks per person
   - Overtime tracking

---

## 🔐 Roles & Permissions

### User Types:
1. **End User** (Người dùng)
   - Submit tickets
   - View own tickets/tasks
   - Update progress
   - Chat/comment

2. **Staff** (Nhân viên)
   - End User permissions +
   - Pick tasks from pool
   - Update detailed progress
   - Upload work results

3. **Team Lead**
   - Staff permissions +
   - Assign tasks to team
   - Review & approve
   - Reassign tasks

4. **Manager/Admin**
   - Full system access
   - Create tasks/tickets
   - Manage users & teams
   - View all reports
   - Configure workflows

---

## 🛠️ Technical Stack Recommendations

### Frontend:
- **Web**: React 18 + TypeScript + Vite
- **State Management**: TanStack Query (server state) + Zustand (client state)
- **UI Library**: Ant Design / Material-UI / Chakra UI
- **Charts**: Recharts / Chart.js
- **Mobile**: React Native (iOS + Android đồng thời)

### Backend (BFF Pattern):
- **BFF Layer**: ASP.NET Core 8 Web API (C#)
- **Architecture**: Clean Architecture / Vertical Slice Architecture
- **ORM**: Entity Framework Core 8
- **Database**: PostgreSQL (relational) + Redis (cache)
- **Real-time**: SignalR (Notifications & Status Updates)
- **Messaging**: MQTT (đã có sẵn - Chat & Messaging)
- **File Storage**: AWS S3 / Azure Blob Storage
- **Authentication**: JWT + ASP.NET Core Identity
- **API Documentation**: Swagger / OpenAPI

### Infrastructure:
- **Push Notifications**: FCM (đã có sẵn - Firebase Cloud Messaging)
- **Background Jobs**: Hangfire / Quartz.NET
- **Caching**: Redis / IMemoryCache
- **Logging**: Serilog + Seq / ELK Stack
- **Monitoring**: Application Insights / Sentry
- **API Gateway**: Ocelot (optional for microservices)

> **Note**: Login/Messaging với FCM + MQTT đã được tích hợp sẵn. Focus vào workflow logic và business rules.

---

## 📱 Mobile App Features

### Phải có:
- ✅ Push notifications
- ✅ Offline mode (sync khi có mạng)
- ✅ Camera integration (chụp ảnh trực tiếp)
- ✅ Voice notes
- ✅ QR code scan (cho equipment tracking)
- ✅ Biometric login (Face ID/Touch ID)

### Nice to have:
- 🔔 Background sync
- 📍 Location tracking (cho field service)
- 📞 Quick call assigned user
- 🗣️ Voice-to-text

---

## 🎨 UX Best Practices

1. **Quick Actions**: Swipe gestures cho assign/complete
2. **Smart Filters**: Lưu và chia sẻ filter presets
3. **Bulk Operations**: Select nhiều tasks → bulk assign/update
4. **Templates**: Task templates cho công việc lặp lại
5. **Dark Mode**: Hỗ trợ làm việc ban đêm
6. **Multi-language**: Tiếng Việt + English

---

## 🚀 Implementation Phases

### Phase 1 (MVP - 2-3 tháng)
- ✅ User authentication & profiles
- ✅ Ticket creation & basic workflow
- ✅ Task assignment (direct)
- ✅ Basic chat/comments
- ✅ Mobile app basic features

### Phase 2 (Enhancement - 1-2 tháng)
- ✅ Self-pick tasks
- ✅ Advanced notifications
- ✅ File attachments
- ✅ Dashboard & reports
- ✅ SLA tracking

### Phase 3 (Advanced - 1-2 tháng)
- ✅ Auto-routing & escalation
- ✅ Templates & workflows customization
- ✅ Analytics & AI insights
- ✅ Integration với HIS/EMR system
- ✅ Voice notes, QR codes

---

## 📝 Database Schema Highlights

```sql
-- Core Tables:
- users (id, email, role, department_id)
- departments (id, name, manager_id)
- tickets (id, title, priority, status, created_by, assigned_to)
- tasks (id, title, deadline, progress, assigned_to, team_id)
- comments (id, ticket_id, task_id, user_id, content)
- attachments (id, entity_type, entity_id, file_url)
- notifications (id, user_id, type, read_at)
- activity_logs (id, entity_type, entity_id, action, user_id)
```

---

## 🔍 Search & Filter

### Tối ưu tìm kiếm:
- Full-text search (Elasticsearch)
- Filter theo:
  - Status, Priority, Department
  - Date range
  - Assigned user/team
  - Tags/Labels
- Save custom views
- Export to Excel/PDF

---

Bạn có muốn tôi điều chỉnh hoặc bổ sung thêm phần nào không?
