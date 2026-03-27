# FEAT-001 Integration Testing Guide

This document provides a comprehensive guide for testing the Tickets List feature with mock data.

## Overview

The feature is now fully integrated with mock data for development testing. Mock data will be automatically used when:
- Running in development mode (`npm run dev`)
- No `VITE_API_URL` environment variable is set

## Mock Data

### Tickets (10 samples)
- **TKT-001**: Emergency priority, In Progress, SLA breached (15 minutes remaining)
- **TKT-002**: High priority, In Progress, Warning SLA (2h 15m)
- **TKT-003**: Medium priority, New, Safe SLA (18h)
- **TKT-004**: Low priority, Resolved (completed task)
- **TKT-005**: Medium priority, New, no assignee
- **TKT-006**: Low priority, New, no assignee  
- **TKT-007**: High priority, In Progress, Danger SLA (5h)
- **TKT-008**: Medium priority, Resolved (completed)
- **TKT-009**: Low priority, Closed (completed)
- **TKT-010**: High priority, Resolved (completed)

### Users (11 samples)
- Đinh Bộ Lĩnh (Kỹ thuật) - user-1
- Nguyễn Văn A (Hỗ trợ IT) - user-2
- Trần Thị B (Khoa Nội) - user-3
- Lê Văn C (Cơ sở) - user-4
- Phạm Thị D (Hành chính, Manager) - user-5
- Hoàng Văn E (Khoa Ngoại) - user-6
- Đỗ Thị F (Hành chính) - user-7
- Vũ Thị G (Kho, Manager) - user-8
- Ngô Văn H (Xét nghiệm) - user-9
- Mai Văn I (Cơ sở) - user-10
- Lý Thị K (Dược) - user-11

## Testing Checklist

### 1. Initial Page Load
- [ ] Navigate to `/tickets` (dashboard-staff.html link)
- [ ] Verify 5 stat cards display correct counts:
  - All (10 tickets)
  - Submitted/New (3 tickets)
  - In Progress (3 tickets)
  - Resolved (3 tickets)
  - Closed (1 ticket)
- [ ] Verify ticket table populates with 10 tickets
- [ ] Check loading skeleton appears briefly during data fetch

### 2. Ticket Table Display
- [ ] Emergency priority badge shows red (`TKT-001`)
- [ ] High priority badge shows orange (`TKT-002`, `TKT-007`, `TKT-010`)
- [ ] Medium priority badge shows blue (`TKT-003`, `TKT-008`)
- [ ] Low priority badge shows gray (`TKT-004`, `TKT-006`, `TKT-009`)
- [ ] SLA badge colors:
  - **Danger** (red): `TKT-001`, `TKT-007`
  - **Warning** (yellow): `TKT-002`
  - **Safe** (green): `TKT-003`, `TKT-004`, `TKT-006`, `TKT-008`, `TKT-009`, `TKT-010`
- [ ] Breached icon shows for `TKT-001` (already past SLA)
- [ ] Assignee avatars/names display correctly
- [ ] Unassigned tickets (`TKT-005`, `TKT-006`) show "Chưa phân công"

### 3. Filters Testing

#### Search
- [ ] Search "máy in" → Returns `TKT-001`
- [ ] Search "phần mềm" → Returns `TKT-002`, `TKT-007`
- [ ] Search "TKT-003" → Returns `TKT-003`
- [ ] Clear search → All tickets visible

#### Priority Filter
- [ ] Select "Khẩn cấp" → Shows only `TKT-001`
- [ ] Select "Cao" → Shows `TKT-002`, `TKT-007`, `TKT-010`
- [ ] Select "Trung bình" → Shows `TKT-003`, `TKT-008`
- [ ] Select "Thấp" → Shows `TKT-004`, `TKT-006`, `TKT-009`
- [ ] Clear filter → All tickets visible

