# Implementation Guide - Medical Task Management System

## 🏗️ Project Structure

### Web App (React + TypeScript)

```
web-app/
├── public/
├── src/
│   ├── api/                    # API client & endpoints
│   │   ├── axios.config.ts
│   │   ├── endpoints/
│   │   │   ├── tickets.ts
│   │   │   ├── tasks.ts
│   │   │   ├── users.ts
│   │   │   └── notifications.ts
│   │   └── types/              # API response types
│   ├── assets/                 # Images, icons, fonts
│   ├── components/             # Reusable components
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Dropdown/
│   │   │   └── FileUpload/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   └── Footer/
│   │   ├── tickets/
│   │   │   ├── TicketCard/
│   │   │   ├── TicketList/
│   │   │   ├── TicketForm/
│   │   │   ├── TicketDetail/
│   │   │   └── TicketStatusBadge/
│   │   ├── tasks/
│   │   │   ├── TaskCard/
│   │   │   ├── TaskList/
│   │   │   ├── TaskBoard/      # Kanban view
│   │   │   ├── TaskCalendar/
│   │   │   └── TaskForm/
│   │   ├── chat/
│   │   │   ├── ChatBox/
│   │   │   ├── MessageList/
│   │   │   ├── MessageInput/
│   │   │   └── FileAttachment/
│   │   └── dashboard/
│   │       ├── StatsCard/
│   │       ├── ChartWidget/
│   │       └── RecentActivity/
│   ├── features/               # Feature-based modules
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── tickets/
│   │   │   ├── TicketsPage.tsx
│   │   │   ├── CreateTicket.tsx
│   │   │   └── TicketDetailPage.tsx
│   │   ├── tasks/
│   │   │   ├── TasksPage.tsx
│   │   │   ├── TaskPoolPage.tsx
│   │   │   └── TaskDetailPage.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   └── reports/
│   │       └── ReportsPage.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useTickets.ts
│   │   ├── useTasks.ts
│   │   ├── useWebSocket.ts
│   │   ├── useNotifications.ts
│   │   └── useDebounce.ts
│   ├── store/                  # State management (Zustand)
│   │   ├── authStore.ts
│   │   ├── ticketStore.ts
│   │   ├── taskStore.ts
│   │   ├── notificationStore.ts
│   │   └── uiStore.ts
│   ├── utils/                  # Utility functions
│   │   ├── datetime.ts
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── constants.ts
│   ├── types/                  # TypeScript types
│   │   ├── ticket.types.ts
│   │   ├── task.types.ts
│   │   ├── user.types.ts
│   │   └── common.types.ts
│   ├── styles/                 # Global styles
│   │   ├── global.css
│   │   ├── theme.ts
│   │   └── variables.css
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env
```

### Mobile App (React Native)

```
mobile-app/
├── android/
├── ios/
├── src/
│   ├── api/                    # Same as web
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── Loading/
│   │   ├── tickets/
│   │   ├── tasks/
│   │   └── chat/
│   ├── screens/                # Screen components
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── BiometricLoginScreen.tsx
│   │   ├── Home/
│   │   │   └── HomeScreen.tsx
│   │   ├── Tickets/
│   │   │   ├── TicketsListScreen.tsx
│   │   │   ├── CreateTicketScreen.tsx
│   │   │   └── TicketDetailScreen.tsx
│   │   └── Tasks/
│   │       ├── TasksListScreen.tsx
│   │       ├── TaskPoolScreen.tsx
│   │       └── TaskDetailScreen.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   │   ├── permissions.ts      # Camera, storage permissions
│   │   ├── biometric.ts
│   │   └── offline.ts
│   ├── services/
│   │   ├── pushNotifications.ts
│   │   ├── backgroundSync.ts
│   │   └── localStorage.ts
│   └── types/
├── package.json
├── tsconfig.json
├── babel.config.js
└── .env
```

### Backend API (BFF - ASP.NET Core)

```
backend/
├── src/
│   ├── MedicalTaskManagement.Api/           # Web API project
│   │   ├── Controllers/
│   │   │   ├── AuthController.cs
│   │   │   ├── TicketsController.cs
│   │   │   ├── TasksController.cs
│   │   │   ├── UsersController.cs
│   │   │   ├── NotificationsController.cs
│   │   │   └── SlaController.cs
│   │   ├── Hubs/                            # SignalR hubs
│   │   │   └── NotificationHub.cs
│   │   ├── Mqtt/                            # MQTT handlers
│   │   │   ├── MqttService.cs
│   │   │   ├── MqttMessageHandler.cs
│   │   │   └── MqttTopicMapper.cs
│   │   ├── Middlewares/
│   │   │   ├── ExceptionHandlingMiddleware.cs
│   │   │   ├── RequestLoggingMiddleware.cs
│   │   │   └── RateLimitingMiddleware.cs
│   │   ├── Filters/
│   │   │   ├── ValidationFilter.cs
│   │   │   └── AuthorizationFilter.cs
│   │   ├── Extensions/
│   │   │   ├── ServiceCollectionExtensions.cs
│   │   │   └── ApplicationBuilderExtensions.cs
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   ├── appsettings.Production.json
│   │   ├── Program.cs
│   │   └── MedicalTaskManagement.Api.csproj
│   │
│   ├── MedicalTaskManagement.Application/   # Application layer
│   │   ├── Services/
│   │   │   ├── Tickets/
│   │   │   │   ├── TicketService.cs
│   │   │   │   ├── ITicketService.cs
│   │   │   │   └── TicketValidator.cs
│   │   │   ├── Tasks/
│   │   │   │   ├── TaskService.cs
│   │   │   │   └── ITaskService.cs
│   │   │   ├── Auth/
│   │   │   │   ├── AuthService.cs
│   │   │   │   └── IAuthService.cs
│   │   │   ├── Notifications/
│   │   │   │   └── NotificationService.cs
│   │   │   └── Sla/
│   │   │       ├── SlaMonitorService.cs
│   │   │       └── SlaEscalationService.cs
│   │   ├── DTOs/
│   │   │   ├── Tickets/
│   │   │   │   ├── CreateTicketDto.cs
│   │   │   │   ├── UpdateTicketDto.cs
│   │   │   │   └── TicketResponseDto.cs
│   │   │   ├── Tasks/
│   │   │   │   ├── CreateTaskDto.cs
│   │   │   │   └── TaskResponseDto.cs
│   │   │   └── Auth/
│   │   │       ├── LoginDto.cs
│   │   │       └── TokenResponseDto.cs
│   │   ├── Interfaces/
│   │   ├── Mappings/
│   │   │   └── AutoMapperProfile.cs
│   │   └── MedicalTaskManagement.Application.csproj
│   │
│   ├── MedicalTaskManagement.Domain/        # Domain layer
│   │   ├── Entities/
│   │   │   ├── User.cs
│   │   │   ├── Department.cs
│   │   │   ├── Team.cs
│   │   │   ├── Ticket.cs
│   │   │   ├── Task.cs
│   │   │   ├── Comment.cs
│   │   │   ├── Attachment.cs
│   │   │   ├── Notification.cs
│   │   │   └── ActivityLog.cs
│   │   ├── Enums/
│   │   │   ├── TicketStatus.cs
│   │   │   ├── TaskStatus.cs
│   │   │   ├── Priority.cs
│   │   │   └── UserRole.cs
│   │   ├── Interfaces/
│   │   │   ├── ITicketRepository.cs
│   │   │   ├── ITaskRepository.cs
│   │   │   └── IUserRepository.cs
│   │   └── MedicalTaskManagement.Domain.csproj
│   │
│   ├── MedicalTaskManagement.Infrastructure/ # Infrastructure layer
│   │   ├── Data/
│   │   │   ├── ApplicationDbContext.cs
│   │   │   ├── Configurations/
│   │   │   │   ├── TicketConfiguration.cs
│   │   │   │   ├── TaskConfiguration.cs
│   │   │   │   └── UserConfiguration.cs
│   │   │   ├── Migrations/
│   │   │   └── Seed/
│   │   │       └── DataSeeder.cs
│   │   ├── Repositories/
│   │   │   ├── TicketRepository.cs
│   │   │   ├── TaskRepository.cs
│   │   │   ├── UserRepository.cs
│   │   │   └── GenericRepository.cs
│   │   ├── Services/
│   │   │   ├── Redis/
│   │   │   │   └── RedisCacheService.cs
│   │   │   ├── AWS/
│   │   │   │   └── S3FileStorageService.cs
│   │   │   ├── Elasticsearch/
│   │   │   │   └── ElasticsearchService.cs
│   │   │   ├── Email/
│   │   │   │   └── EmailService.cs
│   │   │   └── Firebase/
│   │   │       └── FirebasePushNotificationService.cs
│   │   ├── BackgroundJobs/
│   │   │   ├── SlaMonitorJob.cs
│   │   │   ├── EmailNotificationJob.cs
│   │   │   └── ReportGenerationJob.cs
│   │   └── MedicalTaskManagement.Infrastructure.csproj
│   │
│   └── MedicalTaskManagement.Shared/        # Shared library
│       ├── Constants/
│       │   ├── AppConstants.cs
│       │   └── ErrorMessages.cs
│       ├── Exceptions/
│       │   ├── NotFoundException.cs
│       │   ├── ValidationException.cs
│       │   └── UnauthorizedException.cs
│       ├── Extensions/
│       │   ├── StringExtensions.cs
│       │   └── DateTimeExtensions.cs
│       └── MedicalTaskManagement.Shared.csproj
│
├── tests/
│   ├── MedicalTaskManagement.UnitTests/
│   ├── MedicalTaskManagement.IntegrationTests/
│   └── MedicalTaskManagement.ApiTests/
│
├── MedicalTaskManagement.sln
└── README.md
└── .env
```

