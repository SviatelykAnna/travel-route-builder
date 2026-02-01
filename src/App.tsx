import { applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow } from '@xyflow/react';
import type { EdgeChange, NodeChange, OnEdgesChange, OnNodesChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useRef, useState } from 'react';

import { nodeTypes } from './features/canvas/nodes';
import { CountriesSidebar } from './features/sidebar';
import { Graph } from './graph-core/Graph';
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
  // REDO
  const [graph] = useState(new Graph(Graph.fromJSON(mockData)));
  const graphRef = useRef(graph);

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
              graphRef.current.getNode(change.id).setPosition(change.position!);
            }
          }
        }

        return updated;
      });
    },
    [setNodes],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((prevState) => applyEdgeChanges(changes, prevState));
    },
    [setEdges],
  );

  return (
    <div className="bg-background flex h-dvh w-full">
      <CountriesSidebar />

      <div className="h-full w-full">
        <ReactFlow
          defaultEdgeOptions={defaultEdgeOptions}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
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
