# Workflow Diagrams - Hệ Thống Quản Lý Công Việc Y Khoa

## 📊 WORKFLOW 1: SUPPORT TICKET MANAGEMENT

### Sơ đồ chi tiết luồng xử lý ticket

```mermaid
graph TD
    Start([User có vấn đề cần hỗ trợ]) --> Create[Tạo Support Ticket]
    Create --> |Tự động gán ID| Submit[Status: SUBMITTED]
    
    Submit --> Triage{Admin/Manager<br/>Phân loại}
    
    Triage --> |Cần thêm info| Pending[Status: PENDING]
    Triage --> |Từ chối| Reject[Status: REJECTED]
    Triage --> |Chấp nhận| Accept[Status: TRIAGED]
    
    Pending --> |User cung cấp info| Triage
    Reject --> End1([Đóng ticket])
    
    Accept --> Assign[Gán cho Staff/Team<br/>Status: ASSIGNED]
    Assign --> |Push notification| StaffReceive[Staff nhận thông báo]
    
    StaffReceive --> StartWork[Bắt đầu xử lý<br/>Status: IN_PROGRESS]
    
    StartWork --> Working{Quá trình<br/>xử lý}
    Working --> |Gặp vướng mắc| Blocked[Status: BLOCKED]
    Working --> |Cập nhật tiến độ| Progress[Update progress<br/>Chat/Comment]
    Working --> |Cần chuyển giao| Reassign[Reassign to<br/>another staff]
    
    Blocked --> |Giải quyết| Working
    Reassign --> Assign
    Progress --> Working
    
    Working --> |Hoàn thành| Resolve[Đánh dấu hoàn thành<br/>Status: RESOLVED]
    
    Resolve --> Review{Manager/User<br/>Review}
    
    Review --> |Chưa OK| Reopen[Status: REOPENED]
    Review --> |Đồng ý| Approve[Status: APPROVED]
    
    Reopen --> Working
    
    Approve --> Rating[User đánh giá<br/>1-5 stars]
    Rating --> Close[Status: CLOSED]
    Close --> End2([Lưu vào lịch sử])
    
    style Start fill:#e1f5ff
    style Submit fill:#fff9c4
    style Assign fill:#c8e6c9
    style StartWork fill:#fff59d
    style Resolve fill:#a5d6a7
    style Close fill:#81c784
    style End2 fill:#66bb6a
    style Reject fill:#ef9a9a
    style Blocked fill:#ffab91
```

---

## 📋 WORKFLOW 2: TASK ASSIGNMENT & MANAGEMENT

### Sơ đồ chi tiết luồng giao việc và quản lý task

