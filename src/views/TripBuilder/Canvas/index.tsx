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
import { DownloadIcon, Moon, Sun, UploadIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

import { toast } from 'sonner';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import type { GraphEdge } from '@/graph-core';
import { EdgesValidator } from '@/graph-core/EdgesValidator';
import { Graph } from '@/graph-core/Graph';
import { useTheme } from '@/lib/hooks/useTheme';
import { downloadJSON, importJSON } from '@/lib/utils';

import { defaultEdgeOptions, nodeTypes, routeRules } from './lib/constants';
import { GraphJSONSchema, GraphNodeJSONSchema } from './lib/tripBuilderSchema';
import type { GraphFlowNode } from './types';

const Canvas = () => {
  const { isDark, toggle } = useTheme();

  const [graph, setGraph] = useState(
    () => new Graph({ edgeValidator: new EdgesValidator({ rulesJSON: routeRules }) }),
  );

  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes] = useState<GraphFlowNode[]>(() => graph.getNodes() as GraphFlowNode[]);
  const [edges, setEdges] = useState(() => graph.getEdges());

  const syncFromGraph = useCallback(() => {
    setNodes(graph.getNodes() as GraphFlowNode[]);
    setEdges(graph.getEdges());
  }, [graph]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((prevState) => {
        const updated = applyNodeChanges(changes, prevState) as GraphFlowNode[];

        const isPositionChange = changes.some((c) => c.type === 'position' && c.dragging === false);

        if (isPositionChange) {
          for (const change of changes) {
            if (change.type === 'position' && change.dragging === false) {
              graph.getNode(change.id)?.setPosition(change.position!);
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
        const validatedNode = GraphNodeJSONSchema.parse({ ...parsedData, position });

        graph.addNode(validatedNode);
        syncFromGraph();
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast.error('Invalid node data');
          return;
        } else {
          toast.error((error as Error).message);
        }
      }
    },
    [graph, screenToFlowPosition, syncFromGraph],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      try {
        graph.addEdge(params.source, params.target);
        syncFromGraph();
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
    [graph, syncFromGraph],
  );

  const onNodesDelete = useCallback(
    (deleted: GraphFlowNode[]) => {
      for (const { id } of deleted) {
        graph.removeNode(id);
      }

      syncFromGraph();
    },
    [graph, syncFromGraph],
  );

  const onEdgesDelete = useCallback(
    (deleted: GraphEdge[]) => {
      for (const { source, target } of deleted) {
        graph.removeEdge(source, target);
      }

      syncFromGraph();
    },
    [graph, syncFromGraph],
  );

  const handleExport = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    downloadJSON('trip-graph.json', graph.toJSON());
    toast.success('Graph exported');
  };

  const handleImport = async () => {
    try {
      const data = await importJSON();
      const validatedTravelGraph = GraphJSONSchema.parse(data);

      const newGraph = Graph.fromJSON(validatedTravelGraph, {
        edgeValidator: new EdgesValidator({ rulesJSON: routeRules }),
      });

      setGraph(newGraph);
      setNodes(newGraph.getNodes() as GraphFlowNode[]);
      setEdges(newGraph.getEdges());
      toast.success('Graph imported');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to import JSON');
    }
  };

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesDelete={onEdgesDelete}
        fitViewOptions={{ padding: 0.5 }}
      >
        <Background bgColor="var(--react-flow-bg)" />
        <Controls className="bg-card border-border [--xy-controls-button-background-color-hover:var(--accent)] [--xy-controls-button-background-color:var(--card)] [--xy-controls-button-border-color:var(--border)] [--xy-controls-button-color-hover:var(--accent-foreground)]" />

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button size="icon" onClick={toggle} aria-label="Toggle theme">
            {isDark ? <Sun /> : <Moon />}
          </Button>

          <Button className="flex gap-2" onClick={handleImport}>
            <UploadIcon />
            Import
          </Button>

          <Button className="flex gap-2" onClick={handleExport}>
            <DownloadIcon />
            Export
          </Button>
        </div>
      </ReactFlow>
    </div>
  );
};

export default Canvas;
