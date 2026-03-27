# Environment Variables Configuration

## 📋 Web App (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=http://localhost:3000
VITE_MQTT_BROKER_URL=ws://localhost:8083/mqtt

# App Configuration
VITE_APP_NAME=Medical Task Management
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_ANALYTICS=true

# AWS S3 (for file uploads from client)
VITE_AWS_REGION=ap-southeast-1
VITE_AWS_BUCKET=medical-task-files

# Sentry (Error tracking)
VITE_SENTRY_DSN=https://your-sentry-dsn.ingest.sentry.io/project-id

# Google Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

---

## 📱 Mobile App (.env)

```env
# API Configuration
API_URL=https://api.yourdomain.com/api
WS_URL=wss://api.yourdomain.com

# Firebase Configuration (Android)
ANDROID_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ANDROID_FIREBASE_PROJECT_ID=your-project-id
ANDROID_FIREBASE_MESSAGING_SENDER_ID=123456789012
ANDROID_FIREBASE_APP_ID=1:123456789012:android:abcdef1234567890

# Firebase Configuration (iOS)
IOS_FIREBASE_API_KEY=AIzaSyYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
IOS_FIREBASE_PROJECT_ID=your-project-id
IOS_FIREBASE_MESSAGING_SENDER_ID=123456789012
IOS_FIREBASE_APP_ID=1:123456789012:ios:1234567890abcdef

# App Configuration
APP_NAME=Medical Task
APP_VERSION=1.0.0
APP_BUILD_NUMBER=1

# Feature Flags
ENABLE_BIOMETRIC_LOGIN=true
ENABLE_OFFLINE_MODE=true
ENABLE_VOICE_NOTES=true

# Sentry
SENTRY_DSN=https://your-sentry-dsn.ingest.sentry.io/project-id
```

---

## 🖥️ Backend API (.env)

```env
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=medical_task_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_secure_password
DATABASE_SSL=true
DATABASE_POOL_SIZE=10

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_DB=0
REDIS_TTL=3600

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=7d

# AWS S3 Configuration
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_BUCKET_NAME=medical-task-files
AWS_CLOUDFRONT_URL=https://dxxxxxxxxx.cloudfront.net

# Elasticsearch Configuration
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your_elastic_password

# Email Configuration (NodeMailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM="Medical Task System <noreply@yourdomain.com>"

# ============================================
# FCM + MQTT Configuration (Reference Only)
# ⚠️ Note: Login/Messaging infrastructure đã có sẵn
# Các config dưới đây chỉ để reference
# ============================================

# Firebase Admin SDK (for push notifications)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# MQTT Configuration (for Chat/Messaging)
MQTT_BROKER_HOST=localhost
MQTT_BROKER_PORT=1883
MQTT_USERNAME=medical-task-mqtt
MQTT_PASSWORD=your-mqtt-password
MQTT_CLIENT_ID=medical-task-server
MQTT_USE_TLS=false  # Set to true in production
MQTT_TLS_CERT_PATH=/path/to/cert.pem  # If using TLS

# SMS Configuration (Optional - Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Application URLs
WEB_APP_URL=https://app.yourdomain.com
MOBILE_DEEP_LINK_URL=medicalapp://

# CORS Configuration
CORS_ORIGIN=https://app.yourdomain.com,https://admin.yourdomain.com
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document

# SLA Configuration (in minutes)
SLA_CRITICAL_RESPONSE=5
SLA_CRITICAL_RESOLVE=120
SLA_HIGH_RESPONSE=30
SLA_HIGH_RESOLVE=240
SLA_MEDIUM_RESPONSE=120
SLA_MEDIUM_RESOLVE=1440
SLA_LOW_RESPONSE=480
SLA_LOW_RESOLVE=4320

# SLA Warning Thresholds (percentage of time remaining)
SLA_WARNING_THRESHOLD=50  # Yellow warning
SLA_DANGER_THRESHOLD=20   # Orange danger

# Auto-Escalation Settings
SLA_AUTO_ESCALATE_ENABLED=true
SLA_AUTO_REASSIGN_ENABLED=false  # NEVER auto reassign - always require Manager approval
SLA_SUGGEST_REASSIGNMENT=true    # Suggest candidates but require manual approval
SLA_ALERT_DIRECTOR_ON_CRITICAL_BREACH=true
SLA_REQUIRE_MANAGER_APPROVAL_FOR_ALL_REASSIGN=true  # All priorities require approval

# Escalation Notification Settings
SLA_CRITICAL_ALERT_METHOD=sms,email,push  # Multiple channels for critical
SLA_HIGH_ALERT_METHOD=email,push
SLA_MEDIUM_ALERT_METHOD=push
SLA_LOW_ALERT_METHOD=email

# Blocked Ticket Escalation (in hours)
SLA_BLOCKED_CRITICAL_THRESHOLD=2
SLA_BLOCKED_HIGH_THRESHOLD=8
SLA_BLOCKED_MEDIUM_THRESHOLD=24

# Progress Update Requirements (in hours)
SLA_PROGRESS_UPDATE_REQUIRED=4
SLA_NO_RESPONSE_ALERT=8

# Background Jobs
QUEUE_REDIS_HOST=localhost
QUEUE_REDIS_PORT=6379
QUEUE_REDIS_PASSWORD=your_redis_password

# Monitoring & Logging
SENTRY_DSN=https://your-sentry-dsn.ingest.sentry.io/project-id
SENTRY_ENVIRONMENT=production
LOG_LEVEL=info

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
MIXPANEL_TOKEN=your_mixpanel_token

# Webhook Configuration (for integrations)
WEBHOOK_SECRET=your-webhook-secret-key

# API Documentation
SWAGGER_ENABLED=true
SWAGGER_PATH=/api/docs
```

