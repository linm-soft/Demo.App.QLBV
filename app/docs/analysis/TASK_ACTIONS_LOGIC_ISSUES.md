# Task Actions Logic Analysis - Phân Tích Quyền & Actions

**Date**: March 27, 2026  
**File**: TaskActions.tsx  
**Status**: ⚠️ **CẦN SỬA** - Có nhiều logic không đúng workflow

---

## 📋 Logic Hiện Tại

### Actions cho Staff (isAssignedToMe = true)

| Action | Condition | Status Allowed | Đúng/Sai |
|--------|-----------|----------------|----------|
| **Bắt đầu làm việc** | `status === 'assigned'` | ASSIGNED | ✅ ĐÚNG |
| **Yêu cầu hỗ trợ** | `status === 'in_progress' OR 'assigned'` | ASSIGNED, IN_PROGRESS | ❌ SAI |
| **Yêu cầu gán lại** | `status IN ['assigned', 'in_progress', 'blocked']` | ASSIGNED, IN_PROGRESS, BLOCKED | ❌ SAI |
| **Đánh dấu block** | `status === 'in_progress'` | IN_PROGRESS | ✅ ĐÚNG |
| **Mở khóa task** | `status === 'blocked'` | BLOCKED | ⚠️ CHƯA ĐỦ |

### Actions cho Manager (isManager = true)

| Action | Condition | Status Allowed | Đúng/Sai |
|--------|-----------|----------------|----------|
| **Phân công hỗ trợ** | `status === 'support_requested'` | SUPPORT_REQUESTED | ✅ ĐÚNG |
| **Duyệt task** | `status === 'under_review'` | UNDER_REVIEW | ✅ ĐÚNG |
| **Yêu cầu sửa** | `status === 'under_review'` | UNDER_REVIEW | ✅ ĐÚNG |
| **Hủy task** | `status NOT IN ['completed', 'cancelled']` | ALL (except completed/cancelled) | ⚠️ QUÁ RỘNG |

---

## 🚨 Các Vấn Đề Tìm Thấy

### 1. ❌ Request Support từ status 'assigned' - SAI

**Code hiện tại:**
```typescript
const showRequestSupport =
  isAssignedToMe && (task.status === 'in_progress' || task.status === 'assigned');
```

**Vấn đề:**
- Staff chưa bắt đầu làm (status='assigned') thì KHÔNG NÊN request support
- Request support chỉ hợp lý khi đã bắt đầu và gặp khó khăn

**Theo WORKFLOW_ANALYSIS.md:**
- Status transition: `IN_PROGRESS` → `SUPPORT_REQUESTED`
- Staff chỉ request support khi đang làm việc (in_progress)

**Fix:**
```typescript
const showRequestSupport = isAssignedToMe && task.status === 'in_progress';
```

---

### 2. ❌ Request Reassignment - VI PHẠM WORKFLOW

**Code hiện tại:**
```typescript
const showRequestReassignment =
  isAssignedToMe &&
  (task.status === 'assigned' || task.status === 'in_progress' || task.status === 'blocked');
```

**Vấn đề:**
- Theo workflow, **Staff KHÔNG được phép reassign**
- Chỉ **Manager/Team Lead** mới được reassign tasks
- Staff chỉ có thể làm hoặc report blocked, KHÔNG tự reassign

**Theo WORKFLOW_ANALYSIS.md - Roles & Responsibilities Matrix:**

| Role | Reassign |
|------|----------|
| Staff | ❌ Không được phép |
| Team Lead | ✅ Reassign team tasks |
| Manager/Admin | ✅ Reassign any task |

**Fix:**
```typescript
// Staff KHÔNG có action này
// Chỉ Manager mới có Reassign action
```

---

### 3. ❌ Cancel Task - Logic Quá Rộng

**Code hiện tại:**
```typescript
const showCancel = isManager && task.status !== 'completed' && task.status !== 'cancelled';
```

**Vấn đề:**
- Cho phép cancel ở quá nhiều status
- Ví dụ: status='under_review' (đang review) hoặc 'collab_assigned' (đang có người hỗ trợ) không nên cancel dễ dàng
- Cần confirm hoặc reason rõ ràng cho các status quan trọng

