
## Standard Repository Structure

### Web App

```
/
├── src/
│   ├── components/                     # React components
│   ├── pages/                          # Page-level components (routes)
│   ├── hooks/                          # Custom React hooks
│   ├── services/                       # API calls to Web BFF
│   ├── models/                         # TypeScript interfaces/types
│   ├── utils/                          # Utility functions
│   ├── styles/                         # CSS/SCSS
│   ├── App.tsx                         # Root application component
│   └── index.tsx                       # Application entry point
├── public/
├── package.json
├── tsconfig.json
├── webpack.config.js
└── Dockerfile                          # If containerized
```

### Web BFF

```
/
├── .cai/
│   └── catalog.yaml                    # CAI component registration
├── .github/
│   └── workflows/                      # GitHub Actions CI/CD
├── src/
│   ├── {Component}.Api/                # Main BFF web host
│   │   ├── Controllers/                # BFF endpoints (thin, UI-shaped)
│   │   ├── ApplicationLogic/           # Aggregation and translation logic
│   │   ├── Core/                       # Interfaces, models
│   │   ├── Infrastructure/             # Refit clients to backend services
│   │   ├── Startup/                    # DI, middleware, configuration
│   │   ├── Program.cs
│   │   └── appsettings.*.json
│   ├── {Component}.UnitTests/
│   ├── {Component}.ServiceTests.Mocked/
│   └── {Component}.TestCommon/
├── SyntheticSmokeTestScript/
├── Dockerfile
└── docker-compose.yml
```

> For combo repos (Web App + Web BFF), both structures coexist in the same repository.

---

## Repository Naming

> **Note**: When the repo is a combo (Web App + Web BFF), both the Web App principles and
> the Web BFF principles in this file apply to their respective parts of the codebase.

---

## Engineering Best Known Methods

These are SHOULD-level practices that reduce common failure modes in Web App components.
They do not block merges but are expected by default; deviations should be noted in the PR.

### Custom Hook Pattern

State and side-effect logic that depends on external services, browser APIs, or cross-component
coordination MUST live in custom hooks under `src/hooks/`. Components SHOULD import hooks and
render — they MUST NOT contain inline `fetch()` calls, `localStorage` access, or `setTimeout`
logic. Name hooks `use{Domain}{Behavior}` (e.g., `useVehicleSearch`, `useFeatureToggle`).

### Error Boundary per Route

Each top-level route component MUST be wrapped by an `ErrorBoundary` that renders a recovery
UI when a render error occurs. Route-level boundaries prevent a crash in one section from
bringing down the entire application and provide users with targeted recovery options.

### Stable React Keys in Dynamic Lists

Never use array index as a React `key` for dynamic lists (items that can be added, removed, or
reordered). Use stable unique IDs from the data (e.g., `vehicleId`, `consignmentId`). Index
keys are acceptable only for purely static, never-reordered lists.

### Memoization Discipline

Use `useMemo` and `useCallback` only when a profiling measurement (React DevTools Profiler)
confirms unnecessary re-renders at scale. Wrapping everything in `useMemo` by default obscures
render bugs and adds maintenance cost. `React.memo` on a component is appropriate when its
parent re-renders frequently and the child consistently receives stable props.

### CSS Scoping

Styles MUST be scoped to their component. Choose one approach per repository:

**CSS Modules (Recommended for new projects)**:
- Use `.module.css` files co-located with components
- Provides compile-time safety and automatic scoping
- Example: `import styles from './Button.module.css'`

**Material-UI makeStyles (Accepted for combo repos with M-UI)**:
- Use `makeStyles` hook with TypeScript
- Co-locate styles in `{Component}.Style.tsx` files
- Support props-based dynamic styling via `StyleProps` interface
- Example:
  ```typescript
  const useStyles = makeStyles<Theme, StyleProps>((theme) =>
    createStyles({
      root: {
        padding: ({ isMobile }) => (isMobile ? '8px' : '16px'),
      },
    })
  );
  ```

Global stylesheets MUST contain only design tokens, resets, and typography scales. Never add
component-specific selectors to a global stylesheet; this prevents naming conflicts and
unintended cascade effects across the application.

### Responsive Design

All UI components MUST be responsive across mobile, tablet, and desktop viewports. Follow these
breakpoint conventions (based on Material-UI and industry standards):

**Standard Breakpoints**:
- **Mobile**: < 681px (smallest supported: 375px)
- **Tablet**: 681px - 1024px
- **Desktop**: > 1024px

**Implementation Patterns**:

1. **CSS Modules with Media Queries**:
   ```css
   .container {
     padding: 16px;
   }
   
   @media (max-width: 680px) {
     .container {
       padding: 8px;
     }
   }
   ```

2. **Material-UI useMediaQuery Hook**:
   ```typescript
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down(681), { noSsr: true });
   ```

3. **Custom Responsive Hook** (recommended for consistency):
   ```typescript
   export const useResponsive = () => {
     const theme = useTheme();
     return {
       isMobile: useMediaQuery(theme.breakpoints.down(681), { noSsr: true }),
       isTablet: useMediaQuery(theme.breakpoints.between(681, 1024)),
       isDesktop: useMediaQuery(theme.breakpoints.up(1024)),
     };
   };
   ```

**Props-based Responsive Styling**:
- Pass `isMobile`, `isTablet`, or `isFullWidthDevice` as props when component logic differs by viewport
- Use conditional rendering for significantly different mobile vs desktop UX
- Prefer CSS-based responsive design over JavaScript when possible

**Touch-friendly Targets**:
- Mobile tap targets MUST be at least 48x48px
- Increase fontSize to 16px on mobile to prevent auto-zoom on iOS
- Add appropriate spacing (min 8px) between interactive elements

**Testing Requirements**:
- Test on Chrome DevTools device emulator (iOS and Android)
- Verify layouts at 375px (iPhone SE), 768px (iPad), 1024px+ (desktop)
- Ensure no horizontal scroll on any breakpoint