#### Status Filter
- [ ] Select "Mới" → Shows `TKT-003`, `TKT-005`, `TKT-006`
- [ ] Select "Đang xử lý" → Shows `TKT-001`, `TKT-002`, `TKT-007`
- [ ] Select "Đã hoàn thành" → Shows `TKT-004`, `TKT-008`, `TKT-010`
- [ ] Select "Đã đóng" → Shows `TKT-009`
- [ ] Clear filter → All tickets visible

#### Combined Filters
- [ ] Search "máy" + Priority "Khẩn cấp" → Returns `TKT-001`
- [ ] Status "Mới" + Priority "Thấp" → Returns `TKT-006`

### 4. Create Ticket Form
- [ ] Click "+ Yêu cầu mới" button
- [ ] Slideout appears from right with white background
- [ ] All form fields render correctly:
  - Tiêu đề (title) - required
  - Mô tả (description) - required  
  - Loại yêu cầu (type) - dropdown
  - Vị trí (location) - text input
  - Mức độ ưu tiên (priority) - dropdown, required
  - Phòng ban (department) - dropdown, required
  - File đính kèm (attachments) - file upload area
  - Khẩn cấp checkbox
- [ ] Submit without filling required fields → Shows validation errors
- [ ] Fill all required fields → Submit → Toast success message
- [ ] New ticket appears at top of table with status "Mới"
- [ ] Slideout closes after creation
- [ ] Stats cards update (+1 to "Tất cả" and "Chờ xử lý")

### 5. Ticket Detail Slideout
- [ ] Click any ticket row (`TKT-001` recommended)
- [ ] Slideout appears with full ticket details:
  - Ticket ID and title at top
  - Creator info (avatar, name, department, date)
  - Status badge
  - Priority badge
  - SLA badge with time remaining
  - Full description
  - Assignee section (or "Chưa phân công")
  - Tags displayed as pills
  - Attachment count (if > 0)
  - Comment count (if > 0)
  - Created/Updated timestamps
- [ ] Click X button → Slideout closes
- [ ] Click outside slideout → Slideout closes
- [ ] Press Escape key → Slideout closes

### 6. Edit Ticket Form
- [ ] Click pencil icon on any ticket row (`TKT-002` recommended)
- [ ] Edit slideout appears
- [ ] All form fields pre-filled with ticket data
- [ ] Modify title: "Cài đặt phần mềm cho máy mới - CẬP NHẬT"
- [ ] Submit → Toast success message
- [ ] Ticket table updates with new title
- [ ] Slideout closes

### 7. Assign Ticket Modal
- [ ] Click "Phân công" button on unassigned ticket (`TKT-005`)
- [ ] Modal appears with:
  - Ticket title displayed
  - User dropdown populated with 11 mock users
  - Cancel and Submit buttons
- [ ] Select user "Đinh Bộ Lĩnh - Kỹ thuật"
- [ ] Click "Phân công" → Toast success message
- [ ] Table updates showing assignee
- [ ] Modal closes
- [ ] Try without selecting user → Shows validation error

### 8. Status Update (Quick Actions)
- [ ] Click status dropdown on `TKT-005` (New status)
- [ ] Change to "Đang xử lý"
- [ ] Toast success message
- [ ] Table updates with new status
- [ ] Stats cards update (-1 from "Chờ xử lý", +1 to "Đang xử lý")
- [ ] Change `TKT-001` from "Đang xử lý" to "Đã hoàn thành"
- [ ] Verify stats update

### 9. Delete Ticket
- [ ] Click trash icon on `TKT-009`
- [ ] Confirmation modal appears
- [ ] Click "Xóa" → Toast success message
- [ ] Ticket removed from table
- [ ] Stats update (-1 from "Tất cả" and "Đã đóng")
- [ ] Only 9 tickets remain

### 10. Pagination
*Note: Currently only 10 tickets, so pagination will show page 1 of 1*
- [ ] Pagination controls visible at bottom
- [ ] Shows "Page 1 of 1"
- [ ] Previous/First buttons disabled
- [ ] Next/Last buttons disabled
- [ ] Create 15 more tickets to test multi-page behavior

### 11. Responsive Design

