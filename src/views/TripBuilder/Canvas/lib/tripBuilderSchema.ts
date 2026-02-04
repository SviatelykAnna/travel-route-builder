import { z } from 'zod';

import { NODE_TYPES } from '../types';

const XYPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const BaseNodeJSONSchema = z.object({
  id: z.string(),
  position: XYPositionSchema,
});

const CountryNodeDataSchema = z.object({
  cca2: z.string().min(2).max(2),
  flags: z.object({ png: z.string(), svg: z.string(), alt: z.string().optional() }),
  name: z.object({
    common: z.string(),
    official: z.string(),
  }),
});

export const CountryNodeJSONSchema = BaseNodeJSONSchema.extend({
  type: z.literal(NODE_TYPES.COUNTRY),
  data: CountryNodeDataSchema,
});

export const HotelNodeDataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  nights: z.number().int().min(1).optional(),
  notes: z.array(z.string()).optional(),
});

export const HotelNodeJSONSchema = BaseNodeJSONSchema.extend({
  type: z.literal(NODE_TYPES.HOTEL),
  data: HotelNodeDataSchema,
});

export const BeachNodeDataSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const BeachNodeJSONSchema = BaseNodeJSONSchema.extend({
  type: z.literal(NODE_TYPES.BEACH),
  data: BeachNodeDataSchema,
});

export const LandmarkNodeDataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  importance: z.string().optional(),
});

export const LandmarkNodeJSONSchema = BaseNodeJSONSchema.extend({
  type: z.literal(NODE_TYPES.LANDMARK),
  data: LandmarkNodeDataSchema,
});

export const RestaurantNodeDataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  cuisine: z.string().optional(),
  reservation: z.boolean().optional(),
});

export const RestaurantNodeJSONSchema = BaseNodeJSONSchema.extend({
  type: z.literal(NODE_TYPES.RESTAURANT),
  data: RestaurantNodeDataSchema,
});

const AdjacencyListJSONSchema = z.record(z.string(), z.array(z.string()));

export const GraphNodeJSONSchema = z.discriminatedUnion('type', [
  CountryNodeJSONSchema,
  HotelNodeJSONSchema,
  BeachNodeJSONSchema,
  LandmarkNodeJSONSchema,
  RestaurantNodeJSONSchema,
]);

export const GraphJSONSchema = z.object({
  nodes: z.array(GraphNodeJSONSchema),
  adjacencyList: AdjacencyListJSONSchema,
});

export type XYPosition = z.infer<typeof XYPositionSchema>;

export type CountryNodeData = z.infer<typeof CountryNodeDataSchema>;
export type HotelNodeData = z.infer<typeof HotelNodeDataSchema>;
export type BeachNodeData = z.infer<typeof BeachNodeDataSchema>;
export type LandmarkNodeData = z.infer<typeof LandmarkNodeDataSchema>;
export type RestaurantNodeData = z.infer<typeof RestaurantNodeDataSchema>;

export type GraphNodeJSON = z.infer<typeof GraphNodeJSONSchema>;
export type AdjacencyListJSON = z.infer<typeof AdjacencyListJSONSchema>;
export type GraphJSON = z.infer<typeof GraphJSONSchema>;
