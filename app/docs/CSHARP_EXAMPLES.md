# C# Backend Implementation Examples

## 🔧 Additional Code Examples for ASP.NET Core BFF

> **⚠️ Important Note**: Login/Messaging infrastructure (FCM + MQTT) đã có sẵn trong hệ thống. Các code examples dưới đây chỉ để **reference** nếu cần tích hợp hoặc customize. 
> 
> **Focus chính**: Workflow logic, business rules, SLA management, và task assignment strategies.

---

### MQTT Service for Chat/Messaging (Reference Only)

```csharp
// Services/Mqtt/MqttService.cs
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Extensions.ManagedClient;
using MQTTnet.Protocol;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;

namespace MedicalTaskManagement.Infrastructure.Services.Mqtt;

public class MqttSettings
{
    public string BrokerHost { get; set; } = "localhost";
    public int BrokerPort { get; set; } = 1883;
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public string ClientId { get; set; } = "medical-task-server";
}

public interface IMqttService
{
    Task PublishAsync(string topic, object payload);
    Task PublishMessageAsync(string ticketId, string userId, string message);
    Task PublishTypingIndicatorAsync(string ticketId, string userId, bool isTyping);
    Task PublishReadReceiptAsync(string ticketId, string userId, string messageId);
    Task SubscribeAsync(string topic);
    Task UnsubscribeAsync(string topic);
    bool IsConnected { get; }
}

public class MqttService : IMqttService, IHostedService
{
    private readonly IManagedMqttClient _mqttClient;
    private readonly MqttSettings _settings;
    private readonly ILogger<MqttService> _logger;
    private readonly IServiceProvider _serviceProvider;

    public MqttService(
        IOptions<MqttSettings> settings,
        ILogger<MqttService> logger,
        IServiceProvider serviceProvider)
    {
        _settings = settings.Value;
        _logger = logger;
        _serviceProvider = serviceProvider;

        var factory = new MqttFactory();
        _mqttClient = factory.CreateManagedMqttClient();

        // Setup message handler
        _mqttClient.ApplicationMessageReceivedAsync += HandleMessageReceivedAsync;
        _mqttClient.ConnectedAsync += HandleConnectedAsync;
        _mqttClient.DisconnectedAsync += HandleDisconnectedAsync;
    }

    public bool IsConnected => _mqttClient?.IsConnected ?? false;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var options = new ManagedMqttClientOptionsBuilder()
            .WithAutoReconnectDelay(TimeSpan.FromSeconds(5))
            .WithClientOptions(new MqttClientOptionsBuilder()
                .WithTcpServer(_settings.BrokerHost, _settings.BrokerPort)
                .WithCredentials(_settings.Username, _settings.Password)
                .WithClientId(_settings.ClientId)
                .WithCleanSession()
                .Build())
            .Build();

        await _mqttClient.StartAsync(options);
        _logger.LogInformation("MQTT Service started and connecting to broker at {Host}:{Port}", 
            _settings.BrokerHost, _settings.BrokerPort);

        // Subscribe to server topics
        await SubscribeToServerTopicsAsync();
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _mqttClient?.StopAsync();
        _logger.LogInformation("MQTT Service stopped");
    }

    private async Task SubscribeToServerTopicsAsync()
    {
        // Subscribe to all message topics for server-side processing
        await SubscribeAsync("medical-task/tickets/+/messages");
        await SubscribeAsync("medical-task/tasks/+/messages");
        await SubscribeAsync("medical-task/tickets/+/typing");
        await SubscribeAsync("medical-task/tickets/+/read-receipt");
        
        _logger.LogInformation("Subscribed to server MQTT topics");
    }

    public async Task PublishAsync(string topic, object payload)
    {
        var json = JsonSerializer.Serialize(payload, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        var message = new MqttApplicationMessageBuilder()
            .WithTopic(topic)
            .WithPayload(json)
            .WithQualityOfServiceLevel(MqttQualityOfServiceLevel.AtLeastOnce)
            .WithRetainFlag(false)
            .Build();

        await _mqttClient.EnqueueAsync(message);
        _logger.LogDebug("Published to MQTT topic: {Topic}", topic);
    }

    public async Task PublishMessageAsync(string ticketId, string userId, string message)
    {
        var topic = $"medical-task/tickets/{ticketId}/messages";
        var payload = new
        {
            MessageId = Guid.NewGuid().ToString(),
            TicketId = ticketId,
            UserId = userId,
            Message = message,
            Timestamp = DateTime.UtcNow,
            Type = "message"
        };

        await PublishAsync(topic, payload);
    }

    public async Task PublishTypingIndicatorAsync(string ticketId, string userId, bool isTyping)
    {
        var topic = $"medical-task/tickets/{ticketId}/typing";
        var payload = new
        {
            TicketId = ticketId,
            UserId = userId,
            IsTyping = isTyping,
            Timestamp = DateTime.UtcNow
        };

        await PublishAsync(topic, payload);
    }

    public async Task PublishReadReceiptAsync(string ticketId, string userId, string messageId)
    {
        var topic = $"medical-task/tickets/{ticketId}/read-receipt";
        var payload = new
        {
            TicketId = ticketId,
            UserId = userId,
            MessageId = messageId,
            ReadAt = DateTime.UtcNow
        };

        await PublishAsync(topic, payload);
    }

    public async Task SubscribeAsync(string topic)
    {
        await _mqttClient.SubscribeAsync(new MqttTopicFilterBuilder()
            .WithTopic(topic)
            .Build());
        
        _logger.LogInformation("Subscribed to MQTT topic: {Topic}", topic);
    }

    public async Task UnsubscribeAsync(string topic)
    {
        await _mqttClient.UnsubscribeAsync(topic);
        _logger.LogInformation("Unsubscribed from MQTT topic: {Topic}", topic);
    }

    private async Task HandleMessageReceivedAsync(MqttApplicationMessageReceivedEventArgs e)
    {
        var topic = e.ApplicationMessage.Topic;
        var payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
        
        _logger.LogDebug("Received MQTT message on topic: {Topic}", topic);

        try
        {
            // Process message in background using scoped service
            using var scope = _serviceProvider.CreateScope();
            var handler = scope.ServiceProvider.GetRequiredService<IMqttMessageHandler>();
            
            await handler.HandleMessageAsync(topic, payload);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling MQTT message from topic: {Topic}", topic);
        }
    }

    private Task HandleConnectedAsync(MqttClientConnectedEventArgs e)
    {
        _logger.LogInformation("Connected to MQTT broker");
        return Task.CompletedTask;
    }

    private Task HandleDisconnectedAsync(MqttClientDisconnectedEventArgs e)
    {
        _logger.LogWarning("Disconnected from MQTT broker: {Reason}", e.Reason);
        return Task.CompletedTask;
    }
}

// MQTT Message Handler
public interface IMqttMessageHandler
{
    Task HandleMessageAsync(string topic, string payload);
}

public class MqttMessageHandler : IMqttMessageHandler
{
    private readonly ICommentRepository _commentRepo;
    private readonly INotificationService _notificationService;
    private readonly ILogger<MqttMessageHandler> _logger;

    public MqttMessageHandler(
        ICommentRepository commentRepo,
        INotificationService notificationService,
        ILogger<MqttMessageHandler> logger)
    {
        _commentRepo = commentRepo;
        _notificationService = notificationService;
        _logger = logger;
    }

    public async Task HandleMessageAsync(string topic, string payload)
    {
        // Parse topic to determine entity type and ID
        // Format: medical-task/{entityType}/{entityId}/{action}
        var parts = topic.Split('/');
        
        if (parts.Length < 4) return;

        var entityType = parts[1]; // tickets or tasks
        var entityId = parts[2];
        var action = parts[3]; // messages, typing, read-receipt

        switch (action)
        {
            case "messages":
                await HandleChatMessageAsync(entityType, entityId, payload);
                break;
            case "typing":
                // Typing indicators are ephemeral, just broadcast via MQTT
                _logger.LogDebug("Typing indicator for {EntityType} {EntityId}", entityType, entityId);
                break;
            case "read-receipt":
                await HandleReadReceiptAsync(entityType, entityId, payload);
                break;
        }
    }

    private async Task HandleChatMessageAsync(string entityType, string entityId, string payload)
    {
        var message = JsonSerializer.Deserialize<ChatMessage>(payload);
        if (message == null) return;

        // Save message to database
        var comment = new Comment
        {
            EntityType = entityType == "tickets" ? "ticket" : "task",
            EntityId = Guid.Parse(entityId),
            UserId = Guid.Parse(message.UserId),
            Content = message.Message,
            CreatedAt = message.Timestamp
        };

        await _commentRepo.AddAsync(comment);
        await _commentRepo.SaveChangesAsync();

        _logger.LogInformation("Saved chat message for {EntityType} {EntityId}", entityType, entityId);

        // Send notification to other participants
        await _notificationService.NotifyNewMessageAsync(comment);
    }

    private async Task HandleReadReceiptAsync(string entityType, string entityId, string payload)
    {
        var receipt = JsonSerializer.Deserialize<ReadReceipt>(payload);
        if (receipt == null) return;

        // Update read status in database
        await _commentRepo.MarkAsReadAsync(
            Guid.Parse(receipt.MessageId), 
            Guid.Parse(receipt.UserId), 
            receipt.ReadAt);

        _logger.LogDebug("Updated read receipt for message {MessageId}", receipt.MessageId);
    }

    private class ChatMessage
    {
        public string MessageId { get; set; } = "";
        public string TicketId { get; set; } = "";
        public string UserId { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime Timestamp { get; set; }
    }

    private class ReadReceipt
    {
        public string MessageId { get; set; } = "";
        public string UserId { get; set; } = "";
        public DateTime ReadAt { get; set; }
    }
}
```

