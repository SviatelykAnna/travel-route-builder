import { z } from 'zod';

import { NODE_TYPES } from './types';

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
  stars: z.number().int().min(1).max(5).optional(),
});

export const HotelNodeJSONSchema = BaseNodeJSONSchema.extend({
  type: z.literal(NODE_TYPES.HOTEL),
  data: HotelNodeDataSchema,
});

const EdgeJSONSchema = z.object({ source: z.string(), targets: z.array(z.string()) });

export const GraphNodeJSONSchema = z.discriminatedUnion('type', [
  CountryNodeJSONSchema,
  HotelNodeJSONSchema,
]);

export const GraphJSONSchema = z.object({
  version: z.number(),
  nodes: z.array(GraphNodeJSONSchema),
  edges: z.array(EdgeJSONSchema),
});

export type XYPosition = z.infer<typeof XYPositionSchema>;
export type CountryNodeData = z.infer<typeof CountryNodeDataSchema>;
export type HotelNodeData = z.infer<typeof HotelNodeDataSchema>;

export type GraphNodeJSON = z.infer<typeof GraphNodeJSONSchema>;
export type EdgeGroupJSON = z.infer<typeof EdgeJSONSchema>;
export type GraphJSON = z.infer<typeof GraphJSONSchema>;
