import type { EdgesValidator } from './EdgesValidator';
import { GraphJSONSchema, NodeJSONSchema } from './graphSchema';
import type { GraphEdge, GraphNode } from './graphSchema';
import { BaseNode } from './nodes/BaseNode';

export class Graph {
  private _nodes: Map<string, BaseNode>;
  private _adjacencyList: Map<string, Set<string>>;
  private _edgeValidator: EdgesValidator | undefined;

  constructor(params?: {
    nodes?: Map<string, BaseNode>;
    adjacencyList?: Map<string, Set<string>>;
    edgeValidator?: EdgesValidator;
  }) {
    this._nodes = params?.nodes ?? new Map();
    this._adjacencyList = params?.adjacencyList ?? new Map();
    this._edgeValidator = params?.edgeValidator;
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
      nodes: Array.from(this._nodes.values()).map((n) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      adjacencyList: Object.fromEntries(
        Array.from(this._adjacencyList.entries()).map(([source, targets]) => [
          source,
          Array.from(targets),
        ]),
      ),
    });
  }

  getNode(id: string) {
    return this._nodes.get(id);
  }

  addNode(node: unknown): void {
    const validated = NodeJSONSchema.parse(node);
    if (this._nodes.has(validated.id)) {
      throw new Error(`Node with id ${validated.id} already exists`);
    }

    this._nodes.set(
      validated.id,
      new BaseNode({
        id: validated.id,
        type: validated.type,
        position: validated.position,
        data: validated.data as Record<string, unknown>,
      }),
    );
  }

  removeNode(nodeId: string): void {
    this._nodes.delete(nodeId);
    this._adjacencyList.delete(nodeId);

    for (const [, targets] of this._adjacencyList) {
      if (targets.has(nodeId)) {
        targets.delete(nodeId);
      }
    }
  }

  addEdge(source: string, target: string): void {
    const sourceNode = this._nodes.get(source);
    const targetNode = this._nodes.get(target);

    if (!sourceNode || !targetNode) {
      throw new Error('Source or target node not found');
    }

    if (source === target) {
      throw new Error('Source and target cannot be the same.');
    }
    if (!source || !target) {
      throw new Error('Source or target cannot be empty');
    }
    if (this._edgeValidator?.isConnectionBlocked(source, target)) {
      throw new Error('This route is not allowed.');
    }
    if (this._wouldCreateCycle(source, target)) {
      throw new Error('This connection would create a loop.');
    }

    const targets = this._adjacencyList.get(source);
    if (targets) {
      targets.add(target);
    } else {
      this._adjacencyList.set(source, new Set([target]));
    }
  }

  getEdges(): GraphEdge[] {
    const edges: GraphEdge[] = [];
    for (const [source, targets] of this._adjacencyList) {
      for (const target of targets) {
        edges.push({ id: `${source}->${target}`, source, target });
      }
    }
    return edges;
  }

  removeEdge(source: string, target: string): void {
    const targets = this._adjacencyList.get(source);
    if (targets) {
      targets.delete(target);
    }
  }

  getNodes(): GraphNode[] {
    return Array.from(this._nodes.values()).map((n) => ({
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
      const current = queue.shift();
      if (!current) continue;

      const targets = this._adjacencyList.get(current);
      if (!targets) continue;

      for (const t of targets) {
        if (t === source) return true;
        queue.push(t);
      }
    }
    return false;
  }
}