```mermaid
graph TD
    Start([Manager/Admin cần giao việc]) --> CreateTask[Tạo Task mới]
    
    CreateTask --> TaskInfo[Nhập thông tin:<br/>- Title, Description<br/>- Priority, Deadline<br/>- Tags, Checklist]
    
    TaskInfo --> Created[Status: CREATED]
    
    Created --> Strategy{Chọn chiến lược<br/>giao việc}
    
    Strategy --> |Cách 1| DirectAssign[Direct Assignment<br/>Chọn assignee cụ thể]
    Strategy --> |Cách 2| TaskPool[Task Pool<br/>Đăng lên danh sách công khai]
    Strategy --> |Cách 3| TeamAssign[Team Assignment<br/>Gán cho cả team]
    
    DirectAssign --> Assigned[Status: ASSIGNED<br/>Thông báo staff]
    
    TaskPool --> Browse[Staff xem danh sách task]
    Browse --> PickTask[Staff chọn task phù hợp]
    PickTask --> NeedApproval{Cần duyệt<br/>không?}
    NeedApproval --> |Có| WaitApproval[Chờ Manager approve]
    NeedApproval --> |Không| Claimed[Status: CLAIMED]
    WaitApproval --> |Approved| Claimed
    WaitApproval --> |Rejected| TaskPool
    Claimed --> Assigned
    
    TeamAssign --> TeamPool[Status: TEAM_ASSIGNED<br/>Team members tự phân chia]
    TeamPool --> TeamPick[Member trong team nhận việc]
    TeamPick --> Assigned
    
    Assigned --> CheckReassign{Cần<br/>reassign?}
    CheckReassign --> |Có| ReassignReason[Nhập lý do reassign]
    CheckReassign --> |Không| StartExec[Bắt đầu thực hiện<br/>Status: IN_PROGRESS]
    
    ReassignReason --> NotifyBoth[Thông báo cả 2 bên]
    NotifyBoth --> Strategy
    
    StartExec --> Execution[Quá trình thực hiện]
    
    Execution --> UpdateProgress[Cập nhật % tiến độ]
    Execution --> CheckSubtask[Check-off subtasks]
    Execution --> LogHours[Ghi nhận giờ làm]
    Execution --> ChatCollab[Chat/Collaboration]
    Execution --> UploadFiles[Upload files/images]
    
    UpdateProgress --> Progress{Tiến độ}
    CheckSubtask --> Progress
    LogHours --> Progress
    ChatCollab --> Progress
    UploadFiles --> Progress
    
    Progress --> |< 100%| Execution
    Progress --> |Gặp khó khăn| TaskBlocked[Status: BLOCKED<br/>Báo manager]
    Progress --> |100%| ReadyReview[Ready for Review<br/>Status: REVIEW]
    
    TaskBlocked --> ResolveBlock[Manager hỗ trợ giải quyết]
    ResolveBlock --> Execution
    
    ReadyReview --> ManagerReview{Manager/Lead<br/>Review}
    
    ManagerReview --> |Approve| TaskComplete[Status: COMPLETED]
    ManagerReview --> |Request Changes| Changes[Status: CHANGES_REQUESTED<br/>Note về cần sửa gì]
    ManagerReview --> |Reject| RejectTask[Status: FAILED<br/>Cần reassign]
    
    Changes --> |Staff sửa| Execution
    RejectTask --> Strategy
    
    TaskComplete --> Report[Ghi nhận vào báo cáo<br/>KPI tracking]
    Report --> Archive[Lưu trữ]
    Archive --> End([Hoàn thành])
    
    style Start fill:#e1f5ff
    style Created fill:#fff9c4
    style Assigned fill:#c8e6c9
    style StartExec fill:#fff59d
    style Execution fill:#ffe082
    style ReadyReview fill:#ffb74d
    style TaskComplete fill:#81c784
    style End fill:#66bb6a
    style TaskBlocked fill:#ef5350
    style RejectTask fill:#ef9a9a
```

---

## 🔄 STATUS FLOW DIAGRAM

### Tổng quan luồng trạng thái

```mermaid
stateDiagram-v2
    [*] --> SUBMITTED: User creates ticket
    [*] --> CREATED: Manager creates task
    
    SUBMITTED --> TRIAGED: Admin reviews
    SUBMITTED --> REJECTED: Invalid request
    SUBMITTED --> PENDING: Need more info
    
    PENDING --> TRIAGED: Info provided
    PENDING --> REJECTED: Timeout/Invalid
    
    CREATED --> ASSIGNED: Direct assign
    CREATED --> CLAIMED: Self-pick
    CREATED --> TEAM_ASSIGNED: Team assign
    CREATED --> CANCELLED: No longer needed
    
    TRIAGED --> ASSIGNED: Assign to staff
    CLAIMED --> ASSIGNED: Approved
    TEAM_ASSIGNED --> ASSIGNED: Team member picks
    
    ASSIGNED --> IN_PROGRESS: Start work
    ASSIGNED --> REASSIGNED: Transfer to another
    
    REASSIGNED --> ASSIGNED: New assignee
    
    IN_PROGRESS --> BLOCKED: Issue encountered
    IN_PROGRESS --> RESOLVED: Ticket resolved
    IN_PROGRESS --> REVIEW: Task ready for review
    IN_PROGRESS --> REASSIGNED: Need transfer
    
    BLOCKED --> IN_PROGRESS: Issue resolved
    BLOCKED --> REASSIGNED: Need expertise
    
    RESOLVED --> REOPENED: Not satisfied
    RESOLVED --> APPROVED: Quality OK
    
    REOPENED --> IN_PROGRESS: Continue work
    
    REVIEW --> CHANGES_REQUESTED: Need revision
    REVIEW --> COMPLETED: Approved
    REVIEW --> FAILED: Rejected
    
    CHANGES_REQUESTED --> IN_PROGRESS: Make changes
    
    FAILED --> REASSIGNED: Try new assignee
    
    APPROVED --> CLOSED: Final state
    COMPLETED --> CLOSED: Final state
    
    REJECTED --> [*]
    CANCELLED --> [*]
    CLOSED --> [*]
```

