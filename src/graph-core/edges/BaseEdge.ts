import type { GraphEdge } from '../graphSchema';

export class BaseEdge implements GraphEdge {
  id: string;
  source: string;
  target: string;

  constructor({ id, source, target }: { id: string; source: string; target: string }) {
    this.id = id;
    this.source = source;
    this.target = target;
  }
}
