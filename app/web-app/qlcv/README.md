# QLCV Y Khoa - HTML/CSS Application

## 📋 Tổng Quan

Đây là phiên bản HTML/CSS thuần túy của Hệ thống Quản Lý Công Việc Y Khoa (QLCV). Phiên bản này được xây dựng để demo UI/UX trước khi chuyển sang React + BFF architecture.

## 🎯 Tính Năng Đã Implement

### ✅ Màn Hình Hoàn Chỉnh

1. **Login** (`login.html`)
   - Form đăng nhập với validation
   - Quick login cho demo (Staff/Manager/Admin)
   - Responsive design
   - Gradient background

2. **Staff Dashboard** (`dashboard-staff.html`)
   - Stats cards (Tickets, Tasks, SLA Warnings, Ratings)
   - Prioritized work list với SLA indicators
   - Quick actions
   - Recent activity feed
   - Today's schedule
   - Real-time badges

3. **Manager Dashboard** (`dashboard-manager.html`)
   - Key performance metrics
   - SLA breach alerts với reassignment workflow
   - Team workload visualization
   - Pending approvals queue
   - Performance charts (Chart.js)
   - Team member progress tracking

4. **Tickets List** (`tickets-list.html`)
   - Comprehensive ticket listing
   - Multiple filters (Priority, Status, Department)
   - SLA status indicators
   - Assignee information
   - Pagination
   - Quick stats overview

5. **Task Pool** (`task-pool.html`)
   - Marketplace-style task cards
   - Skills-based filtering
   - Task claim functionality
   - Recommended tasks highlighting
   - Priority-based visual indicators
   - Detailed task information

## 🎨 Design Features

### Color Palette
- **Primary**: #2563eb (Blue)
- **Secondary**: #7c3aed (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Danger**: #ef4444 (Red)

### Components
- ✅ Sidebar navigation với active states
- ✅ Stats cards với hover effects
- ✅ Badge system (Priority, Status, SLA)
- ✅ Tables với sorting và filtering
- ✅ Cards với shadows và transitions
- ✅ Buttons với multiple variants
- ✅ Form controls với focus states
- ✅ Charts integration (Chart.js)

### Responsive Design
- Desktop-first approach
- Breakpoint: 768px for mobile
- Collapsible sidebar on mobile
- Flexible grid layouts

## 📂 Cấu Trúc File

```
app/
├── css/
│   └── styles.css              # Global styles & components
├── login.html                  # Login screen
├── dashboard-staff.html        # Staff dashboard
├── dashboard-manager.html      # Manager dashboard
├── tickets-list.html           # Tickets management
├── tasks-list.html             # Tasks management (List & Kanban) ⭐
├── task-pool.html              # Task pool marketplace
└── README.md                   # This file
```

## 🚀 Cách Sử Dụng

### Chạy Local

1. **Mở trực tiếp trong browser**:
   ```
   Mở file login.html trong browser
   ```

2. **Hoặc dùng Live Server** (VS Code extension):
   - Right-click vào `login.html`
   - Chọn "Open with Live Server"

3. **Hoặc dùng Python HTTP Server**:
   ```bash
   cd app
   python -m http.server 8000
   # Truy cập: http://localhost:8000/login.html
   ```

### Demo Accounts

Sử dụng quick login buttons trên màn hình login:

1. **Staff**: `dinhlinhstaff@hospital.vn`
   - Xem dashboard nhân viên
   - Quản lý tickets/tasks cá nhân

2. **Manager**: `manager@hospital.vn`
   - Xem dashboard quản lý
   - SLA alerts & approvals
   - Team management

3. **Admin**: `admin@hospital.vn`
   - Full access
   - System configuration

## 🔄 Workflow Demo

### Journey 1: Staff Workflow
1. Login as Staff → Dashboard
2. Xem prioritized work list
3. Vào Task Pool → Claim task
4. Work on assigned tickets
5. Update progress & comments

### Journey 2: Manager Workflow
1. Login as Manager → Dashboard
2. Review SLA breach alerts
3. Reassign hoặc keep assignments
4. Approve pending tasks
5. Monitor team workload

## 🎯 Điểm Mạnh

✅ **Pure HTML/CSS/JS**: Không dependencies phức tạp  
✅ **Modern UI**: Clean, professional design  
✅ **Responsive**: Works trên desktop & tablet  
✅ **Fast**: Lightweight, load nhanh  
✅ **Demo-ready**: Perfect cho client presentation  
✅ **Easy to modify**: Straightforward code structure  

## ⚠️ Giới Hạn (By Design)

❌ **No backend integration**: Static data only  
❌ **No authentication**: Demo accounts only  
❌ **No real-time updates**: Simulated via JS  
❌ **No data persistence**: Reloads clear state  
❌ **Limited interactivity**: Click handlers only  

These are expected - this is a UI prototype, not a functional app.

## 🔮 Next Steps: React Migration

Khi chuyển sang React + BFF:

1. **Components**: Convert HTML blocks → React components
2. **State Management**: Add Redux/Context for global state
3. **API Integration**: Connect to BFF endpoints
4. **Real-time**: Integrate MQTT client
5. **Forms**: Add proper validation & submission
6. **Routing**: React Router for navigation
7. **Auth**: JWT token management
8. **Testing**: Jest + React Testing Library

## 📦 Dependencies

- **Font Awesome 6.4.0**: Icons
- **Chart.js 4.4.0**: Charts (Manager Dashboard)
- **No build tools**: Pure HTML/CSS/JS

## 🌐 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ⚠️ IE11: Not supported (CSS Grid, CSS Variables)

## 📝 Notes

- Code sử dụng Vietnamese comments & text
- Layout optimized cho màn hình ≥ 1280px
- Charts require internet (CDN)
- LocalStorage used để lưu user session (demo only)

## 👨‍💻 Development

### Thêm màn hình mới

1. Copy template từ `dashboard-staff.html`
2. Update sidebar active state
3. Update page title & content
4. Add navigation links
5. Test responsive layout

### Modify styles

Edit `css/styles.css`:
- CSS Variables (`:root`)
- Component classes (`.card`, `.btn`, etc.)
- Responsive breakpoints (`@media`)

---

**Version**: 1.0.0  
**Last Updated**: March 25, 2026  
**Author**: Development Team  
**License**: Internal Use Only
