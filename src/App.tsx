import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import ErrorPage from './pages/ErrorPage';
import DefaultLayout from './layout/DefaultLayout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Home />, index: true },
      { path: 'editor/:roomId', element: <EditorPage /> },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
