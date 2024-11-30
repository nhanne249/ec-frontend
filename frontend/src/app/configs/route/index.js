'use client';  

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';  
import { getCookie } from 'cookies-next'; 
const withAuth = (Component, allowedRoles) => {  
  return function ProtectedComponent(props) {  
    const router = useRouter();  
    const [loading, setLoading] = useState(true);  

    const role = getCookie('role');  

    useEffect(() => {  
      if (role && !allowedRoles.includes(role)) {  
        router.replace('/404');  
      }  
      setLoading(false);  
    }, [role, router]);  

    if (loading) {  
      return <div>Loading...</div>;  
    }  

    return allowedRoles.includes(role) ? <Component {...props} /> : null;  
  };  
};  

export default withAuth;  