---

## 🔒 Security Best Practices

### Never commit these files to Git!

Add to `.gitignore`:
```
.env
.env.local
.env.development
.env.production
.env.test

# Mobile specific
android/app/google-services.json
ios/GoogleService-Info.plist
```

### Use separate environments:

1. **Development** (`.env.development`)
   - Local database
   - Local Redis
   - Debug mode enabled
   - Detailed logging

2. **Staging** (`.env.staging`)
   - Staging database
   - Test payment gateways
   - Full logging

3. **Production** (`.env.production`)
   - Production database
   - Real payment gateways
   - Error logging only
   - All security measures enabled

---

## 🚀 Environment-specific Configuration

### Development
```env
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug
DATABASE_SSL=false
RATE_LIMIT_ENABLED=false
```

### Staging
```env
NODE_ENV=staging
DEBUG=false
LOG_LEVEL=info
DATABASE_SSL=true
RATE_LIMIT_ENABLED=true
```

### Production
```env
NODE_ENV=production
DEBUG=false
LOG_LEVEL=error
DATABASE_SSL=true
RATE_LIMIT_ENABLED=true
FORCE_HTTPS=true
```

---

## 📝 Notes

1. **JWT_SECRET**: Generate using `openssl rand -base64 64`
2. **Database Password**: Use strong passwords (min 16 characters)
3. **AWS Keys**: Use IAM roles in production instead of access keys
4. **Firebase Private Key**: Keep the `\n` characters in the string
5. **CORS_ORIGIN**: Comma-separated list of allowed origins
6. **File Size**: Adjust based on your medical documents requirements
7. **SLA Times**: Adjust based on your hospital's service agreements

---

## 🔄 Migration from Development to Production

### Checklist:
- [ ] Update all URLs to production domains
- [ ] Use production database
- [ ] Enable SSL/TLS for all connections
- [ ] Configure production Firebase project
- [ ] Set up production AWS S3 bucket
- [ ] Configure production SMTP server
- [ ] Enable rate limiting
- [ ] Set up monitoring (Sentry)
- [ ] Configure backup strategies
- [ ] Test all integrations
- [ ] Update CORS origins
- [ ] Verify webhook endpoints

