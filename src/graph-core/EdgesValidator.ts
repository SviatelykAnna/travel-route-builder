import { normalizeString as n } from '@/lib/utils';

import { type BlockedEdgesRules, EdgesRulesSchema } from './edgesValidatorSchema';

export class EdgesValidator {
  private readonly _blockedEdges: BlockedEdgesRules;

  constructor(args: { rulesJSON: string }) {
    try {
      const parsedData: unknown = JSON.parse(args.rulesJSON);
      const validatedRules = EdgesRulesSchema.parse(parsedData);

      this._blockedEdges = validatedRules.blockedEdges;
    } catch (error) {
      throw new Error(
        `Failed to parse edges rules JSON: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  isConnectionBlocked(source: string, target: string): boolean {
    return this._blockedEdges.some(
      (rule) => n(rule.from) === n(source) && n(rule.to) === n(target),
    );
  }
}
