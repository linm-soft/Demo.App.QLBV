# Feature Spec: Help & Documentation System

> **📖 AI Implementation Note:** Before implementing this feature, read [AI Implementation Guide](../rules/AI-IMPLEMENTATION-GUIDE.md) for standards and mandatory requirements.

---

**Feature ID**: HELP-014  
**Priority**: Medium  
**Status**: Ready for Implementation  
**Last Updated**: March 25, 2026

---

## 📋 Overview

Comprehensive in-app help system with searchable documentation, video tutorials, FAQs, and contextual help. Reduces support burden and improves user onboarding.

**Key Capabilities:**
- Searchable knowledge base
- Categorized help articles
- Video tutorials
- Interactive walkthroughs
- FAQs with quick answers
- Contextual help (tooltips, inline guides)
- Contact support form
- User feedback system

---

## 👤 User Stories

### US-HELP-001: Browse Help Center
**As a** User  
**I want to** browse help documentation  
**So that** I can learn how to use features

**Acceptance Criteria:**
- ✅ Help Center homepage with categories
- ✅ Categories: Getting Started, Tickets, Tasks, Reports, Settings, Troubleshooting
- ✅ Each category: list of articles
- ✅ Article: title, summary, read time, last updated
- ✅ Popular articles highlighted
- ✅ Recently updated section
- ✅ Breadcrumb navigation

### US-HELP-002: Search Help Articles
**As a** User  
**I want to** search for specific help topics  
**So that** I quickly find answers

**Acceptance Criteria:**
- ✅ Prominent search box on help page
- ✅ Search: title, content, tags
- ✅ Instant search suggestions (autocomplete)
- ✅ Results: relevance-sorted
- ✅ Highlight search terms in results
- ✅ Filter results by category
- ✅ "No results" message with contact support option

### US-HELP-003: Read Help Article
**As a** User  
**I want to** read detailed help articles  
**So that** I understand features completely

**Acceptance Criteria:**
- ✅ Article sections:
  - Title, description
  - Table of contents (for long articles)
  - Step-by-step instructions with screenshots
  - Video tutorial (if available)
  - Related articles
  - Helpful rating ("Was this helpful? Yes/No")
- ✅ Print-friendly view
- ✅ Share article link
- ✅ Bookmark article (saved to profile)

### US-HELP-004: Watch Video Tutorials
**As a** User  
**I want** video tutorials  
**So that** I learn visually

**Acceptance Criteria:**
- ✅ Video library organized by category
- ✅ Thumbnails, durations, view counts
- ✅ Embedded player (YouTube/Vimeo)
- ✅ Playback controls: speed, quality, subtitles
- ✅ Related videos section
- ✅ Comments/questions on videos

### US-HELP-005: Get Contextual Help
**As a** User  
**I want** help while using features  
**So that** I don't need to leave the page

**Acceptance Criteria:**
- ✅ "?" icon next to complex features
- ✅ Hover: tooltip with brief explanation
- ✅ Click: popover with detailed help + link to full article
- ✅ Guided tour: step-by-step walkthrough for new users
- ✅ Optional: interactive demo mode

### US-HELP-006: View FAQs
**As a** User  
**I want** quick answers to common questions  
**So that** I save time

**Acceptance Criteria:**
- ✅ FAQ page with expandable Q&A
- ✅ Categories: Account, Tickets, Tasks, Troubleshooting
- ✅ Search within FAQs
- ✅ "Was this helpful?" rating
- ✅ Link to full article if more detail needed
- ✅ "Still need help? Contact us"

### US-HELP-007: Contact Support
**As a** User  
**I want** to contact support  
**So that** I get personalized help

**Acceptance Criteria:**
- ✅ Contact form with fields:
  - Subject, category (dropdown)
  - Detailed description
  - Attachments (screenshots)
  - Priority (optional)
- ✅ Form validation
- ✅ Submit → creates support ticket
- ✅ Confirmation email sent
- ✅ Ticket tracking link provided
- ✅ Estimated response time shown

### US-HELP-008: Provide Feedback
**As a** User  
**I want** to suggest improvements  
**So that** the help content gets better

**Acceptance Criteria:**
- ✅ Feedback button on every article
- ✅ Quick feedback: thumbs up/down
- ✅ Detailed feedback: text field
- ✅ Anonymous or identified (user choice)
- ✅ Admin sees feedback dashboard
- ✅ Track article helpfulness scores

---

## 📚 Help Content Structure

### Categories

1. **Getting Started**
   - Welcome to QLCV
   - Quick start guide
   - System overview
   - Navigation guide
   - Dashboard explained