---

### SignalR Hub (Real-time Communication)

```csharp
// Hubs/NotificationHub.cs
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace MedicalTaskManagement.Api.Hubs;

[Authorize]
public class NotificationHub : Hub
{
    private readonly ILogger<NotificationHub> _logger;

    public NotificationHub(ILogger<NotificationHub> logger)
    {
        _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        _logger.LogInformation("User {UserId} connected to SignalR Hub", userId);
        
        // Join user to their personal group
        await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId}");
        
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.UserIdentifier;
        _logger.LogInformation("User {UserId} disconnected from SignalR Hub", userId);
        
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user_{userId}");
        
        await base.OnDisconnectedAsync(exception);
    }

    public async Task JoinTicketRoom(string ticketId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"ticket_{ticketId}");
        _logger.LogInformation("User joined ticket room: {TicketId}", ticketId);
    }

    public async Task LeaveTicketRoom(string ticketId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"ticket_{ticketId}");
        _logger.LogInformation("User left ticket room: {TicketId}", ticketId);
    }

    public async Task SendMessage(string ticketId, string message)
    {
        // Broadcast message to all users in the ticket room
        await Clients.Group($"ticket_{ticketId}").SendAsync("ReceiveMessage", new
        {
            UserId = Context.UserIdentifier,
            Message = message,
            Timestamp = DateTime.UtcNow
        });
    }
}

// Notification Service using SignalR
public interface ISignalRNotificationService
{
    Task SendTicketUpdated(Guid ticketId, object ticket);
    Task SendTaskUpdated(Guid taskId, object task);
    Task SendNewAssignment(Guid userId, object assignment);
    Task SendNewMessage(Guid userId, object message);
}

public class SignalRNotificationService : ISignalRNotificationService
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public SignalRNotificationService(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendTicketUpdated(Guid ticketId, object ticket)
    {
        await _hubContext.Clients.Group($"ticket_{ticketId}")
            .SendAsync("ticket:updated", new
            {
                TicketId = ticketId,
                Ticket = ticket,
                Timestamp = DateTime.UtcNow
            });
    }

    public async Task SendTaskUpdated(Guid taskId, object task)
    {
        await _hubContext.Clients.Group($"task_{taskId}")
            .SendAsync("task:updated", new
            {
                TaskId = taskId,
                Task = task,
                Timestamp = DateTime.UtcNow
            });
    }

    public async Task SendNewAssignment(Guid userId, object assignment)
    {
        await _hubContext.Clients.Group($"user_{userId}")
            .SendAsync("assignment:new", assignment);
    }

    public async Task SendNewMessage(Guid userId, object message)
    {
        await _hubContext.Clients.Group($"user_{userId}")
            .SendAsync("message:new", message);
    }
}
```

