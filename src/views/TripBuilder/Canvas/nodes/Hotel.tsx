import { Handle, Position, useNodeConnections } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { BedDoubleIcon, MoonIcon } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@/lib/utils';

import type { HotelNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';

export type HotelNodeType = Node<HotelNodeData, typeof NODE_TYPES.HOTEL>;

const handleClass =
  'border-card! h-2! w-2! rounded-full! border-2! bg-violet-500! ring-1! ring-violet-500!';

const HotelNode = ({ data, ...props }: NodeProps<HotelNodeType>) => {
  const connections = useNodeConnections({
    handleType: 'target',
  });

  const hasNotes = data.notes && data.notes.length > 0;
  const hasDetails = data.description || hasNotes;

  return (
    <div
      className={cn(
        'bg-card text-card-foreground relative w-64 rounded-xl border border-violet-500 shadow-sm transition-all',
        !props.dragging && 'hover:shadow-md',
        {
          'ring-2 ring-violet-300': props.selected && !props.dragging,
          'border-dashed opacity-80': props.dragging,
        },
      )}
    >
      <div className="flex items-center justify-between rounded-t-lg bg-violet-500 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <BedDoubleIcon className="size-3.5 text-white" />
          <span className="text-xs font-medium text-white/90">Hotel</span>
        </div>

        {data.nights && (
          <div className="flex items-center gap-1">
            <MoonIcon className="size-3 text-white/80" />
            <span className="text-xs font-medium text-white">
              {data.nights} {data.nights === 1 ? 'night' : 'nights'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 px-3 py-2.5">
        <div className="flex flex-col gap-1">
          <p className="text-sm leading-snug font-medium">{data.name}</p>
        </div>

        {hasDetails && (
          <div className="flex flex-col gap-2 border-t border-violet-200 pt-2 dark:border-violet-500/30">
            {data.description && (
              <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                {data.description}
              </p>
            )}
            {hasNotes && (
              <div className="flex flex-col gap-1">
                {data.notes!.slice(0, 2).map((note, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="size-1 shrink-0 rounded-full bg-violet-400" />
                    <span className="text-muted-foreground line-clamp-1 text-xs">{note}</span>
                  </div>
                ))}
                {data.notes!.length > 2 && (
                  <span className="text-muted-foreground/60 pl-2.5 text-xs">
                    +{data.notes!.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <Handle
        isConnectable={connections.length < 1}
        position={Position.Left}
        type="target"
        className={cn(handleClass, '-left-1!')}
      />
    </div>
  );
};

export default memo(HotelNode);