---

## 📦 Dependencies & Packages

### Web App (package.json)

```json
{
  "name": "medical-task-web",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    
    "@tanstack/react-query": "^5.18.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.7",
    
    "antd": "^5.12.0",
    "@ant-design/icons": "^5.2.6",
    
    "@microsoft/signalr": "^8.0.0",
    "mqtt": "^5.3.4",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    
    "date-fns": "^3.0.0",
    "recharts": "^2.10.0",
    "react-beautiful-dnd": "^13.1.1",
    
    "react-dropzone": "^14.2.3",
    "react-toastify": "^10.0.0",
    "react-loading-skeleton": "^3.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.10",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  }
}
```

### Mobile App (package.json)

```json
{
  "name": "medical-task-mobile",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.73.0",
    
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    
    "@tanstack/react-query": "^5.18.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.7",
    
    "socket.io-client": "^4.6.1",
    
    "@react-native-firebase/app": "^19.0.0",
    "@react-native-firebase/messaging": "^19.0.0",
    
    "react-native-biometrics": "^3.0.1",
    "react-native-keychain": "^8.1.2",
    
    "react-native-image-picker": "^7.0.0",
    "react-native-document-picker": "^9.1.0",
    "react-native-fs": "^2.20.0",
    
    "react-native-async-storage": "^1.21.0",
    "react-native-mmkv": "^2.11.0",
    
    "date-fns": "^3.0.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-native": "^0.73.0",
    "typescript": "^5.3.3",
    "metro-react-native-babel-preset": "^0.77.0"
  }
}
```

### Backend (.csproj) - ASP.NET Core

```xml
<!-- MedicalTaskManagement.Api.csproj -->
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <!-- Entity Framework Core -->
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.0" />
    
    <!-- Authentication & Authorization -->
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="7.0.3" />
    
    <!-- SignalR for Real-time Notifications -->
    <PackageReference Include="Microsoft.AspNetCore.SignalR" Version="1.1.0" />
    
    <!-- MQTT for Messaging/Chat -->
    <PackageReference Include="MQTTnet" Version="4.3.3" />
    <PackageReference Include="MQTTnet.Extensions.ManagedClient" Version="4.3.3" />
    
    <!-- Redis Cache -->
    <PackageReference Include="StackExchange.Redis" Version="2.7.10" />
    <PackageReference Include="Microsoft.Extensions.Caching.StackExchangeRedis" Version="8.0.0" />
    
    <!-- Background Jobs -->
    <PackageReference Include="Hangfire" Version="1.8.10" />
    <PackageReference Include="Hangfire.PostgreSql" Version="1.20.8" />
    
    <!-- Elasticsearch -->
    <PackageReference Include="NEST" Version="7.17.5" />
    <PackageReference Include="Elasticsearch.Net" Version="7.17.5" />
    
    <!-- AWS S3 -->
    <PackageReference Include="AWSSDK.S3" Version="3.7.300" />
    <PackageReference Include="AWSSDK.Extensions.NETCore.Setup" Version="3.7.7" />
    
    <!-- Firebase Admin SDK -->
    <PackageReference Include="FirebaseAdmin" Version="2.4.0" />
    
    <!-- AutoMapper -->
    <PackageReference Include="AutoMapper" Version="12.0.1" />
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
    
    <!-- FluentValidation -->
    <PackageReference Include="FluentValidation" Version="11.9.0" />
    <PackageReference Include="FluentValidation.AspNetCore" Version="11.3.0" />
    
    <!-- Swagger/OpenAPI -->
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
    
    <!-- Logging -->
    <PackageReference Include="Serilog.AspNetCore" Version="8.0.0" />
    <PackageReference Include="Serilog.Sinks.Console" Version="5.0.1" />
    <PackageReference Include="Serilog.Sinks.File" Version="5.0.0" />
    <PackageReference Include="Serilog.Sinks.Seq" Version="7.0.0" />
    
    <!-- Health Checks -->
    <PackageReference Include="AspNetCore.HealthChecks.NpgSql" Version="8.0.0" />
    <PackageReference Include="AspNetCore.HealthChecks.Redis" Version="8.0.0" />
    
    <!-- Email -->
    <PackageReference Include="MailKit" Version="4.3.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\MedicalTaskManagement.Application\MedicalTaskManagement.Application.csproj" />
    <ProjectReference Include="..\MedicalTaskManagement.Infrastructure\MedicalTaskManagement.Infrastructure.csproj" />
  </ItemGroup>

</Project>
```

---

## 🔧 Core Implementation Examples