---

## 🏗️ SYSTEM ARCHITECTURE

### High-level architecture diagram

```mermaid
graph TB
    subgraph "Client Layer"
        WebApp[Web App<br/>React + TypeScript]
        MobileApp[Mobile App<br/>React Native<br/>iOS + Android]
    end
    
    subgraph "API Gateway"
        Gateway[API Gateway<br/>Rate Limiting & Auth]
    end
    
    subgraph "Application Layer"
        AuthService[Auth Service<br/>JWT + OAuth2]
        TicketService[Ticket Service]
        TaskService[Task Service]
        NotificationService[Notification Service]
        ChatService[Chat Service]
        FileService[File Service]
        ReportService[Report Service]
    end
    
    subgraph "Real-time Layer"
        WebSocket[WebSocket Server<br/>Socket.io]
        PushNotif[Push Notification<br/>FCM]
    end
    
    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL<br/>Main Database)]
        Redis[(Redis<br/>Cache & Sessions)]
        S3[(S3/Blob Storage<br/>Files & Images)]
        Elasticsearch[(Elasticsearch<br/>Full-text Search)]
    end
    
    subgraph "Background Jobs"
        Queue[Queue System<br/>Bull/RabbitMQ]
        Workers[Background Workers<br/>- Email notifications<br/>- SLA monitoring<br/>- Reports generation]
    end
    
    WebApp --> Gateway
    MobileApp --> Gateway
    
    Gateway --> AuthService
    Gateway --> TicketService
    Gateway --> TaskService
    Gateway --> ChatService
    Gateway --> FileService
    Gateway --> ReportService
    
    TicketService --> NotificationService
    TaskService --> NotificationService
    ChatService --> NotificationService
    
    NotificationService --> WebSocket
    NotificationService --> PushNotif
    NotificationService --> Queue
    
    AuthService --> PostgreSQL
    TicketService --> PostgreSQL
    TaskService --> PostgreSQL
    ChatService --> PostgreSQL
    FileService --> S3
    ReportService --> PostgreSQL
    
    AuthService --> Redis
    TicketService --> Redis
    TaskService --> Redis
    
    TicketService --> Elasticsearch
    TaskService --> Elasticsearch
    ChatService --> Elasticsearch
    
    Queue --> Workers
    Workers --> PostgreSQL
    Workers --> PushNotif
    
    WebSocket -.Real-time updates.-> WebApp
    WebSocket -.Real-time updates.-> MobileApp
    PushNotif -.Push notif.-> MobileApp
    
    style WebApp fill:#61dafb
    style MobileApp fill:#61dafb
    style Gateway fill:#ffd54f
    style PostgreSQL fill:#336791
    style Redis fill:# dc382d
    style S3 fill:#ff9900
    style Elasticsearch fill:#005571
```

---

## 📱 MOBILE APP SCREEN FLOW

### Navigation flow cho mobile app

