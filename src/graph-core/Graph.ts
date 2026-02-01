import type { Edge } from '@xyflow/react';

import { GraphJSONSchema, type GraphNodeJSON } from './graphSchema';
import { CountryNode } from './nodes/CountryNode';
import { HotelNode } from './nodes/HotelNode';
import { type GraphFlowNode, type GraphNode, NODE_TYPES } from './types';

export class Graph {
  nodes: Map<string, GraphNode>;
  adjacencyList: Map<string, Set<string>>;

  constructor(args?: { nodes: Map<string, GraphNode>; adjacencyList: Map<string, Set<string>> }) {
    if (args) {
      this.nodes = args.nodes;
      this.adjacencyList = args.adjacencyList;
    } else {
      this.nodes = new Map();
      this.adjacencyList = new Map();
    }
  }

  static fromJSON(jsonData: string) {
    const parsedData = JSON.parse(jsonData);
    const validatedGraphData = GraphJSONSchema.parse(parsedData);
    const { nodes: nodesData, edges: edgesData } = validatedGraphData;

    const nodes = new Map<string, GraphNode>();

    for (const n of nodesData) {
      switch (n.type) {
        case NODE_TYPES.COUNTRY:
          nodes.set(n.id, new CountryNode({ id: n.id, position: n.position, data: n.data }));
          break;
        default:
          throw new Error(`Unknown node type: ${n.type}`);
      }
    }

    const adjacencyList = new Map<string, Set<string>>();

    for (const { source, targets } of edgesData) {
      adjacencyList.set(source, new Set(targets));
    }

    return new Graph({ nodes, adjacencyList });
  }

  toJSON() {
    return JSON.stringify({
      nodes: Array.from(this.nodes.values()).map((n) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      adjacencyList: Array.from(this.adjacencyList.entries()).map(([source, targets]) => ({
        source,
        targets: Array.from(targets),
      })),
    });
  }

  getNode(id: string) {
    const node = this.nodes.get(id);
    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }

    return node;
  }

  addNode(node: GraphNodeJSON) {
    switch (node.type) {
      case NODE_TYPES.COUNTRY:
        this.nodes.set(
          node.id,
          new CountryNode({
            id: node.id,
            position: node.position,
            data: node.data,
          }),
        );
        break;
      case NODE_TYPES.HOTEL:
        this.nodes.set(
          node.id,
          new HotelNode({ id: node.id, position: node.position, data: node.data }),
        );
        break;
    }
  }

  addEdge(source: string, target: string) {
    if (source === target) {
      throw new Error('Source and target cannot be the same');
    }

    if (!source || !target) {
      throw new Error('Source or target cannot be empty');
    }

    if (this.adjacencyList.has(source)) {
      this.adjacencyList.get(source)?.add(target);
    } else {
      this.adjacencyList.set(source, new Set([target]));
    }
  }

  getReactFlowEdges(): Edge[] {
    const edges = [];

    for (const [source, targets] of this.adjacencyList) {
      for (const target of targets) {
        edges.push({
          id: `${source}->${target}`,
          source,
          target,
        });
      }
    }

    return edges;
  }

  getReactFlowNodes(): GraphFlowNode[] {
    return Array.from(this.nodes.values()).map(({ id, type, position, data }) => ({
      id,
      type,
      position,
      data,
    }));
  }
}
