export const routes = {
    home: '/',
    checkin: '/checkin',
    ai: '/ai',
    result: '/result',
    calendar: '/calendar'
  };
  
  export type RouteKey = keyof typeof routes;
  
  export function getRoutePath(key: RouteKey): string {
    return routes[key];
  }