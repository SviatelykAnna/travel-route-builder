import type { Node, NodeProps } from '@xyflow/react';
import { BedDoubleIcon, MoonIcon } from 'lucide-react';
import { memo } from 'react';

import type { HotelNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';
import { BaseItineraryNode, NotesList } from './BaseItineraryNode';

export type HotelNodeType = Node<HotelNodeData, typeof NODE_TYPES.HOTEL>;

const HotelNode = ({ data, ...props }: NodeProps<HotelNodeType>) => {
  return (
    <BaseItineraryNode
      theme="violet"
      icon={<BedDoubleIcon className="size-3.5 text-white" />}
      label="Hotel"
      name={data.name}
      description={data.description}
      dragging={props.dragging}
      selected={props.selected}
      headerRight={
        data.nights ? (
          <div className="flex items-center gap-1">
            <MoonIcon className="size-3 text-white/80" />
            <span className="text-xs font-medium text-white">
              {data.nights} {data.nights === 1 ? 'night' : 'nights'}
            </span>
          </div>
        ) : undefined
      }
    >
      {data.notes && data.notes.length > 0 && (
        <NotesList notes={data.notes} accentColor="bg-violet-400" />
      )}
    </BaseItineraryNode>
  );
};

export default memo(HotelNode);
