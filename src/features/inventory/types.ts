export type InventoryTransactionType = 'GoodsReceipt' | 'GoodsIssue' | 'Adjustment' | 'CycleCount'

export interface InventoryItem {
  id: string
  tenantId: string
  productId: string
  sku: string
  productName: string
  warehouseId: string
  warehouseName: string
  availableQuantity: number
  reservedQuantity: number
  minStock: number
  updatedAt: string
}

export interface InventoryTransaction {
  id: string
  tenantId: string
  productId: string
  warehouseId: string
  quantity: number
  type: InventoryTransactionType
  reason: string
  createdByUserId: string
  createdAt: string
}
