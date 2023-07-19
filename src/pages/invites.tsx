import AppLayout from 'layout/app-layout';
import { UserInvitesTable, requireNextAuth } from '@roq/nextjs';

function InvitesPage() {
  return (
    <AppLayout>
      <UserInvitesTable style={{ background: '#FFF' }} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: '/',
})(InvitesPage);
