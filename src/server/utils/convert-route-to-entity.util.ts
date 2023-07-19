const mapping: Record<string, string> = {
  customers: 'customer',
  orders: 'order',
  restaurants: 'restaurant',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