---

### Program.cs Configuration

```csharp
// Program.cs
using MedicalTaskManagement.Api.Hubs;
using MedicalTaskManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Hangfire;
using Hangfire.PostgreSql;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .WriteTo.Seq(builder.Configuration["Seq:ServerUrl"] ?? "http://localhost:5341")
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Redis Cache
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:ConnectionString"];
    options.InstanceName = "MedicalTask_";
});

// Authentication with JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]!))
        };

        // Configure JWT authentication for SignalR
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();

// SignalR for Notifications
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
    options.KeepAliveInterval = TimeSpan.FromSeconds(15);
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
});

// MQTT for Chat/Messaging
builder.Services.Configure<MqttSettings>(builder.Configuration.GetSection("Mqtt"));
builder.Services.AddSingleton<IMqttService, MqttService>();
builder.Services.AddScoped<IMqttMessageHandler, MqttMessageHandler>();
builder.Services.AddHostedService(provider => 
    (MqttService)provider.GetRequiredService<IMqttService>());

// Hangfire for background jobs
builder.Services.AddHangfire(config =>
    config.UsePostgreSqlStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWebApp", policy =>
    {
        policy.WithOrigins(
                builder.Configuration["Cors:WebAppUrl"] ?? "http://localhost:3000",
                builder.Configuration["Cors:AdminUrl"] ?? "http://localhost:3001"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials(); // Required for SignalR
    });
});

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Application Services
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISlaMonitorService, SlaMonitorService>();
builder.Services.AddSingleton<ISignalRNotificationService, SignalRNotificationService>();

// Repositories
builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

// Infrastructure Services
builder.Services.AddScoped<IElasticsearchService, ElasticsearchService>();
builder.Services.AddScoped<IRedisCache Service, RedisCacheService>();
builder.Services.AddScoped<IFileStorageService, S3FileStorageService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IFirebasePushService, FirebasePushNotificationService>();

// Health Checks
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!)
    .AddRedis(builder.Configuration["Redis:ConnectionString"]!);

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowWebApp");

app.UseSerilogRequestLogging();

app.UseAuthentication();
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Map SignalR Hub
app.MapHub<NotificationHub>("/hubs/notifications");

// Hangfire Dashboard
app.MapHangfireDashboard("/hangfire", new DashboardOptions
{
    Authorization = new[] { new HangfireAuthorizationFilter() }
});

// Health checks endpoint
app.MapHealthChecks("/health");

// Run database migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.Run();
```