### 1. Ticket Service (C# - Application Layer)

```csharp
// Services/Tickets/TicketService.cs
using MedicalTaskManagement.Application.DTOs.Tickets;
using MedicalTaskManagement.Domain.Entities;
using MedicalTaskManagement.Domain.Enums;
using MedicalTaskManagement.Domain.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace MedicalTaskManagement.Application.Services.Tickets;

public interface ITicketService
{
    Task<TicketResponseDto> CreateAsync(string userId, CreateTicketDto dto);
    Task<TicketResponseDto> AssignAsync(Guid ticketId, Guid assigneeId, string assignedBy);
    Task<TicketResponseDto> UpdateStatusAsync(Guid ticketId, TicketStatus status, string userId, string? comment = null);
    Task<PagedResult<TicketResponseDto>> GetTicketsAsync(TicketFilterDto filter);
}

public class TicketService : ITicketService
{
    private readonly ITicketRepository _ticketRepo;
    private readonly INotificationService _notificationService;
    private readonly IElasticsearchService _elasticsearchService;
    private readonly IMapper _mapper;
    private readonly ILogger<TicketService> _logger;

    public TicketService(
        ITicketRepository ticketRepo,
        INotificationService notificationService,
        IElasticsearchService elasticsearchService,
        IMapper mapper,
        ILogger<TicketService> logger)
    {
        _ticketRepo = ticketRepo;
        _notificationService = notificationService;
        _elasticsearchService = elasticsearchService;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<TicketResponseDto> CreateAsync(string userId, CreateTicketDto dto)
    {
        var ticket = new Ticket
        {
            Title = dto.Title,
            Description = dto.Description,
            Priority = dto.Priority,
            Category = dto.Category,
            Status = TicketStatus.Submitted,
            CreatedBy = Guid.Parse(userId),
            DepartmentId = dto.DepartmentId,
            CreatedAt = DateTime.UtcNow
        };

        // Generate ticket number
        ticket.TicketNumber = await GenerateTicketNumberAsync();

        // Calculate SLA due times
        var slaDueTimes = CalculateSLADueTimes(ticket.Priority, ticket.CreatedAt);
        ticket.SlaResponseDueAt = slaDueTimes.ResponseDueAt;
        ticket.SlaResolveDueAt = slaDueTimes.ResolveDueAt;

        var saved = await _ticketRepo.AddAsync(ticket);
        await _ticketRepo.SaveChangesAsync();

        // Index in Elasticsearch
        await _elasticsearchService.IndexTicketAsync(saved);

        // Notify admins
        await _notificationService.NotifyNewTicketAsync(saved);

        _logger.LogInformation("Ticket {TicketNumber} created by user {UserId}", 
            saved.TicketNumber, userId);

        return _mapper.Map<TicketResponseDto>(saved);
    }

    public async Task<TicketResponseDto> AssignAsync(Guid ticketId, Guid assigneeId, string assignedBy)
    {
        var ticket = await _ticketRepo.GetByIdAsync(ticketId);
        if (ticket == null)
            throw new NotFoundException($"Ticket with ID {ticketId} not found");

        ticket.AssignedTo = assigneeId;
        ticket.Status = TicketStatus.Assigned;
        ticket.AssignedAt = DateTime.UtcNow;
        ticket.AssignedBy = Guid.Parse(assignedBy);

        await _ticketRepo.UpdateAsync(ticket);
        await _ticketRepo.SaveChangesAsync();

        // Update search index
        await _elasticsearchService.UpdateTicketAsync(ticket);

        // Notify assignee
        await _notificationService.NotifyAssignmentAsync(assigneeId, ticket, "ticket");

        _logger.LogInformation("Ticket {TicketNumber} assigned to user {AssigneeId}", 
            ticket.TicketNumber, assigneeId);

        return _mapper.Map<TicketResponseDto>(ticket);
    }

    public async Task<TicketResponseDto> UpdateStatusAsync(
        Guid ticketId, 
        TicketStatus status, 
        string userId, 
        string? comment = null)
    {
        var ticket = await _ticketRepo.GetByIdWithRelationsAsync(ticketId);
        if (ticket == null)
            throw new NotFoundException($"Ticket with ID {ticketId} not found");

        var oldStatus = ticket.Status;
        ticket.Status = status;
        ticket.UpdatedAt = DateTime.UtcNow;

        // Update specific timestamps based on status
        switch (status)
        {
            case TicketStatus.Resolved:
                ticket.ResolvedAt = DateTime.UtcNow;
                break;
            case TicketStatus.Closed:
                ticket.ClosedAt = DateTime.UtcNow;
                break;
        }

        await _ticketRepo.UpdateAsync(ticket);
        await _ticketRepo.SaveChangesAsync();

        // Log status change
        await LogStatusChangeAsync(ticketId, oldStatus, status, userId, comment);

        // Update index
        await _elasticsearchService.UpdateTicketAsync(ticket);

        // Notify relevant parties
        await _notificationService.NotifyStatusChangeAsync(ticket, oldStatus);

        _logger.LogInformation("Ticket {TicketNumber} status changed from {OldStatus} to {NewStatus}", 
            ticket.TicketNumber, oldStatus, status);

        return _mapper.Map<TicketResponseDto>(ticket);
    }

    public async Task<PagedResult<TicketResponseDto>> GetTicketsAsync(TicketFilterDto filter)
    {
        var tickets = await _ticketRepo.GetPagedAsync(
            filter.Status,
            filter.Priority,
            filter.DepartmentId,
            filter.Page,
            filter.PageSize);

        return _mapper.Map<PagedResult<TicketResponseDto>>(tickets);
    }

    private async Task<string> GenerateTicketNumberAsync()
    {
        var date = DateTime.UtcNow.ToString("yyyyMMdd");
        var count = await _ticketRepo.GetCountTodayAsync();
        return $"TKT-{date}-{(count + 1):D4}";
    }

    private (DateTime ResponseDueAt, DateTime ResolveDueAt) CalculateSLADueTimes(Priority priority, DateTime createdAt)
    {
        // SLA times in minutes based on priority
        var (responseMinutes, resolveMinutes) = priority switch
        {
            Priority.Critical => (5, 120),
            Priority.High => (30, 240),
            Priority.Medium => (120, 1440),
            Priority.Low => (480, 4320),
            _ => (120, 1440)
        };

        return (
            createdAt.AddMinutes(responseMinutes),
            createdAt.AddMinutes(resolveMinutes)
        );
    }

    private async Task LogStatusChangeAsync(
        Guid ticketId, 
        TicketStatus oldStatus, 
        TicketStatus newStatus, 
        string userId, 
        string? comment)
    {
        // Implementation: Save to ActivityLog table
        await Task.CompletedTask;
    }
}
```

### 1B. Tickets Controller (C# - API Layer)

