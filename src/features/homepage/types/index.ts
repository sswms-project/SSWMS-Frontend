export interface DashboardMetric {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: string
}

export interface WarehouseStats {
  id: string
  name: string
  totalCapacity: number
  usedCapacity: number
  activeOrders: number
  staffCount: number
}

export interface QuickAction {
  id: string
  label: string
  icon: string
  href: string
  description: string
}

export interface StaffTask {
  id: string
  type: 'Picking' | 'Packing' | 'Putaway'
  sku: string
  location: string
  dueTime: string
  status: 'pending' | 'in_progress' | 'completed'
}

export interface AppNotification {
  id: string
  title: string
  description: string
  timestamp: string
  read: boolean
}

export interface RecentOperation {
  id: string
  type: 'inbound' | 'transfer' | 'alert' | 'audit'
  title: string
  description: string
  timestamp: string
  status: 'completed' | 'processing' | 'flagged' | 'scheduled'
}
