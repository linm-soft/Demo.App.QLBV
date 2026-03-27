# Feature Spec: React UI Architecture Migration

**Feature ID**: 01  
**Feature Name**: React UI Architecture  
**Priority**: Critical  
**Status**: 🚧 In Progress  
**Created**: March 25, 2026  
**Last Updated**: March 25, 2026

---

## 1. Overview

### Purpose
Migrate the existing HTML/CSS demo application to a production-ready React + TypeScript application following micro-frontend principles, component reusability patterns, and the repository constitution standards.

### Scope
- **In Scope**:
  - React component architecture with micro-element pattern
  - Component-scoped CSS modules
  - Custom hooks for business logic separation
  - Services layer for API integration
  - TypeScript models and interfaces
  - Reusable UI components library
  - Page-level components matching existing screens
  - Error boundaries per route
  - State management setup

- **Out of Scope**:
  - Backend API implementation (covered in BFF specs)
  - Authentication flow (already implemented)
  - Real-time messaging (MQTT already implemented)
  - Mobile app (separate spec)

---

## 2. Architecture

### 2.1 Directory Structure
```
src/
├── components/                     # Reusable UI components
│   ├── common/                     # Basic micro-elements
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── Badge/
│   │   ├── Card/
│   │   ├── IconButton/
│   │   └── Avatar/
│   ├── layout/                     # Layout components  
│   │   ├── Sidebar/
│   │   ├── Topbar/
│   │   ├── AppLayout/
│   │   └── ErrorBoundary/
│   ├── dashboard/                  # Dashboard-specific components
│   │   ├── StatCard/
│   │   ├── PriorityWorkList/
│   │   ├── ActivityFeed/
│   │   └── TeamPerformanceChart/
│   ├── tickets/                    # Ticket-specific components
│   │   ├── TicketCard/
│   │   ├── TicketList/
│   │   ├── TicketFilter/
│   │   └── TicketDetail/
│   ├── tasks/                      # Task-specific components
│   │   ├── TaskCard/
│   │   ├── TaskList/
│   │   ├── TaskPoolCard/
│   │   └── TaskProgressBar/
│   └── sla/                        # SLA-specific components
│       ├── SLAIndicator/
│       ├── SLABadge/
│       └── SLAAlert/
├── pages/                          # Page-level components (routes)
│   ├── LoginPage/
│   ├── DashboardStaffPage/
│   ├── DashboardManagerPage/
│   ├── TicketsListPage/
│   ├── TicketDetailPage/
│   ├── TasksListPage/
│   ├── TaskPoolPage/
│   ├── ApprovalsPage/
│   ├── HistoryPage/
│   ├── ReportsPage/
│   ├── StatisticsPage/
│   ├── SLAAlertsPage/
│   ├── UsersPage/
│   ├── SettingsPage/
│   └── HelpPage/
├── hooks/                          # Custom React hooks
│   ├── useAuth.ts
│   ├── useTickets.ts
│   ├── useTasks.ts
│   ├── useSLA.ts
│   ├── useNotifications.ts
│   ├── useRealtime.ts
│   └── useFeatureToggle.ts
├── services/                       # API calls to Web BFF
│   ├── api.ts                      # Base API client
│   ├── ticketService.ts
│   ├── taskService.ts
│   ├── slaService.ts
│   ├── userService.ts
│   └── dashboardService.ts
├── models/                         # TypeScript interfaces/types
│   ├── Ticket.ts
│   ├── Task.ts
│   ├── User.ts
│   ├── SLA.ts
│   ├── Department.ts
│   └── common.ts
├── utils/                          # Utility functions
│   ├── dateFormatter.ts
│   ├── slaCalculator.ts
│   ├── priorityHelper.ts
│   └── validators.ts
├── styles/                         # Global styles & design tokens
│   ├── variables.css               # CSS custom properties
│   ├── reset.css                   # CSS reset
│   ├── typography.css              # Typography scales
│   └── global.css                  # Global styles
├── App.tsx                         # Root application component
└── index.tsx                       # Application entry point
```

### 2.2 Component Hierarchy

#### Micro-Elements (Atomic Components)
Smallest reusable units with single responsibility:
- `Button` - Primary, secondary, danger variants
- `Badge` - Status, count, SLA indicators
- `Avatar` - User avatars with initials
- `IconButton` - Icon-only buttons
- `Input` - Text inputs with validation
- `Select` - Dropdowns
- `Checkbox` / `Radio`
- `Spinner` / `Loader`

#### Composite Components (Molecules)
Combinations of micro-elements:
- `SearchBox` - Input + Icon
- `StatCard` - Icon + Title + Value + Change indicator
- `UserProfile` - Avatar + Name + Role
- `SLAIndicator` - Badge + Progress + Timer
- `PriorityBadge` - Badge with priority colors

