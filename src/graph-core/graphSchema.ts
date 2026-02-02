import { z } from 'zod';

export const XYPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const NodeJSONSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: XYPositionSchema,
  data: z.record(z.string(), z.unknown()),
});

export const EdgeJSONSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
});

export const AdjacencyListJSONSchema = z.record(z.string(), z.array(z.string()));

export const GraphJSONSchema = z.object({
  version: z.number().optional(),
  nodes: z.array(NodeJSONSchema),
  adjacencyList: AdjacencyListJSONSchema,
});

export type AdjacencyListJSON = z.infer<typeof AdjacencyListJSONSchema>;
export type GraphJSON = z.infer<typeof GraphJSONSchema>;

export type XYPosition = z.infer<typeof XYPositionSchema>;
export type GraphEdge = z.infer<typeof EdgeJSONSchema>;
export type GraphNode = z.infer<typeof NodeJSONSchema>;
