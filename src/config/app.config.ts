interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Operations Manager', 'Delivery Driver', 'Customer Service Representative'],
  tenantName: 'Restaurant',
  applicationName: 'Bistro',
  addOns: ['chat', 'file'],
};
