# Tiffin Box

## Current State
New project build. No existing source files.

## Requested Changes (Diff)

### Add
- Homepage with hero section and weekly menu (Mon-Sat) with day-specific food items
- Order form: parent name, phone, child name, school, class, roll number, day selection (food auto-fills), optional address
- Success confirmation after order placement
- Admin dashboard at /admin with login (admin / tiffin123)
- Admin orders table: Date, Parent Name, Phone, Child Name, School, Class, Roll No, Day, Food Item
- Search by child name or phone, filter by day or school
- Mark as Delivered and Delete actions
- Stats row (Total / Pending / Delivered) with polling

### Modify
N/A

### Remove
N/A

## Implementation Plan
- Backend: store orders in stable memory, expose CRUD methods (placeOrder, getOrders, deleteOrder, markDelivered)
- Admin auth: hardcoded credentials check on backend
- Frontend: React Router with / and /admin routes
- Weekly menu map: Monday=Dal Rice, Tuesday=Rajma Chawal, Wednesday=Chole Bhature, Thursday=Paneer Sabzi Roti, Friday=Pulao, Saturday=Biryani
- Admin polls orders every 10 seconds
