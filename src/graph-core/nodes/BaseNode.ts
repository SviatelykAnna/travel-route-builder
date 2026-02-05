import type { XYPosition } from '../graphSchema';

export class BaseNode<
  TData extends Record<string, unknown> = Record<string, unknown>,
  TType extends string = string,
> {
  id: string;
  type: TType;
  position: XYPosition;
  data: TData;

  constructor(args: { id: string; type: TType; position?: XYPosition; data?: TData }) {
    this.id = args.id;
    this.type = args.type;
    this.position = args.position ?? { x: 0, y: 0 };
    this.data = (args.data ?? {}) as TData;
  }

  setPosition(position: XYPosition) {
    this.position = position;
    return this;
  }
}
