import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react';
import type {
  Connection,
  EdgeChange,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';

import { toast } from 'sonner';
import { z } from 'zod';

import { EdgesValidator } from '@/graph-core/EdgesValidator';
import { Graph } from '@/graph-core/Graph';

import { defaultEdgeOptions, nodeTypes, routeRules } from './lib/constants';
import mockData from './mock-data.json';
import type { GraphFlowNode } from './types';

const Canvas = () => {
  const [graph] = useState(() =>
    Graph.fromJSON(mockData, { edgeValidator: new EdgesValidator({ rulesJSON: routeRules }) }),
  );

  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes] = useState<GraphFlowNode[]>(() => graph.getNodes() as GraphFlowNode[]);
  const [edges, setEdges] = useState(() => graph.getEdges());

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((prevState) => {
        const updated = applyNodeChanges(changes, prevState) as GraphFlowNode[];

        const isPositionChange = changes.some((c) => c.type === 'position' && c.dragging === false);

        if (isPositionChange) {
          for (const change of changes) {
            if (change.type === 'position' && change.dragging === false) {
              graph.getNode(change.id).setPosition(change.position!);
            }
          }
        }

        return updated;
      });
    },
    [graph],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((prevState) => applyEdgeChanges(changes, prevState));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      const data = event.dataTransfer.getData('application/json');
      const parsedData = JSON.parse(data);

      if (!parsedData) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      try {
        const node = { ...parsedData, position };
        graph.addNode({
          ...parsedData,
          position,
        });

        setNodes((prevState) => [...prevState, node]);
      } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
          toast.error('Invalid node data');
          return;
        }
      }
    },
    [graph, screenToFlowPosition],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      try {
        graph.addEdge(params.source, params.target);

        setEdges((prevState) => [
          ...prevState,
          {
            id: `${params.source}->${params.target}`,
            source: params.source,
            target: params.target,
          },
        ]);
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
    [graph],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitViewOptions={{ padding: 0.5 }}
      >
        <Background bgColor="var(--react-flow-bg)" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