**Fix:**
```typescript
// Cancel chỉ nên dễ dàng cho early stages
const showCancel = 
  isManager && 
  task.status !== 'completed' && 
  task.status !== 'cancelled' &&
  task.status !== 'under_review'; // Review xong mới cancel
```

---

### 4. ⚠️ Unblock Task - Thiếu Logic Manager

**Code hiện tại:**
```typescript
const showUnblock = isAssignedToMe && task.status === 'blocked';
```

**Vấn đề:**
- Chỉ Staff được unblock
- Theo workflow, **Manager cũng nên có quyền unblock** để giải quyết khi staff không tự unblock được

**Fix:**
```typescript
const showUnblock = 
  (isAssignedToMe || isManager) && 
  task.status === 'blocked';
```

---

### 5. ❌ MISSING: Submit for Review Action

**Hiện tại:** KHÔNG CÓ

**Cần có:**
- Staff cần action "Submit for Review" khi đã làm xong (progress = 100% hoặc tất cả subtasks completed)
- Status transition: `IN_PROGRESS` → `UNDER_REVIEW`

**Theo WORKFLOW_ANALYSIS.md:**
- "Staff submit for review" là bước quan trọng trong workflow
- Step 5: "Ready for Review"

**Fix - Thêm:**
```typescript
const showSubmitForReview = 
  isAssignedToMe && 
  task.status === 'in_progress' && 
  task.progress === 100; // Hoặc check all subtasks completed
```

---

### 6. ❌ MISSING: Manager Reassign Action

**Hiện tại:** KHÔNG CÓ

**Cần có:**
- Manager cần action "Reassign Task" để gán lại task cho staff khác
- Đặc biệt quan trọng khi task bị blocked hoặc staff không thể hoàn thành

**Theo WORKFLOW_ANALYSIS.md:**
- Manager: "✅ Reassign any task"
- Step 3: "Reassignment" - Manager decision

**Fix - Thêm:**
```typescript
const showReassign = 
  isManager && 
  task.status !== 'completed' && 
  task.status !== 'cancelled' &&
  task.status !== 'under_review'; // Không reassign khi đang review
```

---

### 7. ⚠️ MISSING: Remove Collaborator Action

**Hiện tại:** KHÔNG CÓ trong TaskActions

**Cần có:**
- Manager cần có thể remove collaborators nếu không cần nữa
- Đặc biệt khi task đã resolve hoặc collaborator không phù hợp

**Fix - Thêm:**
```typescript
const showManageCollaborators = 
  isManager && 
  task.status === 'collab_assigned' && 
  task.collaborators && 
  task.collaborators.length > 0;
```

---

### 8. ⚠️ Status 'COLLAB_ASSIGNED' - Thiếu Actions

**Hiện tại:** Status này KHÔNG có actions đặc biệt

**Cần có:**
- Staff vẫn có thể update progress
- Staff vẫn có thể mark blocked
- Collaborators có thể xem task nhưng không modify (trừ chat/comment)

**Fix:** Không cần sửa nhiều, chỉ cần clarify trong comments

---

## ✅ Đề Xuất Logic Mới (ĐÚNG WORKFLOW)

### Staff Actions

```typescript
// 1. Start Task (ASSIGNED → IN_PROGRESS)
const showStartButton = 
  isAssignedToMe && 
  task.status === 'assigned';

// 2. Request Support (IN_PROGRESS → SUPPORT_REQUESTED)
const showRequestSupport = 
  isAssignedToMe && 
  task.status === 'in_progress'; // ❌ Bỏ 'assigned'

// 3. Mark Blocked (IN_PROGRESS → BLOCKED)
const showMarkBlocked = 
  isAssignedToMe && 
  task.status === 'in_progress';

// 4. Unblock (BLOCKED → IN_PROGRESS)
const showUnblock = 
  (isAssignedToMe || isManager) && // ✅ Manager cũng unblock được
  task.status === 'blocked';

// 5. Submit for Review (IN_PROGRESS → UNDER_REVIEW) - ✅ THÊM MỚI
const showSubmitForReview = 
  isAssignedToMe && 
  task.status === 'in_progress' && 
  task.progress === 100;

// ❌ BỎ: Request Reassignment (Staff không được reassign)
```

### Manager Actions