#### Desktop (> 1024px)
- [ ] Table layout with all columns visible
- [ ] Sidebar filters on left
- [ ] Action buttons visible on hover

#### Tablet (680px - 1024px)
- [ ] Table columns adjusted
- [ ] Some columns hidden on smaller tablets
- [ ] Filters accessible

#### Mobile (< 680px)
- [ ] Switches to card view (not table rows)
- [ ] Cards stack vertically
- [ ] Priority and status badges inline
- [ ] SLA info condensed
- [ ] Action buttons accessible via menu/dropdown

### 12. SLA Calculations
- [ ] `TKT-001`: Verify "15 phút" remaining shows correctly
- [ ] Verify SLA badge turns red for danger
- [ ] Verify breached icon appears
- [ ] `TKT-002`: Verify "2 giờ 15 phút" shows correctly
- [ ] Warning status shows yellow/orange badge
- [ ] Safe status (`TKT-003`) shows green badge

### 13. Loading States
- [ ] Refresh page → Brief skeleton loading on stats cards
- [ ] Tables show skeleton rows during initial load
- [ ] Form submit buttons show spinner during submission
- [ ] Disabled state while loading

### 14. Error Handling
To test error scenarios, temporarily modify mock data to throw errors:

- [ ] Network timeout simulation
- [ ] 404 ticket not found
- [ ] 400 validation error on create
- [ ] 500 server error
- [ ] Verify error toasts display correctly
- [ ] Forms remain in editable state after error
- [ ] Can retry after error

### 15. Toast Notifications
Verify toasts appear for:
- [ ] Ticket created successfully (green)
- [ ] Ticket updated successfully (green)
- [ ] Ticket deleted successfully (green)
- [ ] Ticket assigned successfully (green)
- [ ] Status updated successfully (green)
- [ ] Validation errors (red)
- [ ] Network errors (red)
- [ ] Toast auto-dismisses after 5 seconds
- [ ] Can manually dismiss via X button

## Performance Checks

- [ ] Initial page load < 2 seconds
- [ ] Ticket table renders without flickering
- [ ] Smooth slideout open/close animations
- [ ] No console errors in browser devtools
- [ ] No memory leaks (check after multiple operations)
- [ ] Filter/search response feels instant (< 300ms)

## Accessibility Checks

- [ ] All interactive elements keyboard accessible
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] ARIA labels on icon buttons
- [ ] Modal traps focus correctly
- [ ] Can close modals with Escape key
- [ ] Screen reader announcements for status changes

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Known Limitations (With Mock Data)

1. **File uploads**: UI ready, but files not actually uploaded (backend required)
2. **Pagination**: Need to create 20+ tickets to test multi-page behavior
3. **Real-time updates**: No WebSocket integration, changes only reflect on manual refresh
4. **Search**: Basic string matching only, no fuzzy search
5. **Department data**: Using static IDs/names, no actual department API integration

## Switching to Real API

When backend API is ready, set environment variable:

```bash
# .env.development
VITE_API_URL=http://localhost:5000/api
```

The application will automatically switch from mock data to real API calls.

## Troubleshooting

### Issue: Mock data not loading
- Check browser console for errors
- Verify `import.meta.env.DEV` is true
- Verify `VITE_API_URL` is NOT set in `.env`

### Issue: TypeScript errors
- Run `npm run build` to check for real errors
- CSS module declaration errors are non-blocking

### Issue: Filters not working
- Check Redux DevTools to see state updates
- Verify `ticketsSlice` `fetchTickets` thunk is dispatching

### Issue: Toasts not appearing
- Check `uiSlice` state in Redux DevTools
- Verify `addToast` action is dispatched

## Next Steps After Testing

Once all tests pass:
1. Document any bugs found
2. Create tickets for enhancements
3. Prepare for backend API integration
4. Plan user acceptance testing (UAT)
5. Deploy to staging environment

---

**Test Date**: _________  
**Tester**: _________  
**Browser/OS**: _________  
**Results**: ☐ Pass ☐ Fail ☐ Partial  
**Notes**: _________