```mermaid
graph TD
    Launch[App Launch] --> Auth{Authenticated?}
    
    Auth --> |No| Login[Login Screen<br/>Email/Password<br/>Biometric]
    Auth --> |Yes| Home
    
    Login --> |Success| Home[Home Dashboard<br/>- My Tickets<br/>- My Tasks<br/>- Notifications]
    
    Home --> Tickets[Tickets List<br/>Filter & Search]
    Home --> Tasks[Tasks List<br/>Filter & Search]
    Home --> TaskPool[Task Pool<br/>Available tasks]
    Home --> Profile[Profile & Settings]
    
    Tickets --> CreateTicket[Create New Ticket<br/>- Camera<br/>- Voice note<br/>- Attachments]
    Tickets --> TicketDetail[Ticket Detail<br/>- Info<br/>- Chat<br/>- History]
    
    Tasks --> CreateTask[Create New Task<br/>Manager only]
    Tasks --> TaskDetail[Task Detail<br/>- Info<br/>- Subtasks<br/>- Chat]
    
    TaskPool --> PickTask[Pick Task<br/>Claim ownership]
    PickTask --> TaskDetail
    
    TicketDetail --> UpdateTicket[Update Status<br/>Add comments<br/>Upload files]
    TicketDetail --> ReassignTicket[Reassign]
    TicketDetail --> ApproveTicket[Approve/Reopen]
    
    TaskDetail --> UpdateTask[Update Progress<br/>Check subtasks<br/>Log hours]
    TaskDetail --> ChatTask[Chat/Collaborate]
    TaskDetail --> SubmitReview[Submit for Review]
    
    Profile --> Settings[Settings<br/>- Notifications<br/>- Language<br/>- Theme]
    Profile --> Logout[Logout]
    
    style Launch fill:#e3f2fd
    style Home fill:#c8e6c9
    style Tickets fill:#fff9c4
    style Tasks fill:#ffecb3
    style TaskPool fill:#f8bbd0
    style Profile fill:#d1c4e9
```

---

## 🔔 NOTIFICATION FLOW

### Hệ thống notification tự động

```mermaid
graph TD
    Event[Event Trigger<br/>Status change, assignment, etc.] --> Process[Notification Service]
    
    Process --> Determine{Xác định<br/>recipients}
    
    Determine --> GetUsers[Lấy danh sách users<br/>cần notify]
    
    GetUsers --> CheckPrefs{Check user<br/>preferences}
    
    CheckPrefs --> |Push enabled| PrepPush[Prepare push notification]
    CheckPrefs --> |Email enabled| PrepEmail[Prepare email]
    CheckPrefs --> |SMS enabled| PrepSMS[Prepare SMS]
    CheckPrefs --> |In-app| PrepInApp[Prepare in-app notification]
    
    PrepPush --> SendPush[Send via FCM]
    PrepEmail --> QueueEmail[Add to email queue]
    PrepSMS --> QueueSMS[Add to SMS queue]
    PrepInApp --> SaveDB[Save to notifications table]
    
    SendPush --> |Delivered| UpdateStatus1[Update delivery status]
    QueueEmail --> |Worker processes| SendEmail[Send email]
    QueueSMS --> |Worker processes| SendSMS[Send SMS]
    SaveDB --> WebSocket[Broadcast via WebSocket]
    
    SendEmail --> UpdateStatus2[Update delivery status]
    SendSMS --> UpdateStatus3[Update delivery status]
    WebSocket --> UpdateUI[Update UI real-time]
    
    UpdateUI --> UserSees[User sees notification]
    UserSees --> UserClick{User clicks?}
    
    UserClick --> |Yes| MarkRead[Mark as read]
    UserClick --> |No| RemindLater[Remind later if critical]
    
    MarkRead --> Navigate[Navigate to ticket/task]
    
    style Event fill:#ffeb3b
    style Process fill:#ffa726
    style SendPush fill:#66bb6a
    style SendEmail fill:#42a5f5
    style SendSMS fill:#ab47bc
    style UpdateUI fill:#26a69a
```

---

## 📊 DASHBOARD LAYOUT

### Web dashboard structure

```mermaid
graph LR
    subgraph "Dashboard Layout"
        Header[Header<br/>Logo, Search, Profile]
        Sidebar[Sidebar Navigation<br/>- Dashboard<br/>- Tickets<br/>- Tasks<br/>- Reports<br/>- Settings]
        
        subgraph "Main Content Area"
            Stats[Statistics Cards<br/>- Total tickets<br/>- Open tasks<br/>- Completion rate<br/>- Avg resolution time]
            
            Charts[Charts Section<br/>- Ticket status pie<br/>- Task timeline<br/>- Team performance]
            
            Lists[Recent Activity<br/>- Recent tickets<br/>- Pending approvals<br/>- Overdue tasks]
        end
        
        Header --- Sidebar
        Sidebar --- Stats
        Stats --- Charts
        Charts --- Lists
    end
    
    style Header fill:#1976d2,color:#fff
    style Sidebar fill:#37474f,color:#fff
    style Stats fill:#e3f2fd
    style Charts fill:#f3e5f5
    style Lists fill:#e8f5e9
```