---

### Entity Configuration Example

```csharp
// Infrastructure/Data/Configurations/TicketConfiguration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MedicalTaskManagement.Domain.Entities;

namespace MedicalTaskManagement.Infrastructure.Data.Configurations;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.ToTable("tickets");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.TicketNumber)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(t => t.TicketNumber)
            .IsUnique();

        builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(t => t.Description)
            .IsRequired();

        builder.Property(t => t.Priority)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(t => t.Status)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(t => t.Category)
            .HasMaxLength(100);

        // Relationships
        builder.HasOne(t => t.CreatedByUser)
            .WithMany()
            .HasForeignKey(t => t.CreatedBy)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.AssignedToUser)
            .WithMany()
            .HasForeignKey(t => t.AssignedTo)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(t => t.Department)
            .WithMany()
            .HasForeignKey(t => t.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes for performance
        builder.HasIndex(t => t.Status);
        builder.HasIndex(t => t.Priority);
        builder.HasIndex(t => t.CreatedAt);
        builder.HasIndex(t => t.AssignedTo);
        builder.HasIndex(t => new { t.Status, t.Priority });
        builder.HasIndex(t => t.SlaBreached);
    }
}
```

---

### Repository Pattern Example

```csharp
// Infrastructure/Repositories/TicketRepository.cs
using Microsoft.EntityFrameworkCore;
using MedicalTaskManagement.Domain.Entities;
using MedicalTaskManagement.Domain.Interfaces;
using MedicalTaskManagement.Domain.Enums;
using MedicalTaskManagement.Infrastructure.Data;

namespace MedicalTaskManagement.Infrastructure.Repositories;

public class TicketRepository : ITicketRepository
{
    private readonly ApplicationDbContext _context;

    public TicketRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Ticket?> GetByIdAsync(Guid id)
    {
        return await _context.Tickets
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Ticket?> GetByIdWithRelationsAsync(Guid id)
    {
        return await _context.Tickets
            .Include(t => t.CreatedByUser)
            .Include(t => t.AssignedToUser)
            .Include(t => t.Department)
            .Include(t => t.Comments)
            .Include(t => t.Attachments)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<PagedResult<Ticket>> GetPagedAsync(
        TicketStatus? status,
        Priority? priority,
        Guid? departmentId,
        int page,
        int pageSize)
    {
        var query = _context.Tickets
            .Include(t => t.CreatedByUser)
            .Include(t => t.AssignedToUser)
            .AsQueryable();

        if (status.HasValue)
            query = query.Where(t => t.Status == status.Value);

        if (priority.HasValue)
            query = query.Where(t => t.Priority == priority.Value);

        if (departmentId.HasValue)
            query = query.Where(t => t.DepartmentId == departmentId.Value);

        var total = await query.CountAsync();
        
        var items = await query
            .OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Ticket>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(total / (double)pageSize)
        };
    }

    public async Task<Ticket> AddAsync(Ticket ticket)
    {
        await _context.Tickets.AddAsync(ticket);
        return ticket;
    }

    public async Task UpdateAsync(Ticket ticket)
    {
        _context.Tickets.Update(ticket);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<int> GetCountTodayAsync()
    {
        var today = DateTime.UtcNow.Date;
        return await _context.Tickets
            .Where(t => t.CreatedAt.Date == today)
            .CountAsync();
    }

    public async Task<List<Ticket>> GetSlaBreachedTicketsAsync()
    {
        var now = DateTime.UtcNow;
        
        return await _context.Tickets
            .Where(t => 
                (t.Status == TicketStatus.Submitted && t.SlaResponseDueAt < now) ||
                (t.Status == TicketStatus.InProgress && t.SlaResolveDueAt < now))
            .Include(t => t.AssignedToUser)
            .Include(t => t.Department)
            .ToListAsync();
    }
}
```

