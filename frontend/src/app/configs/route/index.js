import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (Component, allowedRoles) => {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

    useEffect(() => {
      if (!allowedRoles.includes(role || 'guest')) {
        router.replace('/404');
      }
    }, [role]);

    return allowedRoles.includes(role || 'guest') ? <Component {...props} /> : null;
  };
};

export default withAuth;