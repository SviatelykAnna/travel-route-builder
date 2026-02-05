import { z } from 'zod';

export const BlockedEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const BlockedEdgesSchema = z.array(BlockedEdgeSchema);

export const EdgesRulesSchema = z.strictObject({
  blockedEdges: BlockedEdgesSchema.default([]),
});

export type BlockedEdgeRule = z.infer<typeof BlockedEdgeSchema>;
export type BlockedEdgesRules = z.infer<typeof BlockedEdgesSchema>;
export type EdgesRules = z.infer<typeof EdgesRulesSchema>;
