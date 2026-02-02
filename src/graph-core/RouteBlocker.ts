import routeRulesJson from './route-rules.json';

export class RoutesBlocker {
  constructor() {}

  isRouteBlocked(source: string, target: string) {
    const blockedRoutes = routeRulesJson.blockedRoutes as { from: string; to: string }[];

    return blockedRoutes.some((route) => route.from === source && route.to === target);
  }
}
