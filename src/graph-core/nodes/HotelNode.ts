import type { HotelNodeData, XYPosition } from '../graphSchema';
import { NODE_TYPES } from '../types';
import { BaseNode } from './BaseNode';

export class HotelNode extends BaseNode<HotelNodeData, typeof NODE_TYPES.HOTEL> {
  static TYPE = NODE_TYPES.HOTEL;

  constructor(args: { id: string; data: HotelNodeData; position?: XYPosition }) {
    super({
      id: args.id,
      type: HotelNode.TYPE,
      position: args.position,
      data: args.data,
    });
  }
}
