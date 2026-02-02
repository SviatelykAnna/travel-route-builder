import type { BaseNode } from '../nodes/BaseNode';

export class BaseEdge {
  id: string;
  source: BaseNode;
  target: BaseNode;

  constructor({ id, source, target }: { id: string; source: BaseNode; target: BaseNode }) {
    this.id = id;
    this.source = source;
    this.target = target;
  }
}
