import { normalizeString as n } from '@/lib/utils';

export class EdgesValidator {
  private blockedEdges: { from: string; to: string }[];

  constructor(args?: { rulesJSON: string }) {
    if (args?.rulesJSON) {
      try {
        const parsed = JSON.parse(args.rulesJSON) as {
          blockedEdges?: { from: string; to: string }[];
        };
        this.blockedEdges = Array.isArray(parsed.blockedEdges) ? parsed.blockedEdges : [];
      } catch {
        throw new Error('Failed to parse edges rules JSON');
      }
    } else {
      this.blockedEdges = [];
    }
  }

  isConnectionBlocked(source: string, target: string): boolean {
    return this.blockedEdges.some((rule) => n(rule.from) === n(source) && n(rule.to) === n(target));
  }
}