```csharp
// Controllers/TicketsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MedicalTaskManagement.Application.Services.Tickets;
using MedicalTaskManagement.Application.DTOs.Tickets;
using System.Security.Claims;

namespace MedicalTaskManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;
    private readonly ILogger<TicketsController> _logger;

    public TicketsController(ITicketService ticketService, ILogger<TicketsController> logger)
    {
        _ticketService = ticketService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<TicketResponseDto>>> GetTickets([FromQuery] TicketFilterDto filter)
    {
        var tickets = await _ticketService.GetTicketsAsync(filter);
        return Ok(tickets);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TicketResponseDto>> GetTicket(Guid id)
    {
        var ticket = await _ticketService.GetByIdAsync(id);
        return Ok(ticket);
    }

    [HttpPost]
    public async Task<ActionResult<TicketResponseDto>> CreateTicket([FromBody] CreateTicketDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var ticket = await _ticketService.CreateAsync(userId!, dto);
        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
    }

    [HttpPatch("{id}/status")]
    public async Task<ActionResult<TicketResponseDto>> UpdateStatus(
        Guid id, 
        [FromBody] UpdateStatusDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var ticket = await _ticketService.UpdateStatusAsync(id, dto.Status, userId!, dto.Comment);
        return Ok(ticket);
    }

    [HttpPatch("{id}/assign")]
    [Authorize(Roles = "Manager,Admin")]
    public async Task<ActionResult<TicketResponseDto>> AssignTicket(
        Guid id, 
        [FromBody] AssignTicketDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var ticket = await _ticketService.AssignAsync(id, dto.AssigneeId, userId!);
        return Ok(ticket);
    }

    [HttpPost("{id}/comments")]
    public async Task<ActionResult<CommentDto>> AddComment(
        Guid id, 
        [FromBody] CreateCommentDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var comment = await _ticketService.AddCommentAsync(id, userId!, dto.Content);
        return CreatedAtAction(nameof(GetTicket), new { id }, comment);
    }
}
```

### 2. React Hook for Tickets (Frontend - Same as before)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../database/entities/Ticket.entity';
import { CreateTicketDto, UpdateTicketDto } from './tickets.dto';
import { TicketStatus, Priority } from '../types/enums';
import { NotificationsService } from '../notifications/notifications.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
    private notificationsService: NotificationsService,
    private elasticsearchService: ElasticsearchService,
  ) {}

  async create(userId: string, dto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepo.create({
      ...dto,
      status: TicketStatus.SUBMITTED,
      createdBy: userId,
      createdAt: new Date(),
    });

    const saved = await this.ticketRepo.save(ticket);

    // Index in Elasticsearch for search
    await this.indexTicket(saved);

    // Notify admins
    await this.notificationsService.notifyNewTicket(saved);

    return saved;
  }

  async assignTicket(
    ticketId: string,
    assigneeId: string,
    assignedBy: string,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({ 
      where: { id: ticketId } 
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    ticket.assignedTo = assigneeId;
    ticket.status = TicketStatus.ASSIGNED;
    ticket.assignedAt = new Date();
    ticket.assignedBy = assignedBy;

    const updated = await this.ticketRepo.save(ticket);

    // Update search index
    await this.updateTicketIndex(updated);

    // Notify assignee
    await this.notificationsService.notifyAssignment(
      assigneeId,
      updated,
      'ticket'
    );

    return updated;
  }

  async updateStatus(
    ticketId: string,
    status: TicketStatus,
    userId: string,
    comment?: string,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({ 
      where: { id: ticketId },
      relations: ['createdByUser', 'assignedToUser']
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const oldStatus = ticket.status;
    ticket.status = status;

    const updated = await this.ticketRepo.save(ticket);

    // Log status change
    await this.logStatusChange(ticketId, oldStatus, status, userId, comment);

    // Update index
    await this.updateTicketIndex(updated);

    // Notify relevant parties
    await this.notificationsService.notifyStatusChange(updated, oldStatus);

    return updated;
  }

  async searchTickets(query: string, filters: any) {
    const result = await this.elasticsearchService.search({
      index: 'tickets',
      body: {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query,
                  fields: ['title^3', 'description', 'comments'],
                },
              },
            ],
            filter: [
              filters.status && { term: { status: filters.status } },
              filters.priority && { term: { priority: filters.priority } },
              filters.departmentId && { 
                term: { departmentId: filters.departmentId } 
              },
            ].filter(Boolean),
          },
        },
        highlight: {
          fields: {
            title: {},
            description: {},
          },
        },
      },
    });

    return result.hits.hits.map(hit => ({
      ...hit._source,
      highlights: hit.highlight,
    }));
  }

  private async indexTicket(ticket: Ticket) {
    await this.elasticsearchService.index({
      index: 'tickets',
      id: ticket.id,
      body: {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        departmentId: ticket.departmentId,
        createdAt: ticket.createdAt,
      },
    });
  }

  private async updateTicketIndex(ticket: Ticket) {
    await this.elasticsearchService.update({
      index: 'tickets',
      id: ticket.id,
      body: {
        doc: {
          status: ticket.status,
          assignedTo: ticket.assignedTo,
        },
      },
    });
  }

  private async logStatusChange(
    ticketId: string,
    oldStatus: TicketStatus,
    newStatus: TicketStatus,
    userId: string,
    comment?: string,
  ) {
    // Log to activity_logs table
    // Implementation here
  }
}
```

### 1B. Task Service (Backend)

```typescript
// tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../database/entities/Task.entity';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TaskStatus, Priority } from '../types/enums';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private notificationsService: NotificationsService,
  ) {}

  async create(userId: string, dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepo.create({
      ...dto,
      status: TaskStatus.CREATED, // Status ban đầu là CREATED
      progress: 0,
      createdBy: userId,
      createdAt: new Date(),
    });

    const saved = await this.taskRepo.save(task);

    // Notify relevant users based on assignment strategy
    if (dto.assignedTo) {
      // Direct assignment
      await this.notificationsService.notifyAssignment(
        dto.assignedTo,
        saved,
        'task'
      );
      // Update status to ASSIGNED
      saved.status = TaskStatus.ASSIGNED;
      await this.taskRepo.save(saved);
    } else if (dto.teamId) {
      // Team assignment
      await this.notificationsService.notifyTeamAssignment(
        dto.teamId,
        saved
      );
      saved.status = TaskStatus.TEAM_ASSIGNED;
      await this.taskRepo.save(saved);
    }
    // Otherwise stays as CREATED (for task pool / self-pick)

    return saved;
  }

  async claimTask(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id: taskId, status: TaskStatus.CREATED }
    });

    if (!task) {
      throw new NotFoundException('Task not found or already assigned');
    }

    task.assignedTo = userId;
    task.status = TaskStatus.CLAIMED;
    task.assignedAt = new Date();

    const updated = await this.taskRepo.save(task);

    // Notify task creator
    await this.notificationsService.notifyTaskClaimed(task.createdBy, updated);

    return updated;
  }

  async updateProgress(
    taskId: string,
    progress: number,
    userId: string,
    comment?: string
  ): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: ['assignedToUser', 'createdByUser']
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const oldProgress = task.progress;
    task.progress = progress;
    
    if (progress > 0 && task.status === TaskStatus.ASSIGNED) {
      task.status = TaskStatus.IN_PROGRESS;
    }

    const updated = await this.taskRepo.save(task);

    // Log progress update
    await this.logProgressUpdate(taskId, oldProgress, progress, userId, comment);

    // Notify creator if significant progress (25%, 50%, 75%, 100%)
    if (progress % 25 === 0 && progress !== oldProgress) {
      await this.notificationsService.notifyProgressUpdate(updated);
    }

    return updated;
  }

  async submitForReview(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id: taskId, assignedTo: userId }
    });

    if (!task) {
      throw new NotFoundException('Task not found or not assigned to you');
    }

    task.status = TaskStatus.REVIEW;
    task.progress = 100;
    const updated = await this.taskRepo.save(task);

    // Notify manager/lead for review
    await this.notificationsService.notifyReviewRequest(updated);

    return updated;
  }

  private async logProgressUpdate(
    taskId: string,
    oldProgress: number,
    newProgress: number,
    userId: string,
    comment?: string,
  ) {
    // Log to activity_logs table
    // Implementation here
  }
}
```

### 2. React Hook for Tickets (Frontend)

```typescript
// hooks/useTickets.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsApi } from '../api/endpoints/tickets';
import { toast } from 'react-toastify';
import { Ticket, CreateTicketDto, TicketStatus } from '../types/ticket.types';