---

### Hangfire Background Job Example

```csharp
// Infrastructure/BackgroundJobs/SlaMonitorJob.cs
using Hangfire;
using MedicalTaskManagement.Application.Services.Sla;
using Microsoft.Extensions.Logging;

namespace MedicalTaskManagement.Infrastructure.BackgroundJobs;

public class SlaMonitorJob
{
    private readonly ISlaMonitorService _slaMonitorService;
    private readonly ILogger<SlaMonitorJob> _logger;

    public SlaMonitorJob(ISlaMonitorService slaMonitorService, ILogger<SlaMonitorJob> logger)
    {
        _slaMonitorService = slaMonitorService;
        _logger = logger;
    }

    [AutomaticRetry(Attempts = 3)]
    public async Task CheckSlaBreachesAsync()
    {
        _logger.LogInformation("Starting SLA breach check at {Time}", DateTime.UtcNow);

        try
        {
            await _slaMonitorService.CheckResponseSLAAsync();
            await _slaMonitorService.CheckResolveSLAAsync();
            await _slaMonitorService.CheckBlockedTicketsAsync();
            await _slaMonitorService.CheckProgressUpdatesAsync();

            _logger.LogInformation("SLA breach check completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during SLA breach check");
            throw;
        }
    }

    public static void ConfigureRecurringJobs()
    {
        // Run SLA check every minute
        RecurringJob.AddOrUpdate<SlaMonitorJob>(
            "sla-monitor",
            job => job.CheckSlaBreachesAsync(),
            Cron.Minutely);

        // Email digest every hour
        RecurringJob.AddOrUpdate<EmailNotificationJob>(
            "email-digest",
            job => job.SendDigestEmailsAsync(),
            Cron.Hourly);

        // Generate daily reports at 8 AM
        RecurringJob.AddOrUpdate<ReportGenerationJob>(
            "daily-report",
            job => job.GenerateDailyReportAsync(),
            Cron.Daily(8));
    }
}
```

---

### React SignalR Hook (Frontend)

