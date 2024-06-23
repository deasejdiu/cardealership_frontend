import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? <Outlet /> : <Navigate to='/LoginPage' replace />;
};
export default PrivateRoute;