2. **Tickets**
   - Creating a ticket
   - Ticket statuses explained
   - Resolving tickets
   - SLA tracking
   - Commenting and collaboration

3. **Tasks**
   - Task assignment types
   - Working on tasks
   - Task pool (claiming tasks)
   - Progress tracking
   - Task completion and approval

4. **Approvals**
   - Approval workflow
   - Approving/rejecting items
   - Delegation
   - Escalation process

5. **Reports & Analytics**
   - Viewing reports
   - Personal statistics
   - Exporting data

6. **Settings**
   - Profile management
   - Notification preferences
   - Display settings
   - Security settings

7. **Troubleshooting**
   - Login issues
   - Notification problems
   - Performance tips
   - Browser compatibility

---

## 💾 Data Model

```typescript
interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string | null;
  
  summary: string;
  content: string;  // Markdown or HTML
  
  tags: string[];
  readTimeMinutes: number;
  
  author: string;
  publishedAt: DateTime;
  updatedAt: DateTime;
  
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  
  relatedArticles: string[];  // Article IDs
  videoUrl: string | null;
  attachments: string[];
}

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  
  videoUrl: string;  // YouTube/Vimeo embed URL
  thumbnailUrl: string;
  durationSeconds: number;
  
  publishedAt: DateTime;
  viewCount: number;
  
  relatedArticles: string[];
}

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;  // Markdown
  
  relatedArticleId: string | null;
  
  order: number;
  viewCount: number;
  helpfulCount: number;
}

interface SupportTicket {
  id: string;
  userId: string;
  
  subject: string;
  category: string;
  description: string;
  attachments: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  
  createdAt: DateTime;
  resolvedAt: DateTime | null;
}

interface ArticleFeedback {
  id: string;
  articleId: string;
  userId: string | null;  // null if anonymous
  
  helpful: boolean;
  comments: string | null;
  
  createdAt: DateTime;
}
```

---

## 🎨 UI Components

### Help Center Page (`help.html`)

```
┌──────────────────────────────────────────────────────────┐
│  ❓ Trung tâm Trợ giúp                 [🔔] [👤]         │
├──────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐  │
│  │ 🔍 [Tìm kiếm trợ giúp...___________________] [Go] │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ── Popular Topics ─────────────────────────────────── │
│  🎫 How to create a ticket                              │
│  ✅ Working with tasks                                  │
│  📊 Understanding your dashboard                        │
│  🔔 Managing notifications                              │
│                                                           │
│  ── Categories ─────────────────────────────────────── │
│  ┌──────────┬──────────┬──────────┬──────────┐        │
│  │ 🚀       │ 🎫       │ ✅       │ 👍       │        │
│  │ Getting  │ Tickets  │ Tasks    │ Approvals│        │
│  │ Started  │ (12)     │ (15)     │ (8)      │        │
│  │ (8)      │          │          │          │        │
│  ├──────────┼──────────┼──────────┼──────────┤        │
│  │ 📊       │ ⚙️       │ 🔧       │ 💬       │        │
│  │ Reports  │ Settings │ Trouble  │ Contact  │        │
│  │ (10)     │ (7)      │ shooting │ Support  │        │
│  │          │          │ (9)      │          │        │
│  └──────────┴──────────┴──────────┴──────────┘        │
│                                                           │
│  ── Video Tutorials ────────────────────────────────── │
│  ┌──────────┬──────────┬──────────┐                   │
│  │ [Thumb]  │ [Thumb]  │ [Thumb]  │                   │
│  │ Getting  │ Creating │ Task     │                   │
│  │ Started  │ Tickets  │ Pool     │                   │
│  │ 5:23     │ 3:45     │ 4:12     │                   │
│  └──────────┴──────────┴──────────┘                   │
│  [View All Videos →]                                   │
│                                                           │
│  ── FAQ ───────────────────────────────────────────── │
│  ❓ How do I reset my password?                        │
│  ❓ How do I change notification settings?              │
│  ❓ Why can't I see certain features?                   │
│  [View All FAQs →]                                     │
│                                                           │
│  ── Still need help? ──────────────────────────────── │
│  [📧 Contact Support]  [💬 Live Chat]                 │
└──────────────────────────────────────────────────────────┘
```

### Help Article View

