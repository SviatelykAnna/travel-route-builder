import type { GraphNode } from '../types';

class BaseEdge {
  id: string;
  source: GraphNode;
  target: GraphNode;

  constructor({ id, source, target }: { id: string; source: GraphNode; target: GraphNode }) {
    this.id = id;
    this.source = source;
    this.target = target;
  }
}

export default BaseEdge;