export const useTickets = (filters?: any) => {
  const queryClient = useQueryClient();

  // Fetch tickets list
  const { data: tickets, isLoading, error } = useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => ticketsApi.getTickets(filters),
    staleTime: 30000, // 30 seconds
  });

  // Create ticket mutation
  const createMutation = useMutation({
    mutationFn: (dto: CreateTicketDto) => ticketsApi.create(dto),
    onSuccess: (newTicket) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Ticket created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create ticket');
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ 
      ticketId, 
      status 
    }: { 
      ticketId: string; 
      status: TicketStatus 
    }) => ticketsApi.updateStatus(ticketId, status),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.setQueryData(
        ['ticket', updated.id], 
        updated
      );
      toast.success('Status updated!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update status');
    },
  });

  // Assign ticket mutation
  const assignMutation = useMutation({
    mutationFn: ({ 
      ticketId, 
      assigneeId 
    }: { 
      ticketId: string; 
      assigneeId: string 
    }) => ticketsApi.assign(ticketId, assigneeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Ticket assigned!');
    },
  });

  return {
    tickets,
    isLoading,
    error,
    createTicket: createMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    assignTicket: assignMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
  };
};

// Hook for single ticket detail
export const useTicketDetail = (ticketId: string) => {
  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => ticketsApi.getById(ticketId),
    enabled: !!ticketId,
  });

  return { ticket, isLoading };
};
```

### 2B. React Hook for Tasks (Frontend)

```typescript
// hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/endpoints/tasks';
import { toast } from 'react-toastify';
import { Task, CreateTaskDto, TaskStatus } from '../types/task.types';

export const useTasks = (filters?: any) => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => tasksApi.getTasks(filters),
  });

  const createMutation = useMutation({
    mutationFn: (dto: CreateTaskDto) => tasksApi.create(dto),
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully!');
    },
  });

  const claimMutation = useMutation({
    mutationFn: (taskId: string) => tasksApi.claim(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task claimed!');
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: ({ taskId, progress }: { taskId: string; progress: number }) =>
      tasksApi.updateProgress(taskId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks,
    isLoading,
    createTask: createMutation.mutate,
    claimTask: claimMutation.mutate,
    updateProgress: updateProgressMutation.mutate,
  };
};
```

### 3. WebSocket Integration (Real-time Updates)

```typescript
// hooks/useWebSocket.ts
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

let socket: Socket | null = null;

export const useWebSocket = () => {
  const { token, user } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token || socket) return;

    // Connect to WebSocket
    socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
      socket?.emit('join', { userId: user?.id });
    });

    // Listen for ticket updates
    socket.on('ticket:updated', (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.setQueryData(['ticket', data.ticketId], data.ticket);
      
      toast.info(`Ticket #${data.ticketId} updated`);
    });

    // Listen for task updates
    socket.on('task:updated', (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['task', data.taskId], data.task);
    });

    // Listen for new assignments
    socket.on('assignment:new', (data) => {
      toast.info(`New ${data.type} assigned to you!`);
      queryClient.invalidateQueries({ 
        queryKey: [data.type === 'ticket' ? 'tickets' : 'tasks'] 
      });
    });

    // Listen for new messages
    socket.on('message:new', (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['comments', data.entityType, data.entityId] 
      });
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [token, user?.id, queryClient]);

  return { socket };
};
```

### 4. Mobile Push Notifications Setup

```typescript
// services/pushNotifications.ts (React Native)
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../api/axios.config';

export class PushNotificationService {
  static async initialize() {
    // Request permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('Push notification permission denied');
      return;
    }

    // Get FCM token
    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    // Save token to backend
    await this.saveFCMToken(token);

    // Listen for token refresh
    messaging().onTokenRefresh(async (newToken) => {
      await this.saveFCMToken(newToken);
    });

    // Handle foreground notifications
    messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground notification:', remoteMessage);
      // Show in-app notification
      this.showInAppNotification(remoteMessage);
    });

    // Handle background notifications
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background notification:', remoteMessage);
    });

    // Handle notification tap when app is in background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened app:', remoteMessage);
      this.handleNotificationTap(remoteMessage);
    });

    // Check if app was opened from a notification (app was closed)
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      this.handleNotificationTap(initialNotification);
    }
  }

  static async saveFCMToken(token: string) {
    try {
      await apiClient.post('/users/fcm-token', {
        token,
        platform: Platform.OS,
      });
      await AsyncStorage.setItem('fcm_token', token);
    } catch (error) {
      console.error('Failed to save FCM token:', error);
    }
  }

  static showInAppNotification(remoteMessage: any) {
    // Use react-native-toast-message or similar library
    // to show in-app notification
  }

  static handleNotificationTap(remoteMessage: any) {
    const { data } = remoteMessage;
    
    // Navigate based on notification type
    if (data?.type === 'ticket') {
      // Navigate to ticket detail screen
      // navigation.navigate('TicketDetail', { ticketId: data.ticketId });
    } else if (data?.type === 'task') {
      // Navigate to task detail screen
    }
  }
}
```

### 5. Offline Support (Mobile)

```typescript
// utils/offline.ts
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const OFFLINE_QUEUE_KEY = 'offline_queue';

interface QueuedAction {
  id: string;
  type: 'create_ticket' | 'update_task' | 'add_comment';
  data: any;
  timestamp: number;
}

export class OfflineManager {
  private static queue: QueuedAction[] = [];

  static async initialize() {
    // Load queued actions from storage
    const stored = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    if (stored) {
      this.queue = JSON.parse(stored);
    }

    // Listen for network changes
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        this.syncQueue();
      }
    });
  }

  static async addToQueue(action: Omit<QueuedAction, 'id' | 'timestamp'>) {
    const queuedAction: QueuedAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    this.queue.push(queuedAction);
    await this.saveQueue();
  }

  static async syncQueue() {
    if (this.queue.length === 0) return;

    console.log(`Syncing ${this.queue.length} offline actions...`);

    for (const action of [...this.queue]) {
      try {
        await this.processAction(action);
        // Remove from queue on success
        this.queue = this.queue.filter((a) => a.id !== action.id);
        await this.saveQueue();
      } catch (error) {
        console.error('Failed to sync action:', error);
        // Keep in queue for retry
      }
    }
  }

  private static async processAction(action: QueuedAction) {
    // Process based on action type
    switch (action.type) {
      case 'create_ticket':
        // await ticketsApi.create(action.data);
        break;
      case 'update_task':
        // await tasksApi.update(action.data.id, action.data);
        break;
      case 'add_comment':
        // await commentsApi.create(action.data);
        break;
    }
  }

  private static async saveQueue() {
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(this.queue));
  }
}

