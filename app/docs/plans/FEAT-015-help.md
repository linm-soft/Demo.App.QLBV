# Implementation Plan: Help & Documentation

> **📖 MANDATORY:** Read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) before starting. Documentation updates are NOT optional.

---

**Feature ID:** FEAT-015  
**Priority:** Medium  
**Status:** 📝 Not Started  
**Created:** 2026-03-25  
**Related Spec:** [14-help-documentation.md](../specs/14-help-documentation.md)

---

## 🔔 AI Implementation Notes

**IMPORTANT:** Before implementing any feature, always:
1. ✅ Check the `app/` folder for original HTML reference files
2. ✅ Reference: `app/help.html` and `app/help-workflows.html` for this feature
3. ✅ Compare implementation with original layout and functionality
4. ✅ Maintain visual consistency with HTML prototype
5. ✅ Match CSS styling from `app/css/styles.css`
6. ✅ Update status in this document after completion

**Mock Data Guidelines:**
- Create mock data in separate files: `src/mocks/help.mock.ts`
- Mock data should match the structure and variety shown in HTML demos
- Include realistic Vietnamese names, departments, and scenarios
- Maintain consistency with data models in `src/models/`

**Verification Status:** ⬜ Not yet verified

---

## 📋 Overview

In-app help center with searchable documentation, video tutorials, FAQs, workflow diagrams, and support contact.

---

## 🎯 Acceptance Criteria

- [ ] Help Center homepage with categories
- [ ] Search with autocomplete
- [ ] Popular topics section
- [ ] Category grid (8 categories)
- [ ] **Workflows page with interactive Mermaid diagrams**
- [ ] **Workflow tabs: Tickets vs Tasks**
- [ ] **Zoom controls for workflow diagrams**
- [ ] **Workflow steps tables with role assignments**
- [ ] **Escalation rules and best practices sections**
- [ ] Video tutorials library
- [ ] FAQ page with expandable Q&A
- [ ] Article view with full content, TOC, related articles
- [ ] "Was this helpful?" feedback buttons
- [ ] Contact support form
- [ ] Contextual help tooltips (? icons)
- [ ] Bookmark articles
- [ ] Print-friendly article view
- [ ] Share article link

---

## 📦 Categories

1. Getting Started
2. Tickets
3. Tasks
4. Approvals
5. Reports
6. Settings
7. Troubleshooting
8. Contact Support

---

## 📦 Main Components

1. **HelpCenterPage** - Homepage
2. **HelpSearch** - Search with autocomplete
3. **CategoryGrid** - Category cards
4. **WorkflowsPage** ⭐ NEW - Interactive workflow diagrams
5. **WorkflowTabs** ⭐ NEW - Switch between Tickets/Tasks workflows
6. **WorkflowDiagram** ⭐ NEW - Mermaid diagram renderer with zoom
7. **WorkflowStepsTable** ⭐ NEW - Detailed steps and roles
8. **ZoomControls** ⭐ NEW - Zoom in/out/reset for diagrams
9. **ArticleListPage** - Articles in category
10. **ArticleView** - Full article display
11. **ArticleTOC** - Table of contents
12. **VideoLibrary** - Video tutorials
13. **VideoPlayer** - Embedded player
14. **FAQPage** - FAQ list
15. **FAQItem** - Expandable Q&A
16. **ContactSupportForm** - Support ticket form
17. **FeedbackButtons** - Helpful/not helpful
18. **ContextualTooltip** - Inline help component

---

## ⏱️ Time Estimate: **16 hours** (added 4 hours for workflows feature)

---

## 🔌 API Endpoints

- `GET /api/help/articles`
- `GET /api/help/articles/:slug`
- `POST /api/help/articles/:id/feedback`
- `GET /api/help/faqs`
- `POST /api/support/tickets`
- `GET /api/help/search`

---

- **Mermaid diagram renderer (mermaid)** ⭐ NEW

---

## 🔧 Implementation Steps

### Phase 1: Setup & Infrastructure (1 hour)
- [ ] Install dependencies (mermaid, react-markdown, react-player)
- [ ] Create Redux slice for help/articles
- [ ] Create base page layout components
- [ ] Setup routing for help pages

### Phase 2: Help Center Homepage (2 hours)
- [ ] Create HelpCenterPage component
- [ ] Create HelpSearch with autocomplete
- [ ] Create CategoryGrid component
- [ ] Add popular topics section
- [ ] Test navigation between sections