#### Feature Components (Organisms)
Complex feature-specific components:
- `Sidebar` - Navigation with nested sections
- `Topbar` - Header with search and notifications
- `TicketCard` - Complete ticket display
- `TaskPoolCard` - Task card with claim action
- `ActivityFeed` - List of activity items
- `TeamPerformanceChart` - Chart.js wrapper

#### Page Components (Templates)
Full page layouts:
- `DashboardStaffPage` - Staff dashboard layout
- `DashboardManagerPage` - Manager dashboard layout
- `TicketsListPage` - Ticket listing with filters
- etc.

---

## 3. Component Design Principles

### 3.1 Micro-Element Pattern
Each micro-element must:
- Have a single, clear responsibility
- Accept props for customization
- Use TypeScript interfaces for prop types
- Include CSS module for scoped styling
- Export through index.ts for clean imports
- Be fully reusable across features

Example structure:
```typescript
// Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
};
```

### 3.2 CSS Module Pattern
Every component has its own CSS module:
```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background: var(--primary-color);
  color: var(--white);
}

.primary:hover {
  background: var(--primary-dark);
}

.secondary {
  background: var(--gray-200);
  color: var(--gray-800);
}

.sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.875rem;
}

.md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
}
```

### 3.3 Custom Hooks Pattern
Business logic extracted into hooks:
```typescript
// hooks/useTickets.ts
import { useState, useEffect } from 'react';
import { ticketService } from '../services/ticketService';
import { Ticket } from '../models/Ticket';

export const useTickets = (filters?: TicketFilters) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const data = await ticketService.getTickets(filters);
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [filters]);

  return { tickets, loading, error };
};
```

### 3.4 Error Boundary Pattern
Each route wrapped with error boundary:
```typescript
// components/layout/ErrorBoundary/ErrorBoundary.tsx
import React from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h1>Đã xảy ra lỗi</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 4. Migration Mapping

### HTML Files → React Pages

| HTML File | React Page | Components Used |
|-----------|-----------|-----------------|
| `login.html` | `LoginPage` | `Button`, `Input`, `Card` |
| `dashboard-staff.html` | `DashboardStaffPage` | `StatCard`, `PriorityWorkList`, `ActivityFeed`, `Sidebar`, `Topbar` |
| `dashboard-manager.html` | `DashboardManagerPage` | `StatCard`, `SLAAlert`, `TeamPerformanceChart`, `ApprovalQueue` |
| `tickets-list.html` | `TicketsListPage` | `TicketCard`, `TicketFilter`, `Pagination` |
| `ticket-detail.html` | `TicketDetailPage` | `TicketDetail`, `CommentThread`, `FileUpload` |
| `tasks-list.html` | `TasksListPage` | `TaskCard`, `TaskFilter`, `TaskProgressBar` |
| `task-pool.html` | `TaskPoolPage` | `TaskPoolCard`, `SkillFilter`, `ClaimButton` |
| `approvals.html` | `ApprovalsPage` | `ApprovalCard`, `ReassignmentForm` |
| `history.html` | `HistoryPage` | `ActivityTimeline` |
| `reports.html` | `ReportsPage` | `ReportFilter`, `DataTable`, `ExportButton` |
| `statistics.html` | `StatisticsPage` | `PerformanceChart`, `MetricCard` |
| `sla-alerts.html` | `SLAAlertsPage` | `SLAAlert`, `EscalationForm` |
| `users.html` | `UsersPage` | `UserCard`, `UserFilter`, `RoleSelector` |
| `settings.html` | `SettingsPage` | `SettingsPanel`, `ToggleSwitch` |
| `help.html` | `HelpPage` | `FAQItem`, `SearchBox` |

### CSS → Component Modules

Global CSS variables remain in `styles/variables.css`:
- Color palette
- Spacing scale
- Typography scale
- Shadow definitions
- Border radius

Component-specific styles move to `.module.css` files:
- Layout styles
- Component-specific colors
- Hover/active states
- Responsive breakpoints

---

## 5. TypeScript Models

### Core Models

```typescript
// models/Ticket.ts
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  department: Department;
  assigneeId: string | null;
  assigneeName: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  sla: SLAInfo;
  tags: string[];
}