```
┌──────────────────────────────────────────────────────────┐
│  Help Center → Tickets → Creating a Ticket              │
├──────────────────────────────────────────────────────────┤
│  How to Create a Support Ticket                          │
│  Updated: March 20, 2026 • 3 min read • 487 views       │
│  [🔖 Bookmark] [🔗 Share] [🖨️ Print]                    │
│                                                           │
│  Table of Contents:                                      │
│  1. Overview                                             │
│  2. Step-by-step guide                                   │
│  3. Best practices                                       │
│  4. Troubleshooting                                      │
│                                                           │
│  ── Article Content ───────────────────────────────────  │
│  ## Overview                                             │
│  Support tickets are used to report issues...            │
│                                                           │
│  ## Step-by-step guide                                   │
│  1. Navigate to Tickets → Create New                    │
│  2. Fill in the form:                                    │
│     [Screenshot: Ticket form]                            │
│  3. Click "Submit"                                       │
│                                                           │
│  [▶️ Watch Video Tutorial (3:45)]                        │
│                                                           │
│  ── Related Articles ──────────────────────────────────  │
│  • Ticket statuses explained                             │
│  • SLA tracking for tickets                              │
│  • Resolving tickets                                     │
│                                                           │
│  ── Was this helpful? ─────────────────────────────────  │
│  [👍 Yes (234)] [👎 No (12)]                            │
│  [💬 Provide additional feedback]                        │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints

### GET /api/help/articles
Get list of help articles

**Query Parameters:**
- `category` (string)
- `search` (string)
- `limit`, `offset`

**Response:**
```json
{
  "articles": [
    {
      "id": "art_123",
      "title": "How to Create a Ticket",
      "category": "Tickets",
      "summary": "Learn how to submit support requests...",
      "readTimeMinutes": 3,
      "viewCount": 487,
      "helpfulCount": 234,
      "slug": "how-to-create-ticket"
    }
  ],
  "total": 45
}
```

### GET /api/help/articles/:slug
Get single article by slug

**Response:**
```json
{
  "article": {
    "id": "art_123",
    "title": "How to Create a Ticket",
    "content": "## Overview\n\nSupport tickets...",
    "videoUrl": "https://youtube.com/embed/abc123",
    "relatedArticles": ["art_124", "art_125"]
  }
}
```

### POST /api/help/articles/:id/feedback
Submit article feedback

**Request:**
```json
{
  "helpful": true,
  "comments": "Very clear explanation!"
}
```

### GET /api/help/faqs
Get all FAQs

**Query Parameters:**
- `category` (string)

### POST /api/support/tickets
Create support ticket

**Request:**
```json
{
  "subject": "Cannot login",
  "category": "ACCOUNT",
  "description": "I forgot my password...",
  "priority": "HIGH"
}
```

---

## 🎯 Business Rules

### BR-HELP-001: Article Updates
- Reviewed monthly for accuracy
- Flagged articles (low helpful score) prioritized for updates
- Version control for article history

### BR-HELP-002: Support Tickets
- Response time SLA: 24h for normal, 4h for urgent
- Auto-assign to support team
- Track resolution time

### BR-HELP-003: Search Ranking
- Relevance: title match > content match
- Boost: view count, helpful score
- Fresh content: recent articles ranked higher

### BR-HELP-004: Feedback
- Min 10 views before showing helpfulness score
- Anonymous feedback allowed
- Detailed feedback reviewed by content team weekly

---

## ✅ Acceptance Testing

### Test Scenario 1: Find Help Article
1. Navigate to Help Center
2. Enter search "create ticket"
3. ✅ Relevant articles shown
4. Click first result
5. ✅ Article loads with full content
6. ✅ Related articles suggested
7. ✅ Video tutorial embedded

### Test Scenario 2: Submit Feedback
1. Read help article
2. Scroll to bottom
3. Click "👍 Yes" for helpful
4. ✅ Vote counted (+1)
5. ✅ Thank you message shown
6. Enter detailed feedback
7. ✅ Feedback submitted successfully

### Test Scenario 3: Contact Support
1. Click "Contact Support"
2. Fill form: subject, description, attach screenshot
3. Select priority HIGH
4. Submit
5. ✅ Support ticket created
6. ✅ Confirmation email received
7. ✅ Ticket tracking link works

---

## 🚀 Implementation Notes

### Frontend
- Markdown renderer for article content
- Syntax highlighting for code blocks
- Lazy load videos (improve performance)
- Client-side search with fuzzy matching
- Responsive design (mobile-friendly)

### Backend
- Full-text search index (Elasticsearch or PostgreSQL)
- Article versioning (track changes)
- Analytics: track views, search queries, helpful votes
- Scheduled job: update popular articles weekly

### Content Management
- Admin CMS for creating/editing articles
- Markdown editor with preview
- Image upload and management
- Version control (Git-like)
- Publish/unpublish workflow

---

## 📚 Related Specs
- [08-authentication.md](./08-authentication.md) - Password reset help
- [13-settings.md](./13-settings.md) - Settings help articles

---

## 📝 Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-03-25 | System | Initial spec created from HTML analysis |
