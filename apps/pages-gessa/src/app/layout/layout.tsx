// import AppLayout from '../layouts/AppLayout';

// const LayoutWrapper = () => {
//   return (
//     <div style={{ overflow: 'hidden' }}>
//       <AppLayout />
//     </div>
//   );
// };

// export default LayoutWrapper;

import { useContext, useEffect } from 'react';
import { Outlet, useRoutes } from 'react-router';
import { RouteContext } from '../../context';
import { RouteContextType } from '../../types/routes';
const Layout = (props: any) => {
  const newRoutes: any = useContext(RouteContext) as RouteContextType;

  // const routes = useRoutes([...myRoutes]);
  const routes = useRoutes([...newRoutes.routes]);
  return routes;
};

const LayoutWrapper = (props: any) => {
  return <Layout />;
};

export default LayoutWrapper;