// Hook to use offline state
export const useOfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return { isOffline };
};
```

---

## � 6. SLA Monitoring & Auto-Escalation (Backend)

### SLA Monitor Service

```typescript
// services/sla-monitor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Ticket } from '../database/entities/Ticket.entity';
import { Task } from '../database/entities/Task.entity';
import { TicketStatus, Priority } from '../types/enums';
import { NotificationsService } from '../notifications/notifications.service';
import { ConfigService } from '@nestjs/config';

interface SLAConfig {
  responseMinutes: number;
  resolveMinutes: number;
  alertMethods: string[];
}

@Injectable()
export class SLAMonitorService {
  private slaConfigs: Map<Priority, SLAConfig>;

  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private notificationsService: NotificationsService,
    private configService: ConfigService,
  ) {
    // Initialize SLA configs from environment
    this.slaConfigs = new Map([
      [Priority.CRITICAL, {
        responseMinutes: this.configService.get('SLA_CRITICAL_RESPONSE', 5),
        resolveMinutes: this.configService.get('SLA_CRITICAL_RESOLVE', 120),
        alertMethods: ['sms', 'email', 'push'],
      }],
      [Priority.HIGH, {
        responseMinutes: this.configService.get('SLA_HIGH_RESPONSE', 30),
        resolveMinutes: this.configService.get('SLA_HIGH_RESOLVE', 240),
        alertMethods: ['email', 'push'],
      }],
      [Priority.MEDIUM, {
        responseMinutes: this.configService.get('SLA_MEDIUM_RESPONSE', 120),
        resolveMinutes: this.configService.get('SLA_MEDIUM_RESOLVE', 1440),
        alertMethods: ['push'],
      }],
      [Priority.LOW, {
        responseMinutes: this.configService.get('SLA_LOW_RESPONSE', 480),
        resolveMinutes: this.configService.get('SLA_LOW_RESOLVE', 4320),
        alertMethods: ['email'],
      }],
    ]);
  }

  // Run every 1 minute
  @Cron(CronExpression.EVERY_MINUTE)
  async checkSLABreaches() {
    console.log('Running SLA breach check...');
    
    await this.checkResponseSLA();
    await this.checkResolveSLA();
    await this.checkBlockedTickets();
    await this.checkProgressUpdates();
  }

  private async checkResponseSLA() {
    const now = new Date();

    // Find tickets without response that are past SLA
    const tickets = await this.ticketRepo.find({
      where: {
        status: TicketStatus.SUBMITTED,
      },
      relations: ['createdByUser', 'assignedToUser', 'department'],
    });

    for (const ticket of tickets) {
      const slaConfig = this.slaConfigs.get(ticket.priority);
      if (!slaConfig) continue;

      const timeSinceCreation = this.getMinutesDiff(ticket.createdAt, now);
      const responseDeadline = slaConfig.responseMinutes;

      // Check if breach
      if (timeSinceCreation > responseDeadline) {
        await this.handleResponseSLABreach(ticket, slaConfig);
      } 
      // Check if approaching deadline (warning)
      else if (timeSinceCreation > responseDeadline * 0.8) {
        await this.sendSLAWarning(ticket, 'response', responseDeadline - timeSinceCreation);
      }
    }
  }

  private async checkResolveSLA() {
    const now = new Date();

    // Find tickets in progress that are past resolve SLA
    const tickets = await this.ticketRepo.find({
      where: [
        { status: TicketStatus.ASSIGNED },
        { status: TicketStatus.IN_PROGRESS },
      ],
      relations: ['createdByUser', 'assignedToUser', 'department'],
    });

    for (const ticket of tickets) {
      const slaConfig = this.slaConfigs.get(ticket.priority);
      if (!slaConfig) continue;

      const timeSinceCreation = this.getMinutesDiff(ticket.createdAt, now);
      const resolveDeadline = slaConfig.resolveMinutes;

      // Check if breach
      if (timeSinceCreation > resolveDeadline) {
        await this.handleResolveSLABreach(ticket, slaConfig);
      }
      // Check if approaching deadline
      else if (timeSinceCreation > resolveDeadline * 0.8) {
        await this.sendSLAWarning(ticket, 'resolve', resolveDeadline - timeSinceCreation);
      }
    }
  }

  private async handleResponseSLABreach(ticket: Ticket, slaConfig: SLAConfig) {
    console.log(`Response SLA breach for ticket ${ticket.ticketNumber}`);

    // Mark SLA breach
    await this.ticketRepo.update(ticket.id, {
      slaBreached: true,
      slaBreachType: 'response',
      slaBreachedAt: new Date(),
    });

    // Send escalation notifications
    if (ticket.priority === Priority.CRITICAL) {
      // Critical: SMS/Call + Email + Push to Manager
      await this.notificationsService.sendCriticalAlert({
        type: 'sla_breach_response',
        ticket,
        message: `CRITICAL: Ticket ${ticket.ticketNumber} has breached response SLA (${slaConfig.responseMinutes} minutes)`,
        recipients: ['manager', 'director'],
        methods: slaConfig.alertMethods,
      });
    } else if (ticket.priority === Priority.HIGH) {
      // High: Email + notification to Team Lead
      await this.notificationsService.sendEscalationAlert({
        type: 'sla_breach_response',
        ticket,
        recipients: ['team_lead'],
        methods: slaConfig.alertMethods,
      });
    }

    // Log to activity
    await this.logActivity(ticket.id, 'sla_breach', {
      type: 'response',
      expectedMinutes: slaConfig.responseMinutes,
      actualMinutes: this.getMinutesDiff(ticket.createdAt, new Date()),
    });
  }

  private async handleResolveSLABreach(ticket: Ticket, slaConfig: SLAConfig) {
    console.log(`Resolve SLA breach for ticket ${ticket.ticketNumber}`);

    // Mark SLA breach
    await this.ticketRepo.update(ticket.id, {
      slaBreached: true,
      slaBreachType: 'resolve',
      slaBreachedAt: new Date(),
    });

    // TÌM CANDIDATES NHƯNG KHÔNG TỰ ĐỘNG REASSIGN
    // Find suggested candidates for reassignment (for Manager to review)
    const candidates = await this.findBestAvailableStaff(ticket);
    
    if (ticket.priority === Priority.CRITICAL) {
      // CRITICAL: Alert both Manager and Director with suggested candidates
      await this.notificationsService.sendCriticalAlert({
        type: 'sla_breach_resolve',
        ticket,
        message: `CRITICAL: Ticket ${ticket.ticketNumber} has breached resolve SLA (${slaConfig.resolveMinutes} minutes)`,
        recipients: ['director', 'manager'],
        methods: ['sms', 'email', 'push'],
        actionRequired: true,
        suggestedCandidates: candidates,
        currentAssignee: {
          id: ticket.assignedTo,
          name: ticket.assignedToUser?.fullName,
        },
      });

      // Create reassignment suggestion record for Manager dashboard
      await this.createReassignmentSuggestion({
        ticketId: ticket.id,
        priority: 'critical',
        reason: 'sla_breach_resolve',
        suggestedCandidates: candidates,
        requiresApproval: true,
        alertedAt: new Date(),
      });

    } else if (ticket.priority === Priority.HIGH) {
      // HIGH: Alert Manager with suggested candidates
      await this.notificationsService.sendReassignmentSuggestion({
        ticket,
        message: `HIGH priority ticket ${ticket.ticketNumber} has breached resolve SLA. Manager action required.`,
        recipients: ['manager'],
        methods: ['email', 'push'],
        suggestedCandidates: candidates,
        actionRequired: true,
      });

      await this.createReassignmentSuggestion({
        ticketId: ticket.id,
        priority: 'high',
        reason: 'sla_breach_resolve',
        suggestedCandidates: candidates,
        requiresApproval: true,
        alertedAt: new Date(),
      });

    } else {
      // MEDIUM/LOW: Require Manager review
      await this.notificationsService.notifyManagerReview({
        ticket,
        reason: 'sla_breach_resolve',
        suggestedCandidates: candidates,
        requiresDecision: true,
      });
    }

    // Log SLA breach
    await this.logActivity(ticket.id, 'sla_breach', {
      type: 'resolve',
      expectedMinutes: slaConfig.resolveMinutes,
      actualMinutes: this.getMinutesDiff(ticket.createdAt, new Date()),
    });
  }

  private async findBestAvailableStaff(ticket: Ticket): Promise<any[]> {
    // Query to find best staff candidates for Manager to review:
    // 1. Same department
    // 2. Available/Online status
    // 3. High rating (>4.0)
    // 4. Low current workload
    // 5. Has handled similar tickets
    // Return TOP 5 candidates (not just 1)

    const candidates = await this.ticketRepo.query(`
      SELECT u.id, u.full_name, u.avatar_url, u.phone,
             COALESCE(AVG(t.rating), 0) as avg_rating,
             COUNT(CASE WHEN t.status IN ('assigned', 'in_progress') THEN 1 END) as current_workload,
             COUNT(CASE WHEN t.category = $1 AND t.status = 'closed' THEN 1 END) as similar_tickets_resolved,
             AVG(EXTRACT(EPOCH FROM (t.closed_at - t.created_at))/3600) as avg_resolution_hours
      FROM users u
      LEFT JOIN tickets t ON t.assigned_to = u.id
      WHERE u.department_id = $2
        AND u.role IN ('staff', 'lead')
        AND u.is_active = true
        AND u.id != $3  -- Exclude current assignee
      GROUP BY u.id, u.full_name, u.avatar_url, u.phone
      HAVING AVG(t.rating) > 4.0 OR AVG(t.rating) IS NULL
      ORDER BY 
        similar_tickets_resolved DESC,
        avg_rating DESC NULLS LAST,
        current_workload ASC,
        avg_resolution_hours ASC NULLS LAST
      LIMIT 5  -- Return top 5 candidates for Manager to choose
    `, [ticket.category, ticket.departmentId, ticket.assignedTo]);

    return candidates || [];
  }

  private async createReassignmentSuggestion(data: {
    ticketId: string;
    priority: string;
    reason: string;
    suggestedCandidates: any[];
    requiresApproval: boolean;
    alertedAt: Date;
  }) {
    // Create a record in reassignment_suggestions table
    // This will appear in Manager's dashboard for action
    // Implementation: Insert into database table
  }

  private async checkBlockedTickets() {
    const criticalThreshold = this.configService.get('SLA_BLOCKED_CRITICAL_THRESHOLD', 2); // hours
    const highThreshold = this.configService.get('SLA_BLOCKED_HIGH_THRESHOLD', 8);
    const mediumThreshold = this.configService.get('SLA_BLOCKED_MEDIUM_THRESHOLD', 24);

    const now = new Date();

    const blockedTickets = await this.ticketRepo.find({
      where: { status: TicketStatus.BLOCKED },
      relations: ['assignedToUser', 'department'],
    });

    for (const ticket of blockedTickets) {
      const blockedDuration = this.getHoursDiff(ticket.updatedAt, now);
      let shouldEscalate = false;

      if (ticket.priority === Priority.CRITICAL && blockedDuration > criticalThreshold) {
        shouldEscalate = true;
      } else if (ticket.priority === Priority.HIGH && blockedDuration > highThreshold) {
        shouldEscalate = true;
      } else if (blockedDuration > mediumThreshold) {
        shouldEscalate = true;
      }

      if (shouldEscalate) {
        await this.notificationsService.notifyBlockedEscalation({
          ticket,
          blockedHours: blockedDuration,
          message: `Ticket ${ticket.ticketNumber} has been blocked for ${blockedDuration} hours`,
        });
      }
    }
  }

  private async checkProgressUpdates() {
    const updateRequired = this.configService.get('SLA_PROGRESS_UPDATE_REQUIRED', 4); // hours
    const now = new Date();

    const tickets = await this.ticketRepo.find({
      where: { status: TicketStatus.IN_PROGRESS },
      relations: ['assignedToUser'],
    });

    for (const ticket of tickets) {
      const hoursSinceUpdate = this.getHoursDiff(ticket.updatedAt, now);

      if (hoursSinceUpdate > updateRequired) {
        // Send reminder
        await this.notificationsService.sendProgressReminder({
          ticket,
          assigneeId: ticket.assignedTo,
          hoursSinceUpdate,
        });

        // Add system comment
        // await this.addSystemComment(ticket.id, 'System reminder: Please update progress');
      }
    }
  }

  private async sendSLAWarning(ticket: Ticket, type: 'response' | 'resolve', minutesRemaining: number) {
    await this.notificationsService.sendSLAWarning({
      ticket,
      type,
      minutesRemaining,
      message: `Ticket ${ticket.ticketNumber} approaching ${type} SLA deadline (${minutesRemaining} min remaining)`,
    });
  }

  private getMinutesDiff(from: Date, to: Date): number {
    return Math.floor((to.getTime() - from.getTime()) / 1000 / 60);
  }

  private getHoursDiff(from: Date, to: Date): number {
    return Math.floor((to.getTime() - from.getTime()) / 1000 / 60 / 60);
  }

  private async logActivity(entityId: string, action: string, data: any) {
    // Log to activity_logs table
    // Implementation using activity logs repository
  }

  // Calculate SLA due times when ticket is created
  calculateSLADueTimes(priority: Priority, createdAt: Date): {
    responseDueAt: Date;
    resolveDueAt: Date;
  } {
    const slaConfig = this.slaConfigs.get(priority);
    if (!slaConfig) {
      throw new Error(`No SLA config for priority: ${priority}`);
    }

    return {
      responseDueAt: new Date(createdAt.getTime() + slaConfig.responseMinutes * 60 * 1000),
      resolveDueAt: new Date(createdAt.getTime() + slaConfig.resolveMinutes * 60 * 1000),
    };
  }

  // Get SLA status for display
  getSLAStatus(ticket: Ticket): {
    status: 'safe' | 'warning' | 'danger' | 'breached';
    color: string;
    percentRemaining: number;
    message: string;
  } {
    const now = new Date();
    const slaConfig = this.slaConfigs.get(ticket.priority);
    
    if (!slaConfig) {
      return { status: 'safe', color: 'green', percentRemaining: 100, message: 'No SLA configured' };
    }

    const deadlineMinutes = ticket.status === TicketStatus.SUBMITTED 
      ? slaConfig.responseMinutes 
      : slaConfig.resolveMinutes;
    
    const elapsedMinutes = this.getMinutesDiff(ticket.createdAt, now);
    const percentElapsed = (elapsedMinutes / deadlineMinutes) * 100;
    const percentRemaining = 100 - percentElapsed;

    if (percentElapsed > 100) {
      return {
        status: 'breached',
        color: 'red',
        percentRemaining: 0,
        message: `SLA breached ${Math.floor(elapsedMinutes - deadlineMinutes)} minutes ago`,
      };
    } else if (percentRemaining < 20) {
      return {
        status: 'danger',
        color: 'orange',
        percentRemaining,
        message: `Critical: ${Math.floor(deadlineMinutes - elapsedMinutes)} minutes remaining`,
      };
    } else if (percentRemaining < 50) {
      return {
        status: 'warning',
        color: 'yellow',
        percentRemaining,
        message: `Warning: ${Math.floor(deadlineMinutes - elapsedMinutes)} minutes remaining`,
      };
    } else {
      return {
        status: 'safe',
        color: 'green',
        percentRemaining,
        message: 'On track',
      };
    }
  }
}
```

---

## �🗄️ Database Schema (PostgreSQL)

```sql
-- Users & Auth
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'lead', 'staff', 'user')),
    department_id UUID REFERENCES departments(id),
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    manager_id UUID REFERENCES users(id),
    parent_id UUID REFERENCES departments(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    department_id UUID REFERENCES departments(id),
    lead_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE team_members (
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (team_id, user_id)
);

-- Tickets
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL, -- AUTO: TKT-20240324-0001
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('submitted', 'triaged', 'pending', 'rejected', 'assigned', 'in_progress', 'blocked', 'resolved', 'reopened', 'approved', 'closed')),
    category VARCHAR(100), -- Technical, Administrative, Clinical, Other
    department_id UUID REFERENCES departments(id),
    created_by UUID REFERENCES users(id) NOT NULL,
    assigned_to UUID REFERENCES users(id),
    assigned_by UUID REFERENCES users(id),
    assigned_at TIMESTAMP,
    resolved_at TIMESTAMP,
    closed_at TIMESTAMP,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    rating_comment TEXT,
    sla_response_due_at TIMESTAMP, -- Auto-calculated: created_at + response SLA
    sla_resolve_due_at TIMESTAMP, -- Auto-calculated: created_at + resolve SLA
    sla_breached BOOLEAN DEFAULT false,
    sla_breach_type VARCHAR(20), -- 'response' or 'resolve'
    sla_breached_at TIMESTAMP,
    last_progress_update_at TIMESTAMP, -- For monitoring progress updates
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_number VARCHAR(50) UNIQUE NOT NULL, -- AUTO: TSK-20240324-0001
    title VARCHAR(500) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('created', 'assigned', 'claimed', 'team_assigned', 'in_progress', 'blocked', 'review', 'changes_requested', 'failed', 'completed', 'cancelled')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    deadline TIMESTAMP,
    estimated_hours DECIMAL(10, 2),
    actual_hours DECIMAL(10, 2),
    tags TEXT[], -- Array of tags
    created_by UUID REFERENCES users(id) NOT NULL,
    assigned_to UUID REFERENCES users(id),
    assigned_by UUID REFERENCES users(id),
    team_id UUID REFERENCES teams(id),
    parent_task_id UUID REFERENCES tasks(id), -- For subtasks
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Subtasks/Checklist
CREATE TABLE task_checklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    completed_by UUID REFERENCES users(id),
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Comments (for both tickets and tasks)
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('ticket', 'task')),
    entity_id UUID NOT NULL, -- ticket_id or task_id
    user_id UUID REFERENCES users(id) NOT NULL,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES comments(id), -- For threaded replies
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);

