import { Handle, Position, useNodeConnections } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { CalendarCheckIcon, UtensilsCrossedIcon } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@/lib/utils';

import type { RestaurantNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';

export type RestaurantNodeType = Node<RestaurantNodeData, typeof NODE_TYPES.RESTAURANT>;

const handleClass =
  'border-card! h-2! w-2! rounded-full! border-2! bg-orange-500! ring-1! ring-orange-500!';

const RestaurantNode = ({ data, ...props }: NodeProps<RestaurantNodeType>) => {
  const connections = useNodeConnections({
    handleType: 'target',
  });

  return (
    <div
      className={cn(
        'bg-card text-card-foreground relative w-56 rounded-xl border border-orange-400 shadow-sm transition-all',
        !props.dragging && 'hover:shadow-md',
        {
          'ring-2 ring-orange-300': props.selected && !props.dragging,
          'border-dashed opacity-80': props.dragging,
        },
      )}
    >
      <div className="flex items-center justify-between rounded-t-xl bg-orange-500 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <UtensilsCrossedIcon className="size-3.5 text-white" />
          <span className="text-xs font-medium text-white/90">Restaurant</span>
        </div>
        {data.cuisine && (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
            {data.cuisine}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-snug font-medium">{data.name}</p>
          {data.reservation && (
            <div className="flex shrink-0 items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 dark:bg-emerald-950/50">
              <CalendarCheckIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Reserved
              </span>
            </div>
          )}
        </div>

        {data.description && (
          <p className="text-muted-foreground line-clamp-2 border-t border-orange-200 pt-2 text-xs leading-relaxed dark:border-orange-500/30">
            {data.description}
          </p>
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

export default memo(RestaurantNode);
