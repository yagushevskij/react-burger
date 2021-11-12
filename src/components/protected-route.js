// import { useAuth } from '../services/auth';
import { Navigate, Outlet } from 'react-router-dom';
// import { useEffect, useState } from 'react';

export function ProtectedRoute({ children, ...rest }) {
  // let { getUser, ...auth } = useAuth();
  // const [isUserLoaded, setUserLoaded] = useState(false);

  // const init = async () => {
  //   await getUser();
  //   setUserLoaded(true);
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  // if (!isUserLoaded) {
  //   return null;
  // }

  const currentLocation = window.location;
  const auth = {user: null} // Пока нет авторизации

  return auth.user ? (
          <Outlet />
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: currentLocation }
            }}
          />
        )
}
