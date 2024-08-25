import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/pagesWeb/Home'
import LayoutMain from './components/layouts/LayoutMain'
import SearchProp from './pages/pagesWeb/SearchProp'
import Blog from './pages/pagesWeb/Blog'
import Contact from './pages/pagesWeb/Contact'
import DetailProps from './components/properties/DetailProps'
import LogIn from './pages/auth/LogIn'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import LayoutUser from './components/layouts/LayoutUser'
import Post from './pages/pagesUser/Post'
import UserActivity from './pages/pagesUser/UserActivity'
import { UserAccount } from './pages/pagesUser/UserAccount'

import LayoutAdmin from './components/layouts/LayoutAdmin'
import Properties from './pages/pagesAdmin/Properties'
import { DetailProperties } from './pages/pagesAdmin/DetailProperties'
import ListMessages from './pages/pagesAdmin/ListMessages'
import Users from './pages/pagesAdmin/Users'

import LayoutAI from './components/layouts/LayoutAI'
import HomeAI from './pages/pagesAI/HomeAI'
import SignIn from './pages/auth/SignIn'
import IA from './pages/pagesWeb/IA'

// contexts
import { UserProvider } from './context/UserProvider'
//loaders
import { loader as loaderProperty } from './pages/pagesAdmin/DetailProperties'
import { loader as loaderProperty2 } from './components/properties/DetailProps'
import { Dashboard } from './pages/pagesAdmin/Dashboard'

// layout de rutas protejidas
import ProtectedRoutes from './components/protected/ProtectedRoutes'
import Us from './pages/pagesWeb/Us'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LayoutMain />,
      children: [
        {
          index: true,
          element: <Home />,
          path: '/'
        },
        {
          element: <Us />,
          path: '/nosotros'
        },
        {
          element: <Blog />,
          path: '/blog'
        },
        {
          element: <IA />,
          path: '/ia'
        },
        {
          element: <Contact />,
          path: '/contacto'
        },
        {
          element: <DetailProps />,
          path: '/item/:idProperty',
          loader: loaderProperty2
        },
        {
          element: <LogIn />,
          path: '/login'
        },
        {
          element: <SignIn />,
          path: '/signin'
        },
      ]
    },
    {
      path: '/admin',
      element: <ProtectedRoutes role={1}><LayoutAdmin /></ProtectedRoutes>,
      children: [
        {
          index: true,
          element: <Dashboard />,
          path: 'dashboard'
        },
        {
          element: <Properties />,
          path: 'propiedades'
        },
        {
          element: <DetailProperties />,
          path: 'propiedades/detail/:idProperty',
          loader: loaderProperty
        },
        {
          element: <Users />,
          path: 'usuarios'
        },
        {
          element: <ListMessages />,
          path: 'mensajes'
        },
        {
          path: "*",
          element: <Navigate to="dashboard" replace />
        }
      ]
    },
    {
      path: '/usuario',
      element: <ProtectedRoutes role={2}><LayoutUser /></ProtectedRoutes>,
      children: [
        {
          element: <UserAccount />,
          path: 'cuenta',
          index: true,
        },
        {
          element: <Post />,
          path: 'publicar'
        },
        {
          element: <UserActivity />,
          path: 'actividad'
        },
        {
          path: "*",
          element: <Navigate to="/usuario/cuenta" replace />
        }
      ]
    },
    {
      path: '/ia',
      element: <LayoutAI />,
      children: [
        {
          index: true,
          element: <HomeAI />,
          path: 'inicioia'
        },
        // {
        //   element: <MyActivity />,
        //   path: 'actividad'
        // },
      ]
    },

  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)

