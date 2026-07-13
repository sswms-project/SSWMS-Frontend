'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { RolePermissionEditor } from './RolePermissionEditor'
import type { RoleResponse } from '../../types/admin.types'

interface RoleCardProps {
  readonly role: RoleResponse
}

export function RoleCard({ role }: RoleCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="hover:bg-muted/60 flex w-full items-center gap-3 px-5 py-4 text-left"
        aria-expanded={expanded}
      >
        <ShieldCheck
          className={cn(
            'size-5 shrink-0',
            role.isSystemRole ? 'text-primary' : 'text-muted-foreground/70'
          )}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-foreground text-sm font-semibold">{role.roleName}</p>
            {role.isSystemRole && (
              <Badge variant="secondary" className="text-xs">
                System
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {role.permissions.length} quyền đã gán
          </p>
        </div>
        {expanded ? (
          <ChevronDown className="text-muted-foreground/70 size-4 shrink-0" aria-hidden="true" />
        ) : (
          <ChevronRight className="text-muted-foreground/70 size-4 shrink-0" aria-hidden="true" />
        )}
      </button>

      {expanded && (
        <div className="border-border/60 border-t">
          <RolePermissionEditor role={role} />
        </div>
      )}
    </article>
  )
}
