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
import { useCallback, useState } from 'react';

import { nodeTypes } from './features/canvas/nodes';
import { CountriesSidebar } from './features/sidebar';
import { Graph } from './graph-core/Graph';
import { GraphNodeJSONSchema } from './graph-core/graphSchema';
import type { GraphFlowNode } from './graph-core/types';
import { defaultEdgeOptions } from './lib/constants';

const mockData = JSON.stringify({
  version: 1,
  nodes: [
    {
      id: 'DE',
      type: 'country',
      position: { x: 120, y: 80 },
      data: {
        flags: {
          png: 'https://flagcdn.com/w320/de.png',
          svg: 'https://flagcdn.com/de.svg',
          alt: 'The flag of Germany is composed of three equal horizontal bands of black, red and gold.',
        },
        name: {
          common: 'Germany',
          official: 'Federal Republic of Germany',
        },
        cca2: 'DE',
      },
    },
    {
      id: 'FR',
      type: 'country',
      position: { x: 300, y: 80 },
      data: {
        flags: {
          png: 'https://flagcdn.com/w320/fr.png',
          svg: 'https://flagcdn.com/fr.svg',
          alt: 'The flag of France is composed of three equal vertical bands of blue, white and red.',
        },
        name: {
          common: 'France',
          official: 'French Republic',
        },
        cca2: 'FR',
      },
    },
  ],
  edges: [
    { source: 'DE', targets: ['FR'] },
    { source: 'FR', targets: [] },
  ],
});

function App() {
  const [graph] = useState(new Graph(Graph.fromJSON(mockData)));

  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes] = useState(() => graph.getReactFlowNodes());
  const [edges, setEdges] = useState(() => graph.getReactFlowEdges());

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

      const node = GraphNodeJSONSchema.parse({ ...parsedData, position });

      graph.addNode(node);

      setNodes((prevState) => [...prevState, node]);
    },
    [graph, screenToFlowPosition],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      try {
        graph.addEdge(params.source, params.target);

        setEdges((prevState) => [
          ...prevState,
          { id: `${params.source}-${params.target}`, source: params.source, target: params.target },
        ]);
      } catch (error) {
        console.error(error);
      }
    },
    [graph],
  );

  return (
    <div className="bg-background flex h-dvh w-full">
      <CountriesSidebar />

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
    </div>
  );
}

export default App;
