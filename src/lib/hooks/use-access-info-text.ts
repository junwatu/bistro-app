import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, useSession } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import * as inflection from 'inflection';
import { appConfig } from 'config';
import { convertRouteToEntityUtil } from 'server/utils/convert-route-to-entity.util';

export function useAccessInfo() {
  const router = useRouter();
  const path = router.asPath;
  const [entityPath] = path.split('/').filter(Boolean);
  const entity = convertRouteToEntityUtil(entityPath);
  const entityName = entityPath.replace(/-/g, ' ');
  const { hasAccess } = useAuthorizationApi();
  const { session } = useSession();
  const operationsText = useMemo(() => {
    const canRead = hasAccess(entity, AccessOperationEnum.READ, AccessServiceEnum.PROJECT);
    const canUpdate = hasAccess(entity, AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT);
    const canCreate = hasAccess(entity, AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT);
    const canDelete = hasAccess(entity, AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT);
    const operations = [canRead && 'read', canUpdate && 'update', canCreate && 'create', canDelete && 'delete'].filter(
      Boolean,
    );
    if (operations.length > 2) {
      return `${operations.slice(0, -1).join(', ')} and ${operations.slice(-1)}`;
    }
    if (operations.length === 2) {
      return operations.join(' and ');
    }
    return operations.join('');
  }, [entity]);
  return `As a ${session.user.roles[0]} you can ${operationsText} the ${inflection.pluralize(
    entityName,
  )} of your ${appConfig.tenantName.toLowerCase()}`;
}