### Phase 3: Workflows Page ⭐ (4 hours)
- [ ] Create WorkflowsPage component
- [ ] Implement WorkflowTabs (Tickets/Tasks)
- [ ] Integrate Mermaid.js for diagram rendering
- [ ] Create WorkflowDiagram component with zoom
- [ ] Create ZoomControls component
- [ ] Create WorkflowStepsTable component
- [ ] Add escalation rules section
- [ ] Add best practices section
- [ ] Test diagram rendering and zoom
- [ ] Test tab switching
- [ ] Ensure responsive layout

### Phase 4: Article System (3 hours)
- [ ] Create ArticleListPage component
- [ ] Create ArticleView component
- [ ] Create ArticleTOC (table of contents)
- [ ] Implement markdown rendering
- [ ] Add syntax highlighting for code blocks
- [ ] Add related articles section
- [ ] Test article navigation

### Phase 5: FAQ Page (2 hours)
- [ ] Create FAQPage component
- [ ] Create FAQItem expandable component
- [ ] Add search/filter for FAQs
- [ ] Add category filtering
- [ ] Test expand/collapse animations

### Phase 6: Video Library (2 hours)
- [ ] Create VideoLibrary component
- [ ] Create VideoPlayer component
- [ ] Integrate react-player
- [ ] Add video thumbnails
- [ ] Add video categories
- [ ] Test video playback

### Phase 7: Interactive Features (1.5 hours)
- [ ] Create FeedbackButtons component
- [ ] Create ContextualTooltip component
- [ ] Add bookmark functionality
- [ ] Add print-friendly view
- [ ] Add share link functionality
- [ ] Test all interactive features

### Phase 8: Contact Support (1.5 hours)
- [ ] Create ContactSupportForm component
- [ ] Add form validation
- [ ] Connect to support ticket creation
- [ ] Add file attachment support
- [ ] Test form submission

### Phase 9: Integration & Testing (1 hour)
- [ ] Integrate all pages
- [ ] Test navigation flow
- [ ] Test search functionality
- [ ] Test responsive behavior
- [ ] Fix bugs

### Phase 10: API Integration ⭐ (2 hours)
- [ ] Integrate `GET /api/help/articles` for article listing
- [ ] Integrate `GET /api/help/articles/:slug` for article details
- [ ] Integrate `POST /api/help/articles/:id/feedback` for feedback
- [ ] Integrate `GET /api/help/faqs` for FAQ data
- [ ] Integrate `POST /api/support/tickets` for support form
- [ ] Integrate `GET /api/help/search` for search autocomplete
- [ ] Add loading states for all API calls
- [ ] Add error handling and retry logic
- [ ] Test with real API endpoints
- [ ] Replace mock data with API data

---

## 📊 Progress Tracking

**Total Estimated Time:** 16 hours  
**Time Spent:** 0 hours  
**Progress:** 0% (0/18 components)

### Component Checklist
- [ ] HelpCenterPage
- [ ] HelpSearch
- [ ] CategoryGrid
- [ ] WorkflowsPage ⭐
- [ ] WorkflowTabs ⭐
- [ ] WorkflowDiagram ⭐
- [ ] WorkflowStepsTable ⭐
- [ ] ZoomControls ⭐
- [ ] ArticleListPage
- [ ] ArticleView
- [ ] ArticleTOC
- [ ] VideoLibrary
- [ ] VideoPlayer
- [ ] FAQPage
- [ ] FAQItem
- [ ] ContactSupportForm
- [ ] FeedbackButtons
- [ ] ContextualTooltip

---

## 📚 Reference Documentation

**Workflow Documentation:**
- [WORKFLOW_ANALYSIS.md](../WORKFLOW_ANALYSIS.md) - Complete workflow details
- [02-ticket-management.md](../specs/02-ticket-management.md) - Ticket workflow spec
- [03-task-management.md](../specs/03-task-management.md) - Task workflow spec
- [help-workflows.html](../../app/help-workflows.html) - HTML reference implementation

**Workflow Data Structure:**
The workflows page should load workflow definitions including:
- Mermaid diagram definitions (flowchart syntax)
- Step-by-step tables with roles and actions
- Status definitions and transitions
- Escalation rules
- Best practices

Consider creating a static workflow data file or fetching from API if workflow content will be managed dynamically.
## 🔌 Libraries

- Markdown renderer (react-markdown)
- Syntax highlighting (prism.js)
- Video embed (react-player)