```typescript
// 1. Assign Collaborator (SUPPORT_REQUESTED → COLLAB_ASSIGNED)
const showAssignCollaborator = 
  isManager && 
  task.status === 'support_requested';

// 2. Reassign Task - ✅ THÊM MỚI
const showReassign = 
  isManager && 
  task.status !== 'completed' && 
  task.status !== 'cancelled' &&
  task.status !== 'under_review';

// 3. Approve Task (UNDER_REVIEW → COMPLETED)
const showApprove = 
  isManager && 
  task.status === 'under_review';

// 4. Request Changes (UNDER_REVIEW → CHANGES_REQUESTED)
const showRequestChangesButton = 
  isManager && 
  task.status === 'under_review';

// 5. Cancel Task (ANY → CANCELLED) - ⚠️ SỬA LOGIC
const showCancel = 
  isManager && 
  task.status !== 'completed' && 
  task.status !== 'cancelled' &&
  task.status !== 'under_review'; // ✅ Không cancel khi đang review

// 6. Manage Collaborators - ✅ THÊM MỚI
const showManageCollaborators = 
  isManager && 
  task.status === 'collab_assigned' && 
  task.collaborators && 
  task.collaborators.length > 0;

// 7. Unblock (BLOCKED → IN_PROGRESS) - ✅ Manager cũng có
const showUnblock = 
  (isAssignedToMe || isManager) && 
  task.status === 'blocked';
```

---

## 📊 Status-Action Matrix (ĐÚNG WORKFLOW)

| Status | Staff Actions | Manager Actions |
|--------|---------------|-----------------|
| **CREATED** | - | Assign, Cancel |
| **ASSIGNED** | **Start Task** | Reassign, Cancel |
| **IN_PROGRESS** | **Request Support**, **Mark Blocked**, **Submit for Review** (if progress=100%) | Reassign, Cancel |
| **SUPPORT_REQUESTED** | (wait) | **Assign Collaborator**, Reassign, Cancel |
| **COLLAB_ASSIGNED** | (continue work) | Manage Collaborators, Reassign |
| **BLOCKED** | **Unblock** | **Unblock**, Reassign |
| **UNDER_REVIEW** | (wait) | **Approve**, **Request Changes** |
| **CHANGES_REQUESTED** | (continue work) | Reassign, Cancel |
| **COMPLETED** | - | - |
| **CANCELLED** | - | - |

---

## 🔧 Implementation Checklist

### ✅ Fixes Cần Làm Ngay

- [ ] **FIX 1**: Bỏ `'assigned'` khỏi `showRequestSupport` condition
- [ ] **FIX 2**: Xóa hoàn toàn `showRequestReassignment` và action (Staff không được reassign)
- [ ] **FIX 3**: Sửa `showCancel` để exclude 'under_review'
- [ ] **FIX 4**: Thêm `isManager` vào `showUnblock` condition

### ✅ Features Cần Thêm

- [ ] **ADD 1**: Thêm `showSubmitForReview` action (progress === 100%)
- [ ] **ADD 2**: Thêm `showReassign` action cho Manager (với modal ReassignTaskModal)
- [ ] **ADD 3**: Thêm `showManageCollaborators` action (remove collaborators)

### ⚠️ Optional Improvements

- [ ] Thêm role check cho Team Lead (giữa Staff và Manager)
- [ ] Thêm confirmation messages cho các actions quan trọng
- [ ] Thêm audit log cho reassignment
- [ ] Validate permissions từ backend (không chỉ frontend)

---

## 📝 Code Changes Summary

**Files to Modify:**
1. `TaskActions.tsx` - Fix logic và thêm actions mới
2. `ReassignTaskModal.tsx` - Tạo modal mới (nếu chưa có)
3. `ManageCollaboratorsModal.tsx` - Tạo modal mới

**Redux Slices:**
- `tasksSlice.ts` - Thêm thunks: `submitForReview`, `reassignTask`

**Estimated Time:** 3-4 hours

---

## ✨ Summary

**Tìm thấy 8 vấn đề:**
- ❌ 5 logic SAI hoặc VI PHẠM workflow
- ⚠️ 3 features THIẾU quan trọng

**Fix ưu tiên cao:**
1. Bỏ request support từ 'assigned'
2. Xóa request reassignment cho staff
3. Thêm submit for review action
4. Thêm reassign action cho manager

**Impact:** Critical - Ảnh hưởng đến workflow chính, user experience, và quyền hạn không đúng.
