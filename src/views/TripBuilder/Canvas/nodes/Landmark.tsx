import type { Node, NodeProps } from '@xyflow/react';
import { LandmarkIcon, SparklesIcon } from 'lucide-react';
import { memo } from 'react';

import type { LandmarkNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';
import { BaseItineraryNode } from './BaseItineraryNode';

export type LandmarkNodeType = Node<LandmarkNodeData, typeof NODE_TYPES.LANDMARK>;

const LandmarkNode = ({ data, ...props }: NodeProps<LandmarkNodeType>) => {
  return (
    <BaseItineraryNode
      theme="rose"
      icon={<LandmarkIcon className="size-3.5 text-white" />}
      label="Landmark"
      name={data.name}
      description={data.description}
      dragging={props.dragging}
      selected={props.selected}
      headerRight={
        data.importance ? (
          <div className="flex items-center gap-1 rounded-full bg-white/20 px-1.5 py-0.5">
            <SparklesIcon className="size-3 text-white" />
            <span className="text-xs font-medium text-white">{data.importance}</span>
          </div>
        ) : undefined
      }
    />
  );
};

export default memo(LandmarkNode);