export enum Priority {
  Emergency = 'emergency',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export enum TicketStatus {
  New = 'new',
  InProgress = 'in_progress',
  Resolved = 'resolved',
  Closed = 'closed',
}

// models/Task.ts
export interface Task {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  status: TaskStatus;
  progress: number; // 0-100
  assignmentStrategy: AssignmentStrategy;
  assigneeId: string | null;
  creatorId: string;
  estimatedHours: number;
  actualHours: number;
  dueDate: Date;
  skillsRequired: string[];
  subtasks: Subtask[];
}

export enum TaskStatus {
  Available = 'available',
  InProgress = 'in_progress',
  UnderReview = 'under_review',
  Completed = 'completed',
}

export enum AssignmentStrategy {
  Direct = 'direct',
  Pool = 'pool',
  Team = 'team',
}

// models/SLA.ts
export interface SLAInfo {
  target: Date;
  remaining: number; // minutes
  percentage: number; // 0-100
  status: SLAStatus;
  breached: boolean;
}

export enum SLAStatus {
  Safe = 'safe',      // > 25%
  Warning = 'warning', // 10-25%
  Danger = 'danger',   // < 10%
  Breached = 'breached',
}
```

---

## 6. Implementation Phases

### Phase 1: Foundation (Week 1)
- [x] Create directory structure
- [ ] Set up TypeScript configuration
- [ ] Create base models/interfaces
- [ ] Set up CSS variables/design tokens
- [ ] Create base API service
- [ ] Set up routing (React Router)

### Phase 2: Micro-Elements (Week 1-2)
- [ ] Button component
- [ ] Badge component
- [ ] Avatar component
- [ ] IconButton component
- [ ] Input components (text, select, checkbox)
- [ ] Card component
- [ ] Spinner/Loader component

### Phase 3: Layout Components (Week 2)
- [ ] Sidebar navigation
- [ ] Topbar with search and notifications
- [ ] AppLayout wrapper
- [ ] ErrorBoundary per route
- [ ] UserProfile component

### Phase 4: Feature Components (Week 2-3)
- [ ] StatCard for dashboards
- [ ] TicketCard and TicketList
- [ ] TaskCard and TaskList
- [ ] SLA indicators and badges
- [ ] Activity feed
- [ ] Charts wrapper (Chart.js)

### Phase 5: Pages (Week 3-4)
- [ ] LoginPage
- [ ] DashboardStaffPage
- [ ] DashboardManagerPage
- [ ] TicketsListPage
- [ ] TasksListPage
- [ ] TaskPoolPage
- [ ] All remaining pages

### Phase 6: Integration (Week 4)
- [ ] Custom hooks implementation
- [ ] Service layer integration with BFF
- [ ] Real-time updates (MQTT integration)
- [ ] Error handling and loading states
- [ ] Performance optimization

### Phase 7: Polish (Week 5)
- [ ] Responsive design testing
- [ ] Accessibility (a11y) audit
- [ ] Unit tests for components
- [ ] Integration tests
- [ ] Documentation

---

## 7. Technical Requirements

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "chart.js": "^4.2.0",
    "react-chartjs-2": "^5.2.0",
    "date-fns": "^2.30.0",
    "classnames": "^2.3.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.0",
    "vitest": "^0.31.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^5.16.5"
  }
}
```

### Build Tool
- **Vite**: Fast development server and optimized production builds
- **TypeScript**: Strict mode enabled
- **CSS Modules**: Automatic scoping

### Responsive Design
Following CAL.CD.Dispatch.Web breakpoint conventions:
- **Mobile**: < 681px (minimum 375px supported)
- **Tablet**: 681px - 1024px
- **Desktop**: > 1024px

**Implementation**:
- Custom `useResponsive()` hook for JavaScript-based responsive logic
- CSS media queries for styling
- Touch-friendly targets (min 48x48px on mobile)
- 16px font-size on inputs to prevent iOS auto-zoom

### Code Quality
- **ESLint**: Airbnb style guide + React hooks rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Type safety**: Strict TypeScript, no `any` types

---

## 8. Acceptance Criteria

### Component Reusability
- [ ] All micro-elements are used in at least 3 different contexts
- [ ] No duplicate component logic
- [ ] Clear component interfaces with TypeScript
- [ ] Components render correctly in isolation (Storybook)

### Code Quality
- [ ] All components have TypeScript interfaces
- [ ] CSS is scoped to components (no global leaks)
- [ ] No inline styles except dynamic values
- [ ] ESLint passes with zero warnings
- [ ] All hooks follow React naming conventions

### Performance
- [ ] Lighthouse score > 90 on all metrics
- [ ] No unnecessary re-renders (React DevTools Profiler)
- [ ] Proper `useMemo` and `useCallback` usage
- [ ] Code splitting for large pages

### Functionality
- [ ] All HTML pages migrated to React
- [ ] All functionality from demo preserved
- [ ] Error boundaries catch and display errors
- [ ] Loading states for all async operations
- [ ] Form validation working

---

## 9. Open Questions

None at this time.

---

## 10. References

- [Web/BFF/UI Constitution](../constitution/web_bff_ui.md)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Modules](https://github.com/css-modules/css-modules)
