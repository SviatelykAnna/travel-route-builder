import { Handle, Position, useNodeConnections } from '@xyflow/react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ColorTheme = 'violet' | 'sky' | 'rose' | 'orange';

const themeConfig: Record<
  ColorTheme,
  {
    border: string;
    ring: string;
    headerBg: string;
    divider: string;
    handle: string;
    accent: string;
  }
> = {
  violet: {
    border: 'border-violet-500',
    ring: 'ring-violet-300',
    headerBg: 'bg-violet-500',
    divider: 'border-violet-200 dark:border-violet-500/30',
    handle:
      'border-card! h-2! w-2! rounded-full! border-2! bg-violet-500! ring-1! ring-violet-500!',
    accent: 'bg-violet-400',
  },
  sky: {
    border: 'border-sky-400',
    ring: 'ring-sky-300',
    headerBg: 'bg-linear-to-r from-sky-400 to-cyan-400',
    divider: 'border-sky-200 dark:border-sky-500/30',
    handle: 'border-card! h-2! w-2! rounded-full! border-2! bg-sky-400! ring-1! ring-sky-400!',
    accent: 'bg-sky-400',
  },
  rose: {
    border: 'border-rose-400',
    ring: 'ring-rose-300',
    headerBg: 'bg-rose-500',
    divider: 'border-rose-200 dark:border-rose-500/30',
    handle: 'border-card! h-2! w-2! rounded-full! border-2! bg-rose-500! ring-1! ring-rose-500!',
    accent: 'bg-rose-400',
  },
  orange: {
    border: 'border-orange-400',
    ring: 'ring-orange-300',
    headerBg: 'bg-orange-500',
    divider: 'border-orange-200 dark:border-orange-500/30',
    handle:
      'border-card! h-2! w-2! rounded-full! border-2! bg-orange-500! ring-1! ring-orange-500!',
    accent: 'bg-orange-400',
  },
};

export interface BaseItineraryNodeProps {
  theme: ColorTheme;
  icon: ReactNode;
  label: string;
  headerRight?: ReactNode;
  name: string;
  nameRight?: ReactNode;
  description?: string;
  children?: ReactNode;
  dragging?: boolean;
  selected?: boolean;
}

export function BaseItineraryNode({
  theme,
  icon,
  label,
  headerRight,
  name,
  nameRight,
  description,
  children,
  dragging,
  selected,
}: BaseItineraryNodeProps) {
  const config = themeConfig[theme];
  const connections = useNodeConnections({ handleType: 'target' });

  const hasDetails = description || children;

  return (
    <div
      className={cn(
        'bg-card text-card-foreground relative w-50 rounded-xl border shadow-sm transition-all',
        config.border,
        !dragging && 'hover:shadow-md',
        {
          [`ring-2 ${config.ring}`]: selected && !dragging,
          'border-dashed opacity-80': dragging,
        },
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between rounded-t-xl px-3 py-1.5',
          config.headerBg,
        )}
      >
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-xs font-medium text-white/90">{label}</span>
        </div>
        {headerRight}
      </div>

      <div className="flex flex-col gap-2 px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-snug font-medium">{name}</p>
          {nameRight}
        </div>

        {hasDetails && (
          <div className={cn('flex flex-col gap-2 border-t pt-2', config.divider)}>
            {description && (
              <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                {description}
              </p>
            )}
            {children}
          </div>
        )}
      </div>

      <Handle
        isConnectable={connections.length < 1}
        position={Position.Left}
        type="target"
        className={cn(config.handle, '-left-1!')}
      />
    </div>
  );
}

export function NotesList({
  notes,
  max = 2,
  accentColor,
}: {
  notes: string[];
  max?: number;
  accentColor: string;
}) {
  if (notes.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {notes.slice(0, max).map((note, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className={cn('size-1 shrink-0 rounded-full', accentColor)} />
          <span className="text-muted-foreground line-clamp-1 text-xs">{note}</span>
        </div>
      ))}
      {notes.length > max && (
        <span className="text-muted-foreground/60 pl-2.5 text-xs">+{notes.length - max} more</span>
      )}
    </div>
  );
}
