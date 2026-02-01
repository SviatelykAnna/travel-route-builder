import type { XYPosition } from '../graphSchema';
import type { NodeType } from '../types';

export class BaseNode<TData extends Record<string, unknown>, TType extends NodeType = NodeType> {
  id: string;
  type: TType;
  position: XYPosition;
  data: TData;

  constructor(args: { id: string; type: TType; position?: XYPosition; data: TData }) {
    this.id = args.id;
    this.type = args.type;
    this.position = args.position ?? { x: 0, y: 0 };
    this.data = args.data;
  }

  setPosition(position: XYPosition) {
    console.log({ position });
    this.position = position;
    return this;
  }

  updateData(updatedData: Partial<TData>) {
    this.data = { ...this.data, ...updatedData };
    return this;
  }
}
