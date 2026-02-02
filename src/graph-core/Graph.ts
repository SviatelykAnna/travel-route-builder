import type { EdgesValidator } from './EdgesValidator';
import { GraphJSONSchema, NodeJSONSchema } from './graphSchema';
import type { GraphEdge, GraphNode } from './graphSchema';
import { BaseNode } from './nodes/BaseNode';

export class Graph {
  nodes: Map<string, BaseNode>;
  adjacencyList: Map<string, Set<string>>;
  private edgeValidator: EdgesValidator | undefined;

  constructor(args?: {
    nodes?: Map<string, BaseNode>;
    adjacencyList?: Map<string, Set<string>>;
    edgeValidator?: EdgesValidator;
  }) {
    this.nodes = args?.nodes ?? new Map();
    this.adjacencyList = args?.adjacencyList ?? new Map();
    this.edgeValidator = args?.edgeValidator;
  }

  static fromJSON(data: unknown, options?: { edgeValidator?: EdgesValidator }): Graph {
    const validated = GraphJSONSchema.parse(data);
    const { nodes: nodesData, adjacencyList: adjacencyListData } = validated;

    const nodes = new Map<string, BaseNode>();
    for (const n of nodesData) {
      nodes.set(
        n.id,
        new BaseNode({
          id: n.id,
          type: n.type,
          position: n.position,
          data: n.data as Record<string, unknown>,
        }),
      );
    }

    const adjacencyList = new Map<string, Set<string>>();
    for (const [source, targets] of Object.entries(adjacencyListData)) {
      adjacencyList.set(source, new Set(targets));
    }

    return new Graph({ nodes, adjacencyList, edgeValidator: options?.edgeValidator });
  }

  toJSON(): string {
    return JSON.stringify({
      nodes: Array.from(this.nodes.values()).map((n) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      adjacencyList: Object.fromEntries(
        Array.from(this.adjacencyList.entries()).map(([source, targets]) => [
          source,
          Array.from(targets),
        ]),
      ),
    });
  }

  getNode(id: string): BaseNode {
    const node = this.nodes.get(id);
    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }
    return node;
  }

  addNode(node: unknown): void {
    const validated = NodeJSONSchema.parse(node);
    this.nodes.set(
      validated.id,
      new BaseNode({
        id: validated.id,
        type: validated.type,
        position: validated.position,
        data: validated.data as Record<string, unknown>,
      }),
    );
  }

  addEdge(source: string, target: string): void {
    if (source === target) {
      throw new Error('Source and target cannot be the same.');
    }
    if (!source || !target) {
      throw new Error('Source or target cannot be empty');
    }
    if (this.edgeValidator?.isRouteBlocked(source, target)) {
      throw new Error('This route is not allowed.');
    }
    if (this._wouldCreateCycle(source, target)) {
      throw new Error('This connection would create a loop.');
    }

    const targets = this.adjacencyList.get(source);
    if (targets) {
      targets.add(target);
    } else {
      this.adjacencyList.set(source, new Set([target]));
    }
  }

  getEdges(): GraphEdge[] {
    const edges: GraphEdge[] = [];
    for (const [source, targets] of this.adjacencyList) {
      for (const target of targets) {
        edges.push({ id: `${source}->${target}`, source, target });
      }
    }
    return edges;
  }

  getNodes(): GraphNode[] {
    return Array.from(this.nodes.values()).map((n) => ({
      id: n.id,
      type: n.type,
      position: n.position,
      data: n.data,
    }));
  }

  private _wouldCreateCycle(source: string, target: string): boolean {
    if (source === target) return true;
    const queue: string[] = [target];

    while (queue.length > 0) {
      const current = queue.shift()!;
      const targets = this.adjacencyList.get(current);
      if (!targets) continue;
      for (const t of targets) {
        if (t === source) return true;
        queue.push(t);
      }
    }
    return false;
  }
}