```typescript
// hooks/useSignalR.ts
import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuthStore } from '../store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useSignalR = () => {
  const { token, user } = useAuthStore();
  const queryClient = useQueryClient();
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!token) return;

    // Create SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/hubs/notifications`, {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          // Exponential backoff: 0, 2, 10, 30 seconds
          return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000);
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Event handlers
    connection.on('ticket:updated', (data) => {
      console.log('Ticket updated:', data);
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.setQueryData(['ticket', data.ticketId], data.ticket);
      toast.info(`Ticket #${data.ticket.ticketNumber} updated`);
    });

    connection.on('task:updated', (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['task', data.taskId], data.task);
    });

    connection.on('assignment:new', (data) => {
      toast.info(`New ${data.type} assigned to you!`, {
        autoClose: 5000,
      });
      queryClient.invalidateQueries({ 
        queryKey: [data.type === 'ticket' ? 'tickets' : 'tasks'] 
      });
    });

    connection.on('message:new', (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['comments', data.entityType, data.entityId] 
      });
      
      if (data.sender.id !== user?.id) {
        toast.info(`New message from ${data.sender.fullName}`);
      }
    });

    connection.on('sla:warning', (data) => {
      toast.warning(
        `SLA Warning: ${data.message}`,
        { autoClose: 10000 }
      );
    });

    connection.on('sla:breach', (data) => {
      toast.error(
        `SLA BREACH: ${data.message}`,
        { autoClose: false }
      );
    });

    // Connection lifecycle hooks
    connection.onreconnecting((error) => {
      console.warn('SignalR reconnecting...', error);
      toast.info('Connection lost. Reconnecting...');
    });

    connection.onreconnected((connectionId) => {
      console.log('SignalR reconnected:', connectionId);
      toast.success('Connected!');
    });

    connection.onclose((error) => {
      console.error('SignalR connection closed:', error);
    });

    // Start connection
    connection
      .start()
      .then(() => {
        console.log('SignalR connected');
        connectionRef.current = connection;
      })
      .catch((err) => {
        console.error('SignalR connection error:', err);
        toast.error('Failed to connect to real-time service');
      });

    // Cleanup
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
    };
  }, [token, user?.id, queryClient]);

  // Expose connection for manual operations
  return {
    connection: connectionRef.current,
    joinTicketRoom: (ticketId: string) => {
      connectionRef.current?.invoke('JoinTicketRoom', ticketId);
    },
    leaveTicketRoom: (ticketId: string) => {
      connectionRef.current?.invoke('LeaveTicketRoom', ticketId);
    },
    sendMessage: (ticketId: string, message: string) => {
      connectionRef.current?.invoke('SendMessage', ticketId, message);
    },
  };
};
```

---

## 🚀 Deployment Configuration

### appsettings.Production.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=your-db-server;Database=medical_task_prod;Username=dbuser;Password=your-password;SSL Mode=Require"
  },
  "Redis": {
    "ConnectionString": "your-redis-server:6379,password=your-redis-password,ssl=true"
  },
  "Jwt": {
    "SecretKey": "your-super-secret-key-at-least-32-chars-long",
    "Issuer": "https://api.yourdomain.com",
    "Audience": "https://app.yourdomain.com",
    "ExpirationMinutes": 60,
    "RefreshTokenExpirationDays": 7
  },
  "Cors": {
    "WebAppUrl": "https://app.yourdomain.com",
    "AdminUrl": "https://admin.yourdomain.com"
  },
  "AWS": {
    "Region": "ap-southeast-1",
    "BucketName": "medical-task-files-prod",
    "AccessKey": "your-access-key",
    "SecretKey": "your-secret-key"
  },
  "Firebase": {
    "ProjectId": "your-firebase-project",
    "Credential": "path/to/firebase-admin-sdk.json"
  },
  "Mqtt": {
    "BrokerHost": "mqtt.yourdomain.com",
    "BrokerPort": 1883,
    "Username": "medical-task-mqtt",
    "Password": "your-mqtt-password",
    "ClientId": "medical-task-server-prod"
  },
  "Elasticsearch": {
    "Uri": "https://your-elasticsearch-server:9200",
    "Username": "elastic",
    "Password": "your-elastic-password"
  },
  "Seq": {
    "ServerUrl": "https://your-seq-server",
    "ApiKey": "your-seq-api-key"
  },
  "Sla": {
    "Critical": {
      "ResponseMinutes": 5,
      "ResolveMinutes": 120,
      "AlertMethods": "sms,email,push"
    },
    "High": {
      "ResponseMinutes": 30,
      "ResolveMinutes": 240,
      "AlertMethods": "email,push"
    },
    "Medium": {
      "ResponseMinutes": 120,
      "ResolveMinutes": 1440,
      "AlertMethods": "push"
    },
    "Low": {
      "ResponseMinutes": 480,
      "ResolveMinutes": 4320,
      "AlertMethods": "email"
    },
    "AutoReassignEnabled": false,
    "AlertDirectorOnCriticalBreach": true
  }
}
```

