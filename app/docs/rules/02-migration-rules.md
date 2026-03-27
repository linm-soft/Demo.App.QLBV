# Migration Rules: HTML to React

**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2026-03-25

---

## Table of Contents

1. [UI Component Migration](#ui-component-migration)
2. [JavaScript to TypeScript](#javascript-to-typescript)
3. [Slideout Implementation](#slideout-implementation)
4. [Redux Setup with Hooks](#redux-setup-with-hooks)
5. [Form Input Handling](#form-input-handling)
6. [Styling Migration](#styling-migration)
7. [Routing and Navigation](#routing-and-navigation)
8. [API Integration](#api-integration)

---

## 1. UI Component Migration

### Component Decomposition Pattern

**HTML Structure → React Component Hierarchy**

```
HTML View (tickets-list.html)
├── Sidebar (shared)              → <Sidebar />
├── Topbar (shared)               → <Topbar />
└── Content Area
    ├── Stats Grid                → <TicketStatsCards />
    ├── Filters & Actions         → <TicketFilters /> + <TicketActions />
    └── Data Table/List           → <TicketList />
        └── Table Row/Card        → <TicketCard />
```

### Micro-Element Component Rules

**Rule 1.1: One Component, One Responsibility**
- Each component should handle a single, well-defined piece of UI
- Extract reusable elements into `src/components/common/`
- Feature-specific components go in `src/components/{feature}/`

**Example:**
```
❌ Bad: TicketsPage with everything inline
✅ Good: 
   TicketsListPage/
   ├── TicketsListPage.tsx (layout orchestration)
   └── components/
       ├── TicketStatsCards.tsx
       ├── TicketFilters.tsx
       ├── TicketActions.tsx
       └── TicketList.tsx
```

**Rule 1.2: Props Interface Definition**
- Every component must have a TypeScript interface for its props
- Use descriptive names: `TicketCardProps`, `FilterBarProps`
- Mark optional props with `?`
- Provide defaults using destructuring

```typescript
interface TicketCardProps {
  ticket: Ticket;
  onView?: (id: UUID) => void;
  onEdit?: (id: UUID) => void;
  compact?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onView,
  onEdit,
  compact = false,
}) => {
  // Component implementation
};
```

**Rule 1.3: HTML Element Mapping**

| HTML Pattern | React Component |
|-------------|-----------------|
| `<div class="stat-card">` | `<StatCard />` from components/dashboard |
| `<button class="btn btn-primary">` | `<Button variant="primary" />` |
| `<span class="badge">` | `<Badge variant="..." />` |
| `<div class="user-avatar">` | `<Avatar />` |
| `<select class="form-select">` | `<Select />` (create in common) |
| `<input type="text">` | `<Input />` (create in common) |
| `<table>` | `<DataTable />` or component-specific list |

---

## 2. JavaScript to TypeScript

### Conversion Rules

**Rule 2.1: Function Declaration**

```javascript
// ❌ HTML (inline JavaScript)
function openCreateTicketForm() {
    document.getElementById('slideout').style.display = 'block';
}

// ✅ React TypeScript
const handleCreateTicket = (): void => {
  setIsSlideoutOpen(true);
};

// Or as handler
const handleCreateTicket = useCallback((): void => {
  setIsSlideoutOpen(true);
}, []);
```

**Rule 2.2: Event Handlers**

```javascript
// ❌ HTML
onclick="window.location.href='ticket-detail.html'"

// ✅ React
onClick={() => navigate(`/tickets/${ticket.id}`)}

// ❌ HTML
<button onclick="submitForm()">Submit</button>

// ✅ React
<Button onClick={handleSubmit}>Submit</Button>
```

**Rule 2.3: DOM Manipulation → State Management**

```javascript
// ❌ HTML JavaScript - Direct DOM manipulation
document.querySelector('.table').innerHTML = generateTable(data);
document.getElementById('count').textContent = items.length;

// ✅ React - State-driven rendering
const [tickets, setTickets] = useState<Ticket[]>([]);
const [count, setCount] = useState(0);

return (
  <>
    <div className={styles.count}>{count}</div>
    <TicketList tickets={tickets} />
  </>
);
```

**Rule 2.4: AJAX/Fetch → Service Layer**

```javascript
// ❌ HTML - Inline fetch
fetch('/api/tickets')
  .then(res => res.json())
  .then(data => updateUI(data));

// ✅ React - Service + Hook
// In services/ticketService.ts
export const getTickets = async (filters?: TicketFilters): Promise<Ticket[]> => {
  const response = await apiClient.get<Ticket[]>('/tickets', { params: filters });
  return response.data;
};

// In component
const { data: tickets, loading, error } = useTickets(filters);
```

---

## 3. Slideout Implementation

### Slideout Architecture (Based on Dispatch.Web Pattern)

**Rule 3.1: Base Slideout Component**

Create a reusable `Slideout` component in `src/components/common/Slideout/`:

```typescript
// Slideout.tsx
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Slideout.module.css';

export interface SlideoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | ReactNode;
  children: ReactNode;
  width?: string | number;
  position?: 'left' | 'right';
  footer?: {
    leftLabel?: string;
    leftAction?: () => void;
    rightLabel?: string;
    rightAction?: () => void;
  };
}

export const Slideout: React.FC<SlideoutProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = '600px',
  position = 'right',
  footer,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.slideout} ${styles[position]}`}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {footer && (
          <div className={styles.footer}>
            {footer.leftLabel && (
              <button onClick={footer.leftAction} className={styles.secondaryButton}>
                {footer.leftLabel}
              </button>
            )}
            {footer.rightLabel && (
              <button onClick={footer.rightAction} className={styles.primaryButton}>
                {footer.rightLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
```

**Rule 3.2: Slideout Responsive Widths**

```typescript
// Use useResponsive hook for width calculation
const { isMobile, isTablet } = useResponsive();

const slideoutWidth = isMobile 
  ? '100%' 
  : isTablet 
    ? '393px' 
    : '776px';

<Slideout
  isOpen={isOpen}
  onClose={handleClose}
  width={slideoutWidth}
  title="Create Ticket"
>
  <CreateTicketForm />
</Slideout>
```

**Rule 3.3: Slideout State Management**

```typescript
// Component with slideout
const TicketsListPage: React.FC = () => {
  const [isCreateSlideoutOpen, setIsCreateSlideoutOpen] = useState(false);
  const [isEditSlideoutOpen, setIsEditSlideoutOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<UUID | null>(null);

  const handleCreate = () => setIsCreateSlideoutOpen(true);
  const handleEdit = (id: UUID) => {
    setSelectedTicketId(id);
    setIsEditSlideoutOpen(true);
  };
  const handleCloseCreate = () => setIsCreateSlideoutOpen(false);
  const handleCloseEdit = () => {
    setIsEditSlideoutOpen(false);
    setSelectedTicketId(null);
  };

  return (
    <>
      <TicketList onEdit={handleEdit} />
      <Button onClick={handleCreate}>Create Ticket</Button>
      
      <Slideout isOpen={isCreateSlideoutOpen} onClose={handleCloseCreate} title="Create Ticket">
        <CreateTicketForm onSuccess={handleCloseCreate} />
      </Slideout>
      
      <Slideout isOpen={isEditSlideoutOpen} onClose={handleCloseEdit} title="Edit Ticket">
        <EditTicketForm ticketId={selectedTicketId} onSuccess={handleCloseEdit} />
      </Slideout>
    </>
  );
};
```

**Rule 3.4: All Features Use Slideout Pattern**

Every feature that requires a form or detailed view should use slideouts:

| Feature | Slideout Usage |
|---------|---------------|
| Create Ticket | CREATE slideout with form |
| Edit Ticket | EDIT slideout with pre-filled form |
| Ticket Detail | DETAIL slideout (read-only or with inline edit) |
| Create Task | CREATE slideout |
| Edit Task | EDIT slideout |
| Task Detail | DETAIL slideout |
| User Assignment | ASSIGN slideout with user selector |
| Approval Flow | APPROVE/REJECT slideout with comments |
| SLA Configuration | CONFIG slideout |

---

## 4. Redux Setup with Hooks

### Redux Toolkit Architecture (Based on Dispatch.Web)

**Rule 4.1: Store Configuration**

```typescript
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './slices/ticketsSlice';
import tasksReducer from './slices/tasksSlice';
import usersReducer from './slices/usersSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    tasks: tasksReducer,
    users: usersReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Rule 4.2: Typed Hooks**

```typescript
// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Rule 4.3: Slice Pattern**

```typescript
// src/store/slices/ticketsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Ticket, TicketFilters } from '../../models/Ticket';
import * as ticketService from '../../services/ticketService';

interface TicketsState {
  items: Ticket[];
  selectedTicket: Ticket | null;
  filters: TicketFilters;
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  items: [],
  selectedTicket: null,
  filters: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (filters: TicketFilters) => {
    return await ticketService.getTickets(filters);
  }
);

export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (data: Partial<Ticket>) => {
    return await ticketService.createTicket(data);
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<TicketFilters>) => {
      state.filters = action.payload;
    },
    setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.selectedTicket = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets';
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { setFilters, setSelectedTicket, clearError } = ticketsSlice.actions;
export default ticketsSlice.reducer;
```

**Rule 4.4: Using Redux in Components**

```typescript
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTickets, setFilters } from '../../store/slices/ticketsSlice';

const TicketsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, filters } = useAppSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters: TicketFilters) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <div>
      <TicketFilters filters={filters} onChange={handleFilterChange} />
      {loading ? <Spinner /> : <TicketList tickets={items} />}
    </div>
  );
};
```

---

## 5. Form Input Handling

### Redux-Connected Form Pattern

**Rule 5.1: Form State in Redux**

```typescript
// src/store/slices/uiSlice.ts
interface UIState {
  createTicketForm: Partial<Ticket>;
  editTaskForm: Partial<Task>;
  // ... other form states
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateCreateTicketForm: (state, action: PayloadAction<Partial<Ticket>>) => {
      state.createTicketForm = { ...state.createTicketForm, ...action.payload };
    },
    resetCreateTicketForm: (state) => {
      state.createTicketForm = {};
    },
  },
});
```

**Rule 5.2: Input Components with Redux Hooks**

```typescript
// CreateTicketForm.tsx
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCreateTicketForm, resetCreateTicketForm } from '../../../store/slices/uiSlice';
import { createTicket } from '../../../store/slices/ticketsSlice';

const CreateTicketForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.ui.createTicketForm);

  const handleChange = (field: keyof Ticket, value: any) => {
    dispatch(updateCreateTicketForm({ [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createTicket(formData)).unwrap();
      dispatch(resetCreateTicketForm());
      onSuccess();
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Title"
        value={formData.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
        required
      />
      <Select
        label="Priority"
        value={formData.priority || ''}
        onChange={(e) => handleChange('priority', e.target.value)}
        options={priorityOptions}
      />
      <TextArea
        label="Description"
        value={formData.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <div className={styles.actions}>
        <Button type="submit" variant="primary">Create</Button>
      </div>
    </form>
  );
};
```

**Rule 5.3: Form Validation**

```typescript
// Create validation hook
const useFormValidation = <T extends object>(
  formData: T,
  rules: Record<keyof T, (value: any) => string | null>
) => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const field in rules) {
      const error = rules[field](formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return { errors, validate };
};

// Usage in form
const validationRules = {
  title: (value: string) => !value ? 'Title is required' : null,
  priority: (value: string) => !value ? 'Priority is required' : null,
};

const { errors, validate } = useFormValidation(formData, validationRules);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  // proceed with submission
};
```

---

## 6. Styling Migration

### CSS Modules Pattern (Preferred for QLCV)

**Rule 6.1: File Structure**

```
Component/
├── ComponentName.tsx
├── ComponentName.module.css  ← Scoped styles
└── index.ts
```

**Rule 6.2: Style Conversion**

```css
/* ❌ HTML - styles.css (global) */
.stat-card {
  background: white;
  padding: 1rem;
}

/* ✅ React - StatCard.module.css (scoped) */
.card {
  background: var(--color-white);
  padding: var(--spacing-4);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 680px) {
  .card {
    padding: var(--spacing-3);
  }
}
```

```typescript
// StatCard.tsx
import styles from './StatCard.module.css';

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
```

**Rule 6.3: Conditional Styles**

```typescript
// Use classnames or clsx utility
import clsx from 'clsx';

<div className={clsx(
  styles.badge,
  variant === 'danger' && styles.danger,
  variant === 'success' && styles.success,
  small && styles.small
)}>
  {children}
</div>
```

**Rule 6.4: Material-UI makeStyles Reference (for reference from Dispatch.Web)**

```typescript
// Reference pattern from Dispatch.Web (we use CSS Modules instead)
// But structure is similar for dynamic styles

// Dispatch.Web pattern:
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

// QLCV equivalent with CSS Modules + inline style props:
const Card: React.FC<CardProps> = ({ padding = 'medium' }) => {
  return (
    <div 
      className={styles.card}
      data-padding={padding}  // CSS: [data-padding="medium"] { ... }
    >
      {children}
    </div>
  );
};
```

---

## 7. Routing and Navigation

**Rule 7.1: Route Definition**

```typescript
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardStaffPage />} />
          <Route path="/dashboard-manager" element={<DashboardManagerPage />} />
          <Route path="/tickets" element={<TicketsListPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="/tasks" element={<TasksListPage />} />
          <Route path="/task-pool" element={<TaskPoolPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
```

**Rule 7.2: Navigation**

```typescript
// ❌ HTML
<a href="tickets-list.html">View Tickets</a>
onclick="window.location.href='ticket-detail.html'"

// ✅ React Router
import { Link, useNavigate } from 'react-router-dom';

<Link to="/tickets">View Tickets</Link>

const navigate = useNavigate();
onClick={() => navigate(`/tickets/${ticketId}`)}
```

---

## 8. API Integration

**Rule 8.1: Service Layer Structure**

```
services/
├── api.ts                 ← Base API client
├── ticketService.ts       ← Ticket CRUD
├── taskService.ts         ← Task CRUD
├── userService.ts         ← User management
└── authService.ts         ← Authentication
```

**Rule 8.2: Service Implementation**

```typescript
// ticketService.ts
import { apiClient } from './api';
import { Ticket, TicketFilters, CreateTicketDTO } from '../models/Ticket';

export const getTickets = async (filters?: TicketFilters): Promise<Ticket[]> => {
  const response = await apiClient.get<Ticket[]>('/api/tickets', { params: filters });
  return response.data;
};

export const getTicketById = async (id: UUID): Promise<Ticket> => {
  const response = await apiClient.get<Ticket>(`/api/tickets/${id}`);
  return response.data;
};

export const createTicket = async (data: CreateTicketDTO): Promise<Ticket> => {
  const response = await apiClient.post<Ticket>('/api/tickets', data);
  return response.data;
};

export const updateTicket = async (id: UUID, data: Partial<Ticket>): Promise<Ticket> => {
  const response = await apiClient.put<Ticket>(`/api/tickets/${id}`, data);
  return response.data;
};

export const deleteTicket = async (id: UUID): Promise<void> => {
  await apiClient.delete(`/api/tickets/${id}`);
};
```

**Rule 8.3: Error Handling**

```typescript
// In api.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// In component
try {
  await dispatch(createTicket(formData)).unwrap();
  toast.success('Ticket created successfully');
} catch (error) {
  toast.error('Failed to create ticket');
  console.error(error);
}
```

---

## Migration Checklist

For each HTML view, complete the following:

- [ ] **UI Decomposition**: Break down into component hierarchy
- [ ] **Create TypeScript Models**: Define interfaces for data
- [ ] **Implement Components**: Build with CSS Modules
- [ ] **Set up Redux Slice**: State management for the feature
- [ ] **Create Service Methods**: API integration
- [ ] **Implement Slideouts**: All forms in slideouts
- [ ] **Connect Redux Hooks**: Form inputs with Redux
- [ ] **Add Routing**: Define routes in App.tsx
- [ ] **Responsive Design**: Test at 375px, 680px, 1024px, 1280px
- [ ] **Error Handling**: Loading states, errors, empty states
- [ ] **Validation**: Form validation with error messages

---

## Quick Reference

### Common Patterns

| Pattern | Implementation |
|---------|---------------|
| **Create Form** | Slideout + Redux form state + Service create |
| **Edit Form** | Slideout + Redux form state + Service update |
| **List View** | Redux fetch + Grid/Table component + Filters |
| **Detail View** | Slideout or dedicated page + Service getById |
| **Delete Action** | Confirmation modal + Service delete + Redux removal |
| **Search/Filter** | Redux filter state + Service with query params |
| **Real-time Updates** | MQTT subscription + Redux state update |

### File Creation Order

1. **Models** (`src/models/`) - TypeScript interfaces
2. **Services** (`src/services/`) - API methods
3. **Redux Slice** (`src/store/slices/`) - State management
4. **Common Components** - Reusable UI elements
5. **Feature Components** - Feature-specific components
6. **Page Component** - Orchestrates everything
7. **Routes** - Add to App.tsx

---

## Standards from Constitution

- **CSS Scoping**: Use CSS Modules (`.module.css` files)
- **Responsive Breakpoints**: Mobile <681px, Tablet 681-1024px, Desktop >1024px
- **Error Boundaries**: One per route
- **Stable Keys**: Use `id` or `uuid` for list keys, never `index`
- **Memoization**: Use `useMemo` for expensive computations, `useCallback` for handlers
- **Custom Hooks**: Extract reusable logic (useTickets, useTasks, useAuth)

---

**End of Migration Rules Document**
