# Tiffin Box - School Tiffin Ordering System

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Homepage with weekly tiffin menu display (Mon-Sat)
- Order form page with full parent/child details and day/food auto-fill logic
- Admin dashboard at /admin with login (username/password)
- Admin table showing all orders with columns: Date, Parent Name, Phone, Child Name, School, Class, Roll Number, Day, Food Item
- Admin actions: delete order, mark as delivered, filter by day/school, search by child name or phone
- Real-time order updates in admin dashboard (polling)
- Order confirmation message on submission

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend (Motoko)
- Order type: { id, timestamp, parentName, phone, childName, schoolName, class_, rollNumber, day, foodItem, address, status (pending/delivered) }
- Admin credentials stored in actor (username: admin, password: tiffin123)
- Functions:
  - submitOrder(order details) -> Result
  - getOrders() -> [Order] (admin only)
  - deleteOrder(id) -> Result (admin only)
  - markDelivered(id) -> Result (admin only)
  - adminLogin(username, password) -> Bool

### Frontend
- Homepage: hero section, weekly menu grid cards, CTA to order
- Order Form page: form with day dropdown triggering food auto-fill, submission flow
- Admin Login page: simple login form
- Admin Dashboard: orders table with search, filter, delete, mark delivered
- Routing: / (home), /order, /admin (login), /admin/dashboard
- Child-friendly design: soft warm colors, rounded cards, playful typography
- Mobile-first responsive layout