---

### React MQTT Hook for Chat (Frontend)

```typescript
// hooks/useMqtt.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { useAuthStore } from '../store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface ChatMessage {
  messageId: string;
  ticketId: string;
  userId: string;
  message: string;
  timestamp: string;
  type: string;
  user?: {
    id: string;
    fullName: string;
    avatar?: string;
  };
}

interface TypingIndicator {
  ticketId: string;
  userId: string;
  isTyping: boolean;
  timestamp: string;
}

export const useMqtt = () => {
  const { token, user } = useAuthStore();
  const queryClient = useQueryClient();
  const clientRef = useRef<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!token || !user) return;

    // MQTT Broker URL - can be WebSocket or TCP
    const brokerUrl = import.meta.env.VITE_MQTT_BROKER_URL || 'ws://localhost:8083/mqtt';
    
    // Create MQTT client
    const client = mqtt.connect(brokerUrl, {
      clientId: `medical-task-web-${user.id}-${Date.now()}`,
      username: user.email,
      password: token, // Use JWT token as password for authentication
      clean: true,
      reconnectPeriod: 5000,
      connectTimeout: 30000,
    });

    // Connection event handlers
    client.on('connect', () => {
      console.log('MQTT Connected');
      setIsConnected(true);
      toast.success('Chat connected', { autoClose: 2000 });
    });

    client.on('error', (error) => {
      console.error('MQTT Error:', error);
      toast.error('Chat connection error');
    });

    client.on('reconnect', () => {
      console.log('MQTT Reconnecting...');
      toast.info('Reconnecting to chat...', { autoClose: 2000 });
    });

    client.on('disconnect', () => {
      console.log('MQTT Disconnected');
      setIsConnected(false);
    });

    client.on('offline', () => {
      console.log('MQTT Offline');
      setIsConnected(false);
    });

    // Message handler
    client.on('message', (topic, payload) => {
      try {
        const message = JSON.parse(payload.toString());
        handleMessage(topic, message);
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
      }
    });

    clientRef.current = client;

    // Cleanup
    return () => {
      if (clientRef.current) {
        clientRef.current.end();
        clientRef.current = null;
      }
    };
  }, [token, user?.id]);

  const handleMessage = useCallback((topic: string, message: any) => {
    const topicParts = topic.split('/');
    const action = topicParts[topicParts.length - 1];

    switch (action) {
      case 'messages':
        handleChatMessage(message as ChatMessage);
        break;
      case 'typing':
        handleTypingIndicator(message as TypingIndicator);
        break;
      case 'read-receipt':
        handleReadReceipt(message);
        break;
    }
  }, [queryClient, user?.id]);

  const handleChatMessage = useCallback((message: ChatMessage) => {
    // Update React Query cache for comments
    queryClient.invalidateQueries({ 
      queryKey: ['comments', 'ticket', message.ticketId] 
    });

    // Show notification if message is from another user
    if (message.userId !== user?.id) {
      toast.info(`New message in ticket ${message.ticketId}`, {
        autoClose: 3000,
      });
    }
  }, [queryClient, user?.id]);

  const handleTypingIndicator = useCallback((indicator: TypingIndicator) => {
    // Update typing state in a separate query or local state
    queryClient.setQueryData(
      ['typing', indicator.ticketId],
      (old: TypingIndicator[] = []) => {
        if (indicator.isTyping) {
          return [...old.filter(t => t.userId !== indicator.userId), indicator];
        } else {
          return old.filter(t => t.userId !== indicator.userId);
        }
      }
    );
  }, [queryClient]);

  const handleReadReceipt = useCallback((receipt: any) => {
    // Update read status in cache
    queryClient.invalidateQueries({ 
      queryKey: ['read-receipts', receipt.ticketId] 
    });
  }, [queryClient]);

  // Subscribe to a ticket's chat
  const subscribeToTicket = useCallback((ticketId: string) => {
    if (!clientRef.current || !isConnected) return;

    const topics = [
      `medical-task/tickets/${ticketId}/messages`,
      `medical-task/tickets/${ticketId}/typing`,
      `medical-task/tickets/${ticketId}/read-receipt`,
    ];

    topics.forEach(topic => {
      clientRef.current?.subscribe(topic, { qos: 1 }, (err) => {
        if (err) {
          console.error(`Failed to subscribe to ${topic}:`, err);
        } else {
          console.log(`Subscribed to ${topic}`);
          setSubscribedTopics(prev => new Set(prev).add(topic));
        }
      });
    });
  }, [isConnected]);

  // Unsubscribe from a ticket's chat
  const unsubscribeFromTicket = useCallback((ticketId: string) => {
    if (!clientRef.current) return;

    const topics = [
      `medical-task/tickets/${ticketId}/messages`,
      `medical-task/tickets/${ticketId}/typing`,
      `medical-task/tickets/${ticketId}/read-receipt`,
    ];

    topics.forEach(topic => {
      clientRef.current?.unsubscribe(topic, {}, (err) => {
        if (err) {
          console.error(`Failed to unsubscribe from ${topic}:`, err);
        } else {
          console.log(`Unsubscribed from ${topic}`);
          setSubscribedTopics(prev => {
            const newSet = new Set(prev);
            newSet.delete(topic);
            return newSet;
          });
        }
      });
    });
  }, []);

  // Send a chat message
  const sendMessage = useCallback((ticketId: string, message: string) => {
    if (!clientRef.current || !isConnected || !user) return;

    const topic = `medical-task/tickets/${ticketId}/messages`;
    const payload = {
      messageId: `${Date.now()}-${user.id}`,
      ticketId,
      userId: user.id,
      message,
      timestamp: new Date().toISOString(),
      type: 'message',
    };

    clientRef.current.publish(
      topic,
      JSON.stringify(payload),
      { qos: 1, retain: false },
      (err) => {
        if (err) {
          console.error('Failed to send message:', err);
          toast.error('Failed to send message');
        }
      }
    );
  }, [isConnected, user]);

  // Send typing indicator
  const sendTyping = useCallback((ticketId: string, isTyping: boolean) => {
    if (!clientRef.current || !isConnected || !user) return;

    const topic = `medical-task/tickets/${ticketId}/typing`;
    const payload = {
      ticketId,
      userId: user.id,
      isTyping,
      timestamp: new Date().toISOString(),
    };

    clientRef.current.publish(
      topic,
      JSON.stringify(payload),
      { qos: 0, retain: false } // QoS 0 for ephemeral data
    );
  }, [isConnected, user]);

  // Send read receipt
  const sendReadReceipt = useCallback((ticketId: string, messageId: string) => {
    if (!clientRef.current || !isConnected || !user) return;

    const topic = `medical-task/tickets/${ticketId}/read-receipt`;
    const payload = {
      ticketId,
      userId: user.id,
      messageId,
      readAt: new Date().toISOString(),
    };

    clientRef.current.publish(
      topic,
      JSON.stringify(payload),
      { qos: 1, retain: false }
    );
  }, [isConnected, user]);

  return {
    isConnected,
    subscribedTopics: Array.from(subscribedTopics),
    subscribeToTicket,
    unsubscribeFromTicket,
    sendMessage,
    sendTyping,
    sendReadReceipt,
  };
};

// Usage Example Component
export const TicketChat: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const mqtt = useMqtt();
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Subscribe when component mounts
    mqtt.subscribeToTicket(ticketId);

    // Unsubscribe when component unmounts
    return () => {
      mqtt.unsubscribeFromTicket(ticketId);
    };
  }, [ticketId, mqtt]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    // Send typing indicator
    if (!isTyping) {
      setIsTyping(true);
      mqtt.sendTyping(ticketId, true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      mqtt.sendTyping(ticketId, false);
    }, 2000);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    mqtt.sendMessage(ticketId, message);
    setMessage('');
    
    // Stop typing indicator
    if (isTyping) {
      setIsTyping(false);
      mqtt.sendTyping(ticketId, false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {/* Messages list here */}
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={handleMessageChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          disabled={!mqtt.isConnected}
        />
        <button onClick={handleSend} disabled={!mqtt.isConnected}>
          Send
        </button>
      </div>
      {!mqtt.isConnected && (
        <div className="connection-status">Connecting to chat...</div>
      )}
    </div>
  );
};
```

---

**Last Updated**: March 24, 2026
**Version**: 1.0.0
