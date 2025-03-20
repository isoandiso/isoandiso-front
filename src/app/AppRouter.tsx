import { createBrowserRouter, Navigate } from 'react-router-dom';

//RUTAS PUBLICAS
import PublicRoutes from './publicroutes/PublicRoutes';
import Home from './publicroutes/home/Home';
import Us from './publicroutes/us/Us';
import Blog from './publicroutes/blog/Blog';
import Contact from './publicroutes/contact/Contact';
import LogIn from './publicroutes/login/LogIn';
import SignIn from './publicroutes/signin/SignIn';

//RUTAS PRIVADAS
import PrivateRoutes from './privateroutes/PrivateRoutes';
import CompanyRoutes from './privateroutes/companyroutes/CompanyRoutes';
import { CompanyAccount } from './privateroutes/companyroutes/companyaccount/CompanyAccount';
import Post from './privateroutes/companyroutes/post/Post';
import CompanyActivity from './privateroutes/companyroutes/companyactivity/CompanyActivity';
import Acquisitions from './privateroutes/companyroutes/acquisitions/Acquisitions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoutes />,
    children: [
      { index: true, element: <Home />, path: '/' },
      { element: <Us />, path: '/nosotros' },
      { element: <Blog />, path: '/blog' },
      { element: <Contact />, path: '/contacto' },
      { element: <LogIn />, path: '/login' },
      { element: <SignIn />, path: '/signin' },
    ],
  },
  {
    path: '/company',
    element: (<PrivateRoutes>
                <CompanyRoutes />
              </PrivateRoutes>),
    children: [
      { element: <CompanyAccount />, path: 'account', index: true },
      { element: <Post />, path: 'post' },
      { element: <CompanyActivity />, path: 'activity' },
      { element: <Acquisitions />, path: 'acquisitions' },
      { path: '*', element: <Navigate to="/company/account" replace /> },
    ],
  },
]);

export default router;