---

## 🎯 USER ROLE PERMISSIONS MATRIX

```mermaid
graph TD
    subgraph "Roles & Permissions"
        Admin[Admin<br/>Full Access]
        Manager[Manager<br/>Department Level]
        Lead[Team Lead<br/>Team Level]
        Staff[Staff<br/>Individual Level]
        User[End User<br/>Basic Access]
        
        Admin --> |Can do everything| AllActions[All Operations]
        
        Manager --> CreateTask[Create Tasks]
        Manager --> AssignAny[Assign to anyone]
        Manager --> ViewReports[View all reports]
        Manager --> ManageUsers[Manage users in dept]
        
        Lead --> AssignTeam[Assign to team members]
        Lead --> ReviewApprove[Review & approve]
        Lead --> ViewTeamReports[View team reports]
        
        Staff --> PickTasks[Pick tasks from pool]
        Staff --> UpdateProgress[Update own progress]
        Staff --> ChatCollab[Chat/collaborate]
        Staff --> SubmitReview[Submit for review]
        
        User --> CreateTicket[Create support tickets]
        User --> ViewOwn[View own tickets]
        User --> Comment[Comment on own tickets]
        User --> Rate[Rate after resolution]
    end
    
    style Admin fill:#f44336,color:#fff
    style Manager fill:#ff9800,color:#fff
    style Lead fill:#2196f3,color:#fff
    style Staff fill:#4caf50,color:#fff
    style User fill:#9e9e9e,color:#fff
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Caching strategy

```mermaid
graph TD
    Request[User Request] --> CheckCache{Check Redis<br/>Cache}
    
    CheckCache --> |Hit| ReturnCache[Return cached data<br/>Fast response]
    CheckCache --> |Miss| QueryDB[Query PostgreSQL]
    
    QueryDB --> ProcessData[Process & format data]
    ProcessData --> SaveCache[Save to Redis<br/>TTL: 5-60 min]
    ProcessData --> ReturnData[Return data to user]
    
    SaveCache --> ReturnData
    
    Event[Status Update<br/>New comment<br/>Assignment] --> InvalidateCache[Invalidate related cache]
    InvalidateCache --> UpdateCache[Update cache<br/>with new data]
    
    style CheckCache fill:#fff59d
    style ReturnCache fill:#81c784
    style QueryDB fill:#64b5f6
    style SaveCache fill:#ffb74d
    style InvalidateCache fill:#ef5350
```

---

## 🔍 SEARCH OPTIMIZATION

### Search flow with Elasticsearch

```mermaid
graph TD
    UserSearch[User types search query] --> ParseQuery[Parse & sanitize query]
    
    ParseQuery --> CheckFilters{Filters<br/>applied?}
    
    CheckFilters --> |Yes| BuildQuery[Build complex<br/>Elasticsearch query]
    CheckFilters --> |No| SimpleQuery[Simple full-text search]
    
    BuildQuery --> ESQuery[Query Elasticsearch]
    SimpleQuery --> ESQuery
    
    ESQuery --> GetResults[Get matching IDs<br/>with relevance score]
    
    GetResults --> Enhance[Enrich with data<br/>from PostgreSQL]
    
    Enhance --> Highlight[Highlight matching terms]
    
    Highlight --> ReturnResults[Return paginated results<br/>with facets]
    
    ReturnResults --> UserSees[User sees results]
    
    UserSees --> Refine{Refine<br/>search?}
    
    Refine --> |Yes| AddFilters[Add/change filters]
    Refine --> |No| SelectResult[Select a result]
    
    AddFilters --> ParseQuery
    SelectResult --> OpenDetail[Open detail page]
    
    style UserSearch fill:#e3f2fd
    style ESQuery fill:#005571,color:#fff
    style Enhance fill:#64b5f6
    style ReturnResults fill:#81c784
```

Bạn có thể copy các diagram này vào bất kỳ Markdown viewer nào hỗ trợ Mermaid để xem visualization!
