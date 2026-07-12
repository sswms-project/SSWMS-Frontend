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
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-slate-50"
        aria-expanded={expanded}
      >
        <ShieldCheck
          className={cn(
            'size-5 shrink-0',
            role.isSystemRole ? 'text-emerald-600' : 'text-slate-400'
          )}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900">{role.roleName}</p>
            {role.isSystemRole && (
              <Badge variant="secondary" className="text-xs">
                System
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-xs text-slate-500">{role.permissions.length} quyền đã gán</p>
        </div>
        {expanded ? (
          <ChevronDown className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
        ) : (
          <ChevronRight className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-slate-100">
          <RolePermissionEditor role={role} />
        </div>
      )}
    </article>
  )
}