---

## 🛠️ Tools for Managing Secrets

### Recommended:
1. **Docker Secrets** (if using Docker)
2. **AWS Secrets Manager** (for AWS deployments)
3. **Azure Key Vault** (for Azure deployments)
4. **HashiCorp Vault** (self-hosted)
5. **Doppler** (SaaS solution)

### Example with Docker Compose:
```yaml
version: '3.8'
services:
  backend:
    image: medical-task-backend:latest
    env_file:
      - .env.production
    secrets:
      - database_password
      - jwt_secret
      
secrets:
  database_password:
    external: true
  jwt_secret:
    external: true
```

---

## � MQTT Broker Options

### Recommended MQTT Brokers:

#### 1. **EMQX (Recommended for Production)**
```bash
# Docker deployment
docker run -d --name emqx \
  -p 1883:1883 \
  -p 8083:8083 \
  -p 8084:8084 \
  -p 8883:8883 \
  -p 18083:18083 \
  -e EMQX_ALLOW_ANONYMOUS=false \
  -e EMQX_LOADED_PLUGINS="emqx_auth_username" \
  emqx/emqx:latest

# Dashboard: http://localhost:18083
# Default credentials: admin / public
```

**Features:**
- High performance (millions of connections)
- Built-in authentication & ACL
- Dashboard for monitoring
- REST API for management
- Clustering support

**Production Configuration:**
```yaml
# emqx.conf
listener.tcp.external = 0.0.0.0:1883
listener.ws.external = 0.0.0.0:8083
listener.wss.external = 0.0.0.0:8084

## Enable authentication
auth.user.1.username = medical-task-server
auth.user.1.password = your-secure-password

## Enable ACL
acl_nomatch = deny
```

#### 2. **Mosquitto (Lightweight)**
```bash
# Docker deployment
docker run -d --name mosquitto \
  -p 1883:1883 \
  -p 9001:9001 \
  -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf \
  eclipse-mosquitto:latest
```

**mosquitto.conf:**
```conf
listener 1883
protocol mqtt

listener 9001
protocol websockets

allow_anonymous false
password_file /mosquitto/config/passwd
```

**Create password file:**
```bash
docker exec mosquitto mosquitto_passwd -c /mosquitto/config/passwd medical-task-server
```

#### 3. **HiveMQ (Enterprise)**
- Cloud-hosted option
- Advanced features & support
- Best for large-scale deployments

### MQTT Topic Structure:

```
medical-task/
├── tickets/
│   ├── {ticketId}/
│   │   ├── messages        # Chat messages
│   │   ├── typing          # Typing indicators
│   │   └── read-receipt    # Read receipts
│   └── +/messages          # Wildcard for all tickets
│
└── tasks/
    └── {taskId}/
        ├── messages
        ├── typing
        └── read-receipt
```

### Security Best Practices:

1. **Always use authentication** in production
2. **Enable TLS/SSL** for encrypted communication:
   ```
   MQTT_USE_TLS=true
   MQTT_BROKER_PORT=8883  # SSL port
   ```
3. **Configure ACL** (Access Control Lists) to restrict topic access
4. **Use strong passwords** for MQTT users
5. **Rate limiting** to prevent abuse

### Mobile App Configuration:

For React Native, use `react-native-mqtt` or `mqtt` with WebSocket:

```env
# .env for mobile
MQTT_BROKER_URL=wss://mqtt.yourdomain.com:8084/mqtt
MQTT_USERNAME=medical-task-mobile
MQTT_PASSWORD=your-mobile-password
```

---

## �📞 Support

For environment setup issues, contact your DevOps team or refer to:
- Backend README
- Infrastructure documentation
- Deployment guide
