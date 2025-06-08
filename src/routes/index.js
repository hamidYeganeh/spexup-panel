import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import { AuthLayout } from 'src/layouts/auth';
import { AuthGuard } from 'src/features/guards/AuthGuard';

// ----------------------------------------------------------------------

const Loadable = (Component) =>
  function (props) {
    const { pathname } = useLocation();

    return (
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { element: <Navigate to={'/auth/login'} replace />, index: true },
        { path: '/auth/login', element: <Login /> },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/project/list" replace />, index: true },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
          ],
        },
        {
          path: 'project',
          children: [
            { element: <Navigate to="/dashboard/project/list" replace />, index: true },
            { path: 'list', element: <ProjectList /> },
            { path: 'create', element: <ProjectCreate /> },
            { path: 'update/:projectID', element: <ProjectUpdate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/list" replace />, index: true },
            { path: 'list', element: <BlogList /> },
            { path: 'create', element: <BlogCreate /> },
            { path: 'update/:blogID', element: <BlogUpdate /> },
          ],
        },
        {
          path: 'blog-comment',
          children: [
            { element: <Navigate to="/dashboard/blog-comment/list" replace />, index: true },
            { path: 'list/:blogID', element: <BlogCommentList /> },
            { path: 'create', element: <BlogCommentCreate /> },
            { path: 'update/:blogCommentID', element: <BlogCommentUpdate /> },
          ],
        },
        {
          path: 'category',
          children: [
            { element: <Navigate to="/dashboard/category/list" replace />, index: true },
            { path: 'list', element: <CategoryList /> },
            { path: 'create', element: <CategoryCreate /> },
            { path: 'update/:categoryID', element: <CategoryUpdate /> },
          ],
        },
        {
          path: 'contact',
          children: [
            { element: <Navigate to="/dashboard/contact/list" replace />, index: true },
            { path: 'list', element: <ContactList /> },
            { path: 'update/:contactID', element: <ContactUpdate /> },
          ],
        },
        {
          path: 'duty',
          children: [
            { element: <Navigate to="/dashboard/duty/list" replace />, index: true },
            { path: 'list', element: <DutyList /> },
            { path: 'create', element: <DutyCreate /> },
            { path: 'update/:dutyID', element: <DutyUpdate /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// auth
const Login = Loadable(lazy(() => import('../pages/auth/login')));

// projects
const ProjectList = Loadable(lazy(() => import('../pages/project/list')));
const ProjectCreate = Loadable(lazy(() => import('../pages/project/create')));
const ProjectUpdate = Loadable(lazy(() => import('../pages/project/update')));

// blog
const BlogList = Loadable(lazy(() => import('../pages/blog/list')));
const BlogCreate = Loadable(lazy(() => import('../pages/blog/create')));
const BlogUpdate = Loadable(lazy(() => import('../pages/blog/update')));

// blog comment
const BlogCommentList = Loadable(lazy(() => import('../pages/blog-comment/list')));
const BlogCommentCreate = Loadable(lazy(() => import('../pages/blog-comment/create')));
const BlogCommentUpdate = Loadable(lazy(() => import('../pages/blog-comment/update')));

// category
const CategoryList = Loadable(lazy(() => import('../pages/category/list')));
const CategoryCreate = Loadable(lazy(() => import('../pages/category/create')));
const CategoryUpdate = Loadable(lazy(() => import('../pages/category/update')));

// contact
const ContactList = Loadable(lazy(() => import('../pages/contact/list')));
const ContactUpdate = Loadable(lazy(() => import('../pages/contact/update')));

// duty
const DutyList = Loadable(lazy(() => import('../pages/duty/list')));
const DutyCreate = Loadable(lazy(() => import('../pages/duty/create')));
const DutyUpdate = Loadable(lazy(() => import('../pages/duty/update')));

// user
const UserList = Loadable(lazy(() => import('../pages/user/list')));
