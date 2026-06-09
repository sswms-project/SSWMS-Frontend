export interface Warehouse {
  id: string
  tenantId: string
  name: string
  code: string
  address: string
  isActive: boolean
  zoneCount: number
  rackCount: number
  slotCount: number
}

export interface WarehouseZone {
  id: string
  tenantId: string
  warehouseId: string
  name: string
  code: string
}
