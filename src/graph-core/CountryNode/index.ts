import { BaseNode } from '../BaseNode';
import type { CountryNodeData, XYPosition } from '../graphSchema';
import { NODE_TYPES } from '../types';

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
