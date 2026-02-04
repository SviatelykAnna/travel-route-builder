import type { Node, NodeProps } from '@xyflow/react';
import { SunIcon } from 'lucide-react';
import { memo } from 'react';

import type { BeachNodeData } from '../lib/tripBuilderSchema';
import type { NODE_TYPES } from '../types';
import { BaseItineraryNode } from './BaseItineraryNode';

export type BeachNodeType = Node<BeachNodeData, typeof NODE_TYPES.BEACH>;

const BeachNode = ({ data, ...props }: NodeProps<BeachNodeType>) => {
  return (
    <BaseItineraryNode
      theme="sky"
      icon={<SunIcon className="size-3.5 text-white" />}
      label="Beach"
      name={data.name}
      description={data.description}
      dragging={props.dragging}
      selected={props.selected}
    />
  );
};

export default memo(BeachNode);
