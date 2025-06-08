import { useState } from 'react';
import { Navigate, redirect, useLocation } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import { useAuth } from 'src/hooks/useAuth';
import LoginPage from 'src/pages/auth/login';
// hooks
// pages
// components

// ----------------------------------------------------------------------

export const AuthGuard = (props) => {
  const { children } = props;

  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={'/auth/login'} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};
