import { useRoutes } from 'react-router-dom'
import App from './App'
export const routes = [
  {
    path: '/home',
    element: <App />
  }
]
const Routes = () => useRoutes(routes)
export default Routes
