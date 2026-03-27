# Feature Spec: Task Pool (Self-Pick)

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: TASK-POOL-004  
**Priority**: High  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Task Pool là marketplace cho tasks, cho phép staff tự chọn công việc phù hợp với skills và capacity của họ. Tăng autonomy và job satisfaction.

**Key Capabilities:**
- Browse available tasks with rich filtering
- Skill-based matching & recommendations
- Claim tasks directly
- Capacity validation
- Auto-escalation for unclaimed tasks
- Pool analytics

---

## 👤 User Stories

### US-POOL-001: Browse Task Pool
**As a** Staff  
**I want to** xem all available tasks trong pool  
**So that** tôi chọn công việc phù hợp

**Acceptance Criteria:**
- ✅ View grid/list of available tasks
- ✅ See task: title, priority, skills needed, estimate, deadline
- ✅ Filter by: skills, priority, department, deadline range
- ✅ Sort by: newest, deadline, priority, estimate
- ✅ Search by keywords
- ✅ See recommended tasks (matching my skills) highlighted

### US-POOL-002: Claim Task
**As a** Staff  
**I want to** claim task từ pool  
**So that** task được assigned to me

**Acceptance Criteria:**
- ✅ Click "Claim Task" button
- ✅ System validates:
  - Staff has required skills
  - Staff workload < max capacity
  - Staff is available (not on leave)
- ✅ If valid: task assigned, removed from pool
- ✅ If invalid: show error message explaining why
- ✅ Push notification sent
- ✅ Status updates IN_POOL → ASSIGNED

### US-POOL-003: Auto-Escalation
**As a** Manager  
**I want** pool tasks tự động escalate if unclaimed  
**So that** critical work không bị bỏ qua

**Acceptance Criteria:**
- ✅ Configurable threshold (e.g., 4 hours for Critical, 24h for High)
- ✅ After threshold: Manager notification
- ✅ Manager can manually assign
- ✅ Or adjust priority/skills to attract claims

---

## 🎯 Business Rules

### BR-POOL-001: Eligibility
**Rule**: Staff can claim task nếu:
- Has ≥ 80% of required skills
- Current tasks < 10 (configurable)
- Status = Available
- Not blocked by department restrictions

### BR-POOL-002: First Come First Served
**Rule**: Task assigned to first valid claim. Optimistic locking prevents double-claims.

### BR-POOL-003: Auto-Remove
**Rule**: Claimed tasks immediately removed from pool. If staff drops task, returns to pool.

---

## 💾 Data Model

```typescript
interface PoolTask {
  taskId: string;
  addedToPoolAt: DateTime;
  requiredSkills: string[];
  visibleToDepartments: string[];  // Empty = all departments
  escalationThreshold: number;     // Hours
  escalatedAt: DateTime | null;
  claimAttempts: ClaimAttempt[];
}

interface ClaimAttempt {
  userId: string;
  timestamp: DateTime;
  success: boolean;
  failureReason: string | null;
}
```

---

## 🔌 API Endpoints

```http
GET    /api/pool/tasks                    # Browse pool with filters
GET    /api/pool/tasks/:id                # Get single pool task detail
POST   /api/pool/tasks/:id/claim          # Claim task
GET    /api/pool/my-recommendations       # Get recommended tasks
GET    /api/pool/stats                    # Pool analytics
```

---

## 🎨 UI Components

### Pool Grid View
- Card-based layout
- Quick filters top bar
- Skill badges on cards
- SLA indicators
- "Claim" CTA button
- "Recommended for you" section

### Pool Filters
- Skills multi-select
- Priority checkboxes
- Department dropdown
- Deadline date range
- Sort dropdown

---

## 📊 Metrics

- Pool size (total tasks available)
- Average claim time
- Claim success rate
- Escalation rate
- Most claimed skills
- Staff participation rate

---

**Related Specs:**
- [03-task-management.md](./03-task-management.md)
- [05-sla-management.md](./05-sla-management.md)
