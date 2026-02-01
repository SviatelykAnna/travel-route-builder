import type { XYPosition } from '@xyflow/react';

import { BaseNode } from '../BaseNode';
import { NODE_TYPES } from '../types';

export type CountryNodeData = {
  cca2: string;
  flags: { png: string; svg: string; alt?: string };
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, unknown>;
  };
};

export class CountryNode extends BaseNode<CountryNodeData, typeof NODE_TYPES.COUNTRY> {
  static TYPE = NODE_TYPES.COUNTRY;

  constructor(args: { id: string; data: CountryNodeData; position?: XYPosition }) {
    super({
      id: args.id,
      type: CountryNode.TYPE,
      position: args.position,
      data: args.data,
    });
  }
}