-- Attachments
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('ticket', 'task', 'comment')),
    entity_id UUID NOT NULL,
    file_name VARCHAR(500) NOT NULL,
    file_url VARCHAR(1000) NOT NULL,
    file_size BIGINT, -- in bytes
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_attachments_entity ON attachments(entity_type, entity_id);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- assignment, status_change, comment, mention, etc.
    title VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    entity_type VARCHAR(20), -- ticket, task
    entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- Activity Logs (Audit trail)
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(20) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL, -- created, updated, assigned, status_changed, etc.
    user_id UUID REFERENCES users(id),
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);

-- Working Hours Log
CREATE TABLE work_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) NOT NULL,
    hours DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_work_logs_task ON work_logs(task_id);
CREATE INDEX idx_work_logs_user_date ON work_logs(user_id, date);

-- FCM Tokens for Push Notifications
CREATE TABLE fcm_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    platform VARCHAR(20) CHECK (platform IN ('ios', 'android', 'web')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, token)
);
```

---

## 🚀 Deployment Checklist

### Pre-deployment:
- [ ] Environment variables configured (.env files)
- [ ] Database migrations run
- [ ] Elasticsearch indices created
- [ ] S3 buckets created and configured
- [ ] Redis configured and accessible
- [ ] Firebase project set up (for push notifications)
- [ ] SSL certificates obtained

### Web App:
- [ ] Build optimized production bundle (`npm run build`)
- [ ] Configure CDN for static assets
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure reverse proxy (Nginx/Apache)

### Mobile App:
- [ ] Configure iOS Push Notification certificates
- [ ] Set up Android Firebase Cloud Messaging
- [ ] Update app icons and splash screens
- [ ] Configure deep linking
- [ ] Test on physical devices
- [ ] Submit to App Store & Play Store

### Backend:
- [ ] Set up process manager (PM2, Docker)
- [ ] Configure load balancer
- [ ] Set up database backups
- [ ] Configure log aggregation
- [ ] Set up monitoring & alerts
- [ ] API rate limiting enabled
- [ ] Security headers configured

---

## 📊 Performance Optimization Tips

1. **Frontend**:
   - Lazy load routes with React.lazy()
   - Implement virtual scrolling for long lists
   - Use React.memo for expensive components
   - Optimize images (WebP format, lazy loading)
   - Code splitting by route

2. **Backend**:
   - Database indexing on frequently queried fields
   - Redis caching for read-heavy operations
   - Connection pooling for database
   - Pagination for list endpoints
   - Background jobs for heavy operations

3. **Mobile**:
   - Use FlatList instead of ScrollView for long lists
   - Optimize images with react-native-fast-image
   - Implement offline-first approach
   - Use Hermes engine for better performance
   - Minimize bridge communication

---

Bạn muốn tôi detail thêm phần nào không?
