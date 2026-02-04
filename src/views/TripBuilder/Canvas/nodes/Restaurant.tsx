import type { Node, NodeProps } from '@xyflow/react';
import { CalendarCheckIcon, UtensilsCrossedIcon } from 'lucide-react';
import { memo } from 'react';

import type { RestaurantNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';
import { BaseItineraryNode } from './BaseItineraryNode';

export type RestaurantNodeType = Node<RestaurantNodeData, typeof NODE_TYPES.RESTAURANT>;

const RestaurantNode = ({ data, ...props }: NodeProps<RestaurantNodeType>) => {
  return (
    <BaseItineraryNode
      theme="orange"
      icon={<UtensilsCrossedIcon className="size-3.5 text-white" />}
      label="Restaurant"
      name={data.name}
      description={data.description}
      dragging={props.dragging}
      selected={props.selected}
      headerRight={
        data.cuisine ? (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
            {data.cuisine}
          </span>
        ) : undefined
      }
      nameRight={
        data.reservation ? (
          <div className="flex shrink-0 items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 dark:bg-emerald-950/50">
            <CalendarCheckIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Reserved
            </span>
          </div>
        ) : undefined
      }
    />
  );
};

export default memo(RestaurantNode);
