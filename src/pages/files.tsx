import AppLayout from 'layout/app-layout';
import Files from 'components/file/files';
import { requireNextAuth } from '@roq/nextjs';

function FilesPage() {
  return (
    <AppLayout>
      <Files />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: '/',
})(FilesPage);
