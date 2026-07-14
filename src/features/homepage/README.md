# Homepage Feature

Role-based operations dashboards for the SSWMS system, each on its own route.

## Routes

| Role                        | Route                |
| --------------------------- | -------------------- |
| Tenant Owner / System Admin | `/dashboard/tenant`  |
| Warehouse Manager           | `/dashboard/manager` |
| Warehouse Staff             | `/dashboard/staff`   |

`/dashboard` itself renders `DashboardRedirect`, which reads the logged-in user's role and replaces the URL with the route above. Each role route is wrapped in `RoleGuard`, which redirects a user to their own dashboard if they land on a route that doesn't match their role.

## Structure

```
src/features/homepage/
  ├── components/
  │   ├── DashboardRedirect.tsx          # /dashboard entry: redirects by role
  │   ├── RoleGuard.tsx                  # Blocks/redirects mismatched roles
  │   ├── TenantOwnerDashboardPage.tsx    # RoleGuard + TenantOwnerDashboard
  │   ├── WarehouseManagerDashboardPage.tsx
  │   ├── WarehouseStaffDashboardPage.tsx
  │   ├── TenantOwnerDashboard.tsx        # Multi-warehouse view + warehouse filter
  │   ├── WarehouseManagerDashboard.tsx   # Single-warehouse operational view
  │   ├── WarehouseStaffDashboard.tsx     # Task-only view, no business figures
  │   ├── MetricCard.tsx
  │   ├── LogisticsFluxChart.tsx
  │   ├── RecentOperationsTable.tsx
  │   ├── AlertCard.tsx
  │   ├── LowStockTable.tsx
  │   ├── StaffTaskTable.tsx
  │   ├── QuickActionsSection.tsx
  │   ├── WarehouseStatsCard.tsx
  │   ├── WarehouseFilter.tsx             # Tenant-only warehouse selector
  │   ├── FadeIn.tsx                      # Shared entrance-animation wrapper (framer-motion)
  │   └── index.ts
  ├── types/index.ts
  ├── utils/
  │   ├── sample-data.ts
  │   └── role-routes.ts                  # role -> dashboard route mapping
  └── README.md
```

The shared `NotificationBell` (bell icon with unread badge, shown for all roles) lives in `src/components/NotificationBell.tsx` since it's mounted in the app-level private layout header, not a homepage-specific screen.

## Role Differences

### Tenant Owner (`/dashboard/tenant`)

Company-wide view: Total Products, Total Inventory, Pending Orders, Daily Revenue. Includes a warehouse filter (`WarehouseFilter`) to scope the "Warehouse Capacity" section to a single facility or all of them. Shows the AI Logistics Flux chart, recent operations, low-stock table, and per-warehouse capacity cards.

### Warehouse Manager (`/dashboard/manager`)

Same layout shape as Tenant Owner but scoped to a single warehouse — no cross-warehouse aggregation, no filter, no revenue figure.

### Warehouse Staff (`/dashboard/staff`)

Deliberately excludes company/business statistics (no revenue, no inventory value, no multi-warehouse data). Shows only task-focused metrics (Tasks Assigned Today, Tasks Completed, Pending Tasks, My Accuracy), a "Next Task" alert, quick actions (Start Next Task, Scan Item, Report Issue, My Schedule), and `StaffTaskTable` listing their own assigned tasks.

## Data Types (`types/index.ts`)

- `DashboardMetric` — label/value/change for KPI cards
- `WarehouseStats` — capacity, orders, staff count per warehouse
- `QuickAction` — quick-action button (label, icon, href)
- `StaffTask` — a staff member's assigned task (type, sku, location, status)
- `AppNotification` — bell dropdown notification (title, description, read state)

## Sample Data (`utils/sample-data.ts`)

All dashboards currently render hardcoded sample data — metrics, chart data, recent operations, low-stock items, staff tasks, and notifications. Replace with React Query hooks when the backend endpoints exist; keep the same shapes so components don't need to change.

## Animation

- `FadeIn` (framer-motion) staggers each dashboard's sections into view on mount — used by `TenantOwnerDashboard`, `WarehouseManagerDashboard`, and `WarehouseStaffDashboard`.
- `PageTransition` (`src/components/PageTransition.tsx`) fades between routes inside the private layout, so switching between dashboard/warehouses/inventory/orders/delivery feels smooth.
- `MetricCard` and `WarehouseStatsCard` get a subtle ring highlight on hover; table rows use `transition-colors` on hover.
- `NotificationBell`'s unread badge has a ping pulse to draw attention.
- `tw-animate-css` is imported in `src/app/index.css`, which activates the `animate-in`/`data-[state=...]` open/close transitions already wired into the shadcn/ui primitives (dropdown, select, dialog, popover, etc.) across the whole app.
